import { Link } from "react-router-dom";
import "../styles/categoryShowcase.css";

/**
 * Mapeo de tarjetas → URL que entiende /productos:
 * - Hombre        -> /productos?aud=hombre
 * - Mujer         -> /productos?aud=mujer
 * - Niños y Bebés -> /productos?aud=infantil
 * - Equipamiento  -> /productos?cat=accesorios
 */
const tiles = [
  {
    title: "Hombre",
    img: "/images/categories/hombre.png",
    slug: "hombre",
  },
  {
    title: "Mujer",
    img: "/images/categories/mujer.png",
    slug: "mujer",
  },
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

const linkFor = (slug) => {
  const s = String(slug).toLowerCase();
  if (s === "hombre") return "/productos?aud=hombre";
  if (s === "mujer") return "/productos?aud=mujer";
  if (["infantil", "niños", "ninos", "bebés", "bebes"].includes(s))
    return "/productos?aud=infantil";
  if (["equipamiento", "accesorios"].includes(s))
    return "/productos?cat=accesorios";

  // Fallback por si agregas nuevas tiles sin mapear aún:
  return `/productos?categoria=${encodeURIComponent(s)}`;
};

/**
 * Grid de 4 tarjetas con imagen de fondo + overlay con título y botón.
 * - Cada tarjeta completa es un enlace a /productos con query params.
 * - Efectos visuales conservados.
 */
export default function CategoryShowcase() {
  return (
    <section className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="m-0">Elige algunas de nuestras categoría</h2>
        <Link className="text-decoration-none" to="/categorias">
          Ver todo →
        </Link>
      </div>

      {/* Grid responsivo: 1 col en móvil, 2 en md, 4 en lg */}
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
      {/* Overlay visual (no bloquea el click) */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,.15), rgba(0,0,0,.35))",
          transition: "background .3s ease",
          pointerEvents: "none", // asegura que el click llegue al Link
        }}
      />

      {/* Contenido centrado */}
      <div className="position-absolute top-50 start-50 translate-middle text-center text-white px-3 w-100">
        <h3
          className="fw-bold"
          style={{
            textShadow: "0 2px 10px rgba(0,0,0,.5)",
            fontSize: 36,
          }}
        >
          {title}
        </h3>

        {/* Botón visual */}
        <span
          className="btn btn-light mt-3 px-4 py-2 rounded-pill"
          style={{
            backdropFilter: "blur(2px)",
            boxShadow: "0 8px 16px rgba(0,0,0,.2)",
            pointerEvents: "none", // también deja pasar el click al Link
          }}
        >
          Ver colección
        </span>
      </div>
    </Link>
  );
}
