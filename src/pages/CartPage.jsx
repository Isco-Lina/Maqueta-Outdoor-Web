// Página del carrito. Muestra items, permite cambiar cantidad y quitar.
// Incluye botón "Coordinar despacho" que lleva a /contacto.
// Además, sincroniza el carrito en localStorage para que Contact.jsx pueda leerlo.

import { useEffect, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function CartPage({ cart, setQty, removeFromCart, clearCart }) {
  const navigate = useNavigate();

  // Normaliza items (asegura números) y memoiza para no recalcular en cada render
  const items = useMemo(
    () =>
      (Array.isArray(cart) ? cart : []).map((i) => ({
        ...i,
        price: Number(i.price) || 0, // precio numérico
        qty: Number(i.qty) || 1, // cantidad mínima = 1
      })),
    [cart]
  );

  // Total del carrito (precio * cantidad)
  const total = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.qty, 0),
    [items]
  );

  // Efecto: guarda el carrito en localStorage para que /contacto lo recupere
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(items));
    } catch {
      // ignoramos errores de localStorage
    }
  }, [items]);

  // Helpers para sumar/restar cantidad con mínimo 1
  const dec = (id, current) => setQty(id, Math.max(1, Number(current) - 1));
  const inc = (id, current) => setQty(id, Number(current) + 1);

  // CTA que navega a la página de contacto
  const goContact = () => {
    if (!items.length) {
      alert("Tu carrito está vacío.");
      return;
    }
    navigate("/contacto");
  };

  // Estado vacío: muestra CTA para ir a productos
  if (!items.length) {
    return (
      <section className="container my-5">
        <h1 className="mb-3">Tu carrito está vacío</h1>
        <Link className="btn btn-primary" to="/productos">
          Ir a productos
        </Link>
      </section>
    );
  }

  // Render principal: lista de ítems + pie con total y acciones
  return (
    <section className="container my-5">
      <h1 className="mb-3">Carrito</h1>

      <ul className="list-group mb-3">
        {items.map((item) => (
          <li
            className="list-group-item d-flex align-items-center gap-3"
            key={item.id}
          >
            {/* Miniatura */}
            <img
              src={item.img}
              alt={item.name}
              width="64"
              height="64"
              style={{ objectFit: "cover" }}
            />

            {/* Nombre + precio unitario */}
            <div className="me-auto">
              <div className="fw-semibold">{item.name}</div>
              <div className="text-muted">
                ${item.price.toLocaleString("es-CL")}
              </div>
            </div>

            {/* Stepper de cantidad (±) */}
            <div className="d-flex align-items-center gap-2">
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm rounded-circle"
                aria-label={`Disminuir cantidad de ${item.name}`}
                onClick={() => dec(item.id, item.qty)}
                disabled={item.qty <= 1}
              >
                −
              </button>
              <span
                className="px-2 text-center"
                style={{ minWidth: 24, fontWeight: 600 }}
                aria-live="polite"
              >
                {item.qty}
              </span>
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm rounded-circle"
                aria-label={`Aumentar cantidad de ${item.name}`}
                onClick={() => inc(item.id, item.qty)}
              >
                +
              </button>
            </div>

            {/* Quitar ítem */}
            <button
              className="btn btn-outline-danger"
              onClick={() => removeFromCart(item.id)}
            >
              Quitar
            </button>
          </li>
        ))}
      </ul>

      {/* Pie: limpiar carrito, total y CTA para coordinar despacho */}
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
        <button className="btn btn-outline-secondary" onClick={clearCart}>
          Vaciar carrito
        </button>

        <div className="d-flex align-items-center gap-3">
          <h4 className="m-0">Total: ${total.toLocaleString("es-CL")}</h4>
          <button
            type="button"
            className="btn btn-success btn-lg"
            onClick={goContact}
            title="Completa tus datos y coordina el despacho por WhatsApp o Email"
          >
            Coordinar despacho
          </button>
        </div>
      </div>
    </section>
  );
}
