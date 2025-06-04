import { useEffect, useState } from "react";

type ChantierEtatStats = {
  attente: number;
  encours: number;
  termine: number;
};

export default function ChantiersEtatStats() {
  const [etats, setEtats] = useState<ChantierEtatStats | null>(null);

  useEffect(() => {
    fetch("http://localhost:5000/admin/chantiers-etat")
      .then(res => res.json())
      .then(data => setEtats(data));
  }, []);

  return (
    <div className="stats-etats">
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        <li style={{ color: "#007bff" }}>
          <b>En cours :</b> {etats?.encours ?? 0}
        </li>
        <li style={{ color: "#ff804b" }}>
          <b>En attente :</b> {etats?.attente ?? 0}
        </li>
        <li style={{ color: "#5b9205" }}>
          <b>Terminés :</b> {etats?.termine ?? 0}
        </li>
      </ul>
    </div>
  );
}
