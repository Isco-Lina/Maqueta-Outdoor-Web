import HeroCarousel from "../components/Hero/HeroCarousel.jsx";
import BrandShowcase from "../components/CarruselBrand/BrandShowcase.jsx";
import Categories from "../components/Products/Categories.jsx";

export default function Home() {
  return (
    <>
      <HeroCarousel />

      <BrandShowcase />

      <Categories />
    </>
  );
}
