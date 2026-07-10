import Button from '@/components/Buttons/Button'
import { ButtonTypeEnum } from '@/components/Buttons/enums/buttonType.enum'
import { File as FileIcon, Trash2 } from 'lucide-react'
import React from 'react'

export interface DocumentAttachmentProps {
  name: string
  onClick?: () => void
  onDelete?: () => void
  loading?: boolean
  deleteLabel?: string
  className?: string
}

export const DocumentAttachment: React.FC<DocumentAttachmentProps> = ({
  name,
  onClick,
  onDelete,
  loading = false,
  deleteLabel = 'Eliminar',
  className = ''
}) => {
  const clickable = Boolean(onClick) && !loading

  return (
    <div className={`flex items-center justify-between rounded border p-3 ${className}`}>
      <div
        className={`flex items-center gap-3 ${clickable ? 'cursor-pointer' : ''}`}
        onClick={clickable ? onClick : undefined}
        aria-disabled={!clickable}
      >
        <FileIcon size={20} />
        <span className="max-w-[60ch] truncate">{name}</span>
      </div>
      {onDelete && (
        <Button className="gap-2" type={ButtonTypeEnum.Button} onClick={onDelete} disabled={loading}>
          <Trash2 size={18} /> {deleteLabel}
        </Button>
      )}
    </div>
  )
}

export default DocumentAttachment
