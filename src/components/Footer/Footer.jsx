/**
 * Componente: Footer
 * Propósito: Pie de página con branding, navegación secundaria y redes/contacto.
 * Navegación: <Link> hacia rutas internas ("/", "/productos", "/categorias", "/contacto").
 * Notas:
 * - Las redes sociales usan <a> externas con target="_blank" + rel="noreferrer".
 * - Los íconos se cargan como imágenes estáticas desde /icons/.
 */
import { Link } from "react-router-dom";
import "../../styles/footer.css"; // o: import "@styles/footer.css";

export default function Footer() {
  // Año actual: se calcula en render (simple y suficiente aquí).
  const year = new Date().getFullYear();

  return (
    <footer className="alt-footer">
      {/* Branding + tagline superior */}
      <div className="alt-footer-top">
        <div className="brand-inline">
          <img
            src="/logo.png"
            alt="Outdoor Gear"
            className="alt-footer-logo-inline"
            loading="lazy"
          />
          <h2 className="alt-footer-brand">Outdoor Gear</h2>
        </div>
        <p className="alt-footer-tagline">
          Vive la aventura. Equípate para conquistar montaña, trekking y ciudad.
        </p>
      </div>

      {/* Navegación y redes */}
      <div className="alt-footer-bottom">
        <nav className="alt-nav" aria-label="Navegación secundaria">
          <Link to="/" className="alt-link">
            Inicio
          </Link>
          <Link to="/productos" className="alt-link">
            Productos
          </Link>
          <Link to="/categorias" className="alt-link">
            Categorías
          </Link>
          <Link to="/contacto" className="alt-link">
            Contacto
          </Link>
          <Link to="/ubicacion" className="alt-link">
            Ubicación
          </Link>
        </nav>

        <div className="alt-socials">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            title="Instagram"
          >
            <img
              src="/icons/instagram.png"
              alt="Instagram"
              className="alt-social"
              loading="lazy"
            />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
            title="Facebook"
          >
            <img
              src="/icons/facebook.png"
              alt="Facebook"
              className="alt-social"
              loading="lazy"
            />
          </a>
          <a
            href="https://wa.me/56964344326"
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
            title="WhatsApp"
          >
            <img
              src="/icons/whatsapp.png"
              alt="WhatsApp"
              className="alt-social"
              loading="lazy"
            />
          </a>
          <a
            href="mailto:molina.carrilo1996@gmail.com"
            aria-label="Correo"
            title="Correo"
          >
            <img
              src="/icons/gmail.png"
              alt="Correo"
              className="alt-social"
              loading="lazy"
            />
          </a>

          {/* Si quieres teléfono clickable:
          <a href="tel:+56223456789" aria-label="Llamar" title="Llamar">
            <img src="/icons/phone.png" alt="Teléfono" className="alt-social" />
          </a>
          */}
        </div>

        <p className="alt-copy">
          © {year} Outdoor Gear — Todos los derechos reservados
        </p>
      </div>
    </footer>
  );
}
