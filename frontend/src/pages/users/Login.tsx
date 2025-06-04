import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../../AuthContext";
import DarkMode from "../../includes/DarkMode";

export default function Login() {
  const { user, setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Erreur lors de la connexion.");
        return;
      }
      // Reload user info after login
      const me = await fetch("http://localhost:5000/auth/me", {
        credentials: "include",
      });
      if (me.ok) {
        const userData = await me.json();
        setUser(userData.user);
      } else {
        setUser(null);
      }
      setEmail("");
      setPassword("");
    } catch (err) {
      setError("Erreur réseau ou serveur.");
    }
  };

  const handleLogout = async () => {
    await fetch("http://localhost:5000/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
    setEmail("");
    setPassword("");
    setError("");
  };

  if (user) {
    return (
      <div
        className="container">
        <h2>Bienvenue, {user.name || user.email} !</h2>
        <div>
          <b>Email :</b> {user.email}
        </div>
        <div>
          <b>ID :</b> {user.id} - {user.role}
        </div>
        {user.created_at && (
          <div>
            <b>Inscrit le :</b> {new Date(user.created_at).toLocaleDateString("fr-FR")}
          </div>
        )}
        <button onClick={handleLogout} style={{ marginTop: "1rem" }}>
          Se déconnecter
        </button>
       <DarkMode />
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Connexion</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        {error && <div className="error">{error}</div>}
        <label>
          Email :
          <input
            type="email"
            value={email}
            autoComplete="username"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label style={{ position: "relative" }}>
          Mot de passe :
          <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: "100%", paddingRight: "2.2em" }}
            />
            <span
              onClick={() => setShowPassword((v) => !v)}
              style={{
                position: "absolute",
                right: "0.7em",
                cursor: "pointer",
                color: "#c9c9c9",
                fontSize: "1.15em",
                top: "50%",
                transform: "translateY(-65%)",
              }}
              title={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </label>
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}
