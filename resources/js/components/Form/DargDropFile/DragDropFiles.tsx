import Button from '@/components/Buttons'
import { ButtonVariantEnum } from '@/components/Buttons/enums/buttonVariant.enum'
import { DragDropFilesProps } from '@/components/Form/DargDropFile/interfaces/DragDropFilesProps'
import { useDragDropFiles } from '@/components/Form/DargDropFile/useDragDropFiles'
import Typography from '@/components/Typography'
import { TypographyVariantEnum } from '@/components/Typography/enums/typographyVariant.enum'
import { FileText, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const DragDropFiles = ({ onUploadFile, isLoading, multiple, accept, ...props }: DragDropFilesProps) => {
  const { t } = useTranslation()
  const [files, setFiles] = useState<File[]>([])
  const [wasCleared, setWasCleared] = useState(false)

  const { onClick, getRootProps, getInputProps, getFileIcon } = useDragDropFiles({
    onUploadFile: async (newFiles) => {
      setFiles((prevFiles) => {
        let updatedFiles: File[]

        if (wasCleared || prevFiles.length === 0) {
          updatedFiles = newFiles
          setWasCleared(false)
        } else if (multiple) {
          updatedFiles = [...prevFiles, ...newFiles]
        } else {
          updatedFiles = newFiles
        }

        onUploadFile(updatedFiles)

        return updatedFiles
      })
    },
    multiple,
    accept
  })

  const handleRemoveFile = () => {
    setFiles([])
    setWasCleared(true)
    onUploadFile([])
  }

  const handleRemoveIndividualFile = (indexToRemove: number) => {
    setFiles((prevFiles) => {
      const updatedFiles = prevFiles.filter((_, index) => index !== indexToRemove)
      onUploadFile(updatedFiles)

      if (updatedFiles.length === 0) {
        setWasCleared(true)
      } else {
        setWasCleared(false)
      }

      return updatedFiles
    })
  }

  return (
    <>
      <section
        {...props}
        className={`border-gray-mid flex items-center justify-center border border-dashed bg-[var(--input-background)] transition-all ${files.length === 0 ? 'min-h-[246px]' : 'min-h-[120px] py-4'}`}
      >
        <div
          {...getRootProps({
            className: 'flex flex-col justify-center items-center w-full'
          })}
        >
          <input {...getInputProps()} />
          {files.length === 0 ? (
            <>
              <Typography variant={TypographyVariantEnum.H3}>{t('drag_file_into_the_box')}</Typography>
              <Typography variant={TypographyVariantEnum.H3}>{t('or')}</Typography>
              <div className="mt-4 mb-4 flex gap-4">
                <Button loading={isLoading} onClick={onClick} variant={ButtonVariantEnum.Solid}>
                  {t('import')}
                </Button>
              </div>
            </>
          ) : (
            <div className="flex w-full flex-col items-center gap-3 px-4 text-center">
              {multiple && files.length > 1 ? (
                <div className="max-h-32 w-full overflow-y-auto">
                  <Typography variant={TypographyVariantEnum.H3} className="mb-3">
                    {files.length} {t('files_selected')}
                  </Typography>
                  <div className="w-full space-y-2">
                    {files.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-3 py-3 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-900/80 dark:hover:border-gray-600 dark:hover:bg-gray-900"
                      >
                        {getFileIcon(file.name)}
                        <span className="flex-1 truncate text-left text-sm font-medium text-gray-700 dark:text-gray-300">{file.name}</span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleRemoveIndividualFile(index)
                          }}
                          className="flex-shrink-0 text-red-500 transition-colors hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                          title={t('delete')}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-5 text-center">
                  <FileText size={48} />
                  <Typography variant={TypographyVariantEnum.H3}>{files[0].name}</Typography>
                </div>
              )}
              <div className="flex gap-4">
                <Button variant={ButtonVariantEnum.Outline} onClick={onClick} loading={isLoading} className="btn btn-primary text-white">
                  {multiple && files.length > 1 ? t('add_more') : t('replace')}
                </Button>
                <Button variant={ButtonVariantEnum.Outline} onClick={handleRemoveFile} className="btn btn-danger text-white hover:bg-red-600">
                  {multiple && files.length > 1 ? t('remove_all') : t('remove')}
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default DragDropFiles
