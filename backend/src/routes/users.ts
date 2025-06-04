import { Router, Request, Response } from "express";
import { pool } from "../config/db";

const router = Router();

router.get("/", async (_req: Request, res: Response) => {
  try {
    const [rows] = await pool.query("SELECT * FROM users");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default router;
