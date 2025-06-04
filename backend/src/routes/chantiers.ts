import { Router, Request, Response } from "express";
import { pool } from "../config/db";

const router = Router();

router.get("/", async (_req: Request, res: Response) => {
  try {
    const [rows] = await pool.query("SELECT * FROM projects");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

export default router;
