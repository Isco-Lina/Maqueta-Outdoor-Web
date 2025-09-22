// ProductCard.jsx
// ---------------
// Tarjeta individual de producto para usar dentro de una grilla.
// Props:
// - product: objeto { id, name, img, price, description, ... }
// - addToCart(product): callback para agregar al carrito
// - onQuickView(product): callback para abrir el modal de "Vista rápida"

export default function ProductCard({ product, addToCart, onQuickView }) {
  return (
    <div className="col">
      <article className="card h-100 product-card">
        {/* Imagen / media del producto; click abre "vista rápida" */}
        <div
          className="product-media"
          onClick={() => onQuickView?.(product)}
          role="button"
        >
          <img
            loading="lazy"
            src={product.img}
            alt={product.name}
            className="product-img"
          />
        </div>

        {/* Cuerpo de la card: nombre, descripción, precio y acciones */}
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text small text-muted">{product.description}</p>

          {/* Pie de la card: precio + botones (ver / agregar) */}
          <div className="mt-auto d-flex justify-content-between align-items-center gap-2">
            {/* Precio en CLP (formateado) con fallback simple */}
            <strong>
              {product.price?.toLocaleString?.("es-CL", {
                style: "currency",
                currency: "CLP",
                maximumFractionDigits: 0,
              }) ?? `$${product.price}`}
            </strong>

            <div className="d-flex gap-2">
              {/* Vista rápida (abre modal) */}
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm rounded-pill"
                onClick={() => onQuickView?.(product)}
              >
                Ver
              </button>

              {/* Agregar al carrito */}
              <button
                type="button"
                className="btn btn-primary btn-sm rounded-pill"
                onClick={() => addToCart(product)}
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
