/**
 * Componente: Navbar
 * Propósito: Barra superior con branding, navegación principal y acceso al carrito.
 * Navegación: Link/NavLink -> "/", "/productos", "/contacto", "/ubicacion", "/carrito".
 * Notas:
 * - Usa colapso de Bootstrap en mobile; el toggler controla #wekNav.
 * - <NavLink> marca .active automáticamente según la ruta actual.
 * - El contador de carrito llega por prop `cartCount` (número).
 */
import { Link, NavLink } from "react-router-dom";

export default function Navbar({ cartCount = 0 }) {
  return (
    <nav className="navbar navbar-expand-lg bg-light wek-navbar">
      <div className="container">
        {/* Branding: vuelve a Home al hacer click */}
        <Link
          className="navbar-brand fw-bold d-flex align-items-center gap-2"
          to="/"
        >
          {/* Si despliegas en subcarpeta, podrías usar import.meta.env.BASE_URL */}
          <img
            src="/logo.png"
            alt="Logo"
            width="100"
            height="auto"
            style={{ objectFit: "contain" }}
          />
        </Link>

        {/* Toggler: abre/cierra el menú colapsable en pantallas pequeñas */}
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

        {/* Menú colapsable */}
        <div className="collapse navbar-collapse" id="wekNav">
          {/* Enlaces principales (alineados a la izquierda) */}
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
            <li className="nav-item">
              <NavLink to="/ubicacion" className="nav-link">
                Ubicación
              </NavLink>
            </li>
          </ul>

          {/* CTA derecha: acceso al carrito con contador */}
          <NavLink
            to="/carrito"
            className="btn btn-outline-dark btn-sm rounded-pill px-3"
            title="Ver carrito"
          >
            Carrito ({Number(cartCount) || 0})
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
