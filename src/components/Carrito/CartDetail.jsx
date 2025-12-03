import { useMemo } from "react";

export default function CartDetail({ cart = [] }) {
  const { rows, subtotal, count } = useMemo(() => {
    let subtotal = 0;
    let count = 0;

    const rows = cart.map((p) => {
      const price = Number(p.price) || 0;
      const qty = Number(p.qty) || 1;
      const lineTotal = price * qty;
      subtotal += lineTotal;
      count += qty;
      return { ...p, price, qty, lineTotal };
    });

    return { rows, subtotal, count };
  }, [cart]);

  // Formateador rápido a pesos chilenos sin decimales.
  const clp = (n) =>
    `\$${(Number(n) || 0).toLocaleString("es-CL", {
      maximumFractionDigits: 0,
    })}`;

  return (
    <div className="card mt-3 shadow-sm">
      {/* Header clickable que abre/cierra el detalle (Bootstrap Collapse) */}
      <div
        className="card-header d-flex align-items-center justify-content-between"
        style={{ cursor: "pointer" }}
        data-bs-toggle="collapse"
        data-bs-target="#cartDetailCollapse"
        aria-expanded="true"
        aria-controls="cartDetailCollapse"
      >
        <strong>Detalle del carrito</strong>
        <small className="text-muted">
          {count} {count === 1 ? "item" : "items"} · Subtotal {clp(subtotal)}
        </small>
      </div>

      {/* Contenido colapsable */}
      <div id="cartDetailCollapse" className="collapse show">
        <div className="card-body p-0">
          {rows.length === 0 ? (
            <div className="p-3 text-center text-muted">
              No hay productos en el carrito.
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table align-middle m-0">
                <thead className="table-light">
                  <tr>
                    {/* Columna de imagen compacta */}
                    <th style={{ width: 56 }}></th>
                    <th>Producto</th>
                    <th className="text-center" style={{ width: 90 }}>
                      Cant.
                    </th>
                    <th className="text-end" style={{ width: 120 }}>
                      Precio
                    </th>
                    <th className="text-end" style={{ width: 120 }}>
                      Total
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {rows.map((r) => (
                    <tr key={r.id}>
                      <td>
                        {r.img ? (
                          <img
                            src={r.img}
                            alt={r.name}
                            style={{
                              width: 44,
                              height: 44,
                              objectFit: "cover",
                              borderRadius: 8,
                            }}
                            loading="lazy"
                          />
                        ) : (
                          // Placeholder si no hay imagen
                          <div
                            style={{
                              width: 44,
                              height: 44,
                              borderRadius: 8,
                              background: "#f1f3f5",
                            }}
                            aria-hidden="true"
                          />
                        )}
                      </td>

                      <td>
                        <div className="fw-semibold small">{r.name}</div>

                        {/* Metadata opcional: talla/color */}
                        {(r.size || r.color) && (
                          <div className="text-muted small">
                            {r.size ? `Talla ${r.size}` : ""}
                            {r.size && r.color ? " · " : ""}
                            {r.color || ""}
                          </div>
                        )}
                      </td>

                      <td className="text-center">{r.qty}</td>
                      <td className="text-end">{clp(r.price)}</td>
                      <td className="text-end">{clp(r.lineTotal)}</td>
                    </tr>
                  ))}
                </tbody>

                <tfoot>
                  <tr>
                    <td colSpan={4} className="text-end fw-semibold">
                      Subtotal
                    </td>
                    <td className="text-end fw-semibold">{clp(subtotal)}</td>
                  </tr>
                  <tr>
                    <td colSpan={4} className="text-end">
                      Despacho
                    </td>
                    <td className="text-end text-muted">A coordinar</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
