import "../styles/brandShowcase.css";

/**
 * BrandShowcase.jsx
 * -----------------
 * Carrusel infinito de logos de marcas, hecho con CSS y duplicando los ítems.
 *
 * - brands: lista base de logos (con alt y src).
 * - loop: se crea duplicando la lista para lograr efecto de scroll infinito.
 * - Cada logo se muestra dentro de un contenedor `.brand-item`.
 * - Los estilos en brandShowcase.css manejan la animación de autoscroll.
 */
const brands = [
  { alt: "WEKE", src: "/images/brands/logo-weke.png" },
  { alt: "Patagonia", src: "/images/brands/patagonia.jpg" },
  { alt: "The North Face", src: "/images/brands/northface.jpg" },
  { alt: "Columbia", src: "/images/brands/columbia.png" },
  { alt: "Black Diamond", src: "/images/brands/blackDiamond.jpg" },
];

export default function BrandShowcase() {
  // Duplicamos la lista para que al llegar al final se repita sin cortes
  const loop = [...brands, ...brands];

  return (
    <section className="container my-5">
      {/* Título centrado */}
      <div className="text-center mb-3">
        <h2 className="m-0">Marcas que nos acompañan</h2>
        <p className="text-muted m-0">
          Calidad probada en montaña, trekking y ciudad
        </p>
      </div>

      {/* Rail con animación de scroll horizontal */}
      <div className="brand-rail rounded-4">
        <div className="brand-track">
          {loop.map((b, i) => (
            <div className="brand-item" key={b.alt + i} aria-label={b.alt}>
              {/* Logo individual */}
              <img src={b.src} alt={b.alt} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
