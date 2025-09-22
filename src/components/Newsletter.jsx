/**
 * Bloque de newsletter simple (para captar correos)
 */
export default function Newsletter() {
  return (
    <section className="my-5">
      <div className="rounded-wek bg-white border p-4 d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
        <div>
          <h3 className="h4 fw-bold m-0">Únete a WEKE Outdoor</h3>
          <p className="text-muted m-0">
            Ofertas, lanzamientos y tips de equipo.
          </p>
        </div>
        <form className="d-flex gap-2 w-100 w-md-auto">
          <input className="form-control" type="email" placeholder="tu@email" />
          <button className="btn wek-btn" type="button">
            Suscribirme
          </button>
        </form>
      </div>
    </section>
  );
}
