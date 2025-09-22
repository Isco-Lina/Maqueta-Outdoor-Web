import { Link } from "react-router-dom";
import { categoriesData } from "../data/categories";
import "../styles/categories.css";

/**
 * Categories.jsx
 * --------------
 * Página "ver todas las categorías".
 * Muestra todas las categorías definidas en `categoriesData`.
 *
 * Cada tarjeta es un <Link> que navega a /productos
 * con los query params que entiende la vista de Productos.
 */

// Función que resuelve el link correcto según el slug
function linkForCategory(slug) {
  const s = String(slug).toLowerCase();

  if (s === "hombre") return "/productos?aud=hombre";
  if (s === "mujer") return "/productos?aud=mujer";
  if (["niños", "ninos", "bebés", "bebes", "infantil"].includes(s))
    return "/productos?aud=infantil";
  if (["equipamiento", "accesorios"].includes(s))
    return "/productos?cat=accesorios";

  // fallback genérico: usa el slug tal cual
  return `/productos?categoria=${encodeURIComponent(slug)}`;
}

export default function Categories() {
  return (
    <section className="container my-5">
      {/* Encabezado */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="m-0">Nuestras categorías</h1>
      </div>

      {/* Grilla responsiva (Bootstrap) */}
      <div className="row g-4">
        {categoriesData.map(({ slug, name, image }) => (
          <div key={slug} className="col-12 col-md-6 col-lg-3">
            {/* Tarjeta de categoría con imagen de fondo */}
            <Link
              to={linkForCategory(slug)} // Mapeo definido arriba
              className="cat-card d-block position-relative overflow-hidden rounded-4"
              style={{
                height: 320,
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Overlay oscuro para legibilidad */}
              <div className="cat-overlay" />

              {/* Contenido centrado (nombre + botón) */}
              <div className="position-absolute top-50 start-50 translate-middle text-center text-white w-100 px-3">
                <h3
                  className="fw-bold"
                  style={{ textShadow: "0 2px 10px rgba(0,0,0,.5)" }}
                >
                  {name}
                </h3>
                <span className="btn btn-light mt-2 px-4 py-2 rounded-pill">
                  Ver colección
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
