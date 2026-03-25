import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import "./Sidebar.css";

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const perfil = user?.role === "PROFESSOR" ? "Professor" : "Aluno";
  const rotaInicial = user?.role === "PROFESSOR" ? "/professor" : "/aluno";

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <aside className="sidebar">
      <div className="sidebar__top">
        <div className="sidebar__logo-circle">ED</div>
        <div>
          <h2>Escola Digital</h2>
          <p>Plataforma Escolar</p>
        </div>
      </div>

      <div className="sidebar__user">
        <div className="sidebar__avatar">👤</div>
        <div>
          <strong>{perfil}</strong>
          <p>{user?.name || "Usuário"}</p>
        </div>
      </div>

      <nav className="sidebar__nav">
        <NavLink to={rotaInicial} className="sidebar__link">
          Inicial
        </NavLink>

        <NavLink to="/configuracoes" className="sidebar__link">
          Configurações
        </NavLink>

        <button className="sidebar__link sidebar__logout" onClick={handleLogout}>
          Sair
        </button>
      </nav>
    </aside>
  );
}