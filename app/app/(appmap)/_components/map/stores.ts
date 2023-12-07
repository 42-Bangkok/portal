import { create } from 'zustand'

type State = {
  position: [number, number]
}

type Action = {
  setPosition: (position: [number, number]) => void
}

export const useMapStore = create<State & Action>((set) => ({
  position: [13.7298941, 100.7756574],
  setPosition: (position) => set({ position }),
}))
