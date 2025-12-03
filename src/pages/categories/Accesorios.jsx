import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Accesorios() {
  const nav = useNavigate();

  useEffect(() => {
    nav("/productos?cat=accesorios", { replace: true });
  }, [nav]);

  return null;
}
