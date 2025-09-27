/**
 * Página: SegundaCapa
 * Propósito:
 *  - Redireccionar a la vista de productos filtrada en ropa.
 *  - Alias /categorias/segunda-capa → /productos?cat=ropa
 */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SegundaCapa() {
  const nav = useNavigate();

  useEffect(() => {
    nav("/productos?cat=ropa", { replace: true });
  }, [nav]);

  return null;
}
