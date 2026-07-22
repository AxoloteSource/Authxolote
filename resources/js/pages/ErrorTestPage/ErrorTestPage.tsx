import { Page } from '@/components/Page/Page'
import { useState } from 'react'

const ErrorTestPage = () => {
  const [state, setState] = useState({ value: 'test' })

  const triggerTypeError = () => {
    // Intentional error for testing
    const obj: Record<string, unknown> | null = null
    console.log(obj.nonExistent.property)
  }

  const triggerReferenceError = () => {
    // Intentional error for testing - undeclared variable
    // @ts-expect-error - Undeclared variable for error testing
    console.log(nonExistentVariable)
  }

  const triggerRangeError = () => {
    const recursiveFunction = (): never => {
      return recursiveFunction()
    }
    recursiveFunction()
  }

  const triggerSyntaxError = () => {
    // Simulate a SyntaxError without using eval (insecure and deprecated)
    throw new SyntaxError('Invalid syntax: expected } at the end of the function')
  }

  const triggerURIError = () => {
    decodeURIComponent('%')
  }

  const triggerCustomError = () => {
    throw new Error('Este es un error personalizado para pruebas de ErrorBoundary')
  }

  const triggerStateError = () => {
    // Intentional error for testing
    // @ts-expect-error - setState can receive null in testing
    setState(null)
    // Safe access after the error
    console.log(state.value?.toUpperCase?.())
  }

  const triggerAsyncError = async () => {
    throw new Error('Uncaught async error')
  }

  const triggerComponentError = () => {
    setState({ ...state, value: undefined as unknown as string })
  }

  const triggerNetworkError = async () => {
    await fetch('https://invalid-url-that-does-not-exist-12345.com/api/test')
  }

  const triggerMemoryError = () => {
    // Intentional memory exhaustion - may freeze the browser
    const arr: number[] = []
    while (true) {
      arr.push(...new Array(1000000).fill(0))
    }
  }

  const triggerPromiseRejection = () => {
    // Unhandled promise rejection
    Promise.reject(new Error('Promise rejected without .catch()'))
  }

  return (
    <Page titleTranslation="Error Test Page">
      <div className="space-y-6">
        <div className="panel">
          <h2 className="mb-4 text-xl font-bold">🧪 Página de Prueba de Errores</h2>
          <p className="mb-6 text-sm opacity-70">
            Esta página contiene botones que generan diferentes tipos de errores de JavaScript para probar el ErrorBoundary.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* TypeError */}
            <div className="panel bg-danger/5 p-4">
              <h3 className="mb-2 flex items-center gap-2 font-semibold">
                <span className="badge bg-danger">TypeError</span>
              </h3>
              <p className="mb-3 text-xs opacity-70">Intenta acceder a una propiedad de null/undefined</p>
              <button onClick={triggerTypeError} className="btn btn-danger btn-sm w-full">
                Generar TypeError
              </button>
            </div>

            {/* ReferenceError */}
            <div className="panel bg-warning/5 p-4">
              <h3 className="mb-2 flex items-center gap-2 font-semibold">
                <span className="badge bg-warning">ReferenceError</span>
              </h3>
              <p className="mb-3 text-xs opacity-70">Intenta usar una variable no declarada</p>
              <button onClick={triggerReferenceError} className="btn btn-warning btn-sm w-full">
                Generar ReferenceError
              </button>
            </div>

            {/* RangeError */}
            <div className="panel bg-info/5 p-4">
              <h3 className="mb-2 flex items-center gap-2 font-semibold">
                <span className="badge bg-info">RangeError</span>
              </h3>
              <p className="mb-3 text-xs opacity-70">Stack overflow por recursión infinita</p>
              <button onClick={triggerRangeError} className="btn btn-info btn-sm w-full">
                Generar RangeError
              </button>
            </div>

            {/* SyntaxError */}
            <div className="panel bg-secondary/5 p-4">
              <h3 className="mb-2 flex items-center gap-2 font-semibold">
                <span className="badge bg-secondary">SyntaxError</span>
              </h3>
              <p className="mb-3 text-xs opacity-70">Eval con sintaxis inválida</p>
              <button onClick={triggerSyntaxError} className="btn btn-secondary btn-sm w-full">
                Generar SyntaxError
              </button>
            </div>

            {/* URIError */}
            <div className="panel bg-dark/5 p-4">
              <h3 className="mb-2 flex items-center gap-2 font-semibold">
                <span className="badge bg-dark">URIError</span>
              </h3>
              <p className="mb-3 text-xs opacity-70">URI malformado</p>
              <button onClick={triggerURIError} className="btn btn-dark btn-sm w-full">
                Generar URIError
              </button>
            </div>

            {/* Custom Error */}
            <div className="panel bg-primary/5 p-4">
              <h3 className="mb-2 flex items-center gap-2 font-semibold">
                <span className="badge bg-primary">Custom Error</span>
              </h3>
              <p className="mb-3 text-xs opacity-70">Error personalizado lanzado manualmente</p>
              <button onClick={triggerCustomError} className="btn btn-primary btn-sm w-full">
                Generar Custom Error
              </button>
            </div>

            {/* State Error */}
            <div className="panel bg-success/5 p-4">
              <h3 className="mb-2 flex items-center gap-2 font-semibold">
                <span className="badge bg-success">State Error</span>
              </h3>
              <p className="mb-3 text-xs opacity-70">Error al manipular el estado de React</p>
              <button onClick={triggerStateError} className="btn btn-success btn-sm w-full">
                Generar State Error
              </button>
            </div>

            {/* Component Error */}
            <div className="panel bg-danger/5 p-4">
              <h3 className="mb-2 flex items-center gap-2 font-semibold">
                <span className="badge bg-danger">Component Error</span>
              </h3>
              <p className="mb-3 text-xs opacity-70">Error al renderizar componente</p>
              <button onClick={triggerComponentError} className="btn btn-danger btn-sm w-full">
                Generar Component Error
              </button>
            </div>

            {/* Async Error (NO capturado por ErrorBoundary) */}
            <div className="panel bg-warning/5 p-4">
              <h3 className="mb-2 flex items-center gap-2 font-semibold">
                <span className="badge bg-warning">Async Error ⚠️</span>
              </h3>
              <p className="mb-3 text-xs opacity-70">No capturado por ErrorBoundary (ver consola)</p>
              <button onClick={triggerAsyncError} className="btn btn-warning btn-sm w-full">
                Generar Async Error
              </button>
            </div>

            {/* Network Error */}
            <div className="panel bg-info/5 p-4">
              <h3 className="mb-2 flex items-center gap-2 font-semibold">
                <span className="badge bg-info">Network Error ⚠️</span>
              </h3>
              <p className="mb-3 text-xs opacity-70">Error de red (ver consola)</p>
              <button onClick={triggerNetworkError} className="btn btn-info btn-sm w-full">
                Generar Network Error
              </button>
            </div>

            {/* Memory Error (PELIGROSO - puede congelar el navegador) */}
            <div className="panel bg-danger/10 p-4">
              <h3 className="mb-2 flex items-center gap-2 font-semibold">
                <span className="badge bg-danger">Memory Error ⚠️⚠️</span>
              </h3>
              <p className="mb-3 text-xs opacity-70">PELIGROSO: Puede congelar el navegador</p>
              <button
                onClick={() => {
                  if (confirm('¿Estás seguro? Esto puede congelar tu navegador')) {
                    triggerMemoryError()
                  }
                }}
                className="btn btn-danger btn-sm w-full"
              >
                Generar Memory Error
              </button>
            </div>

            {/* Promise Rejection */}
            <div className="panel bg-secondary/5 p-4">
              <h3 className="mb-2 flex items-center gap-2 font-semibold">
                <span className="badge bg-secondary">Promise Rejection ⚠️</span>
              </h3>
              <p className="mb-3 text-xs opacity-70">No capturado por ErrorBoundary (ver consola)</p>
              <button onClick={triggerPromiseRejection} className="btn btn-secondary btn-sm w-full">
                Generar Promise Rejection
              </button>
            </div>
          </div>
        </div>

        {/* Info sobre ErrorBoundary */}
        <div className="panel bg-primary/5">
          <h3 className="mb-3 font-semibold">ℹ️ Información sobre ErrorBoundary</h3>
          <div className="space-y-2 text-sm">
            <p>
              <strong>✅ Capturados por ErrorBoundary:</strong>
            </p>
            <ul className="ml-6 list-disc space-y-1 opacity-70">
              <li>TypeError, ReferenceError, RangeError, SyntaxError, URIError</li>
              <li>Errores en constructores, render y lifecycle methods</li>
              <li>Errores lanzados con throw en componentes</li>
            </ul>

            <p className="mt-4">
              <strong>❌ NO capturados por ErrorBoundary:</strong>
            </p>
            <ul className="ml-6 list-disc space-y-1 opacity-70">
              <li>Errores en event handlers (onClick, onChange, etc.)</li>
              <li>Errores asíncronos (async/await sin try-catch)</li>
              <li>Errores en código del servidor (SSR)</li>
              <li>Errores en el mismo ErrorBoundary</li>
              <li>Promise rejections sin .catch()</li>
            </ul>
          </div>
        </div>

        {/* Componente que causa error al renderizar */}
        {state.value === undefined && <div>{(state.value as unknown as string).toUpperCase()}</div>}
      </div>
    </Page>
  )
}

export default ErrorTestPage
