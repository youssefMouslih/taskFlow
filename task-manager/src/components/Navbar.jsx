import { NavLink, Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <div className="navbar-logo">T</div>
        <span className="navbar-title">TaskFlow</span>
      </Link>

      <div className="navbar-nav">
        <NavLink
          to="/"
          end
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          Liste
        </NavLink>
        <NavLink
          to="/ajouter"
          className={({ isActive }) => `btn-nav-add ${isActive ? '' : ''}`}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Ajouter
        </NavLink>
      </div>
    </nav>
  );
}
