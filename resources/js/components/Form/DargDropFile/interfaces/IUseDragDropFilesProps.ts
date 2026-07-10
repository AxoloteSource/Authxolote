import { Accept } from 'react-dropzone'

export interface IUseDragDropFilesProps {
  onUploadFile: (files: File[]) => Promise<void>
  multiple: boolean
  accept?: Accept
}
