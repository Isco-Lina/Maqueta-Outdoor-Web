import { Link, NavLink } from "react-router-dom";

/**
 * Barra de navegación superior:
 * - Logo (marca) a la izquierda.
 * - Links a Inicio / Productos / Contacto.
 * - Botón de Carrito con contador (prop `cartCount`).
 *
 * Notas:
 * - Usa clases de Bootstrap 5 (navbar-expand-lg, navbar-toggler, collapse...).
 * - <NavLink> aplica la clase .active automáticamente en la ruta activa.
 * - El logo carga desde /public/logo.png (puedes cambiarlo).
 */
export default function Navbar({ cartCount = 0 }) {
  return (
    <nav className="navbar navbar-expand-lg bg-light wek-navbar">
      <div className="container">
        {/* Marca: al hacer click navega al home */}
        <Link
          className="navbar-brand fw-bold d-flex align-items-center gap-2"
          to="/"
        >
          {/* Logo simple (si usas GitHub Pages en subcarpeta, podrías usar import.meta.env.BASE_URL) */}
          <img
            src="/logo.png"
            alt="Logo"
            width="100"
            height="auto"
            style={{ objectFit: "contain" }}
          />
        </Link>

        {/* Botón hamburguesa (móvil) que despliega el menú colapsado */}
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

        {/* Contenedor colapsable del menú */}
        <div className="collapse navbar-collapse" id="wekNav">
          {/* Menú de navegación principal (izquierda) */}
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

          {/* Acción derecha: botón de Carrito con contador (pastilla) */}
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
