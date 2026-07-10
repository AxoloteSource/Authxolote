import { getFileIcon } from '@/components/Form/DargDropFile/helpers/getFileIcon'
import { IUseDragDropFilesProps } from '@/components/Form/DargDropFile/interfaces/IUseDragDropFilesProps'
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

export const useDragDropFiles = ({ onUploadFile, multiple = true, accept }: IUseDragDropFilesProps) => {
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      await onUploadFile(acceptedFiles)
    },
    [onUploadFile]
  )

  const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
    noClick: true,
    noKeyboard: true,
    onDrop,
    multiple,
    accept
  })

  const onClick = () => {
    open()
  }

  return {
    onClick,
    getRootProps,
    getInputProps,
    acceptedFiles,
    getFileIcon
  }
}
