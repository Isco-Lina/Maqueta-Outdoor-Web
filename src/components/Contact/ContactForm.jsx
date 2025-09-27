/**
 * Componente: ContactForm
 * Propósito: Formulario de contacto/envío. Genera un mensaje con el carrito + datos del cliente
 *            y ofrece 3 acciones: WhatsApp, Email o Copiar detalle.
 * Entradas:
 *  - cart: Array<{ id, name, price, qty, variant?, img?, size?, color? }>
 *  - company: { whatsappIntl: "569XXXXXXXX", salesEmail: "ventas@..." }
 * Dependencias:
 *  - buildOrderText: arma el texto base a partir de cart + customer.
 *  - buildWhatsAppURL: devuelve una URL wa.me con message URL-encoded.
 *  - buildMailtoURL: devuelve un mailto con subject y body correctamente codificados.
 * Notas:
 *  - Se normaliza el carrito (numbers) con useMemo.
 *  - El usuario puede añadir "notas" que se insertan antes del pie "— Enviado desde la tienda Web —".
 *  - Los botones no hacen submit del form (type="button").
 */
import { useMemo, useState } from "react";
import {
  buildOrderText, // arma el texto con carrito + datos cliente
  buildWhatsAppURL, // construye URL wa.me con el texto ya encoded
  buildMailtoURL, // construye un mailto con subject y body
} from "../../utils/orderMessage";

export default function ContactForm({ cart = [], company = {} }) {
  // 1) Datos base de la empresa (fallbacks de maqueta si no llegan por props)
  // IMPORTANTE: whatsappIntl sin símbolo "+" y en formato internacional (ej: 56998765432)
  const WHATSAPP_NUMBER = company.whatsappIntl || "56912345678";
  const SALES_EMAIL = company.salesEmail || "ventas@tutienda.cl";

  // 2) Estado controlado del cliente (inputs)
  const [customer, setCustomer] = useState({
    nombre: "",
    telefono: "",
    email: "",
    region: "",
    comuna: "",
    direccion: "",
    metodoContacto: "whatsapp", // solo informativo dentro del texto generado
  });

  // 3) Campo libre de notas
  const [notas, setNotas] = useState("");

  // 4) Normalización del carrito: garantizamos number en price/qty
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

  // 5) Texto base generado a partir de items + customer (sin "notas" aún)
  const { texto } = useMemo(() => {
    return buildOrderText({
      cart: items,
      customer: { ...customer },
      extra: { despachoEstimado: 0 }, // placeholder para cálculo futuro si aplica
    });
  }, [items, customer]);

  // 6) Handler genérico para inputs controlados
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((s) => ({ ...s, [name]: value }));
  };

  // 7) Helpers de estado
  const hasItems = items.length > 0;

  // 8) Inserta "notas" justo antes del pie del mensaje
  //    Mantiene intacto el marcador "— Enviado desde la tienda Web —"
  const buildTextWithNotes = () =>
    texto.replace(
      "— Enviado desde la tienda Web —",
      `${
        notas ? `Notas adicionales: ${notas}\n` : ""
      }— Enviado desde la tienda Web —`
    );

  // 9) Validación mínima antes de disparar acciones
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

  // 10) Acción: abrir chat de WhatsApp con mensaje prellenado
  const handleWhatsApp = () => {
    if (!ensureBasic()) return;
    if (!WHATSAPP_NUMBER) {
      alert("No hay número de WhatsApp configurado.");
      return;
    }
    const url = buildWhatsAppURL({
      phoneIntl: WHATSAPP_NUMBER, // ej: "56987654321"
      message: buildTextWithNotes(),
    });
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // 11) Acción: abrir cliente de correo con subject + body
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
    window.location.href = url;
  };

  return (
    <form className="border rounded-4 p-3">
      <h4 className="mb-3">Datos de contacto y envío</h4>

      {/* 12) Grid de campos (Bootstrap) */}
      <div className="row g-3">
        {/* Nombre */}
        <div className="col-12 col-md-6">
          <label className="form-label">Nombre y Apellido</label>
          <input
            className="form-control"
            name="nombre"
            value={customer.nombre}
            onChange={handleChange}
            placeholder="Juan Pérez"
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
            placeholder="+56 9 98765432"
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

        {/* Preferencia de contacto (se refleja en el texto generado) */}
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

      {/* 13) Acciones (no envían el form) */}
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

      {/* 14) Nota legal/UX de la maqueta */}
      <p className="text-muted small mt-3">
        * Coordinamos por WhatsApp o Email. Envíos a todo Chile por Starken /
        Chilexpress u operador a convenir.
      </p>
    </form>
  );
}
