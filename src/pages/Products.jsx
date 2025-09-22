import { useMemo, useCallback, useState } from "react";
import Filters from "../components/Filters.jsx";
import ProductGrid from "../components/ProductGrid.jsx";
import QuickViewModal from "../components/QuickViewModal.jsx";

export default function Products({ products, addToCart }) {
  const list = useMemo(() => {
    if (Array.isArray(products)) return products;
    if (products && typeof products === "object")
      return Object.values(products).flat();
    return [];
  }, [products]);

  const [flt, setFlt] = useState({
    cat: "all",
    min: 0,
    max: Infinity,
    keyword: "",
    sortBy: "relevance",
    aud: "all",
  });

  const handleChange = useCallback((next) => setFlt(next), []);

  const normalize = (s = "") =>
    s
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  const filtered = useMemo(() => {
    const min = Number(flt.min) || 0;
    const max = Number(flt.max) || Infinity;
    const kw = normalize(flt.keyword);

    let out = list.filter((p) => {
      // categoría
      const okCat = flt.cat === "all" ? true : p.category === flt.cat;

      // audiencia / género
      const audField = normalize(p.audience || p.gender || p.segment || "");
      const okAud = flt.aud === "all" ? true : audField === normalize(flt.aud);

      // precio
      const price = Number(p.price) || 0;
      const okPrice = price >= min && price <= max;

      // palabra clave: name/brand/category
      const haystack = normalize(
        [p.name, p.brand, p.category].filter(Boolean).join(" ")
      );
      const okKw = kw ? haystack.includes(kw) : true;

      return okCat && okAud && okPrice && okKw;
    });

    // Orden
    switch (flt.sortBy) {
      case "priceAsc":
        out = out.slice().sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case "priceDesc":
        out = out.slice().sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case "nameAsc":
        out = out
          .slice()
          .sort((a, b) =>
            normalize(a.name || "").localeCompare(normalize(b.name || ""))
          );
        break;
      case "relevance":
      default:
        if (kw) {
          const score = (p) => {
            const n = normalize(p.name || "");
            const b = normalize(p.brand || "");
            return (
              (n.startsWith(kw) ? 2 : 0) +
              (b.startsWith(kw) ? 1 : 0) +
              (n.includes(kw) ? 0.5 : 0)
            );
          };
          out = out.slice().sort((a, b) => score(b) - score(a));
        }
    }
    return out;
  }, [list, flt]);

  // Modal
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const openQuick = (prod) => {
    setSelected(prod);
    setShowModal(true);
  };
  const closeQuick = () => setShowModal(false);

  return (
    <>
      <h1 className="mb-3">Nuestra linea de productos</h1>
      <p className="lead mb-3">
        Elije entre una amplia variedad de productos para tus aventuras al aire
        libre.
      </p>

      <Filters onChange={handleChange} current={flt} />

      <ProductGrid
        products={filtered}
        addToCart={addToCart}
        onQuickView={openQuick}
      />

      <QuickViewModal
        show={showModal}
        product={selected}
        onAdd={addToCart}
        onClose={closeQuick}
      />
    </>
  );
}
