/**
 * Hook: useCart
 * Propósito:
 *  - Gestionar el carrito (estado + persistencia en localStorage).
 *  - Exponer acciones CRUD: add, remove, setQty, clear.
 *  - Derivados útiles: count (unidades), subtotal (CLP sin formato).
 *
 * Almacenamiento:
 *  - Clave localStorage: "weke-cart".
 *  - Lectura inicial segura (try/catch + SSR-safe).
 *  - Escritura reactiva cuando cambia `cart`.
 *
 * Notas:
 *  - `safeRead()` previene errores en SSR y parseos inválidos.
 *  - `setQty(id, 0)` elimina el ítem (comportamiento intencional).
 *  - `subtotal` usa (i.price ?? 0) * i.qty por tolerancia a datos incompletos.
 */

import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "weke-cart";

/** Lectura inicial segura desde localStorage (tolerante a SSR/JSON inválido). */
function safeRead() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export default function useCart() {
  // Estado del carrito (inicializa leyendo almacenamiento persistente)
  const [cart, setCart] = useState(safeRead);

  // Persistencia reactiva: guarda el carrito en localStorage ante cualquier cambio.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {
      /* Silenciar errores de cuota/permisos */
    }
  }, [cart]);

  // ===== Acciones CRUD =====

  /**
   * add(product, qty):
   *  - Si existe el producto (por id), acumula la cantidad.
   *  - Si no existe, lo agrega con la qty solicitada.
   */
  const add = (product, qty = 1) => {
    setCart((prev) => {
      const found = prev.find((i) => i.id === product.id);
      if (found) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [...prev, { ...product, qty }];
    });
  };

  /** remove(id): elimina por identificador. */
  const remove = (id) => setCart((prev) => prev.filter((i) => i.id !== id));

  /**
   * setQty(id, qty):
   *  - Cambia la cantidad del ítem.
   *  - Si qty <= 0, elimina el ítem (atajo útil para UI).
   */
  const setQty = (id, qty) => {
    setCart((prev) => {
      if (qty <= 0) return prev.filter((i) => i.id !== id); // 👈 0 elimina
      return prev.map((i) => (i.id === id ? { ...i, qty } : i));
    });
  };

  /** clear(): vacía el carrito. */
  const clear = () => setCart([]);

  // ===== Derivados (memoizados) =====

  /** count: número total de unidades (suma de qty). */
  const count = useMemo(() => cart.reduce((s, i) => s + i.qty, 0), [cart]);

  /** subtotal: suma de (precio * cantidad). */
  const subtotal = useMemo(
    () => cart.reduce((s, i) => s + (i.price ?? 0) * i.qty, 0),
    [cart]
  );

  return { cart, add, remove, setQty, clear, count, subtotal };
}
