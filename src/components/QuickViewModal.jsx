// Modal de vista rápida usando el componente Modal de Bootstrap (ESM).
// NOTA: para que funcione, debes tener Bootstrap JS disponible (Vite lo empaqueta al importar).
//
// Props:
// - show (bool): controla apertura/cierre desde el padre
// - product (obj): producto actual a mostrar
// - onAdd(product): agregar al carrito
// - onClose(): callback al cerrar el modal (sin agregar)
//
// Funcionamiento:
// - Se obtiene/crea una instancia de Modal con `Modal.getOrCreateInstance`.
// - Cuando `show` cambia a true => instance.show(); si false => instance.hide().
// - Se escucha el evento "hidden.bs.modal" para llamar a onClose.

import { useEffect, useRef } from "react";
import Modal from "bootstrap/js/dist/modal"; // ⬅️ Import ESM del componente Modal

export default function QuickViewModal({ show, product, onAdd, onClose }) {
  // Referencia al nodo del modal en el DOM
  const modalRef = useRef(null);

  useEffect(() => {
    const el = modalRef.current;
    if (!el) return;

    // Crea o reutiliza instancia de Modal para este elemento
    const instance = Modal.getOrCreateInstance(el, {
      backdrop: true, // fondo oscuro clickeable
      focus: true, // enfoca contenido al abrir
    });

    // Cuando el modal termina de ocultarse (animación), avisamos al padre
    const handleHidden = () => onClose?.();
    el.addEventListener("hidden.bs.modal", handleHidden);

    // Abre/cierra según la prop "show"
    if (show) instance.show();
    else instance.hide();

    // Limpieza: remover listener (no dispose para reuso, opcional)
    return () => {
      el.removeEventListener("hidden.bs.modal", handleHidden);
      // instance.dispose(); // <- si quieres destruir la instancia al desmontar
    };
  }, [show, onClose]);

  // Si no hay producto, no renderizamos nada (evita flash)
  if (!product) return null;

  // Precio formateado CLP (fallback simple si no está Intl disponible)
  const priceCLP =
    product.price?.toLocaleString?.("es-CL", {
      style: "currency",
      currency: "CLP",
      maximumFractionDigits: 0,
    }) ?? `$${product.price}`;

  return (
    // Estructura estándar de modal Bootstrap.
    // El ref conecta este nodo con la instancia Modal de arriba.
    <div className="modal fade" tabIndex="-1" ref={modalRef} aria-hidden="true">
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          {/* Header del modal */}
          <div className="modal-header">
            <h5 className="modal-title">{product.name}</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Cerrar"
            />
          </div>

          {/* Cuerpo del modal: imagen + detalle */}
          <div className="modal-body">
            <div className="row g-4">
              {/* Imagen del producto */}
              <div className="col-12 col-md-6">
                <div className="ratio ratio-1x1 border rounded">
                  <img
                    // Si la ruta viene con "/public", la limpiamos por si acaso
                    src={product.img?.replace?.(/^\/public/, "") || product.img}
                    alt={product.name}
                    style={{ objectFit: "contain" }}
                  />
                </div>
              </div>

              {/* Descripción y CTA */}
              <div className="col-12 col-md-6">
                <p className="text-muted mb-2">{product.description}</p>

                {/* Texto extra opcional (si el producto lo define) */}
                {product.modalText && (
                  <p className="mb-3">{product.modalText}</p>
                )}

                {/* Precio + botón Agregar */}
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

          {/* Footer con botón "Cerrar" (usa data-bs-dismiss) */}
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
