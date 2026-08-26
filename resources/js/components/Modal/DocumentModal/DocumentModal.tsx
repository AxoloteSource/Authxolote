import { CircleX, Download, Eye, TriangleAlert } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { IModalProps } from '../IModalProps'
import { useDocumentModal } from './useDocumentModal'

export const DocumentModal = ({ selectedFile, isOpen, close }: IModalProps) => {
  const { t } = useTranslation()
  const { isPDF, isImage, fileDisplayName, fileExtension, iframeUrl, isMobile, handleImageError } = useDocumentModal({ selectedFile })

  if (!isOpen || !selectedFile) return null

  const renderPreview = () => {
    if (isMobile) {
      return (
        <div className="bg-background flex h-full w-full items-center justify-center">
          <div className="mx-auto max-w-sm p-6 text-center">
            <Eye className="mx-auto mb-4 h-16 w-16 text-blue-500 dark:text-blue-400" />
            <h4 className="mb-2 text-lg font-medium text-gray-700 dark:text-gray-200">{t('file_ready_to_download')}</h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">{t('tap_button_to_download', { extension: fileExtension })}</p>
            <a
              href={selectedFile.download_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              <Download className="mr-2 h-5 w-5" />
              {t('download_file')}
            </a>
          </div>
        </div>
      )
    }

    if (isPDF) {
      return (
        <div className="flex h-full min-h-0 w-full bg-gray-100 dark:bg-gray-900">
          <iframe
            src={iframeUrl}
            className="flex h-full w-full overflow-hidden border-0 break-words"
            title={t('preview_of', { name: fileDisplayName })}
            style={{
              minHeight: '500px',
              backgroundColor: 'white',
              border: 'none',
              display: 'block'
            }}
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-downloads"
            allow="fullscreen"
            loading="eager"
          />
        </div>
      )
    }

    if (isImage) {
      return (
        <div className="flex h-full w-full items-center justify-center bg-gray-50 p-4 dark:bg-gray-800">
          <img src={selectedFile.download_url} alt={fileDisplayName} className="max-h-full max-w-full object-contain" onError={handleImageError} />
        </div>
      )
    }

    return (
      <div className="bg-background flex h-full w-full items-center justify-center">
        <div className="mx-auto max-w-sm p-6 text-center">
          <TriangleAlert className="mx-auto mb-4 h-16 w-16 text-yellow-500 dark:text-yellow-400" />
          <h4 className="mb-2 text-lg font-medium text-gray-700 dark:text-gray-200">{t('preview_not_available')}</h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">{t('file_type_not_previewable', { extension: fileExtension })}</p>
          <a
            href={selectedFile.download_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            <Download className="mr-2 h-5 w-5" />
            {t('download_file')}
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-opacity-75 fixed inset-0 z-[9999] bg-black p-2 sm:p-4">
      <div className="absolute inset-0" onClick={close} />

      <div className="relative mx-auto flex h-full w-full max-w-full flex-col overflow-hidden rounded-lg bg-white sm:max-w-7xl">
        <div className="flex shrink-0 items-center justify-between gap-2 border-b border-gray-200 bg-white p-2 sm:gap-3 sm:p-4">
          <div className="flex min-w-0 flex-1 items-center space-x-2 overflow-hidden sm:space-x-3">
            <Eye className="h-4 w-4 shrink-0 text-blue-600 sm:h-5 sm:w-5" />
            <div className="min-w-0 flex-1 overflow-hidden">
              <h3 className="text-xs leading-tight font-medium break-words text-gray-900 sm:text-sm" title={fileDisplayName}>
                {fileDisplayName}
              </h3>
              <p className="truncate text-xs text-gray-500">{t('file_extension_label', { extension: fileExtension })}</p>
            </div>
          </div>

          <div className="flex shrink-0 items-center space-x-1">
            <a
              href={selectedFile.download_url}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center rounded-md bg-blue-600 px-2 py-1.5 text-xs text-white transition-colors hover:bg-blue-700 sm:flex"
              title={t('download_file')}
            >
              <Download className="mr-1 h-3 w-3" />
              <span>{t('download')}</span>
            </a>

            <a
              href={selectedFile.download_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-600 text-white transition-colors hover:bg-blue-700 sm:hidden"
              title={t('download_file')}
            >
              <Download className="h-3 w-3" />
            </a>

            <button
              onClick={close}
              className="flex h-7 w-7 items-center justify-center rounded-md text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 sm:h-8 sm:w-8"
              title={t('close')}
            >
              <CircleX className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="relative min-h-0 flex-1 overflow-hidden">{renderPreview()}</div>
      </div>
    </div>
  )
}
