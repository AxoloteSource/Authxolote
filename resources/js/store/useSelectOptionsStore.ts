import { IOptions } from '@/components/Form/Select/interfaces/IOptions'
import { create } from 'zustand'

interface ISelectOptionsState {
  // Objeto que almacena las opciones por clave (nombre del componente/select)
  optionsByKey: Record<string, IOptions[]>

  // Función para establecer opciones para una clave específica
  setOptions: (key: string, options: IOptions[]) => void

  // Función para obtener opciones por clave
  getOptions: (key: string) => IOptions[]

  // Función para limpiar opciones de una clave específica
  clearOptions: (key: string) => void

  // Función para limpiar todas las opciones
  clearAll: () => void

  // Función para verificar si existen opciones para una clave
  hasOptions: (key: string) => boolean
}

export const useSelectOptionsStore = create<ISelectOptionsState>((set, get) => ({
  optionsByKey: {},

  setOptions: (key: string, options: IOptions[]) =>
    set((state) => ({
      optionsByKey: {
        ...state.optionsByKey,
        [key]: options
      }
    })),

  getOptions: (key: string) => {
    const state = get()
    return state.optionsByKey[key] || []
  },

  clearOptions: (key: string) =>
    set((state) => {
      const newOptionsByKey = { ...state.optionsByKey }
      delete newOptionsByKey[key]
      return { optionsByKey: newOptionsByKey }
    }),

  clearAll: () => set({ optionsByKey: {} }),

  hasOptions: (key: string) => {
    const state = get()
    return Boolean(state.optionsByKey[key] && state.optionsByKey[key].length > 0)
  }
}))
