/**
 * Filtros:
 * - categoría (infantil/primera/segunda/tercera/accesorios)
 * - rango de precio (min/max)
 * - palabra clave
 * - ordenamiento
 * - aud (hombre/mujer/infantil) → llega por query, sin UI
 */
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function Filters({ onChange, current }) {
  const [params] = useSearchParams();
  const initialCat = params.get("cat") ?? "all";
  const initialAud = params.get("aud") ?? "all";

  const [cat, setCat] = useState(current?.cat ?? initialCat);
  const [min, setMin] = useState(current?.min ?? "");
  const [max, setMax] = useState(current?.max ?? "");
  const [keyword, setKeyword] = useState(current?.keyword ?? "");
  const [sortBy, setSortBy] = useState(current?.sortBy ?? "relevance");
  const [aud] = useState(current?.aud ?? initialAud);

  useEffect(() => {
    onChange({
      cat,
      min: Number(min) || 0,
      max: Number(max) || Infinity,
      keyword,
      sortBy,
      aud, // 👈 pasa al padre
    });
  }, [cat, min, max, keyword, sortBy, aud, onChange]);

  return (
    <div className="wek-filters bg-white border rounded-wek p-3 mb-3">
      <div className="row g-3">
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
