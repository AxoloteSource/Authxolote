import Card from '@/components/Card/Card'
import { AlertTriangle, ChevronRight, ClipboardCopy, FileWarning, Gauge, Home as HomeIcon, MapPin, RefreshCw } from 'lucide-react'
import { FallbackProps } from 'react-error-boundary'

const getErrorInfo = (error: Error) => {
  const stack = error.stack || ''
  const stackLines = stack.split('\n').filter((line) => line.trim())

  // Extraer el archivo y línea donde ocurrió el error
  const errorLocation = stackLines[1]?.trim() || 'Ubicación desconocida'
  const fileMatch = errorLocation.match(/\(?(.*):(\d+):(\d+)\)?/)

  // Obtener las líneas del stack (excluyendo la primera que es el mensaje del error)
  const relevantStackLines = stackLines.slice(1)
  const firstFiveLines = relevantStackLines.slice(0, 5)

  // Información adicional del navegador
  const performanceMemory = (performance as Performance & { memory?: { usedJSHeapSize: number; totalJSHeapSize: number; jsHeapSizeLimit: number } })
    .memory

  const browserInfo = {
    userAgent: navigator.userAgent,
    language: navigator.language,
    platform: navigator.platform,
    viewport: `${window.innerWidth}x${window.innerHeight}`,
    screen: `${window.screen.width}x${window.screen.height}`,
    memory: performanceMemory
      ? {
          usedJSHeapSize: (performanceMemory.usedJSHeapSize / 1048576).toFixed(2) + ' MB',
          totalJSHeapSize: (performanceMemory.totalJSHeapSize / 1048576).toFixed(2) + ' MB',
          limit: (performanceMemory.jsHeapSizeLimit / 1048576).toFixed(2) + ' MB'
        }
      : null
  }

  return {
    name: error.name || 'Error',
    message: error.message || 'Error desconocido',
    file: fileMatch ? fileMatch[1] : null,
    line: fileMatch ? fileMatch[2] : null,
    column: fileMatch ? fileMatch[3] : null,
    stackLines: firstFiveLines.length > 0 ? firstFiveLines : stackLines,
    fullStack: stack,
    browserInfo,
    timestamp: new Date().toLocaleString('es-ES', {
      dateStyle: 'medium',
      timeStyle: 'medium'
    })
  }
}

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    alert('Error copiado al portapapeles')
  } catch (err) {
    console.error('Error al copiar:', err)
  }
}

