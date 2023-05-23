import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useListStore = create(
  persist(
    (set, get) => ({
      items: [],
      addItem: (itemName) => {
        if (itemName.length > 0) {
          return set((state) => ({ items: [...state.items, itemName] }));
        }
      },
      removeItem: (toBeRemovedIndex) =>
        set((state) => ({
          items: state.items.filter(
            (item, index) => index !== toBeRemovedIndex
          ),
        })),
      searchItem: (itemName) => {
        return get().items.find((item) => item.includes(itemName));
      },
      updateItem: (updatedIndex, updatedName) =>
        set((state) => ({
          items: state.items.map((index, item) => {
            if (index === updatedIndex) {
              return updatedName;
            }

            return item;
          }),
        })),
    }),
    {
      name: "items",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
