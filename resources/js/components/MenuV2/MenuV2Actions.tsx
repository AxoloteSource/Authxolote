import Button from '@/components/Buttons/Button'
import { ButtonVariantEnum } from '@/components/Buttons/enums/buttonVariant.enum'
import { SizeEnum } from '@/enums/SizeEnum'
import { IMenuItem } from '@/interfaces/models/MenuItem/IMenuItem'
import { Pencil, Trash2 } from 'lucide-react'

interface MenuV2ActionsProps {
  item: IMenuItem
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
}

export const MenuV2Actions = ({ item, onEdit, onDelete }: MenuV2ActionsProps) => {
  return (
    <span className="flex shrink-0 items-center gap-1">
      <Button variant={ButtonVariantEnum.IconOutline} size={SizeEnum.XXS} color="warning" onClick={() => onEdit?.(item.id)}>
        <Pencil size={14} />
      </Button>
      <Button variant={ButtonVariantEnum.IconOutline} size={SizeEnum.XXS} color="danger" onClick={() => onDelete?.(item.id)}>
        <Trash2 size={14} />
      </Button>
    </span>
  )
}
