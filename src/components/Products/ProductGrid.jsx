import ProductCard from "./ProductCard.jsx";

export default function ProductGrid({ products, addToCart, onQuickView }) {
  if (!products?.length) {
    return (
      <div className="alert alert-warning">
        No se encontraron productos con esos filtros.
      </div>
    );
  }

  return (
    <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3">
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
