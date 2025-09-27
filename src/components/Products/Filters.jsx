/**
 * Componente: Filters
 * Propósito: Sincroniza filtros con la URL (?aud, ?cat, ?subcat, ?sortBy, ?q) y expone controles.
 * Entradas:
 *  - current: { aud, cat, subcat, sortBy, keyword }
 *  - onChange(next): notifica al padre el estado consolidado de filtros
 * Navegación:
 *  - Lee/Escribe SearchParams (useSearchParams + useNavigate).
 * Notas:
 *  - Subcategoría siempre visible; si cat="all", muestra todas las subcats.
 *  - Convenciones: aud ∈ {hombre, mujer, ninos, all}, cat ∈ {ropa, accesorios, all}.
 */
import { useEffect, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

// 1) Subcategorías por categoría
const SUBCATS_BY_CAT = {
  ropa: [
    { value: "all", label: "Todas" },
    { value: "infantil", label: "Infantil" },
    { value: "primera-capa", label: "Primera capa" },
    { value: "segunda-capa", label: "Segunda capa" },
    { value: "tercera-capa", label: "Tercera capa" },
  ],
  accesorios: [
    { value: "all", label: "Todas" },
    { value: "accesorios", label: "Accesorios" },
  ],
};

// 2) Lista plana de TODAS las subcategorías (para cat="all")
const ALL_SUBCATS = [
  { value: "all", label: "Todas" },
  { value: "infantil", label: "Infantil" },
  { value: "primera-capa", label: "Primera capa" },
  { value: "segunda-capa", label: "Segunda capa" },
  { value: "tercera-capa", label: "Tercera capa" },
  { value: "accesorios", label: "Accesorios" },
];

export default function Filters({ current, onChange }) {
  const [sp] = useSearchParams();
  const navigate = useNavigate();

  // 3) Leer valores iniciales desde la URL (con defaults)
  const fromUrl = useMemo(() => {
    const aud = sp.get("aud") || "all"; // hombre|mujer|ninos|all
    const cat = sp.get("cat") || "all"; // ropa|accesorios|all
    const subcat = sp.get("subcat") || "all";
    const sortBy = sp.get("sortBy") || "relevance";
    const keyword = sp.get("q") || "";
    return { aud, cat, subcat, sortBy, keyword };
  }, [sp]);

  // 4) Empujar cambios de URL -> estado padre (evita deps a `current` para no crear loops)
  useEffect(() => {
    onChange({ ...current, ...fromUrl });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    fromUrl.aud,
    fromUrl.cat,
    fromUrl.subcat,
    fromUrl.sortBy,
    fromUrl.keyword,
  ]);

  // 5) Opciones de subcategoría: si cat="all", mostramos todas
  const subcatOptions = useMemo(() => {
    if (current.cat === "all") return ALL_SUBCATS;
    return SUBCATS_BY_CAT[current.cat] || [{ value: "all", label: "Todas" }];
  }, [current.cat]);

  // 6) Garantiza que subcat pertenezca a la cat actual; si no, corrige a "all"
  const coerceSubcat = (cat, subcat) => {
    const allowed = (cat === "all" ? ALL_SUBCATS : SUBCATS_BY_CAT[cat]) || [
      { value: "all" },
    ];
    const values = allowed.map((o) => o.value);
    return values.includes(subcat) ? subcat : "all";
  };

  // 7) Escribir URL desde el estado "next" (quita params en default para URLs limpias)
  const writeUrl = (next) => {
    const usp = new URLSearchParams(sp);
    next.aud === "all" ? usp.delete("aud") : usp.set("aud", next.aud);
    next.cat === "all" ? usp.delete("cat") : usp.set("cat", next.cat);
    next.subcat === "all"
      ? usp.delete("subcat")
      : usp.set("subcat", next.subcat);
    next.sortBy === "relevance"
      ? usp.delete("sortBy")
      : usp.set("sortBy", next.sortBy);
    next.keyword ? usp.set("q", next.keyword) : usp.delete("q");

    navigate({ search: `?${usp.toString()}` }, { replace: true });
  };

  // 8) Actualizar un campo, corrigiendo subcat si es incompatible
  const setField = (k, v) => {
    let next = { ...current, [k]: v };

    if (k === "cat") next.subcat = coerceSubcat(next.cat, next.subcat);
    if (k === "subcat") next.subcat = coerceSubcat(next.cat, next.subcat);

    onChange(next);
    writeUrl(next);
  };

  return (
    <div className="border rounded-3 p-3 mb-4">
      <div className="row g-3 align-items-end">
        {/* Audiencia */}
        <div className="col-6 col-md-3">
          <label className="form-label">Público</label>
          <select
            className="form-select"
            value={current.aud}
            onChange={(e) => setField("aud", e.target.value)}
          >
            <option value="all">Todas</option>
            <option value="hombre">Hombre</option>
            <option value="mujer">Mujer</option>
            <option value="ninos">Niños</option>
          </select>
        </div>

        {/* Categoría */}
        <div className="col-6 col-md-3">
          <label className="form-label">Categoría</label>
          <select
            className="form-select"
            value={current.cat}
            onChange={(e) => setField("cat", e.target.value)}
          >
            <option value="all">Todas</option>
            <option value="ropa">Ropa</option>
            <option value="accesorios">Accesorios</option>
          </select>
        </div>

        {/* Subcategoría */}
        <div className="col-6 col-md-3">
          <label className="form-label">Subcategoría</label>
          <select
            className="form-select"
            value={current.subcat || "all"}
            onChange={(e) => setField("subcat", e.target.value)}
          >
            {subcatOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Orden */}
        <div className="col-6 col-md-3">
          <label className="form-label">Ordenar por</label>
          <select
            className="form-select"
            value={current.sortBy}
            onChange={(e) => setField("sortBy", e.target.value)}
          >
            <option value="relevance">Relevancia</option>
            <option value="priceAsc">Precio ↑</option>
            <option value="priceDesc">Precio ↓</option>
            <option value="nameAsc">Nombre A→Z</option>
          </select>
        </div>

        {/* Buscador */}
        <div className="col-12 col-md-6">
          <label className="form-label">Buscar</label>
          <input
            className="form-control"
            placeholder="chaqueta, mochila..."
            value={current.keyword}
            onChange={(e) => setField("keyword", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
