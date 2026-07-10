import { useIsMobile } from '@/hooks/useIsMobile'
import { useMemo } from 'react'
import { SelectedFile } from './types'

interface UseDocumentModalProps {
  selectedFile: SelectedFile | null | undefined
}

interface UseDocumentModalReturn {
  isPDF: boolean
  isImage: boolean
  isPreviewable: boolean
  fileDisplayName: string
  fileExtension: string
  iframeUrl: string
  isMobile: boolean
  handleImageError: (e: React.SyntheticEvent<HTMLImageElement>) => void
}

export const useDocumentModal = ({ selectedFile }: UseDocumentModalProps): UseDocumentModalReturn => {
  const isMobile = useIsMobile()

  const fileInfo = useMemo(() => {
    if (!selectedFile) {
      return {
        isPDF: false,
        isImage: false,
        isPreviewable: false,
        fileDisplayName: '',
        fileExtension: '',
        iframeUrl: ''
      }
    }

    const extension = selectedFile.extension.toLowerCase()
    const mimeType = selectedFile.mime_type

    const isPDF = extension === 'pdf' || mimeType?.includes('pdf') || false
    const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(extension) || mimeType?.startsWith('image/') || false

    const isPreviewable = isPDF || isImage
    const fileDisplayName = selectedFile.name
    const fileExtension = selectedFile.extension.toUpperCase()
    const iframeUrl = `${selectedFile.download_url}#view=FitH&toolbar=1`

    return {
      isPDF,
      isImage,
      isPreviewable,
      fileDisplayName,
      fileExtension,
      iframeUrl
    }
  }, [selectedFile])

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (!selectedFile) return

    const target = e.target as HTMLImageElement
    const container = target.closest('div') as HTMLElement

    if (container) {
      container.innerHTML = `
        <div class="text-center p-6">
          <div class="text-4xl mb-4">⚠️</div>
          <p class="text-gray-600 mb-4">No se pudo cargar la imagen</p>
          <a href="${selectedFile.download_url}"
             target="_blank"
             rel="noopener noreferrer"
             class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
            </svg>
            Descargar archivo
          </a>
        </div>
      `
    }
  }

  return {
    ...fileInfo,
    isMobile,
    handleImageError
  }
}
