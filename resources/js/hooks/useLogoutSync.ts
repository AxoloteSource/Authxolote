import { useEffect } from 'react'

/**
 * Hook to synchronize logout across multiple browser tabs/windows
 * When a tab logs out, all other tabs automatically log out as well
 * @param logout Function to execute when logout is detected from another tab
 */
export const useLogoutSync = (logout: () => void) => {
  useEffect(() => {
    const handleLogoutFromOtherTab = (event: StorageEvent) => {
      // Check if authentication token was removed from another tab
      if (event.key === 'authToken' && event.newValue === null) {
        // Token was removed in another tab, execute logout in this tab as well
        logout()
      }

      // Alternative: use a specific logout key for better control
      if (event.key === 'logout-event' && event.newValue === 'true') {
        // Explicit logout event was triggered
        logout()
        // Clean up the event
        localStorage.removeItem('logout-event')
      }
    }

    // Listen for localStorage changes from other tabs
    window.addEventListener('storage', handleLogoutFromOtherTab)

    return () => {
      window.removeEventListener('storage', handleLogoutFromOtherTab)
    }
  }, [logout])
}
