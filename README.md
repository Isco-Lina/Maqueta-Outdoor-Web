# 🌄 Tienda Outdoor

Este proyecto es una **maqueta funcional de e-commerce para equipamiento y ropa outdoor**, desarrollado con **React + Vite + Bootstrap 5**.  
Incluye catálogo de productos, carrito persistente en `localStorage`, filtros por categorías/subcategorías, vista rápida (modal), y formulario de contacto integrado con WhatsApp/Email.

---

## 🚀 Tecnologías usadas

- **React 18** (componentes funcionales + hooks)
- **Vite** (bundler rápido, soporte para alias)
- **React Router DOM** (ruteo SPA con query params)
- **Bootstrap 5** (grilla, componentes responsivos)
- **CSS personalizados** (hero, categorías, brand showcase)
- **LocalStorage** (persistencia del carrito)

---

## 📂 Estructura del proyecto

```
src/
 ├─ components/        # Componentes reutilizables
 │   ├─ Nav/           # Navbar
 │   ├─ Footer/        # Footer
 │   ├─ Products/      # ProductCard, ProductGrid, QuickViewModal
 │   ├─ Hero/          # HeroCarousel
 │   ├─ Categories/    # CategoryShowcase, Categories
 │   └─ CarruselBrand/ # BrandShowcase
 ├─ hooks/             # useCart (manejo de carrito con localStorage)
 ├─ pages/             # Vistas principales (Home, Productos, Contacto, etc.)
 │   └─ categories/    # Redirecciones de categorías → productos
 ├─ styles/            # Archivos CSS personalizados
 ├─ data/              # Productos mockeados
 └─ utils/             # Funciones helper (orderMessage, etc.)
```

---

## ⚙️ Instalación y uso

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/usuario/maqueta-outdoor.git
   cd maqueta-outdoor
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   ```

3. **Levantar en desarrollo**

   ```bash
   npm run dev
   ```

4. **Build de producción**
   ```bash
   npm run build
   npm run preview
   ```

---

## 📌 Funcionalidades principales

- ✅ Catálogo de productos con filtros dinámicos (`?aud=`, `?cat=`, `?subcat=`, `?sortBy=`, `?q=`).
- ✅ Carrito de compras persistente (se guarda en `localStorage`).
- ✅ Vista rápida de producto (modal con “Agregar al carrito”).
- ✅ Formulario de contacto que genera el detalle del carrito y permite:
  - Enviar por **WhatsApp**
  - Enviar por **Email**
  - Copiar detalle al portapapeles
- ✅ Diseño responsivo, probado en móvil (ej: Samsung S23).

---
