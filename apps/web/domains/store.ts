import { create } from "zustand";

interface BearState {
  bears: number;
  increase: (by: number) => void;
}

const useBearStore = create<BearState>()((set, get) => ({
  bears: 0,
  increase: (by) => set((state) => ({ bears: state.bears + by })),
}));
