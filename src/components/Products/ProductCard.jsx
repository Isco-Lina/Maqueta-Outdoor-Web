export default function ProductCard({ product, addToCart, onQuickView }) {
  return (
    <div className="col">
      <article className="card h-100 product-card">
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

        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text small text-muted">{product.description}</p>

          <div className="mt-auto d-flex align-items-center gap-2 flex-wrap">
            <strong className="me-auto">
              {product.price?.toLocaleString?.("es-CL", {
                style: "currency",
                currency: "CLP",
                maximumFractionDigits: 0,
              }) ?? `$${product.price}`}
            </strong>

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
