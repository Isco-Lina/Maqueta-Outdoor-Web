import "../styles/brandShowcase.css";

/**
 * Carrusel infinito de logos (autoscroll) sin librerías.
 * - Duplicamos la lista para un loop continuo.
 * - Hover: logo pasa de gris a color y aumenta levemente.
 * - Compatible con touch (sin hover no pasa nada raro).
 */
const brands = [
  { alt: "WEKE", src: "/images/brands/logo-weke.png" },
  { alt: "Patagonia", src: "/images/brands/patagonia.jpg" },
  { alt: "The North Face", src: "/images/brands/northface.jpg" },
  { alt: "Columbia", src: "/images/brands/columbia.png" },
  { alt: "Black Diamond", src: "/images/brands/blackDiamond.jpg" },
];

export default function BrandShowcase() {
  // duplicamos para el efecto “loop”
  const loop = [...brands, ...brands];

  return (
    <section className="container my-5">
      <div className="text-center mb-3">
        <h2 className="m-0">Marcas que nos acompañan</h2>
        <p className="text-muted m-0">
          Calidad probada en montaña, trekking y ciudad
        </p>
      </div>

      <div className="brand-rail rounded-4">
        <div className="brand-track">
          {loop.map((b, i) => (
            <div className="brand-item" key={b.alt + i} aria-label={b.alt}>
              <img src={b.src} alt={b.alt} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
