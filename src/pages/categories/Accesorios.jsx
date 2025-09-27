/**
 * Página: Accesorios
 * Propósito:
 *  - Redireccionar inmediatamente a la vista de productos filtrada por categoría "accesorios".
 *  - Se usa como alias /categorias/accesorios → /productos?cat=accesorios
 *
 * Notas:
 *  - useNavigate() de react-router-dom con replace: true (para no dejar esta ruta en el historial).
 *  - Retorna null ya que no renderiza UI.
 */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Accesorios() {
  const nav = useNavigate();

  useEffect(() => {
    nav("/productos?cat=accesorios", { replace: true });
  }, [nav]);

  return null;
}
