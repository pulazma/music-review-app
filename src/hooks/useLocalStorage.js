import { useState, useEffect } from 'react';

/**
 * useLocalStorage — кастомный хук для синхронизации состояния с LocalStorage.
 *
 * ЗАЧЕМ он нужен:
 * Без этого хука нам пришлось бы в каждом компоненте вручную:
 *   1. JSON.parse(localStorage.getItem(...)) в useState начальном значении
 *   2. useEffect(() => localStorage.setItem(...), [value]) для сохранения
 * Это дублирование логики. Хук инкапсулирует эти два шага в одно место.
 *
 * КАК работает:
 * - Принимает ключ и начальное значение
 * - При первом рендере пытается прочитать значение из LocalStorage
 * - Если оно есть — парсит и использует, если нет — берёт initialValue
 * - При каждом изменении storedValue автоматически сохраняет в LocalStorage
 * - Возвращает [value, setValue] — точно как useState, поэтому замена прозрачна
 *
 * ИСПОЛЬЗОВАНИЕ (вместо useState):
 *   const [favorites, setFavorites] = useLocalStorage('favorites', []);
 *   // favorites автоматически сохраняются между перезагрузками страницы
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`useLocalStorage: не удалось прочитать "${key}"`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn(`useLocalStorage: не удалось сохранить "${key}"`, error);
    }
  }, [key, storedValue]);

  // Поддержка функционального обновления, как в обычном useState
  const setValue = (value) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
  };

  return [storedValue, setValue];
}
