import { ISavingOverlay } from './ISavingOverlay'

export const SavingOverlay = ({ isVisible, message = 'Guardando...' }: ISavingOverlay) => {
  if (!isVisible) return null

  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm dark:bg-gray-900/70">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-blue-500 border-t-transparent dark:border-blue-400" />
      <span className="mt-3 text-sm font-medium text-gray-700 dark:text-gray-200">{message}</span>
    </div>
  )
}
