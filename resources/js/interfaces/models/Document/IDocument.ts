import { IDocumentType } from '@/interfaces/models/Document/IDocumentType'
import { IFile } from '@/interfaces/models/File/IFile'

export interface IDocument {
  id: number
  document_type_id: number
  reception_date: string
  document_date: string
  documentable_type: string
  documentable_id: number
  reception_date_format: string | null
  document_type: IDocumentType
  files: IFile
}
