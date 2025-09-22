/**
 * Pie de página oscuro con texto a la izquierda e íconos sociales a la derecha.
 * Las imágenes de íconos deben estar en /public/icons/.
 * - Instagram, Facebook, WhatsApp y Correo (mailto).
 */

import "../styles/footer.css";

export default function Footer() {
  // Año dinámico (no hay que actualizarlo a mano)
  const year = new Date().getFullYear();

  return (
    <footer className="py-4 mt-auto bg-dark">
      {/* Contenedor responsive de Bootstrap: distribuye contenido en extremos */}
      <div className="container d-flex flex-wrap justify-content-between align-items-center gap-3">
        {/* Leyenda de derechos */}
        <span className="text-white-50">
          © {year} Tienda Outdoor - Todos los derechos reservados
        </span>

        {/* Bloque de íconos sociales (cada uno es un enlace) */}
        <div className="d-flex align-items-center gap-3">
          {/* Instagram */}
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
              className="social-icon"
            />
          </a>

          {/* Facebook */}
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
              className="social-icon"
            />
          </a>

          {/* WhatsApp (número demo en formato internacional sin '+') */}
          <a
            href="https://wa.me/56912345678"
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
            title="WhatsApp"
          >
            <img
              src="/icons/whatsapp.png"
              alt="WhatsApp"
              className="social-icon"
            />
          </a>

          {/* Correo (abre cliente de email) */}
          <a
            href="mailto:soporte@outdoorgear.cl"
            aria-label="Correo"
            title="Correo"
          >
            <img src="/icons/gmail.png" alt="Correo" className="social-icon" />
          </a>
        </div>
      </div>
    </footer>
  );
}
