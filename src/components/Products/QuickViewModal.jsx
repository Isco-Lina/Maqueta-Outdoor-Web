export default function QuickViewModal({ show, product, onAdd, onClose }) {
  if (!show || !product) return null;

  return (
    <>
      {/* Contenedor modal */}
      <div
        className="modal fade show d-block"
        tabIndex="-1"
        role="dialog"
        style={{ background: "rgba(0,0,0,.5)" }}
        aria-modal="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            {/* Header */}
            <div className="modal-header">
              <h5 className="modal-title">{product.name}</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
                aria-label="Close"
              />
            </div>

            {/* Body */}
            <div className="modal-body">
              <img
                src={product.img}
                alt={product.name}
                className="img-fluid rounded mb-3"
                loading="lazy"
              />
              <p className="text-muted">{product.description}</p>

              <div className="fw-bold">
                {product.price?.toLocaleString?.("es-CL", {
                  style: "currency",
                  currency: "CLP",
                  maximumFractionDigits: 0,
                }) ?? `$${product.price}`}
              </div>
            </div>

            {/* Footer */}
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={onClose}>
                Cerrar
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  onAdd?.(product);
                  onClose();
                }}
              >
                Agregar al carrito
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop clickeable para cerrar */}
      <div className="modal-backdrop fade show" onClick={onClose} />
    </>
  );
}
