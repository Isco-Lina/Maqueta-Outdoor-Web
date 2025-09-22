import { useState } from "react";
import productsData from "../../data/products.js";
import ProductGrid from "../../components/ProductGrid.jsx";
import QuickViewModal from "../../components/QuickViewModal.jsx";

export default function Infantil({ addToCart }) {
  // Lista específica de "infantil"
  const productos = productsData.infantil || [];

  // Estado del modal
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);

  const openQuick = (prod) => {
    setSelected(prod);
    setShowModal(true);
  };
  const closeQuick = () => setShowModal(false);

  return (
    <section className="mb-5">
      <h2 className="h3 fw-bold mb-4">Línea Infantil</h2>

      <ProductGrid
        products={productos}
        addToCart={addToCart}
        onQuickView={openQuick}
      />

      <QuickViewModal
        show={showModal}
        product={selected}
        onAdd={addToCart}
        onClose={closeQuick}
      />
    </section>
  );
}
