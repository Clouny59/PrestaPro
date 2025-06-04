import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaTools, FaUser, FaThumbsUp, FaUserTie } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { useAuth } from "../AuthContext"; // adapte si besoin

const navLinks = [
  { path: "/", label: "Accueil", icon: <FaHome /> },
  { path: "/chantiers", label: "Projets disponibles", icon: <FaTools /> },
  { path: "/mesprojets", label: "Projets acceptés", icon: <FaTools /> },
  { path: "/pros", label: "Pour les pros", icon: <FaUserTie /> },
  { path: "/profil", label: "Mon profil", icon: <FaUser /> },
  { path: "/avantages", label: "Avantages", icon: <FaThumbsUp /> },
];

const adminLink = { path: "/admin", label: "Admin", icon: <RiAdminFill style={{fontSize: "1.15rem", marginRight:"0.5rem"}}/> };

const NavBar: React.FC = () => {
  const { user, loading } = useAuth();

  return (
    <nav className="navbar-links">
      {navLinks.map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
        >
          <span className="nav-label" style={{ display: "inline-flex", alignItems: "center" }}>
            {link.icon && (
              <span className="nav-icon" style={{ fontSize: "1.15rem", marginRight: "0.5rem" }}>
                {link.icon}
              </span>
            )}
            {link.label}
          </span>
        </NavLink>
      ))}
      {/* Lien admin visible uniquement pour admin */}
      {!loading && user && user.role?.toLowerCase() === "admin" && (
        <NavLink
          to={adminLink.path}
          className={({ isActive }) => "admin-link" + (isActive ? " active" : "")}
        >
          {adminLink.icon} {adminLink.label}
        </NavLink>
      )}
    </nav>
  );
};

export default NavBar;
