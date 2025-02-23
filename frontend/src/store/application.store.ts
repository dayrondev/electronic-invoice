import { create } from "zustand";
import { Business } from "@/types/business.type";

interface ApplicationState {
  activeBusiness: Business | null;
  setActiveBusiness: (business: Business) => void;
  removeActiveBusiness: () => void;
}

export const useApplicationStore = create<ApplicationState>()((set) => ({
  activeBusiness: null,
  setActiveBusiness: (activeBusiness: Business) => set({ activeBusiness }),
  removeActiveBusiness: () => set({ activeBusiness: null }),
}));
