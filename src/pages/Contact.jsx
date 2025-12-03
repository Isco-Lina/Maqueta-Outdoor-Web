import ContactForm from "../components/Contact/ContactForm.jsx";
import CartDetail from "../components/Carrito/CartDetail.jsx";

export default function Contact({ cart = [], company }) {
  const cartFromLS = (() => {
    try {
      return JSON.parse(localStorage.getItem("cart") || "[]");
    } catch {
      return [];
    }
  })();
  const effectiveCart = Array.isArray(cart) && cart.length ? cart : cartFromLS;
  const COMPANY = {
    nombre: "Outdoor Gear Montalay (Maqueta)",
    whatsappIntl: "56964344326",
    salesEmail: "molina.carrilo1996@gmail.com",
    telefonoFijo: "+56 2 2345 6789",
    horario: "Lun a Vie 10:00–19:00 · Sáb 10:00–14:00",
    ...(company || {}),
  };

  return (
    <section className="container my-5">
      {/* Encabezado */}
      <div className="text-center mb-4">
        <h1 className="mb-2">Contacto y Envíos</h1>
        <p className="lead m-0">
          Hacemos despacho a <strong>todo Chile</strong>. Coordina tu compra por
          WhatsApp o Email.
        </p>
      </div>

      {/* Contenido centrado */}
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8 col-xl-7">
          <ContactForm cart={effectiveCart} company={COMPANY} />
          <CartDetail cart={effectiveCart} />
        </div>
      </div>
    </section>
  );
}
