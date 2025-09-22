// Panel de resumen del carrito que se muestra a la derecha en /contacto.
// Solo visualiza (no edita): lista ítems, subtotal y un total aprox.

import { memo, useMemo } from "react";
import { CLP } from "../utils/orderMessage";

function ContactCart({ cart = [] }) {
  // useMemo: evita recalcular el mapeo si 'cart' no cambia.
  // Normalizamos cada ítem para asegurarnos de tener números válidos.
  const items = useMemo(
    () =>
      (Array.isArray(cart) ? cart : []).map((it) => ({
        id: it.id, // id único (clave de la lista)
        name: it.name, // nombre del producto
        price: Number(it.price) || 0, // precio unitario en número
        qty: Number(it.qty) || 1, // cantidad (mín. 1)
        variant: it.variant, // variante/talla/color (opcional)
      })),
    [cart]
  );

  // Subtotal: suma de (precio * cantidad) de todos los ítems.
  const subtotal = items.reduce((acc, it) => acc + it.price * it.qty, 0);

  return (
    <aside className="border rounded-4 p-3">
      <h4 className="mb-3">Resumen del carrito</h4>

      {/* Si no hay items, mostramos un mensaje simple */}
      {!items.length ? (
        <p className="text-muted m-0">No tienes productos aún.</p>
      ) : (
        <ul className="list-group list-group-flush">
          {/* Ítem por ítem con su total parcial */}
          {items.map((it) => (
            <li
              key={it.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <div className="fw-semibold">{it.name}</div>
                <small className="text-muted">
                  {/* Cantidad × precio unitario + variante (si existe) */}
                  {it.qty} × {CLP(it.price)}{" "}
                  {it.variant ? (
                    <>
                      · <em>{it.variant}</em>
                    </>
                  ) : null}
                </small>
              </div>
              {/* Total por ítem (precio * cantidad) */}
              <div className="fw-semibold">{CLP(it.price * it.qty)}</div>
            </li>
          ))}

          {/* Resumen numérico al final */}
          <li className="list-group-item d-flex justify-content-between">
            <span>Subtotal</span>
            <strong>{CLP(subtotal)}</strong>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <span>Despacho</span>
            {/* No calculamos despacho aquí: se coordina por WhatsApp/Email */}
            <span className="text-muted">A coordinar</span>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <span>Total aprox</span>
            {/* En esta maqueta mostramos el mismo subtotal como total aprox */}
            <strong>{CLP(subtotal)}</strong>
          </li>
        </ul>
      )}
    </aside>
  );
}

// memo: evita re-render si las props no cambian (optimización liviana)
export default memo(ContactCart);
