import React from 'react'
import { SelectedFile } from './DocumentModal/types'

export interface IModalProps {
  icon?: React.ReactNode
  title?: string | React.ReactNode
  children?: React.ReactNode
  isOpen: boolean
  close: () => void
  className?: string
  closeOnOverlayClick?: boolean
  selectedFile?: SelectedFile | null
}
