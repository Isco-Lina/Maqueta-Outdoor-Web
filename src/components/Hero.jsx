// Cabecera visual con imagen de fondo responsiva y CTAs.
// La imagen se resuelve con import.meta.env.BASE_URL para funcionar igual
// en desarrollo, producción y despliegues en subcarpeta (ej. GitHub Pages).
// Asegúrate de que el archivo exista en /public/images/ropa-tecnica.jpg

import { Link } from "react-router-dom";
import "../styles/hero.css";

export default function Hero() {
  // Construimos la ruta robusta a la imagen del hero
  const bg = `${import.meta.env.BASE_URL}images/ropa-tecnica.jpg`;

  return (
    <section
      className="hero-bleed d-flex align-items-center" // alto fluido + centrado vertical del contenido
      role="banner"
      aria-label="Explora sin límites"
      style={{ backgroundImage: `url(${bg})` }} // imagen de fondo desde JSX
    >
      {/* Capa de gradiente para contraste del texto sobre la imagen */}
      <div className="hero-overlay" />

      {/* Contenedor Bootstrap: maneja márgenes horizontales */}
      <div className="container position-relative">
        {/* Limitamos el ancho del bloque de texto en pantallas grandes */}
        <div className="col-12 col-lg-7">
          <h1 className="fw-bold display-4 text-white">Explora sin límites</h1>

          <p className="lead text-white-50 mb-4">
            Ropa y equipamiento outdoor para todas tus aventuras: montaña,
            trekking y ciudad.
          </p>

          {/* Botones principales de acción */}
          <div className="d-flex gap-3">
            <Link to="/productos" className="btn btn-primary btn-lg">
              Ver productos
            </Link>

            <Link
              to="/categorias"
              className="btn btn-outline-light btn-lg"
              aria-label="Ver categorías"
            >
              Ver categorías
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
