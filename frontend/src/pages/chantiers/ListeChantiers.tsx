import { useEffect, useState } from "react";

type Chantier = {
  id: number;
  title: string;
  status: string;
  description: string;
  created_at: string;
  realisation: string;
};

function realisationLabel(value: string) {
  switch (value) {
    case "immediat": return "Immédiat";
    case "30jours": return "Dans 30 jours";
    case "3mois": return "D’ici 3 mois";
    case "6moisplus": return "Dans 6 mois ou plus";
    default: return value;
  }
}

export default function ListeChantiers() {
  const [chantiers, setChantiers] = useState<Chantier[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/chantiers")
      .then((res) => res.json())
      .then((data) => setChantiers(data));
  }, []);

  return (
    <section className="container">
      <h1>Liste des Chantiers</h1>
      <div className="projects-list">
        {chantiers.map((c) => (
            <>
          <div className="project-row" key={c.id}>
            <div className="chantier-content">
              <h3>{c.title}</h3>
              <p>
                {c.description}
          <div className="chantier-actions-date">
          <span style={{ fontWeight: 500, color: "#ff804b" }}>
                Prévu dans : {realisationLabel(c.realisation)}
              </span>
              <span>
                Créé le : {new Date(c.created_at).toLocaleDateString("fr-FR")}
              </span>
        </div>
              </p>
            </div>
            <div className="chantier-actions">
              <button>Voir</button>
            </div>
          </div>
          </>
        ))}
        
      </div>
      
    </section>
  );
}
