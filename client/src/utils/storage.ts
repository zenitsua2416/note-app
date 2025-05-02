// utils/storage.ts

/**
 * Loads and parses a typed value from localStorage.
 *
 * @template T - The expected type of the stored data.
 * @param key - The localStorage key to retrieve.
 * @returns The parsed value or `null` if not found or invalid.
 */
export const loadFromStorage = <T = string>(key: string): T | null => {
  const item = localStorage.getItem(key);
  if (!item) return null;
  try {
    return JSON.parse(item) as T;
  } catch (e) {
    console.warn(`Failed to parse localStorage "${key}":`, e);
    return null;
  }
};

/**
 * Serializes and saves a typed value to localStorage.
 *
 * @template T - The type of the value to store.
 * @param key - The localStorage key to store the value under.
 * @param value - The value to store.
 */
export const saveToStorage = <T = string>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn(`Failed to stringify localStorage "${key}":`, e);
  }
};

/**
 * Removes a key and its value from localStorage.
 *
 * @param key - The localStorage key to remove.
 */
export const removeFromStorage = (key: string): void => {
  localStorage.removeItem(key);
};
