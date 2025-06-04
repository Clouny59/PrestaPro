import React from "react";
import { useState } from "react";
import CustomSwitch from "./CustomSwitch";

export default function PagePreferences() {
  const [newsletter, setNewsletter] = useState(true);
  const [prosOffers, setProsOffers] = useState(false);
  const [partnersOffers, setPartnersOffers] = useState(false);
  const [dark] = useState(
    () => localStorage.getItem("darkmode") === "1"
  );

  // Sync dark mode with the document body
  React.useEffect(() => {
    if (dark) {
      document.body.classList.add("dark");
      localStorage.setItem("darkmode", "1");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("darkmode", "0");
    }
  }, [dark]);

  return (
    <section
      style={{
        marginTop: "2rem",
        background: "var(--white-background)",
      }}
    >
      <h1>
        <em>Mes préférences</em>
      </h1>
      <CustomSwitch
        checked={newsletter}
        onChange={setNewsletter}
        label="Je m'abonne à la newsletter"
      />
      <CustomSwitch
        checked={prosOffers}
        onChange={setProsOffers}
        label="J'accepte de recevoir les offres des pros et serviceso"
      />
      <CustomSwitch
        checked={partnersOffers}
        onChange={setPartnersOffers}
        label={
          <>
            <span>
              J'accepte de recevoir les offres de{" "}
              Partenaires
            </span>
          </>
        }
      />
    </section>
  );
}
