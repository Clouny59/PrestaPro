import { useEffect, useState } from "react";
import { FaEye, FaTrash } from "react-icons/fa";

type User = {
  id: number;
  name: string;
  email?: string;
  role?: string;
  created_at: string;
  // ...autres champs selon ta BDD
};

export default function UsersAdmin() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/admin/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  function formatDateJMA(dateStr?: string) {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    // Ajoute un "0" devant le jour/mois si besoin
    const j = String(date.getDate()).padStart(2, "0");
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const a = date.getFullYear();
    return `${j}/${m}/${a}`;
  }

  return (
    <section>
      <h1>Utilisateurs</h1>
      {users.map((u) => (
        <div className="user-row" key={u.id}>
          <div>
            {u.id}
            {" - "}
            {u.name} {" - "} {u.email ?? "-"} {" - "} {u.role} {" - "}
            {formatDateJMA(u.created_at)}
          </div>
          <div className="actions">
            <FaEye className="admin-users-icon-eye"/>
            <FaTrash className="admin-users-icon-trash"/>
          </div>
        </div>
      ))}
    </section>
  );
}
