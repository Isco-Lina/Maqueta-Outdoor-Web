/**
 * Componente: ProductCard
 * Propósito: Tarjeta individual de producto con imagen, nombre, descripción, precio y acciones.
 * Entradas:
 *  - product: { id, name, description, img, price, ... }
 *  - addToCart(product): agrega el producto al carrito
 *  - onQuickView(product): abre modal de vista rápida
 * Notas:
 *  - Usa utilidades Bootstrap y clases personalizadas (product-card/product-img).
 *  - El contenedor de imagen es clickeable para abrir QuickView.
 *  - Ajustado para móviles: el footer hace wrap si no cabe (precio en una fila y botones abajo).
 */
export default function ProductCard({ product, addToCart, onQuickView }) {
  return (
    <div className="col">
      <article className="card h-100 product-card">
        {/* Media: al clicar abre QuickView */}
        <div
          className="product-media"
          onClick={() => onQuickView?.(product)}
          role="button"
          aria-label={`Vista rápida de ${product?.name ?? "producto"}`}
        >
          <img
            loading="lazy"
            src={product.img}
            alt={product.name}
            className="product-img"
          />
        </div>

        {/* Body */}
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text small text-muted">{product.description}</p>

          {/* Footer de la card: precio + acciones */}
          <div className="mt-auto d-flex align-items-center gap-2 flex-wrap">
            {/* Precio: ocupa fila propia si no cabe */}
            <strong className="me-auto">
              {product.price?.toLocaleString?.("es-CL", {
                style: "currency",
                currency: "CLP",
                maximumFractionDigits: 0,
              }) ?? `$${product.price}`}
            </strong>

            {/* Acciones: botones Ver y Agregar */}
            <div className="d-flex gap-2 flex-shrink-0">
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm rounded-pill px-2"
                onClick={() => onQuickView?.(product)}
                aria-label={`Ver rápido ${product.name}`}
              >
                Ver
              </button>

              <button
                type="button"
                className="btn btn-primary btn-sm rounded-pill px-3"
                onClick={() => addToCart(product)}
                aria-label={`Agregar ${product.name} al carrito`}
              >
                Agregar
              </button>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
