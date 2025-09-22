import { Link, NavLink } from "react-router-dom";

/**
 * Navbar WEKE
 * - Usa Bootstrap 5 + clases del tema (wek-navbar).
 * - Contador de carrito via prop `cartCount`.
 * - NavLink activa la ruta con .active (Bootstrap la resalta).
 */
export default function Navbar({ cartCount = 0 }) {
  return (
    <nav className="navbar navbar-expand-lg bg-light wek-navbar">
      <div className="container">
        {/* Marca */}
        <Link className="navbar-brand fw-bold" to="/">
          <img
            src="/src/assets/images/logo.png"
            alt="Logo"
            max-width="100%"
            width="100px"
          />
        </Link>

        {/* Toggler para móvil */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#wekNav"
          aria-controls="wekNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* Menú */}
        <div className="collapse navbar-collapse" id="wekNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink end to="/" className="nav-link">
                Inicio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/productos" className="nav-link">
                Productos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/contacto" className="nav-link">
                Contacto
              </NavLink>
            </li>
          </ul>

          {/* CTA Carrito (pill) */}
          <NavLink
            to="/carrito"
            className="btn btn-outline-dark btn-sm rounded-pill px-3"
          >
            Carrito ({cartCount})
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
