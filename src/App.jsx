import { useMemo } from "react";
import { Routes, Route } from "react-router-dom";

// Componentes principales
import Navbar from "./components/Nav/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";

// Páginas
import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import CartPage from "./pages/CartPage.jsx";
import Contact from "./pages/Contact.jsx";
import Ubicacion from "./pages/Ubicacion.jsx";

// Datos (productos mockeados)
import productsData from "./data/products.js";

// Hook de carrito
import useCart from "./hooks/useCart.js";

// Páginas por categoría
import Infantil from "./pages/categories/Infantil.jsx";
import PrimeraCapa from "./pages/categories/PrimeraCapa.jsx";
import SegundaCapa from "./pages/categories/SegundaCapa.jsx";
import TerceraCapa from "./pages/categories/TerceraCapa.jsx";
import Accesorios from "./pages/categories/Accesorios.jsx";

// Vista de todas las categorías
import Categories from "./components/Products/Categories.jsx";

export default function App() {
  // Carrito desde hook
  const { cart, add, remove, setQty, clear, count } = useCart();

  // Productos normalizados
  const allProducts = useMemo(() => {
    if (Array.isArray(productsData)) return productsData;
    if (productsData && typeof productsData === "object") {
      return Object.values(productsData).flat();
    }
    return [];
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar cartCount={count} />

      <main className="container my-4 flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/productos"
            element={<Products products={allProducts} addToCart={add} />}
          />
          <Route
            path="/productos/infantil"
            element={<Infantil addToCart={add} />}
          />
          <Route
            path="/productos/primera-capa"
            element={<PrimeraCapa addToCart={add} />}
          />
          <Route
            path="/productos/segunda-capa"
            element={<SegundaCapa addToCart={add} />}
          />
          <Route
            path="/productos/tercera-capa"
            element={<TerceraCapa addToCart={add} />}
          />
          <Route
            path="/productos/accesorios"
            element={<Accesorios addToCart={add} />}
          />

          <Route path="/categorias" element={<Categories />} />

          <Route
            path="/carrito"
            element={
              <CartPage
                cart={cart}
                removeFromCart={remove}
                setQty={setQty}
                clearCart={clear}
              />
            }
          />
          <Route path="/contacto" element={<Contact cart={cart} />} />

          <Route path="/ubicacion" element={<Ubicacion cart={cart} />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
