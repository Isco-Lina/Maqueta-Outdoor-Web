// src/components/QuickViewModal.jsx
import { useEffect, useRef } from "react";
import Modal from "bootstrap/js/dist/modal"; // ⬅️ ESM: importamos solo el Modal

/**
 * Modal de Vista Rápida
 * - show: boolean para abrir/cerrar
 * - product: { name, img, price, description, modalText? }
 * - onAdd(product): agregar al carrito
 * - onClose(): se dispara al cerrar
 */
export default function QuickViewModal({ show, product, onAdd, onClose }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const el = modalRef.current;
    if (!el) return;

    // Reutiliza si existe, crea si no:
    const instance = Modal.getOrCreateInstance(el, {
      backdrop: true,
      focus: true,
    });

    const handleHidden = () => onClose?.();
    el.addEventListener("hidden.bs.modal", handleHidden);

    // Mostrar / ocultar según "show"
    if (show) instance.show();
    else instance.hide();

    return () => {
      el.removeEventListener("hidden.bs.modal", handleHidden);
      // No dispose si lo vas a reusar mucho; si prefieres limpiar:
      // instance.dispose();
    };
  }, [show, onClose]);

  if (!product) return null;

  const priceCLP =
    product.price?.toLocaleString?.("es-CL", {
      style: "currency",
      currency: "CLP",
      maximumFractionDigits: 0,
    }) ?? `$${product.price}`;

  return (
    <div className="modal fade" tabIndex="-1" ref={modalRef} aria-hidden="true">
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{product.name}</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Cerrar"
            />
          </div>

          <div className="modal-body">
            <div className="row g-4">
              <div className="col-12 col-md-6">
                <div className="ratio ratio-1x1 border rounded">
                  <img
                    src={product.img?.replace?.(/^\/public/, "") || product.img}
                    alt={product.name}
                    style={{ objectFit: "contain" }}
                  />
                </div>
              </div>
              <div className="col-12 col-md-6">
                <p className="text-muted mb-2">{product.description}</p>
                {product.modalText && (
                  <p className="mb-3">{product.modalText}</p>
                )}

                <div className="d-flex align-items-center justify-content-between">
                  <strong className="fs-4">{priceCLP}</strong>
                  <button
                    type="button"
                    className="btn btn-primary rounded-pill"
                    onClick={() => onAdd(product)}
                  >
                    Agregar al carrito
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-secondary rounded-pill"
              data-bs-dismiss="modal"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
