import { create } from "zustand";
import { Company } from "@/types/company.type";

interface ApplicationState {
  activeCompany: Company | null;
  setActiveCompany: (company: Company) => void;
  removeActiveCompany: () => void;
}

export const useApplicationStore = create<ApplicationState>()((set) => ({
  activeCompany: null,
  setActiveCompany: (activeCompany: Company) => set({ activeCompany }),
  removeActiveCompany: () => set({ activeCompany: null }),
}));
