import { Link } from "react-router-dom";
import "../../styles/categories.css"; 

function CategoryCard({ title, subtitle, img, to }) {
  return (
    <div className="col-12 col-sm-6 col-lg-3">
      <Link
        to={to}
        className="cat-card d-block position-relative overflow-hidden rounded-4"
        style={{
          height: 320,
          backgroundImage: `url(${img})`,
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
            {title}
          </h3>
          {subtitle && (
            <div className="small- text-white-50 mb-2">{subtitle}</div>
          )}
          <span className="btn btn-light mt-2 px-4 py-2 rounded-pill">
            Ver colección
          </span>
        </div>
      </Link>
    </div>
  );
}

const AUDIENCE_CARDS = [
  {
    title: "Hombre",
    subtitle: "Ropa outdoor para hombre",
    img: "/images/categories/hombre.png",
    to: "/productos?aud=hombre&cat=ropa",
  },
  {
    title: "Mujer",
    subtitle: "Ropa outdoor para mujer",
    img: "/images/categories/mujer.png",
    to: "/productos?aud=mujer&cat=ropa",
  },
  {
    title: "Niños y Bebés",
    subtitle: "Ropa outdoor infantil",
    img: "/images/categories/niños.png",
    to: "/productos?aud=ninos&cat=ropa&subcat=infantil",
  },
  {
    title: "Accesorios",
    subtitle: "Mochilas, gorros, polainas y más",
    img: "/images/categories/accesorios.png",
    to: "/productos?cat=accesorios&subcat=accesorios",
  },
];

const SUBCATEGORY_CARDS = [
  {
    title: "Primera capa",
    subtitle: "Térmicas y base layer",
    img: "/images/categories/primera.jpg",
    to: "/productos?cat=ropa&subcat=primera-capa",
  },
  {
    title: "Segunda capa",
    subtitle: "Polerones y mid layer",
    img: "/images/categories/segunda.jpg",
    to: "/productos?cat=ropa&subcat=segunda-capa",
  },
  {
    title: "Tercera capa",
    subtitle: "Cásacas impermeables / softshell",
    img: "/images/categories/tercera.png",
    to: "/productos?cat=ropa&subcat=tercera-capa",
  },
  {
    title: "Ver todo",
    subtitle: "Todo el catálogo",
    img: "/images/categories/todo.jpg",
    to: "/productos",
  },
];

export default function Categories() {
  return (
    <section className="container my-5">
      {/* Header de sección */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="m-0">Categorías</h1>
        <Link to="/productos" className="btn btn-link">
          Ver todo →
        </Link>
      </div>

      {/* Bloque 1: por audiencia */}
      <h2 className="h4 mb-3">Explorar por audiencia</h2>
      <div className="row g-4 mb-5">
        {AUDIENCE_CARDS.map((c) => (
          <CategoryCard key={c.title} {...c} />
        ))}
      </div>

      {/* Bloque 2: por subcategoría (capas) */}
      <h2 className="h4 mb-3">Explorar por subcategoría</h2>
      <div className="row g-4">
        {SUBCATEGORY_CARDS.map((c) => (
          <CategoryCard key={c.title} {...c} />
        ))}
      </div>
    </section>
  );
}
