/**
 * Filters.jsx
 * ----------
 * Panel de filtros para la página de Productos.
 * Controla:
 *  - categoría (infantil/primera/segunda/tercera/accesorios)
 *  - rango de precio (min/max)
 *  - palabra clave (nombre/marca/categoría)
 *  - ordenamiento (relevancia, precio, nombre)
 *  - aud (hombre/mujer/infantil) → llega por query string; no se muestra en la UI.
 *
 * Este componente es "controlado por sí mismo" y reporta cambios al padre
 * mediante onChange({...}).
 */

import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function Filters({ onChange, current }) {
  const [params] = useSearchParams();

  // Leemos valores iniciales desde la URL (p. ej., /productos?cat=accesorios&aud=hombre)
  const initialCat = params.get("cat") ?? "all";
  const initialAud = params.get("aud") ?? "all";

  // Estado local (si 'current' viene del padre, lo usamos como fallback)
  const [cat, setCat] = useState(current?.cat ?? initialCat);
  const [min, setMin] = useState(current?.min ?? "");
  const [max, setMax] = useState(current?.max ?? "");
  const [keyword, setKeyword] = useState(current?.keyword ?? "");
  const [sortBy, setSortBy] = useState(current?.sortBy ?? "relevance");
  const [aud] = useState(current?.aud ?? initialAud); // sin UI; solo via query

  // Efecto: cada vez que cambia algo, avisamos al padre con todos los valores normalizados
  useEffect(() => {
    onChange({
      cat, // 'all' o slug de categoría
      min: Number(min) || 0, // número (0 si vacío)
      max: Number(max) || Infinity, // número (Infinity si vacío)
      keyword, // texto de búsqueda
      sortBy, // criterio de orden
      aud, // audiencia (hombre/mujer/infantil)
    });
  }, [cat, min, max, keyword, sortBy, aud, onChange]);

  return (
    <div className="wek-filters bg-white border rounded-wek p-3 mb-3">
      <div className="row g-3">
        {/* Categoría */}
        <div className="col-12 col-md-3">
          <label className="form-label">Categoría</label>
          <select
            className="form-select"
            value={cat}
            onChange={(e) => setCat(e.target.value)}
          >
            <option value="all">Todas</option>
            <option value="infantil">Línea Infantil</option>
            <option value="primera-capa">Primera Capa</option>
            <option value="segunda-capa">Segunda Capa</option>
            <option value="tercera-capa">Tercera Capa</option>
            <option value="accesorios">Accesorios</option>
          </select>
        </div>

        {/* Precio mínimo */}
        <div className="col-6 col-md-2">
          <label className="form-label">Precio mínimo</label>
          <input
            className="form-control"
            type="number"
            min="0"
            value={min}
            onChange={(e) => setMin(e.target.value)}
          />
        </div>

        {/* Precio máximo */}
        <div className="col-6 col-md-2">
          <label className="form-label">Precio máximo</label>
          <input
            className="form-control"
            type="number"
            min="0"
            value={max}
            onChange={(e) => setMax(e.target.value)}
          />
        </div>

        {/* Búsqueda por palabra clave */}
        <div className="col-12 col-md-3">
          <label className="form-label">Buscar producto</label>
          <input
            type="text"
            className="form-control"
            placeholder="Ej: polerón, pantalón, camisa..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>

        {/* Ordenamiento */}
        <div className="col-12 col-md-2">
          <label className="form-label">Ordenar por</label>
          <select
            className="form-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="relevance">Relevancia</option>
            <option value="priceAsc">Precio: menor a mayor</option>
            <option value="priceDesc">Precio: mayor a menor</option>
            <option value="nameAsc">Nombre A–Z</option>
          </select>
        </div>
      </div>
    </div>
  );
}
