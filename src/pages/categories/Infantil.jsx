/**
 * Página: Infantil
 * Propósito:
 *  - Redireccionar a productos ropa → audiencia niños.
 *  - Alias /categorias/infantil → /productos?aud=ninos&cat=ropa
 */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Infantil() {
  const nav = useNavigate();

  useEffect(() => {
    nav("/productos?aud=ninos&cat=ropa", { replace: true });
  }, [nav]);

  return null;
}
