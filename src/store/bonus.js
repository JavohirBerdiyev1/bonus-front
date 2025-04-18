import { create } from "zustand";

const useBonusStore = create((set) => ({
  bonusData: {},
  setBonusData: (data) => set({ bonusData: data })
}));

export default useBonusStore;