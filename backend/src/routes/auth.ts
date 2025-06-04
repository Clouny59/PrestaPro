import { Router, Request, Response, NextFunction } from "express";
import { pool } from "../config/db";
import bcrypt from "bcrypt";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";

type UserRow = {
  id: number;
  name: string;
  email: string;
  password: string;
  role?: string;
  created_at?: string;
};

interface AuthRequest extends Request {
  user?: string | JwtPayload;
}

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "monsecretchangele";

// Authentication middleware
function authenticateToken(req: AuthRequest, res: Response, next: NextFunction) {
  const token = req.cookies?.token;
  if (!token) {
    res.sendStatus(401);
    return;
  }
  jwt.verify(
    token,
    JWT_SECRET,
    (err: VerifyErrors | null, decoded: string | JwtPayload | undefined) => {
      if (err) {
        res.sendStatus(403);
        return;
      }
      req.user = decoded;
      next();
    }
  );
}

// Register a new user
router.post("/register", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400).json({ error: "Champs manquants" });
    return;
  }
  try {
    const [rows] = await pool.query("SELECT id FROM users WHERE email = ?", [email]);
    const users = rows as UserRow[];
    if (users.length > 0) {
      res.status(400).json({ error: "Email déjà utilisé" });
      return;
    }
    const hash = await bcrypt.hash(password, 10);
    await pool.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hash]
    );
    res.json({ success: true, message: "Utilisateur créé" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// User login
router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ error: "Champs manquants" });
    return;
  }
  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    const users = rows as UserRow[];
    const user = users[0];
    if (!user) {
      res.status(401).json({ error: "Email ou mot de passe invalide" });
      return;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ error: "Email ou mot de passe invalide" });
      return;
    }
    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name, role: user.role || "user" },
      JWT_SECRET,
      { expiresIn: "7d" }
    );
    // Send secure cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true only in production
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    res.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role || "user",
        created_at: user.created_at,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// Current user info
router.get("/me", authenticateToken, async (req: AuthRequest, res: Response) => {
  const userInToken = req.user as any;
  if (!userInToken || !userInToken.id) {
    res.sendStatus(401);
    return;
  }
  try {
    const [rows] = await pool.query(
      "SELECT id, name, email, role, created_at FROM users WHERE id = ?",
      [userInToken.id]
    );
    const user = Array.isArray(rows) ? rows[0] : null;
    if (!user) {
      res.sendStatus(404);
      return;
    }
    res.json({ user });
  } catch (err) {
    res.sendStatus(500);
  }
});

// User logout
router.post("/logout", (_req, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  res.json({ success: true });
});

export default router;
