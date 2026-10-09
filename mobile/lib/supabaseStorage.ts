import * as SecureStore from 'expo-secure-store';

const CHUNK_SIZE = 1800;
const memoryFallback = new Map<string, string>();

/**
 * Robust Expo SecureStore adapter for Supabase Auth.
 * Handles token chunking (supporting >2048 bytes) and has in-memory fallback
 * so it never crashes with "Native module is null".
 */
export const supabaseStorage = {
  getItem: async (key: string): Promise<string | null> => {
    try {
      const chunkCountStr = await SecureStore.getItemAsync(`${key}_chunk_count`);
      if (chunkCountStr) {
        const count = parseInt(chunkCountStr, 10);
        let fullValue = '';
        for (let i = 0; i < count; i++) {
          const chunk = await SecureStore.getItemAsync(`${key}_chunk_${i}`);
          if (chunk) fullValue += chunk;
        }
        if (fullValue) return fullValue;
      }

      const singleValue = await SecureStore.getItemAsync(key);
      if (singleValue !== null) return singleValue;
    } catch {
      // Graceful fallback to memory
    }
    return memoryFallback.get(key) ?? null;
  },

  setItem: async (key: string, value: string): Promise<void> => {
    memoryFallback.set(key, value);
    try {
      if (value.length <= CHUNK_SIZE) {
        await SecureStore.setItemAsync(key, value);
        await SecureStore.deleteItemAsync(`${key}_chunk_count`);
      } else {
        const count = Math.ceil(value.length / CHUNK_SIZE);
        await SecureStore.setItemAsync(`${key}_chunk_count`, String(count));
        for (let i = 0; i < count; i++) {
          const chunk = value.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE);
          await SecureStore.setItemAsync(`${key}_chunk_${i}`, chunk);
        }
      }
    } catch {
      // Memory fallback is already set
    }
  },

  removeItem: async (key: string): Promise<void> => {
    memoryFallback.delete(key);
    try {
      const chunkCountStr = await SecureStore.getItemAsync(`${key}_chunk_count`);
      if (chunkCountStr) {
        const count = parseInt(chunkCountStr, 10);
        for (let i = 0; i < count; i++) {
          await SecureStore.deleteItemAsync(`${key}_chunk_${i}`);
        }
        await SecureStore.deleteItemAsync(`${key}_chunk_count`);
      }
      await SecureStore.deleteItemAsync(key);
    } catch {
      // Ignored
    }
  },
};
