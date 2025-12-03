import { Link } from "react-router-dom";
import "../../styles/hero-carousel.css"; 

const SLIDES = [
  {
    img: "/images/hero/inicio-5.jpg", 
    title: "Explora sin límites",
    text: "Ropa y equipamiento outdoor para tus aventuras.",
    cta1: { to: "/productos?cat=ropa", label: "Ver ropa" },
    cta2: { to: "/categorias", label: "Ver categorías" },
  },
  {
    img: "/images/hero/start-2.jpg",
    title: "Listo para la tormenta",
    text: "Tercera capa impermeable y respirable.",
    cta1: {
      to: "/productos?cat=ropa&subcat=tercera-capa",
      label: "Ver casacas",
    },
    cta2: { to: "/productos", label: "Ver todo" },
  },
  {
    img: "/images/hero/ropa-tecnica.jpg",
    title: "Cierra tu mochila",
    text: "Accesorios para trekking y campamento.",
    cta1: { to: "/productos?cat=accesorios", label: "Ver accesorios" },
    cta2: { to: "/productos?q=mochila", label: "Buscar mochilas" },
  },
];

export default function HeroCarousel() {
  return (
    <section className="hero-carousel-wrap">
      <div
        id="heroCarousel"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
      >
        {/* Indicadores de slides */}
        <div className="carousel-indicators">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              data-bs-target="#heroCarousel"
              data-bs-slide-to={i}
              className={i === 0 ? "active" : ""}
              aria-current={i === 0 ? "true" : undefined}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Slides */}
        <div className="carousel-inner">
          {SLIDES.map((s, i) => (
            <div
              key={i}
              className={`carousel-item ${i === 0 ? "active" : ""}`}
              data-bs-interval="6000" // cada slide permanece 6s
            >
              {/* Imagen full width */}
              <img
                src={s.img}
                className="d-block w-100 hero-slide-img"
                alt={s.title}
                loading={i === 0 ? "eager" : "lazy"} 
              />

              {/* Capa oscura para contraste del texto */}
              <div className="hero-overlay" />

              {/* Contenido: título + texto + CTAs */}
              <div className="carousel-caption text-start">
                <div className="hero-caption-card">
                  <h1 className="display-5 fw-bold mb-2">{s.title}</h1>
                  <p className="lead mb-4">{s.text}</p>

                  <div className="d-flex flex-wrap gap-3">
                    <Link
                      className="btn btn-primary btn-lg rounded-pill px-4"
                      to={s.cta1.to}
                    >
                      {s.cta1.label}
                    </Link>
                    <Link
                      className="btn btn-light btn-lg rounded-pill px-4"
                      to={s.cta2.to}
                    >
                      {s.cta2.label}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Controles prev/next */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Anterior</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Siguiente</span>
        </button>
      </div>
    </section>
  );
}
