import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Theme = string

interface ThemeStore {
  theme: Theme
  setTheme: (theme: Theme) => void
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: 'system',
      setTheme: (theme) => set({ theme }),
    }),
    { name: 'fl-theme' }
  )
)
