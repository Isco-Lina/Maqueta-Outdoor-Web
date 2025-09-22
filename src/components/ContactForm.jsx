// Formulario de contacto + envío (columna central en /contacto).
// Construye un mensaje con detalle del carrito + datos del cliente y
// ofrece 3 acciones: enviar por WhatsApp, enviar por Email o copiar detalle.

import { useMemo, useState } from "react";
import {
  buildOrderText, // arma el texto con carrito + datos cliente
  buildWhatsAppURL, // construye URL wa.me con el texto ya encoded
  buildMailtoURL, // construye un mailto con subject y body
} from "../utils/orderMessage";

export default function ContactForm({ cart = [], company = {} }) {
  // Datos de contacto de la empresa.
  // Si no vienen por props, usamos valores "demo" (maqueta).
  // IMPORTANTE: 'whatsappIntl' debe estar en formato internacional sin '+', ej: 569XXXXXXXX
  const WHATSAPP_NUMBER = company.whatsappIntl || "56912345678";
  const SALES_EMAIL = company.salesEmail || "ventas@tutienda.cl";

  // Estado del cliente (inputs del formulario)
  const [customer, setCustomer] = useState({
    nombre: "",
    telefono: "",
    email: "",
    region: "",
    comuna: "",
    direccion: "",
    metodoContacto: "whatsapp", // whatsapp | email (solo informativo en el texto)
  });

  // Notas adicionales (campo libre)
  const [notas, setNotas] = useState("");

  // Normalizamos el carrito para asegurar que todo sea número/cadena segura
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

  // Mensaje base que se generará con 'orderMessage' (sin notas aún).
  // Se recalcula cuando cambian items o datos del cliente.
  const { texto } = useMemo(() => {
    return buildOrderText({
      cart: items,
      customer: { ...customer },
      extra: { despachoEstimado: 0 }, // aquí podrías estimar si quisieras
    });
  }, [items, customer]);

  // Maneja cambios en inputs controlados: actualiza estado del cliente.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((s) => ({ ...s, [name]: value }));
  };

  // Hay productos en el carrito?
  const hasItems = items.length > 0;

  // Integra "notas" dentro del texto final reemplazando el marcador.
  // OJO: mantenemos el texto EXACTO que estás usando: "— Enviado desde la tienda Web —"
  const buildTextWithNotes = () =>
    texto.replace(
      "— Enviado desde la tienda Web —",
      `${
        notas ? `Notas adicionales: ${notas}\n` : ""
      }— Enviado desde la tienda Web —`
    );

  // Validaciones mínimas antes de enviar
  const ensureBasic = () => {
    if (!hasItems) {
      alert("Tu carrito está vacío.");
      return false;
    }
    if (!customer.nombre) {
      alert("Por favor, ingresa tu nombre.");
      return false;
    }
    return true;
  };

  // Acción: abre un wa.me con el detalle del pedido (nueva pestaña)
  const handleWhatsApp = () => {
    if (!ensureBasic()) return;
    if (!WHATSAPP_NUMBER) {
      alert("No hay número de WhatsApp configurado.");
      return;
    }
    const url = buildWhatsAppURL({
      phoneIntl: WHATSAPP_NUMBER, // ej: "56987654321"
      message: buildTextWithNotes(), // texto final con notas
    });
    console.log("WA URL =>", url);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // Acción: abre cliente de correo con mailto y el cuerpo del pedido
  const handleEmail = () => {
    if (!ensureBasic()) return;
    if (!SALES_EMAIL) {
      alert("No hay correo de ventas configurado.");
      return;
    }
    const subject = "Solicitud de compra - Tienda Outdoor (maqueta)";
    const url = buildMailtoURL({
      to: SALES_EMAIL,
      subject,
      body: buildTextWithNotes(),
    });
    console.log("MAILTO =>", url);
    window.location.href = url; // dispara el cliente de correo
  };

  return (
    <form className="border rounded-4 p-3">
      <h4 className="mb-3">Datos de contacto y envío</h4>

      {/* Grid de inputs con Bootstrap */}
      <div className="row g-3">
        {/* Nombre */}
        <div className="col-12 col-md-6">
          <label className="form-label">Nombre y Apellido</label>
          <input
            className="form-control"
            name="nombre"
            value={customer.nombre}
            onChange={handleChange}
            placeholder="Pedro Lopez"
            required
          />
        </div>

        {/* Teléfono */}
        <div className="col-12 col-md-6">
          <label className="form-label">Teléfono (WhatsApp)</label>
          <input
            className="form-control"
            name="telefono"
            value={customer.telefono}
            onChange={handleChange}
            placeholder="+56 9 ..."
          />
        </div>

        {/* Email */}
        <div className="col-12 col-md-6">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={customer.email}
            onChange={handleChange}
            placeholder="tu@correo.cl"
          />
        </div>

        {/* Región */}
        <div className="col-12 col-md-6">
          <label className="form-label">Región</label>
          <input
            className="form-control"
            name="region"
            value={customer.region}
            onChange={handleChange}
            placeholder="Ej: Maule"
          />
        </div>

        {/* Comuna */}
        <div className="col-12 col-md-6">
          <label className="form-label">Comuna</label>
          <input
            className="form-control"
            name="comuna"
            value={customer.comuna}
            onChange={handleChange}
            placeholder="Ej: Talca"
          />
        </div>

        {/* Dirección */}
        <div className="col-12">
          <label className="form-label">Dirección</label>
          <input
            className="form-control"
            name="direccion"
            value={customer.direccion}
            onChange={handleChange}
            placeholder="Calle, número, depto"
          />
        </div>

        {/* Notas adicionales */}
        <div className="col-12">
          <label className="form-label">Notas adicionales</label>
          <textarea
            className="form-control"
            rows={3}
            value={notas}
            onChange={(e) => setNotas(e.target.value)}
            placeholder="Talla, color, referencias de entrega, etc."
          />
        </div>

        {/* Preferencia de contacto (solo para mostrar en el texto) */}
        <div className="col-12">
          <label className="form-label">Preferencia de contacto</label>
          <div className="d-flex gap-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                id="m1"
                name="metodoContacto"
                value="whatsapp"
                checked={customer.metodoContacto === "whatsapp"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="m1">
                WhatsApp
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                id="m2"
                name="metodoContacto"
                value="email"
                checked={customer.metodoContacto === "email"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="m2">
                Email
              </label>
            </div>
          </div>
        </div>
      </div>

      <hr className="my-4" />

      {/* Botones de acción: NO hacen submit del form, son botones "button" */}
      <div className="d-flex flex-wrap gap-2">
        <button
          type="button"
          className="btn btn-success"
          onClick={handleWhatsApp}
        >
          Enviar por WhatsApp
        </button>

        <button type="button" className="btn btn-primary" onClick={handleEmail}>
          Enviar por Email
        </button>

        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => {
            navigator.clipboard?.writeText(buildTextWithNotes());
            alert("Detalle copiado al portapapeles.");
          }}
        >
          Copiar detalle
        </button>
      </div>

      {/* Nota legal/UX de la maqueta */}
      <p className="text-muted small mt-3">
        * Maqueta. Coordinamos por WhatsApp o Email. Envíos a todo Chile por
        Starken / Chilexpress u operador a convenir.
      </p>
    </form>
  );
}
