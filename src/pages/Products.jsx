// Página de Productos: aplica filtros + orden + quick view.
// Recibe 'products' (array u objeto) y 'addToCart' como props.

import { useMemo, useCallback, useState } from "react";
import Filters from "../components/Filters.jsx";
import ProductGrid from "../components/ProductGrid.jsx";
import QuickViewModal from "../components/QuickViewModal.jsx";

export default function Products({ products, addToCart }) {
  // Normaliza 'products' a una lista.
  // - Si viene un array, lo usamos tal cual.
  // - Si viene un objeto indexado por categorías, aplanamos sus arrays.
  const list = useMemo(() => {
    if (Array.isArray(products)) return products;
    if (products && typeof products === "object")
      return Object.values(products).flat();
    return [];
  }, [products]);

  // Estado de filtros globales para la página.
  // 'aud' (audiencia) se obtiene desde la URL dentro de <Filters /> y se refleja aquí.
  const [flt, setFlt] = useState({
    cat: "all",
    min: 0,
    max: Infinity,
    keyword: "",
    sortBy: "relevance",
    aud: "all",
  });

  // Se lo pasamos a <Filters />; éste nos devuelve el objeto final de filtros.
  const handleChange = useCallback((next) => setFlt(next), []);

  // Normalizador: quita tildes y pasa a minúsculas para buscar de forma tolerante.
  const normalize = (s = "") =>
    s
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  // Cálculo principal: filtra y ordena en memoria
  const filtered = useMemo(() => {
    const min = Number(flt.min) || 0;
    const max = Number(flt.max) || Infinity;
    const kw = normalize(flt.keyword);

    let out = list.filter((p) => {
      // 1) categoría
      const okCat = flt.cat === "all" ? true : p.category === flt.cat;

      // 2) audiencia (publico objetivo). Ajusta el campo según tus datos reales.
      const audField = normalize(p.audience || p.gender || p.segment || "");
      const okAud = flt.aud === "all" ? true : audField === normalize(flt.aud);

      // 3) precio (entre min y max)
      const price = Number(p.price) || 0;
      const okPrice = price >= min && price <= max;

      // 4) palabra clave (nombre, marca y categoría)
      const haystack = normalize(
        [p.name, p.brand, p.category].filter(Boolean).join(" ")
      );
      const okKw = kw ? haystack.includes(kw) : true;

      return okCat && okAud && okPrice && okKw;
    });

    // Ordenamiento según selección
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
        // Relevancia simple cuando hay keyword: prioriza coincidencias al inicio del nombre/marca
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

  // ---- Estado del modal "vista rápida" ----
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);

  // Abre/cierra modal con el producto seleccionado
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

      {/* Pasamos el estado actual para que Filters muestre los valores seleccionados */}
      <Filters onChange={handleChange} current={flt} />

      {/* Grilla de productos ya filtrados/ordenados */}
      <ProductGrid
        products={filtered}
        addToCart={addToCart}
        onQuickView={openQuick}
      />

      {/* Modal de vista rápida (controlado) */}
      <QuickViewModal
        show={showModal}
        product={selected}
        onAdd={addToCart}
        onClose={closeQuick}
      />
    </>
  );
}
