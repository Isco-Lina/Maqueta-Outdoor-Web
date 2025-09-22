// ProductGrid.jsx
// ---------------
// Grilla responsiva de productos basada en Bootstrap.
// Renderiza una fila con columnas que contienen <ProductCard />.
// Props:
// - products: array de productos
// - addToCart: callback para agregar al carrito
// - onQuickView: callback para abrir "vista rápida"

import ProductCard from "./ProductCard.jsx";

export default function ProductGrid({ products, addToCart, onQuickView }) {
  return (
    // row-cols-X define cuántas columnas por breakpoint
    <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
      {products.map((p) => (
        <ProductCard
          key={p.id}
          product={p}
          addToCart={addToCart}
          onQuickView={onQuickView}
        />
      ))}
    </div>
  );
}
