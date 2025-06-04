import { useEffect, useState } from "react";
import { FaEye, FaTrash } from "react-icons/fa";
type Project = {
  id: number;
  title: string;
  status: string;
  description: string;
  created_at: string;
  realisation: string;
};

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    // Update the URL if your backend endpoint differs
    fetch("http://localhost:5000/admin/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, []);

  return (
    <section>
      <h1>Projets</h1>
      <div className="projects-list">
        {/* Rows */}
        {projects.map((p) => (
          <div className="project-row" key={p.id}>
            <div>
              {p.id}
              {" - "}
              {p.title}
              {" - "}
              {p.status}
              <p>{p.description}</p>
              <div className="project-row-date">
                <span>A realisé dans : <b style={{color:"#ff804b"}}>{p.realisation}</b></span>
                <span>{p.created_at}</span>

              </div>
            </div>
            <div className="actions">
              <FaEye className="admin-users-icon-eye" />
              <FaTrash className="admin-users-icon-trash" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
