/**
 * Página: PrimeraCapa
 * Propósito:
 *  - Redireccionar a productos de categoría ropa (filtro general).
 *  - Alias /categorias/primera-capa → /productos?cat=ropa
 */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PrimeraCapa() {
  const nav = useNavigate();

  useEffect(() => {
    nav("/productos?cat=ropa", { replace: true });
  }, [nav]);

  return null;
}
