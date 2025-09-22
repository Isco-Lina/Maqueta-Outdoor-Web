// 1) Hero (cabecera visual con imagen + CTAs)
// 2) CategoryShowcase (categorías destacadas)
// 3) BrandShowcase (marcas con carrusel infinito)

import Hero from "../components/Hero.jsx";
import CategoryShowcase from "../components/CategoryShowcase.jsx";
import BrandShowcase from "../components/BrandShowcase.jsx";

export default function Home() {
  return (
    <>
      <Hero />
      <CategoryShowcase />
      <BrandShowcase />
    </>
  );
}
