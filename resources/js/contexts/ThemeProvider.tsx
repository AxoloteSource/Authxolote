import { IRootState } from '@/store'
import { createContext, useContext, useEffect } from 'react'
import { useSelector } from 'react-redux'

type Theme = 'dark' | 'light' | 'system'

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({ children, defaultTheme = 'system', ...props }: ThemeProviderProps) {
  const reduxTheme = useSelector((state: IRootState) => state.themeConfig.theme)
  const currentTheme = (reduxTheme as Theme) || defaultTheme

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove('light', 'dark')

    if (currentTheme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(currentTheme)
  }, [currentTheme])

  const value = {
    theme: currentTheme,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setTheme: (theme: Theme) => {
      // Redux handles localStorage and state updates
      // This is a placeholder since ThemeProvider is now read-only
      console.warn('ThemeProvider.setTheme is deprecated. Use Redux toggleTheme action instead.')
    }
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined) throw new Error('useTheme must be used within a ThemeProvider')

  return context
}
