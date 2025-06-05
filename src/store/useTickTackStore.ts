import { create } from 'zustand'

export type Mode = 'counter' | 'chronometer' | 'countdown' | 'multiCounter'

interface Counter {
  id: string
  name: string
  value: number
  increment: number
}

interface Lap {
  number: number
  time: number
  timestamp: number
}

interface TickTackState {
  mode: Mode
  count: number
  isRunning: boolean
  counters: Counter[]
  laps: Lap[]
  targetTime?: number
  setMode: (mode: Mode) => void
  increment: () => void
  reset: () => void
  toggleRunning: () => void
  setCount: (count: number) => void
  addCounter: (name: string, increment?: number) => void
  removeCounter: (id: string) => void
  incrementCounter: (id: string) => void
  resetCountersValues: () => void;
  addLap: () => void
  clearLaps: () => void
  setTargetTime: (seconds: number) => void
}

export const useTickTackStore = create<TickTackState>()((set) => ({
  mode: 'counter',
  count: 0,
  isRunning: false,
  counters: [],
  laps: [],
  setMode: (newMode) => set((state) => {
    if (state.mode === newMode) {
      return { mode: newMode }; 
    }
    return {
      mode: newMode,
      count: 0,
      isRunning: false,
      laps: [],
      targetTime: undefined,
    };
  }),
  increment: () => set((state) => ({ count: state.count + 1 })),
  reset: () => set({ 
    count: 0, 
    isRunning: false, 
    laps: [], 
    counters: [] 
  }),
  toggleRunning: () => set((state) => ({ isRunning: !state.isRunning })),
  setCount: (count) => set({ count }),
  addCounter: (name, increment = 1) => set((state) => ({
    counters: [...state.counters, { id: Date.now().toString(), value: 0, name, increment }]
  })),
  removeCounter: (id) => set((state) => ({
    counters: state.counters.filter(counter => counter.id !== id)
  })),
  incrementCounter: (id) => set((state) => ({
    counters: state.counters.map(counter =>
      counter.id === id
        ? { ...counter, value: counter.value + counter.increment }
        : counter
    )
  })),
  resetCountersValues: () => set((state) => ({
    counters: state.counters.map(counter => ({ ...counter, value: 0 }))
  })),
  addLap: () => set((state) => ({
    laps: [...state.laps, { number: state.laps.length + 1, time: state.count,
        timestamp: Date.now() 
      }]
  })),
  clearLaps: () => set({ laps: [] }),
  setTargetTime: (seconds) => set({ 
    targetTime: seconds * 1000,
    count: seconds * 1000,
    isRunning: false 
  }),
}))
