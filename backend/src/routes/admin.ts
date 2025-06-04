import { Router, Request, Response } from "express";
import { pool } from "../config/db";

const router = Router();

// List users
router.get("/users", async (_req: Request, res: Response) => {
  try {
    const [rows] = await pool.query("SELECT * FROM users");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// List projects
router.get("/projects", async (_req: Request, res: Response) => {
  try {
    const [rows] = await pool.query("SELECT * FROM projects");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

router.get("/stats", async (_req: Request, res: Response) => {
  try {
    // Assumes the user role is stored in a column named "role"
    const [clientRows] = await pool.query("SELECT COUNT(*) as total FROM users WHERE role = 'client'");
    const [artisanRows] = await pool.query("SELECT COUNT(*) as total FROM users WHERE role = 'artisan'");
    const [chantiersRows] = await pool.query("SELECT COUNT(*) as total FROM projects");

    res.json({
      clients: (clientRows as any)[0].total,
      artisans: (artisanRows as any)[0].total,
      chantiers: (chantiersRows as any)[0].total,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

router.get("/chantiers-etat", async (_req, res) => {
  try {
    // Adjust status values according to your database
    const [attente] = await pool.query("SELECT COUNT(*) as total FROM projects WHERE status = 'attente'");
    const [encours] = await pool.query("SELECT COUNT(*) as total FROM projects WHERE status = 'en cours'");
    const [termine] = await pool.query("SELECT COUNT(*) as total FROM projects WHERE status = 'termine'");
    res.json({
      attente: (attente as any)[0].total,
      encours: (encours as any)[0].total,
      termine: (termine as any)[0].total,
    });
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});


export default router;
