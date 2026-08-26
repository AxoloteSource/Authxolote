import { alertSwal } from '@/components/AlertSwal/AlertSwal'
import { IOptions } from '@/components/Form/Select/interfaces/IOptions'
import { AlertTypeEnum } from '@/enums/types/AlertTypeEnum'
import { IMenuItem } from '@/interfaces/models/MenuItem/IMenuItem'
import { useServiceDeleteMenuItem, useServiceToggleMenuItemRole } from '@/services/authxolote/menuItems/useServiceMenuItems'
import { useServiceShowAllMenu } from '@/services/authxolote/menus/useServiceMenus'
import { useServiceIndexRoles } from '@/services/authxolote/roles/useServiceRoles'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { SingleValue, MultiValue } from 'react-select'

export const useMenuShowPage = () => {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const slug = searchParams.get('slug')
  const enabled = Boolean(slug)
  const [roleId, setRoleId] = useState<string | null>(null)
  const [selectedMenuItem, setSelectedMenuItem] = useState<IMenuItem | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { data: menu, isLoading, refetch: refetchMenu } = useServiceShowAllMenu(slug ?? '', enabled, roleId)
  const { data: rolesData, isLoading: rolesLoading } = useServiceIndexRoles({ page: 1, limit: 100 })
  const { mutateAsync: deleteMenuItem } = useServiceDeleteMenuItem()
  const { mutateAsync: toggleMenuItemRole } = useServiceToggleMenuItemRole()

  const roleOptions = useMemo<IOptions[]>(
    () => (rolesData?.data ?? []).map((role) => ({ value: role.id, label: role.name })),
    [rolesData]
  )

  const handleEdit = (item: IMenuItem) => {
    setSelectedMenuItem(item)
  }

  const handleToggleRole = (item: IMenuItem) => {
    if (!roleId) {
      return
    }

    toggleMenuItemRole({ id: item.id, roleId, active: !item.has_role }).then(() => refetchMenu())
  }

  const handleDelete = async (id: string) => {
    const result = await alertSwal({
      type: AlertTypeEnum.Confirm,
      title: t('confirm_delete_menu_item'),
      text: t('cannot_undo')
    })

    if (result?.isConfirmed) {
      deleteMenuItem(id).then(() => {
        refetchMenu()
        alertSwal({ type: AlertTypeEnum.SuccessNotification })
      })
    }
  }

  const handleCancel = () => {
    setSelectedMenuItem(null)
  }

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const handleSuccess = () => {
    setSelectedMenuItem(null)
    refetchMenu()
  }

  const handleRoleChange = (newValue: SingleValue<IOptions> | MultiValue<IOptions>) => {
    const value = (newValue as SingleValue<IOptions> | null)?.value
    setRoleId(value != null ? String(value) : null)
  }

  return {
    menu,
    isLoading,
    slug,
    roleOptions,
    rolesLoading,
    roleId,
    setRoleId,
    refetchMenu,
    selectedMenuItem,
    setSelectedMenuItem,
    handleEdit,
    handleToggleRole,
    handleDelete,
    handleCancel,
    handleSuccess,
    handleRoleChange,
    isModalOpen,
    openModal,
    closeModal
  }
}
