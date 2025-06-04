import { Router, Request, Response } from "express";
import { pool } from "../config/db";

const router = Router();

// Liste des utilisateurs
router.get("/users", async (_req: Request, res: Response) => {
  try {
    const [rows] = await pool.query("SELECT * FROM users");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// Liste des projets
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
    // Adapte la colonne "role" selon ta table users
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

// ...
router.get("/chantiers-etat", async (_req, res) => {
  try {
    // Adapte les valeurs selon ta BDD (statut = 'en cours', etc.)
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
