import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "weke-cart";

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
  const [cart, setCart] = useState(safeRead);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {}
  }, [cart]);

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

  const remove = (id) => setCart((prev) => prev.filter((i) => i.id !== id));

  const setQty = (id, qty) => {
    setCart((prev) => {
      if (qty <= 0) return prev.filter((i) => i.id !== id);
      return prev.map((i) => (i.id === id ? { ...i, qty } : i));
    });
  };

  const clear = () => setCart([]);

  const count = useMemo(() => cart.reduce((s, i) => s + i.qty, 0), [cart]);

  const subtotal = useMemo(
    () => cart.reduce((s, i) => s + (i.price ?? 0) * i.qty, 0),
    [cart]
  );

  return { cart, add, remove, setQty, clear, count, subtotal };
}
