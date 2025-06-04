import { useEffect, useState } from "react";
import ChantiersEtatStats from "./ChantiersEtatStats";

type Stats = {
  clients: number;
  artisans: number;
  chantiers: number;
};

export default function AdminStats() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("http://localhost:5000/admin/stats")
      .then(res => res.json())
      .then(data => setStats(data));
  }, []);

  return (
    <section className="container">
      <h1 className="stats-title">STATISTIQUES</h1>
      <div className="stats-row">
        <div className="stats-cards">
          <StatCard label="Clients" value={stats?.clients ?? 0} color="#007bff" />
          <StatCard label="Artisans" value={stats?.artisans ?? 0} color="#ff804b" />
          <StatCard label="Chantiers" value={stats?.chantiers ?? 0} color="#5b9205" />
        </div>
        <ChantiersEtatStats />
      </div>
    </section>
  );
}

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div
      className="stat-card"
      style={{
        background: color,
        borderRadius: "20px",
        minWidth: 120,
        minHeight: 120,
        padding: "1.2em 1.5em",
        textAlign: "center",
        color: "#fff",
        margin: "0 1em",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        boxShadow: "0 4px 18px rgba(80,80,80,0.07)",
      }}
    >
      <div style={{ fontSize: "2.3em", fontWeight: 700 }}>{value}</div>
      <div style={{ fontSize: "1.13em", marginTop: "0.4em", fontWeight: 500 }}>{label}</div>
    </div>
  );
}