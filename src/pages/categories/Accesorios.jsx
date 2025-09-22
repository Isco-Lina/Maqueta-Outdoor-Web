import { useState } from "react";
import productsData from "../../data/products.js";
import ProductGrid from "../../components/ProductGrid.jsx";
import QuickViewModal from "../../components/QuickViewModal.jsx";

export default function Accesorios({ addToCart }) {
  // 1) Lista de la categoría (definida en data/products.js)
  const productos = productsData.accesorios || [];

  // 2) Estado del modal (controlado en esta página)
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);

  // Handlers para abrir/cerrar
  const openQuick = (prod) => {
    setSelected(prod);
    setShowModal(true);
  };
  const closeQuick = () => setShowModal(false);

  return (
    <section className="mb-5">
      <h2 className="h3 fw-bold mb-4">Accesorios</h2>

      {/* 3) Grid de productos de esta categoría */}
      <ProductGrid
        products={productos}
        addToCart={addToCart}
        onQuickView={openQuick}
      />

      {/* 4) Modal conectado a la selección */}
      <QuickViewModal
        show={showModal}
        product={selected}
        onAdd={addToCart}
        onClose={closeQuick}
      />
    </section>
  );
}
