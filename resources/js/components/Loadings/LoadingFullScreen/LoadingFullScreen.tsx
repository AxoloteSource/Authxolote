import { ILoadingFullScreenProps } from '@/components/Loadings/LoadingFullScreen/ILoadingFullScreenProps'
import { useLoadingFullScreen } from './useLoadingFullScreen'

const LoadingFullScreen = (props: ILoadingFullScreenProps) => {
  const { isLoading, message } = props
  const { initialMessage } = useLoadingFullScreen(message)

  if (!isLoading) {
    return null
  }

  return (
    <div className="bg-opacity-75 fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="flex flex-col items-center rounded-lg bg-white p-6 shadow-lg">
        <div className="border-primary mb-4 h-16 w-16 animate-spin rounded-full border-t-4 border-b-4"></div>
        <p className="font-medium text-gray-700">{initialMessage}</p>
      </div>
    </div>
  )
}

export default LoadingFullScreen
