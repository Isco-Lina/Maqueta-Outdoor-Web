/**
 * Componente: BrandShowcase
 * Propósito: Mostrar un carrusel/“marquee” infinito de marcas con animación CSS.
 * Entrada: (ninguna por ahora) usa una lista embebida de { alt, src }.
 * Notas:
 * - Se duplica la lista (`loop`) para simular scroll infinito sin cortes.
 * - La animación y el overflow los maneja `brandShowcase.css`.
 * - Accesibilidad: aria-label por ítem; considerar reduced-motion en CSS.
 */
import "../../styles/brandShowcase.css"; // o: import "@styles/brandShowcase.css";

const brands = [
  { alt: "WEKE", src: "/images/brands/logo-weke.png" },
  { alt: "Patagonia", src: "/images/brands/patagonia.jpg" },
  { alt: "The North Face", src: "/images/brands/northface.jpg" },
  { alt: "Columbia", src: "/images/brands/columbia.png" },
  { alt: "Black Diamond", src: "/images/brands/blackDiamond.jpg" },
];

export default function BrandShowcase() {
  // Duplicamos la lista para que, al terminar, continúe sin “salto”.
  const loop = [...brands, ...brands];

  return (
    <section className="container my-5">
      {/* Encabezado */}
      <div className="text-center mb-3">
        <h2 className="m-0">Marcas que nos acompañan</h2>
        <p className="text-muted m-0">
          Calidad probada en montaña, trekking y ciudad
        </p>
      </div>

      {/* Pista con desplazamiento horizontal continuo (ver CSS) */}
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
