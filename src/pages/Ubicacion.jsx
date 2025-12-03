import "../styles/ubicacion.css";

export default function Ubicacion({ cart = [], company }) {
  const cartFromLS = (() => {
    try {
      return JSON.parse(localStorage.getItem("weke-cart") || "[]");
    } catch {
      return [];
    }
  })();
  const effectiveCart = Array.isArray(cart) && cart.length ? cart : cartFromLS;

  const COMPANY = {
    nombre: "Outdoor Gear Montalay (Maqueta)",
    whatsappIntl: "56964344326", // sin "+"
    salesEmail: "outdoorgear@gmail.com",
    telefonoFijo: "+56 2 2345 6789",
    horario: "Lun a Vie 10:00–19:00 · Sáb 10:00–14:00",
    sucursales: [
      {
        nombre: "Casa Matriz - Santiago",
        direccion: "Av. Andrés Bello 1234, Providencia, RM",
        telefono: "+56 9 1111 1111",
      },
    ],
    ...(company || {}),
  };

  return (
    <section className="container my-5 ubicacion-page">
      <header className="mb-4">
        <h1 className="m-0">Ubicación y Cobertura</h1>
        <p className="text-muted m-0">
          Encuéntranos en nuestra casa matriz y revisa cómo despachamos a todo
          Chile.
        </p>
      </header>

      <div className="row g-4">
        {/* Sucursal */}
        <div className="col-12 col-lg-6">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Sucursal</h5>
              {COMPANY.sucursales.map((s) => (
                <div key={s.nombre} className="mb-3">
                  <div className="fw-semibold">{s.nombre}</div>
                  <div className="text-muted">{s.direccion}</div>
                  <div className="mt-1">
                    <a
                      className="link-body-emphasis"
                      href={`tel:${s.telefono.replace(/\s+/g, "")}`}
                    >
                      {s.telefono}
                    </a>
                  </div>
                </div>
              ))}

              <hr className="my-3" />

              {/* Contacto empresa */}
              <h6 className="subtitle mt-2">Outdoor Gear Montalay</h6>
              <ul className="list-unstyled m-0 small contact-list">
                <li>
                  Teléfono:{" "}
                  <a href={`tel:${COMPANY.telefonoFijo.replace(/\s+/g, "")}`}>
                    {COMPANY.telefonoFijo}
                  </a>
                </li>
                <li>
                  WhatsApp ventas:{" "}
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={`https://wa.me/${COMPANY.whatsappIntl}`}
                  >
                    +{COMPANY.whatsappIntl}
                  </a>
                </li>
                <li>
                  Correo:{" "}
                  <a href={`mailto:${COMPANY.salesEmail}`}>
                    {COMPANY.salesEmail}
                  </a>
                </li>
                <li>Horario: {COMPANY.horario}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Cobertura & Envíos */}
        <div className="col-12 col-lg-6">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Cobertura y Envíos</h5>
              <ul className="m-0 p-0 bullet-list">
                <li>
                  Despacho a domicilio a todo Chile vía{" "}
                  <strong>Starken / Chilexpress / Bluexpress</strong>.
                </li>
                <li>Retiro en sucursal (por pagar) disponible.</li>
                <li>
                  Preparación: <strong>24–48h hábiles</strong>.
                </li>
                <li>
                  <strong>RM:</strong> 1–3 días hábiles &nbsp;·&nbsp;{" "}
                  <strong>Regiones:</strong> 2–6 días hábiles.
                </li>
                <li>Seguimiento con número de envío.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Mapa embebido */}
        <div className="col-12">
          <div className="border rounded-4 overflow-hidden">
            <iframe
              title="Mapa tienda"
              src="https://www.google.com/maps?q=Av.+Andr%C3%A9s+Bello+1234,+Providencia,+Chile&output=embed"
              width="100%"
              height="320"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Preguntas frecuentes */}
        <div className="col-12">
          <div className="border rounded-4 p-3">
            <h5 className="mb-3">Preguntas frecuentes</h5>

            <details className="mb-2">
              <summary className="fw-semibold">
                ¿Cuánto cuesta el envío?
              </summary>
              <div className="text-muted">
                Depende de peso/volumen y destino. Lo confirmamos por WhatsApp o
                Email antes de cerrar el pedido.
              </div>
            </details>

            <details className="mb-2">
              <summary className="fw-semibold">
                ¿Qué medios de pago aceptan?
              </summary>
              <div className="text-muted">
                Te enviaremos link de pago o datos para transferencia.
              </div>
            </details>

            <details className="mb-2">
              <summary className="fw-semibold">
                ¿Puedo retirar en tienda?
              </summary>
              <div className="text-muted">
                Sí, coordinamos día y hora en la sucursal que prefieras.
              </div>
            </details>
          </div>
        </div>
      </div>
    </section>
  );
}
