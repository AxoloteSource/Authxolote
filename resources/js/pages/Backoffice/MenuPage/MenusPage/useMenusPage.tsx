import Button from '@/components/Buttons/Button'
import { ButtonVariantEnum } from '@/components/Buttons/enums/buttonVariant.enum'
import { Badge } from '@/components/Badge/Badge'
import { IFilters } from '@/components/Filters/ModalFilter/types'
import { SizeEnum } from '@/enums/SizeEnum'
import { useModal } from '@/hooks/useModal'
import { useRefreshKey } from '@/hooks/useRefreshKey'
import { IMenu } from '@/interfaces/models/Menu/IMenu'
import { RoutesBackoffice } from '@/routes/modules/backoffice.routes'
import { useServiceDeleteMenu, useServiceIndexMenus } from '@/services/authxolote/menus/useServiceMenus'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { Eye, Pencil, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export interface IFilterSearchMenu {
  name: string
}

export const useMenusPage = () => {
  const { isOpen, open, close } = useModal(false)
  const { t } = useTranslation()
  const [selectedMenu, setSelectedMenu] = useState<IMenu | null>(null)
  const filters: IFilters<IFilterSearchMenu>[] = [
    {
      property: 'name',
      initialValue: ''
    }
  ]

  const { refreshKey, handleSuccess } = useRefreshKey({ module: 'menu', service: useServiceIndexMenus, close })

  const handleEdit = (data: IMenu) => {
    open()
    setSelectedMenu(data)
  }

  const handleOpen = () => {
    open()
    setSelectedMenu(null)
  }

  const handleDeleteAction = (data: IMenu) => () => {
    const confirmed = window.confirm(t('confirm_delete_menu'))
    if (confirmed) {
      const { mutateAsync } = useServiceDeleteMenu(data.id)
      mutateAsync({}).then(() => {
        handleSuccess()
      })
    }
  }

  const renderersMap = {
    active: (data: IMenu) => {
      return (
        <Badge variant={data.active ? 'success' : 'danger'}>
          {data.active ? t('yes') : t('no')}
        </Badge>
      )
    },
    created_at: (data: IMenu) => {
      return format(new Date(data.created_at), "d 'de' MMMM yyyy, HH:mm", { locale: es })
    },
    actions: (data: IMenu) => {
      return (
        <div className="flex gap-2">
          <Link to={`${RoutesBackoffice.MenuShow}?slug=${data.slug}`}>
            <Button variant={ButtonVariantEnum.IconOutline} size={SizeEnum.XS} color="primary">
              <Eye size={14} />
            </Button>
          </Link>
          <Button variant={ButtonVariantEnum.IconOutline} size={SizeEnum.XS} color="warning" onClick={() => handleEdit(data)}>
            <Pencil size={14} />
          </Button>
          <Button variant={ButtonVariantEnum.IconOutline} size={SizeEnum.XS} color="danger" onClick={handleDeleteAction(data)}>
            <Trash2 size={14} />
          </Button>
        </div>
      )
    }
  }

  return {
    isOpen,
    open: handleOpen,
    close,
    filters,
    renderersMap,
    selectedMenu,
    refreshKey,
    handleSuccess
  }
}
