import { Accept } from 'react-dropzone'

export interface DragDropFilesProps {
  onUploadFile: (files: File[]) => Promise<void>
  isLoading: boolean
  multiple: boolean
  accept?: Accept
}
