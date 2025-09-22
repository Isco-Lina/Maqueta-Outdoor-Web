import { useState, useEffect } from "react";

/**
 * useLocalStorage
 * ---------------
 * Hook controlado que sincroniza un estado React con localStorage.
 * - Lee el valor inicial desde localStorage (si existe y es JSON válido).
 * - Si no existe o hay error al parsear, usa `initialValue`.
 * - Cada vez que `value` cambia, lo persiste en localStorage (stringify).
 *
 * @param {string} key - clave en localStorage (ej: "cart")
 * @param {*} initialValue - valor por defecto si no hay nada guardado
 * @returns [value, setValue] - igual que useState, pero persistente
 */
export default function useLocalStorage(key, initialValue) {
  // Estado inicial lazy: intenta leer localStorage una sola vez
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : initialValue;
    } catch {
      // Si localStorage está bloqueado o el JSON es inválido
      return initialValue;
    }
  });

  // Efecto: persiste cualquier cambio del estado a localStorage
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Si falla (modo incógnito / cuota llena / permisos), simplemente ignoramos
    }
  }, [key, value]);

  // Misma API que useState
  return [value, setValue];
}
