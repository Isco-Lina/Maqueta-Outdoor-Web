import { Link } from "react-router-dom";
import "../styles/hero.css";

export default function Hero() {
  // Construye la URL robusta (sirve en dev, build y GitHub Pages con subcarpeta)
  const bg = `${import.meta.env.BASE_URL}images/ropa-tecnica.jpg`;

  return (
    <section
      className="hero-bleed d-flex align-items-center"
      role="banner"
      aria-label="Explora sin límites"
      style={{ backgroundImage: `url(${bg})` }} // 👈 aquí va la imagen
    >
      <div className="hero-overlay" />

      <div className="container position-relative">
        <div className="col-12 col-lg-7">
          <h1 className="fw-bold display-4 text-white">Explora sin límites</h1>
          <p className="lead text-white-50 mb-4">
            Ropa y equipamiento outdoor para todas tus aventuras: montaña,
            trekking y ciudad.
          </p>
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
