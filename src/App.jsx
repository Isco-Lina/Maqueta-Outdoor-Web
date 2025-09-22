import { useState, useMemo, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import CartPage from "./pages/CartPage.jsx";
import Contact from "./pages/Contact.jsx";

import productsData from "./data/products.js";
import Infantil from "./pages/categories/Infantil.jsx";
import PrimeraCapa from "./pages/categories/PrimeraCapa.jsx";
import SegundaCapa from "./pages/categories/SegundaCapa.jsx";
import TerceraCapa from "./pages/categories/TerceraCapa.jsx";
import Accesorios from "./pages/categories/Accesorios.jsx";
import Categories from "./pages/Categories.jsx";

export default function App() {
  // --- Estado del carrito (con carga inicial desde localStorage) ---
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("weke-cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persistir carrito en localStorage
  useEffect(() => {
    localStorage.setItem("weke-cart", JSON.stringify(cart));
  }, [cart]);

  // --- Acciones del carrito ---
  const addToCart = (product) => {
    setCart((prev) => {
      const found = prev.find((i) => i.id === product.id);
      if (found) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) =>
    setCart((prev) => prev.filter((i) => i.id !== id));

  const setQty = (id, qty) =>
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i))
    );

  const clearCart = () => setCart([]);

  // --- Derivados ---
  const cartCount = useMemo(() => cart.reduce((s, i) => s + i.qty, 0), [cart]);

  // --- Normalizar productsData a un array para /productos ---
  //  - Si productsData ya es array, lo usa tal cual
  //  - Si es objeto por categorías, lo aplana
  const allProducts = useMemo(() => {
    if (Array.isArray(productsData)) return productsData;
    if (productsData && typeof productsData === "object") {
      return Object.values(productsData).flat();
    }
    return [];
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navbar arriba */}
      <Navbar cartCount={cartCount} />

      {/* Main crece para empujar el footer hacia abajo */}
      <main className="container my-4 flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Página general de productos (recibe SIEMPRE un array) */}
          <Route
            path="/productos"
            element={<Products products={allProducts} addToCart={addToCart} />}
          />

          {/* Categoría: Línea Infantil */}
          <Route
            path="/productos/infantil"
            element={<Infantil addToCart={addToCart} />}
          />

          {/* Categoría: Primera Capa */}
          <Route
            path="/productos/primera-capa"
            element={<PrimeraCapa addToCart={addToCart} />}
          />

          {/* Categoría: Segunda Capa */}
          <Route
            path="/productos/segunda-capa"
            element={<SegundaCapa addToCart={addToCart} />}
          />
          {/* Categoría: Tercera Capa */}
          <Route
            path="/productos/tercera-capa"
            element={<TerceraCapa addToCart={addToCart} />}
          />
          {/* Categoría: Accesorios */}
          <Route
            path="/productos/accesorios"
            element={<Accesorios addToCart={addToCart} />}
          />

          {/* Página de categorías */}
          <Route path="/categorias" element={<Categories />} />

          {/* Carrito */}
          <Route
            path="/carrito"
            element={
              <CartPage
                cart={cart}
                removeFromCart={removeFromCart}
                setQty={setQty}
                clearCart={clearCart}
              />
            }
          />

          {/* Contacto */}
          <Route path="/contacto" element={<Contact cart={cart} />} />
        </Routes>
      </main>

      {/* Footer siempre abajo */}
      <Footer />
    </div>
  );
}
