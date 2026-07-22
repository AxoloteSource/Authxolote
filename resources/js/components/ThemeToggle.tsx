import { useTheme } from '@/contexts/ThemeProvider'
import { IRootState } from '@/store'
import { toggleTheme } from '@/store/themeConfigSlice'
import { Monitor, Moon, Sun } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'

interface ThemeToggleProps {
  className?: string
  size?: number
  variant?: 'default' | 'outline' | 'ghost'
  showLabel?: boolean
  onThemeChange?: (theme: string) => void
}

const ThemeToggle = ({ className = '', size = 20, variant = 'default', showLabel = false, onThemeChange }: ThemeToggleProps) => {
  const dispatch = useDispatch()
  const { theme, setTheme } = useTheme()
  useSelector((state: IRootState) => state.themeConfig)

  const handleThemeToggle = () => {
    const themes = ['light', 'dark', 'system'] as const
    const currentIndex = themes.indexOf(theme as 'light' | 'dark' | 'system')
    const nextIndex = (currentIndex + 1) % themes.length
    const nextTheme = themes[nextIndex]

    dispatch(toggleTheme(nextTheme))
    setTheme(nextTheme)

    if (onThemeChange) {
      onThemeChange(nextTheme)
    }
  }

  const getVariantClasses = () => {
    switch (variant) {
      case 'outline':
        return 'border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800'
      case 'ghost':
        return 'rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800'
      default:
        return 'bg-white-light/40 dark:bg-dark/40 hover:bg-white-light/90 dark:hover:bg-dark/60 rounded-full'
    }
  }

  const getThemeIcon = () => {
    switch (theme) {
      case 'dark':
        return <Moon size={size} />
      case 'system':
        return <Monitor size={size} />
      default:
        return <Sun size={size} />
    }
  }

  const getThemeLabel = () => {
    switch (theme) {
      case 'system':
        return 'Sistema'
      case 'light':
        return 'Claro'
      case 'dark':
        return 'Oscuro'
      default:
        return 'Desconocido'
    }
  }

  return (
    <button
      className={`${getVariantClasses()} ${className} hover:text-primary flex items-center justify-center p-2 text-gray-700 transition-colors duration-200 dark:text-gray-300`}
      onClick={handleThemeToggle}
      title={`Cambiar a tema ${getThemeLabel()}`}
      aria-label={`Tema actual: ${theme}`}
    >
      {getThemeIcon()}
      {showLabel && <span className="ml-2 text-sm font-medium capitalize">{getThemeLabel()}</span>}
    </button>
  )
}

export default ThemeToggle
