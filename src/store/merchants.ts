import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type MerchantStore = {
  merchants: API.MerchantList;
  currentMerchant: API.Merchant;
  setMerchants: (merchants: API.MerchantList) => void;
  setCurrentMerchant: (merchant: API.Merchant) => void;
};

export const useMerchantStore = create<MerchantStore>()(
  persist(
    (set) => ({
      merchants: [],
      currentMerchant: { id: 0, businessName: "", merchantCode: "" },
      setMerchants: (merchants: API.MerchantList) =>
        set({ merchants: merchants }),
      setCurrentMerchant: (merchant: API.Merchant) =>
        set({ currentMerchant: merchant }),
    }),

    {
      name: "merchant-store", // name of item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default the 'localStorage' is used
      partialize: (state: MerchantStore) => ({
        merchants: state.merchants,
        currentMerchant: state.currentMerchant,
      }),
    },
  ),
);
