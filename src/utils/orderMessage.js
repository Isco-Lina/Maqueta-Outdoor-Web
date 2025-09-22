// Helpers para formatear CLP y construir el mensaje de pedido
// que se envía por WhatsApp/Email desde la página de Contacto.

export const CLP = (n = 0) =>
  new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(n) ? n : 0);

// Arma el texto final del pedido (carrito + datos del cliente)
export function buildOrderText({ cart = [], customer = {}, extra = {} }) {
  const {
    nombre = "",
    email = "",
    telefono = "",
    region = "",
    comuna = "",
    direccion = "",
    notas = "",
    metodoContacto = "whatsapp",
  } = customer;

  const subtotal = cart.reduce(
    (acc, it) => acc + (Number(it.price) || 0) * (Number(it.qty) || 1),
    0
  );
  const despacho = extra.despachoEstimado ?? 0; // informativo
  const total = subtotal + despacho;

  const items = cart.map((it, i) => {
    const line = `${i + 1}. ${it.name} x${it.qty || 1} — ${CLP(it.price)} c/u`;
    return it.variant ? `${line} (Variante: ${it.variant})` : line;
  });

  const texto = [
    "Hola Mucho gusto! Me encantaria coordinar mi pedido!",
    "",
    "Detalles del Pedido",
    items.length ? items.join("\n") : "— (sin ítems)",
    "",
    `Subtotal: ${CLP(subtotal)}`,
    `Despacho (a confirmar): ${despacho ? CLP(despacho) : "—"}`,
    `Total aprox: ${CLP(total)}`,
    "",
    "📍 *Datos de contacto y envío*",
    `Nombre: ${nombre || "—"}`,
    `Teléfono: ${telefono || "—"}`,
    `Email: ${email || "—"}`,
    `Región: ${region || "—"}`,
    `Comuna: ${comuna || "—"}`,
    `Dirección: ${direccion || "—"}`,
    notas ? `Notas: ${notas}` : null,
    "",
    `Preferencia de contacto: ${metodoContacto}`,
    "",
    "— Enviado desde la web (maqueta) —",
  ]
    .filter(Boolean)
    .join("\n");

  return { texto, subtotal, despacho, total };
}

// Construye URL "wa.me" con número en formato internacional (sin '+')
export function buildWhatsAppURL({ phoneIntl = "", message = "" }) {
  const base = `https://wa.me/${String(phoneIntl).replace(/\D/g, "")}`;
  const params = `?text=${encodeURIComponent(message)}`;
  return `${base}${params}`;
}

// Construye un mailto con subject y body URL-encoded
export function buildMailtoURL({ to = "", subject = "", body = "" }) {
  const params = new URLSearchParams({ subject, body });
  return `mailto:${to}?${params.toString()}`;
}
