/**
 * Footer WEKE
 * - Oscuro, con íconos sociales a la derecha.
 * - Fotos de íconos van en /public/icons/
 */
import "../styles/footer.css";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="py-4 mt-auto bg-dark">
      <div className="container d-flex flex-wrap justify-content-between align-items-center gap-3">
        <span className="text-white-50">
          © {year} Tienda Outdoor - Todos los derechos reservados
        </span>

        <div className="d-flex align-items-center gap-3">
          {/* Instagram */}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
          >
            <img
              src="/icons/instagram.png"
              alt="Instagram"
              className="social-icon"
            />
          </a>

          {/* Facebook */}
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
          >
            <img
              src="/icons/facebook.png"
              alt="Facebook"
              className="social-icon"
            />
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/56912345678"
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
          >
            <img
              src="/icons/whatsapp.png"
              alt="WhatsApp"
              className="social-icon"
            />
          </a>

          {/* Correo */}
          <a href="mailto:soporte@outdoorgear.cl" aria-label="Correo">
            <img src="/icons/gmail.png" alt="Correo" className="social-icon" />
          </a>
        </div>
      </div>
    </footer>
  );
}
