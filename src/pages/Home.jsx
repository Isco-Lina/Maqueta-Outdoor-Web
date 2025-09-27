// src/pages/Home.jsx
import HeroCarousel from "../components/Hero/HeroCarousel.jsx";
import BrandShowcase from "../components/CarruselBrand/BrandShowcase.jsx";
import Categories from "../components/Products/Categories.jsx";

export default function Home() {
  return (
    <>
      {/* HERO tipo carousel */}
      <HeroCarousel />
      {/* Carrusel infinito de logos de marcas */}
      <BrandShowcase />
      {/* Sección de categorías (audiencias + subcategorías) */}
      <Categories />
    </>
  );
}
