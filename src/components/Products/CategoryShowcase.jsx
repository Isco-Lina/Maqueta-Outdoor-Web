/**
 * Componente: CategoryShowcase
 * Propósito: Cuadrícula de 4 tarjetas destacadas en Home que navegan a /productos usando query params.
 * Navegación: <Link> a rutas internas con ?aud= / ?cat= dependiendo del "slug".
 * Notas:
 * - Usa estilos en categoryShowcase.css (altura, overlay, tipografía).
 * - El mapeo de slug -> URL está centralizado en linkFor() para mantener consistencia.
 */
import { Link } from "react-router-dom";
import "../../styles/categoryShowcase.css"; // o: import "@styles/categoryShowcase.css";

// 1) Definición estática de tiles principales (pueden extraerse a @data si lo prefieres)
const tiles = [
  { title: "Hombre", img: "/images/categories/hombre.png", slug: "hombre" },
  { title: "Mujer", img: "/images/categories/mujer.png", slug: "mujer" },
  {
    title: "Niños y Bebés",
    img: "/images/categories/niños.png",
    slug: "infantil",
  },
  {
    title: "Equipamiento",
    img: "/images/categories/accesorios.png",
    slug: "equipamiento",
  },
];

// 2) Auxiliar que devuelve el link final según el slug
const linkFor = (slug) => {
  const s = String(slug).toLowerCase();

  // Audiencias
  if (s === "hombre") return "/productos?aud=hombre";
  if (s === "mujer") return "/productos?aud=mujer";

  // Infantil: OJO de coherencia con el resto del sitio (usa "ninos" como aud si así lo definiste en Products/Filters)
  if (["infantil", "niños", "ninos", "bebés", "bebes"].includes(s)) {
    return "/productos?aud=ninos"; // <- usa "ninos" (sin tilde) para ser consistente con Filters.jsx
  }

  // Equipamiento/Accesorios
  if (["equipamiento", "accesorios"].includes(s)) {
    return "/productos?cat=accesorios";
  }

  // Fallback genérico (no debería ocurrir en estos 4 tiles)
  return `/productos?categoria=${encodeURIComponent(s)}`;
};

export default function CategoryShowcase() {
  return (
    <section className="container my-5">
      {/* Título y CTA a /categorias */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="m-0">Elige algunas de nuestras categorías</h2>
        <Link className="text-decoration-none" to="/categorias">
          Ver todo →
        </Link>
      </div>

      {/* Grilla responsiva (4 tiles) */}
      <div className="row g-4">
        {tiles.map(({ title, img, slug }) => (
          <div key={slug} className="col-12 col-md-6 col-lg-3">
            <TileCard title={title} img={img} to={linkFor(slug)} />
          </div>
        ))}
      </div>
    </section>
  );
}

/**
 * Subcomponente: TileCard
 * Propósito: Tarjeta clickeable con imagen de fondo, overlay y CTA visual.
 * Accesibilidad: aria-label describe la acción del vínculo.
 */
function TileCard({ title, img, to }) {
  return (
    <Link
      to={to}
      className="tile-card d-block position-relative overflow-hidden rounded-4"
      style={{
        height: 360,
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        textDecoration: "none",
      }}
      aria-label={`Ver colección ${title}`}
    >
      {/* Overlay para mejorar contraste del texto */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,.15), rgba(0,0,0,.35))",
          transition: "background .3s ease",
          pointerEvents: "none", // mantiene el Link clickeable
        }}
      />

      {/* Contenido centrado */}
      <div className="position-absolute top-50 start-50 translate-middle text-center text-white px-3 w-100">
        <h3
          className="fw-bold"
          style={{ textShadow: "0 2px 10px rgba(0,0,0,.5)", fontSize: 36 }}
        >
          {title}
        </h3>

        {/* Botón decorativo (no captura el click) */}
        <span
          className="btn btn-light mt-3 px-4 py-2 rounded-pill"
          style={{
            backdropFilter: "blur(2px)",
            boxShadow: "0 8px 16px rgba(0,0,0,.2)",
            pointerEvents: "none",
          }}
        >
          Ver colección
        </span>
      </div>
    </Link>
  );
}
