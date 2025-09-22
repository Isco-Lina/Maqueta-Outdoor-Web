import ProductCard from "./ProductCard.jsx";

export default function ProductGrid({ products, addToCart, onQuickView }) {
  return (
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
