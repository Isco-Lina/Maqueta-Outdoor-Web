import { useState, useMemo, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

// Componentes principales
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

// Páginas
import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import CartPage from "./pages/CartPage.jsx";
import Contact from "./pages/Contact.jsx";

// Datos (productos mockeados)
import productsData from "./data/products.js";

// Páginas por categoría
import Infantil from "./pages/categories/Infantil.jsx";
import PrimeraCapa from "./pages/categories/PrimeraCapa.jsx";
import SegundaCapa from "./pages/categories/SegundaCapa.jsx";
import TerceraCapa from "./pages/categories/TerceraCapa.jsx";
import Accesorios from "./pages/categories/Accesorios.jsx";

// Vista de todas las categorías
import Categories from "./components/Categories.jsx";

export default function App() {
  /* =============================
     ESTADO DEL CARRITO
     ============================= */
  const [cart, setCart] = useState(() => {
    try {
      // Cargar carrito desde localStorage si existe
      const saved = localStorage.getItem("weke-cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persistir carrito en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem("weke-cart", JSON.stringify(cart));
  }, [cart]);

  /* =============================
     ACCIONES DEL CARRITO
     ============================= */
  const addToCart = (product) => {
    setCart((prev) => {
      const found = prev.find((i) => i.id === product.id);
      if (found) {
        // Si ya existe, suma +1
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      // Si no existe, lo agrega con qty:1
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

  /* =============================
     DERIVADOS
     ============================= */
  // Cantidad total de items en el carrito
  const cartCount = useMemo(() => cart.reduce((s, i) => s + i.qty, 0), [cart]);

  // Normalizamos productsData a un array (puede venir como objeto por categorías)
  const allProducts = useMemo(() => {
    if (Array.isArray(productsData)) return productsData;
    if (productsData && typeof productsData === "object") {
      return Object.values(productsData).flat();
    }
    return [];
  }, []);

  /* =============================
     RENDER PRINCIPAL
     ============================= */
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navbar fijo arriba con contador del carrito */}
      <Navbar cartCount={cartCount} />

      {/* Contenido principal (flex-grow para empujar el footer) */}
      <main className="container my-4 flex-grow-1">
        <Routes>
          {/* Inicio */}
          <Route path="/" element={<Home />} />

          {/* Página general de productos */}
          <Route
            path="/productos"
            element={<Products products={allProducts} addToCart={addToCart} />}
          />

          {/* Rutas por categoría */}
          <Route
            path="/productos/infantil"
            element={<Infantil addToCart={addToCart} />}
          />
          <Route
            path="/productos/primera-capa"
            element={<PrimeraCapa addToCart={addToCart} />}
          />
          <Route
            path="/productos/segunda-capa"
            element={<SegundaCapa addToCart={addToCart} />}
          />
          <Route
            path="/productos/tercera-capa"
            element={<TerceraCapa addToCart={addToCart} />}
          />
          <Route
            path="/productos/accesorios"
            element={<Accesorios addToCart={addToCart} />}
          />

          {/* Vista de categorías */}
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
