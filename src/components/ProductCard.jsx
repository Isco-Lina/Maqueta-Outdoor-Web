export default function ProductCard({ product, addToCart, onQuickView }) {
  return (
    <div className="col">
      <article className="card h-100 product-card">
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

        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text small text-muted">{product.description}</p>

          <div className="mt-auto d-flex justify-content-between align-items-center gap-2">
            <strong>
              {product.price?.toLocaleString?.("es-CL", {
                style: "currency",
                currency: "CLP",
                maximumFractionDigits: 0,
              }) ?? `$${product.price}`}
            </strong>

            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm rounded-pill"
                onClick={() => onQuickView?.(product)}
              >
                Ver
              </button>
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
