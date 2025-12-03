import { useMemo, useState } from "react";
import {
  buildOrderText, 
  buildWhatsAppURL, 
  buildMailtoURL, 
} from "../../utils/orderMessage";

export default function ContactForm({ cart = [], company = {} }) {
  const WHATSAPP_NUMBER = company.whatsappIntl || "56912345678";
  const SALES_EMAIL = company.salesEmail || "ventas@tutienda.cl";

  const [customer, setCustomer] = useState({
    nombre: "",
    telefono: "",
    email: "",
    region: "",
    comuna: "",
    direccion: "",
    metodoContacto: "whatsapp", 
  });

  const [notas, setNotas] = useState("");

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

  const { texto } = useMemo(() => {
    return buildOrderText({
      cart: items,
      customer: { ...customer },
      extra: { despachoEstimado: 0 },
    });
  }, [items, customer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((s) => ({ ...s, [name]: value }));
  };

  const hasItems = items.length > 0;

  const buildTextWithNotes = () =>
    texto.replace(
      "— Enviado desde la tienda Web —",
      `${
        notas ? `Notas adicionales: ${notas}\n` : ""
      }— Enviado desde la tienda Web —`
    );

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

  const handleWhatsApp = () => {
    if (!ensureBasic()) return;
    if (!WHATSAPP_NUMBER) {
      alert("No hay número de WhatsApp configurado.");
      return;
    }
    const url = buildWhatsAppURL({
      phoneIntl: WHATSAPP_NUMBER,
      message: buildTextWithNotes(),
    });
    window.open(url, "_blank", "noopener,noreferrer");
  };

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

        {/* Preferencia de contacto */}
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

      <p className="text-muted small mt-3">
        * Coordinamos por WhatsApp o Email. Envíos a todo Chile por Starken /
        Chilexpress u operador a convenir.
      </p>
    </form>
  );
}
