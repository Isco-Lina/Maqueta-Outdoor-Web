// src/components/ContactCart.jsx
import { memo, useMemo } from "react";
import { CLP } from "../utils/orderMessage";

function ContactCart({ cart = [] }) {
  const items = useMemo(
    () =>
      (Array.isArray(cart) ? cart : []).map((it) => ({
        id: it.id,
        name: it.name,
        price: Number(it.price) || 0,
        qty: Number(it.qty) || 1,
        variant: it.variant,
      })),
    [cart]
  );

  const subtotal = items.reduce((acc, it) => acc + it.price * it.qty, 0);

  return (
    <aside className="border rounded-4 p-3">
      <h4 className="mb-3">Resumen del carrito</h4>

      {!items.length ? (
        <p className="text-muted m-0">No tienes productos aún.</p>
      ) : (
        <ul className="list-group list-group-flush">
          {items.map((it) => (
            <li
              key={it.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <div className="fw-semibold">{it.name}</div>
                <small className="text-muted">
                  {it.qty} × {CLP(it.price)}{" "}
                  {it.variant ? (
                    <>
                      · <em>{it.variant}</em>
                    </>
                  ) : null}
                </small>
              </div>
              <div className="fw-semibold">{CLP(it.price * it.qty)}</div>
            </li>
          ))}
          <li className="list-group-item d-flex justify-content-between">
            <span>Subtotal</span>
            <strong>{CLP(subtotal)}</strong>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <span>Despacho</span>
            <span className="text-muted">A coordinar</span>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <span>Total aprox</span>
            <strong>{CLP(subtotal)}</strong>
          </li>
        </ul>
      )}
    </aside>
  );
}

export default memo(ContactCart);