export const ErrorFallback = ({ error }: FallbackProps) => {
  const errorInfo = getErrorInfo(error)
  const isDev = import.meta.env.DEV

  const errorReport = `
=== REPORTE DE ERROR ===
Tiempo: ${errorInfo.timestamp}
Tipo: ${errorInfo.name}
Mensaje: ${errorInfo.message}
${errorInfo.file ? `Archivo: ${errorInfo.file}` : ''}
${errorInfo.line ? `Línea: ${errorInfo.line}:${errorInfo.column}` : ''}
URL: ${window.location.href}
User Agent: ${navigator.userAgent}

=== STACK TRACE ===
${errorInfo.fullStack}
  `.trim()

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--background)] p-4 text-[var(--text)]">
      <Card className="w-full max-w-5xl bg-[var(--background)] !p-0 text-[var(--text)]">
        {/* Header */}
        <div className="border-b bg-[var(--background)]/70 p-6">
          <div className="flex items-start gap-4">
            <div className="bg-danger/15 rounded-full p-3">
              <AlertTriangle className="text-danger h-8 w-8" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-[var(--text)]">¡Ups! Algo salió mal</h2>
              <p className="mt-1 text-sm text-[var(--text)] opacity-70">La aplicación encontró un error inesperado</p>
            </div>
            <span className="badge bg-danger/90">{errorInfo.name}</span>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          {/* Error Message */}
          <div className="panel border-danger mb-6 border-l-4 bg-[var(--card)] text-[var(--text)]">
            <div className="flex items-start gap-3">
              <FileWarning className="text-danger mt-0.5 h-6 w-6" />
              <div>
                <h3 className="mb-1 font-semibold text-[var(--text)]">Mensaje del error</h3>
                <p className="text-danger/90 dark:text-danger/70 font-mono text-sm break-words">{errorInfo.message}</p>
              </div>
            </div>
          </div>

          {/* Error Location - Solo en DEV */}
          {isDev && errorInfo.file && (
            <div className="panel border-info mb-6 border-l-4 bg-[var(--card)] text-[var(--text)]">
              <div className="flex items-start gap-3">
                <MapPin className="text-info mt-0.5 h-6 w-6" />
                <div>
                  <h3 className="mb-2 font-semibold text-[var(--text)]">Ubicación del error</h3>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="font-semibold">Archivo:</span> <span className="font-mono">{errorInfo.file}</span>
                    </p>
                    <p>
                      <span className="font-semibold">Línea:</span>{' '}
                      <span className="font-mono">
                        {errorInfo.line}:{errorInfo.column}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Stack Trace - Solo en DEV */}
          {isDev && (
            <div className="mb-6">
              {errorInfo.stackLines.length > 0 ? (
                <>
                  <details open className="panel group mb-3 bg-[var(--card)] !p-0 text-[var(--text)]">
                    <summary className="flex cursor-pointer items-center gap-2 bg-[var(--card)] p-4 font-semibold transition hover:bg-[var(--card)]/80">
                      <ChevronRight className="h-5 w-5 transition group-open:rotate-90" />
                      Stack Trace (primeras {errorInfo.stackLines.length} líneas)
                    </summary>
                    <div className="max-h-64 overflow-auto bg-[var(--card)] p-4">
                      {errorInfo.stackLines.length > 0 ? (
                        <pre className="text-xs leading-relaxed">
                          {errorInfo.stackLines.map((line, idx) => (
                            <div key={idx} className="text-success hover:border-success hover:bg-success/10 border-l-2 border-gray-700 py-1 pl-3">
                              {line}
                            </div>
                          ))}
                        </pre>
                      ) : (
                        <p className="text-sm opacity-70">No hay stack trace disponible</p>
                      )}
                    </div>
                  </details>

                  <details className="panel group bg-[var(--card)] !p-0 text-[var(--text)]">
                    <summary className="flex cursor-pointer items-center gap-2 bg-[var(--card)] p-4 font-semibold transition hover:bg-[var(--card)]/80">
                      <ChevronRight className="h-5 w-5 transition group-open:rotate-90" />
                      Stack Trace completo
                    </summary>
                    <div className="max-h-96 overflow-auto bg-[var(--card)] p-4">
                      <pre className="text-xs leading-relaxed break-words whitespace-pre-wrap text-gray-300">{errorInfo.fullStack}</pre>
                    </div>
                  </details>
                </>
              ) : (
                <div className="panel bg-[var(--card)] p-4">
                  <p className="text-sm opacity-70">No hay stack trace disponible para este error</p>
                </div>
              )}
            </div>
          )}

          {/* Browser Info - Solo en DEV */}
          {isDev && errorInfo.browserInfo.memory && (
            <div className="panel border-warning mb-6 border-l-4 bg-[var(--card)] text-[var(--text)]">
              <div className="flex items-start gap-3">
                <Gauge className="text-warning mt-0.5 h-6 w-6" />
                <div>
                  <h3 className="mb-2 font-semibold text-[var(--text)]">Uso de memoria</h3>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <span className="opacity-70">Usado:</span> <span className="font-mono">{errorInfo.browserInfo.memory.usedJSHeapSize}</span>
                    </div>
                    <div>
                      <span className="opacity-70">Total:</span> <span className="font-mono">{errorInfo.browserInfo.memory.totalJSHeapSize}</span>
                    </div>
                    <div>
                      <span className="opacity-70">Límite:</span> <span className="font-mono">{errorInfo.browserInfo.memory.limit}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Additional Info */}
          <div className="mb-6 grid gap-4 text-[var(--text)] sm:grid-cols-2 lg:grid-cols-4">
            <div className="panel p-3">
              <p className="text-xs font-semibold uppercase opacity-60">Timestamp</p>
              <p className="mt-1 font-mono text-sm">{errorInfo.timestamp}</p>
            </div>
            <div className="panel p-3">
              <p className="text-xs font-semibold uppercase opacity-60">URL Actual</p>
              <p className="mt-1 truncate font-mono text-sm">{window.location.pathname}</p>
            </div>
            <div className="panel p-3">
              <p className="text-xs font-semibold uppercase opacity-60">Viewport</p>
              <p className="mt-1 font-mono text-sm">{errorInfo.browserInfo.viewport}</p>
            </div>
            <div className="panel p-3">
              <p className="text-xs font-semibold uppercase opacity-60">Plataforma</p>
              <p className="mt-1 font-mono text-sm">{errorInfo.browserInfo.platform}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <button onClick={() => window.location.reload()} className="btn btn-primary gap-2 shadow-md">
              <RefreshCw className="h-5 w-5" />
              Recargar página
            </button>
            <button onClick={() => (window.location.href = '/')} className="btn btn-secondary gap-2 shadow-md">
              <HomeIcon className="h-5 w-5" />
              Ir al inicio
            </button>
            {isDev && (
              <button onClick={() => copyToClipboard(errorReport)} className="btn btn-outline-dark gap-2 shadow-md">
                <ClipboardCopy className="h-5 w-5" />
                Copiar reporte
              </button>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="dark:border-white-dark/10 border-t p-4">
          <p className="text-center text-sm text-[var(--text)] opacity-70">
            {isDev ? '🔧 Modo desarrollo - Información detallada visible' : 'Si el problema persiste, contacta al soporte técnico'}
          </p>
        </div>
      </Card>
    </div>
  )
}
