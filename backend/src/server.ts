import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import adminRoutes from "./routes/admin";
import usersRoutes from "./routes/users";
import chantiersRoutes from "./routes/chantiers";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/users", usersRoutes);
app.use("/chantiers", chantiersRoutes);

app.get("/", (_req, res) => {
  res.send("API Node.js + TypeScript + JWT Cookie sécurisée !");
});

app.listen(PORT, () => {
  console.log(`Serveur backend lancé sur http://localhost:${PORT}`);
});
