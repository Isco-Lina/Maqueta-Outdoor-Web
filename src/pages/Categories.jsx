import { Link } from "react-router-dom";
import { categoriesData } from "../data/categories";
import "../styles/categories.css";

/**
 * Mapea el slug de la categoría al query param que entiende /productos:
 * - hombre        -> /productos?aud=hombre
 * - mujer         -> /productos?aud=mujer
 * - niños/bebés   -> /productos?aud=infantil
 * - equipamiento  -> /productos?cat=accesorios
 * Si no coincide con ninguno, deja el fallback antiguo: ?categoria=<slug>
 */
function linkForCategory(slug) {
  const s = String(slug).toLowerCase();

  if (s === "hombre") return "/productos?aud=hombre";
  if (s === "mujer") return "/productos?aud=mujer";
  if (["niños", "ninos", "bebés", "bebes", "infantil"].includes(s))
    return "/productos?aud=infantil";
  if (["equipamiento", "accesorios"].includes(s))
    return "/productos?cat=accesorios";

  // Fallback por compatibilidad con lo que tenías
  return `/productos?categoria=${encodeURIComponent(slug)}`;
}

export default function Categories() {
  return (
    <section className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="m-0">Nuestras categorías</h1>
      </div>

      <div className="row g-4">
        {categoriesData.map(({ slug, name, image }) => (
          <div key={slug} className="col-12 col-md-6 col-lg-3">
            <Link
              to={linkForCategory(slug)}
              className="cat-card d-block position-relative overflow-hidden rounded-4"
              style={{
                height: 320,
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="cat-overlay" />
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
