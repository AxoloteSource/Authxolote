import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { AxiosProvider } from './contexts/AxiosContext'
import routes from './routes/index'

// Perfect Scrollbar
import 'react-perfect-scrollbar/dist/css/styles.css'
// import './echo'

import '@mantine/core/styles.layer.css'
import 'mantine-datatable/styles.layer.css'

// Tailwind css
import './tailwind.css'

import './i18n'

// Redux
import { MantineProvider } from '@mantine/core'
import { Provider } from 'react-redux'
import { ThemeProvider } from './contexts/ThemeProvider'
import store from './store/index'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AxiosProvider>
      <Provider store={store}>
        <ThemeProvider defaultTheme="dark" storageKey="theme">
          <MantineProvider>
            <QueryClientProvider client={queryClient}>
              <Suspense fallback={<div>Cargando...</div>}>
                <RouterProvider router={routes} />
              </Suspense>
            </QueryClientProvider>
          </MantineProvider>
        </ThemeProvider>
      </Provider>
    </AxiosProvider>
  </React.StrictMode>
)
