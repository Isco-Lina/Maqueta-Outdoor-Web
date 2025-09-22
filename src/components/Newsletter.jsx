/**
 * Newsletter.jsx
 * --------------
 * Bloque simple para captar correos. Es una maqueta (sin backend),
 * así que el botón no envía a ningún lado; sirve como demostración UI.
 * Puedes conectar este form a un servicio real (Mailchimp, Brevo, etc.).
 */

export default function Newsletter() {
  return (
    <section className="my-5">
      {/* Caja con fondo blanco, borde y layout responsive */}
      <div className="rounded-wek bg-white border p-4 d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
        {/* Texto izquierdo: título + descripción */}
        <div>
          <h3 className="h4 fw-bold m-0">Únete a WEKE Outdoor</h3>
          <p className="text-muted m-0">
            Ofertas, lanzamientos y tips de equipo.
          </p>
        </div>

        {/* Formulario (input email + botón). Sin submit real (type="button"). */}
        <form
          className="d-flex gap-2 w-100 w-md-auto"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            className="form-control"
            type="email"
            placeholder="tu@email"
            aria-label="Correo para suscripción"
          />
          <button
            className="btn wek-btn"
            type="button"
            title="(Demostración) Enlazar con servicio de email marketing"
            onClick={() => alert("¡Gracias por suscribirte! (maqueta)")}
          >
            Suscribirme
          </button>
        </form>
      </div>
    </section>
  );
}
