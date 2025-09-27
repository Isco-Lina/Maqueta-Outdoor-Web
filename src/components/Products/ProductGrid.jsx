/**
 * Componente: ProductGrid
 * Propósito: Grilla responsiva que renderiza ProductCard por producto.
 * Entradas:
 *  - products: Array de productos normalizados (id, name, price, img, etc.)
 *  - addToCart(product)
 *  - onQuickView(product) (opcional)
 * Notas:
 *  - Usa utilidades de Bootstrap para columnas responsivas.
 *  - Muestra alerta si no hay resultados con los filtros actuales.
 */
import ProductCard from "./ProductCard.jsx";

export default function ProductGrid({ products, addToCart, onQuickView }) {
  // Estado vacío: no hay productos que coincidan con los filtros
  if (!products?.length) {
    return (
      <div className="alert alert-warning">
        No se encontraron productos con esos filtros.
      </div>
    );
  }

  // Grilla responsiva 2/3/4 columnas según el breakpoint
  return (
    <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3">
      {products.map((p) => (
        <ProductCard
          key={p.id} // id debería ser único y estable
          product={p}
          addToCart={addToCart}
          onQuickView={onQuickView}
        />
      ))}
    </div>
  );
}
