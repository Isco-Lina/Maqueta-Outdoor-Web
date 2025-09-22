import { useState } from "react";
import productsData from "../../data/products.js";
import ProductGrid from "../../components/ProductGrid.jsx";
import QuickViewModal from "../../components/QuickViewModal.jsx";

export default function TerceraCapa({ addToCart }) {
  // 1) Lista de la categoría
  const productos = productsData.terceraCapa || [];

  // 2) Estado del modal
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);

  const openQuick = (prod) => {
    setSelected(prod);
    setShowModal(true);
  };
  const closeQuick = () => setShowModal(false);

  return (
    <section className="mb-5">
      <h2 className="h3 fw-bold mb-4">Tercera Capa</h2>

      {/* 3) Grid pasando onQuickView */}
      <ProductGrid
        products={productos}
        addToCart={addToCart}
        onQuickView={openQuick}
      />

      {/* 4) Modal conectado */}
      <QuickViewModal
        show={showModal}
        product={selected}
        onAdd={addToCart}
        onClose={closeQuick}
      />
    </section>
  );
}
