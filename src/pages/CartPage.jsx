import { useEffect, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function CartPage({ cart, setQty, removeFromCart, clearCart }) {
  const navigate = useNavigate();

  const items = useMemo(
    () =>
      (Array.isArray(cart) ? cart : []).map((i) => ({
        ...i,
        price: Number(i.price) || 0, 
        qty: Number(i.qty) || 1, 
      })),
    [cart]
  );

  const total = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.qty, 0),
    [items]
  );

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(items));
    } catch {
    }
  }, [items]);

  const dec = (id, current) => setQty(id, Math.max(1, Number(current) - 1));
  const inc = (id, current) => setQty(id, Number(current) + 1);

  const goContact = () => {
    if (!items.length) {
      alert("Tu carrito está vacío.");
      return;
    }
    navigate("/contacto");
  };

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

  return (
    <section className="container my-5">
      <h1 className="mb-3">Carrito</h1>

      <ul className="list-group cart-list mb-3">
        {items.map((item) => (
          <li
            className="list-group-item d-flex align-items-center gap-3"
            key={item.id}
          >
            <img
              src={item.img}
              alt={item.name}
              width="64"
              height="64"
              style={{ objectFit: "cover" }}
            />

            <div className="me-auto">
              <div className="fw-semibold">{item.name}</div>
              <div className="text-muted">
                ${item.price.toLocaleString("es-CL")}
              </div>
            </div>

            <div className="cart-stepper d-flex align-items-center gap-2">
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

            <button
              className="btn btn-outline-danger cart-remove"
              onClick={() => removeFromCart(item.id)}
            >
              Quitar
            </button>
          </li>
        ))}
      </ul>

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
