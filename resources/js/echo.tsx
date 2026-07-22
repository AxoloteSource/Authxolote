import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

declare global {
  interface Window {
    Pusher: typeof Pusher
    Echo: Echo<Record<string, unknown>>
  }
}

interface PusherConnector {
  pusher: {
    connection: {
      bind: (event: string, callback: (...args: unknown[]) => void) => void
    }
  }
}

window.Pusher = Pusher

const echo = new Echo({
  broadcaster: 'reverb',
  key: import.meta.env.VITE_REVERB_APP_KEY,
  wsHost: import.meta.env.VITE_REVERB_HOST,
  wsPort: import.meta.env.VITE_REVERB_PORT ?? 80,
  wssPort: import.meta.env.VITE_REVERB_PORT ?? 443,
  forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'https') === 'https',
  enabledTransports: ['ws', 'wss']
})

const connector = (echo as Echo<Record<string, unknown>>).connector as PusherConnector

connector.pusher.connection.bind('connected', () => {
  console.log('✅ WebSocket successfully connected')
})

connector.pusher.connection.bind('error', (error: unknown) => {
  console.error('❌ WebSocket connection error:', error)
})

window.Echo = echo

export default echo
