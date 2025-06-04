import { useState } from "react";
import UsersAdmin from "./UsersAdmin";
import ProjectsAdmin from "./ProjectsAdmin";
// Ajoute d'autres sous-composants (AvisAdmin, ProsAdmin, etc.)
import { useAuth } from "../../AuthContext"; // adapte le chemin selon ton arborescence
import { Navigate } from "react-router-dom";
import AdminStats from "./AdminStats";

type Section = "users" | "projects" | "pros" | "avis";

export default function AdminDashboard() {
  const [section, setSection] = useState<Section>("users");
  const { user, loading } = useAuth();

  if (loading) return <div>Chargement…</div>;
if (!user || user.role?.toLowerCase() !== "admin") {
  return <Navigate to="/" />;
}

  return (
    <>
    <AdminStats />
    <div className="container">
      
      <h1>Admin panel</h1>
      <nav className="admin-sidebar">
        <ul>
          <li className={section === "users" ? "active" : ""} onClick={() => setSection("users")}>
            Utilisateurs
          </li>
          <li className={section === "projects" ? "active" : ""} onClick={() => setSection("projects")}>
            Projets
          </li>
          <li className={section === "pros" ? "active" : ""} onClick={() => setSection("pros")}>
            Pros
          </li>
          <li className={section === "avis" ? "active" : ""} onClick={() => setSection("avis")}>
            Avis
          </li>
        </ul>
      </nav>
      <main className="admin-content">
        {section === "users" && <UsersAdmin />}
        {section === "projects" && <ProjectsAdmin />}
        {section === "pros" && <div>Gestion des pros (à faire)</div>}
        {section === "avis" && <div>Gestion des avis (à faire)</div>}
      </main>
    </div>
    </>
  );
}