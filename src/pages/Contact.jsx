// Página de contacto y envíos con layout de 3 columnas:
// IZQ: info empresa/sucursales/cobertura
// CENTRO: formulario de contacto (ContactForm)
// DER: resumen del carrito (ContactCart)
//
// Nota: si llegas directo a /contacto (sin pasar por carrito),
// tomamos el carrito desde localStorage (guardado por CartPage).

import ContactForm from "../components/ContactForm.jsx";
import ContactCart from "../components/ContactCart.jsx";

export default function Contact({ cart = [], company }) {
  // 1) Carrito: preferimos prop `cart`; si viene vacío, leemos localStorage
  const cartFromLS = (() => {
    try {
      return JSON.parse(localStorage.getItem("cart") || "[]");
    } catch {
      return [];
    }
  })();

  const effectiveCart = Array.isArray(cart) && cart.length ? cart : cartFromLS;

  // 2) Datos base de la empresa (se pueden sobreescribir vía prop `company`)
  const COMPANY = {
    nombre: "Outdoor Gear Montalay (Maqueta)",
    whatsappIntl: "56964344326", // formato internacional sin '+'
    salesEmail: "molina.carrilo1996@gmail.com",
    telefonoFijo: "+56 2 2345 6789",
    horario: "Lun a Vie 10:00–19:00 · Sáb 10:00–14:00",
    sucursales: [
      {
        nombre: "Casa Matriz - Santiago",
        direccion: "Av. Andrés Bello 1234, Providencia, RM",
        telefono: "+56 9 1111 1111",
      },
      {
        nombre: "Sucursal Valparaíso",
        direccion: "Av. España 567, Valparaíso, V Región",
        telefono: "+56 9 2222 2222",
      },
    ],
    ...(company || {}), // merge con overrides si llegan por props
  };

  return (
    <section className="container my-5">
      <div className="row g-4 align-items-start">
        {/* Encabezado de página */}
        <div className="col-12">
          <h1 className="mb-2">Contacto y Envíos</h1>
          <p className="lead">
            Hacemos despacho a <strong>todo Chile</strong>. Coordina tu compra
            por WhatsApp o Email.
          </p>
        </div>

        {/* Columna izquierda: info de empresa, sucursales, cobertura */}
        <div className="col-12 col-lg-3">
          <div className="border rounded-4 p-3 mb-4">
            <h4 className="mb-3">{COMPANY.nombre}</h4>
            <p className="mb-1">
              <strong>Teléfono:</strong> {COMPANY.telefonoFijo}
            </p>
            <p className="mb-1">
              <strong>WhatsApp ventas:</strong> +{COMPANY.whatsappIntl}
            </p>
            <p className="mb-1">
              <strong>Correo electrónico:</strong> {COMPANY.salesEmail}
            </p>
            <p className="mb-1">
              <strong>Horario:</strong> {COMPANY.horario}
            </p>
          </div>

          <div className="border rounded-4 p-3 mb-4">
            <h5 className="mb-3">Sucursales</h5>
            <ul className="list-unstyled m-0">
              {COMPANY.sucursales.map((s) => (
                <li key={s.nombre} className="mb-3">
                  <div className="fw-semibold">{s.nombre}</div>
                  <div className="text-muted">{s.direccion}</div>
                  <div className="small">{s.telefono}</div>
                </li>
              ))}
            </ul>
          </div>

          <div className="border rounded-4 p-3">
            <h5 className="mb-3">Cobertura & Envíos</h5>
            <ul className="small text-muted mb-0">
              <li>
                Despacho a domicilio a todo Chile vía Starken / Chilexpress /
                Bluexpress.
              </li>
              <li>Retiro en sucursal (por pagar) disponible.</li>
              <li>Preparación: 24–48h hábiles.</li>
              <li>RM: 1–3 días hábiles · Regiones: 2–6 días hábiles.</li>
              <li>Seguimiento con número de envío.</li>
            </ul>
          </div>
        </div>

        {/* Columna central: formulario con acciones (WA / Email / Copiar) */}
        <div className="col-12 col-lg-6">
          <ContactForm cart={effectiveCart} company={COMPANY} />
        </div>

        {/* Columna derecha: resumen del carrito (solo lectura) */}
        <div className="col-12 col-lg-3">
          <ContactCart cart={effectiveCart} />
        </div>

        {/* Mapa embebido (opcional) */}
        <div className="col-12">
          <div className="border rounded-4 overflow-hidden">
            <iframe
              title="Mapa tienda"
              src="https://www.google.com/maps?q=Av.+Andr%C3%A9s+Bello+1234,+Providencia,+Chile&output=embed"
              width="100%"
              height="300"
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
