import { IOptions } from '@/components/Form/Select/interfaces/IOptions'
import { useOnSubmit } from '@/hooks/useOnSubmit'
import { IMenuItem, MenuItemType } from '@/interfaces/models/MenuItem/IMenuItem'
import { useServiceIndexMenus } from '@/services/authxolote/menus/useServiceMenus'
import { useMenuItemsTree, useServiceStoreMenuItem, useServiceUpdateMenuItem } from '@/services/authxolote/menuItems/useServiceMenuItems'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'
import { es } from 'yup-locales'
Yup.setLocale(es)

export interface IInitialValuesMenuItem {
  menu_id: string
  parent_id: string
  type: MenuItemType
  name: string
  slug: string
  route: string
  path: string
  icon: string
  sort_order: number
  active: boolean
}
const initialValues: IInitialValuesMenuItem = {
  menu_id: '',
  parent_id: '',
  type: 'link',
  name: '',
  slug: '',
  route: '',
  path: '',
  icon: '',
  sort_order: 0,
  active: true
}

interface IUseMenuItemFormProps {
  selectedMenuItem?: IMenuItem | null
  onSuccess?: () => void
}

export const useMenuItemForm = ({ selectedMenuItem, onSuccess }: IUseMenuItemFormProps) => {
  const { t } = useTranslation()
  const { data: menusData, isLoading: menusLoading } = useServiceIndexMenus({ page: 1, limit: 100 })
  const [menuId, setMenuId] = useState<string>(selectedMenuItem?.menu_id ?? '')
  const { options: parentOptions, isLoading: parentLoading } = useMenuItemsTree({ menu_id: menuId })

  const menuOptions = useMemo<IOptions[]>(
    () => (menusData?.data ?? []).map((menu) => ({ value: menu.id, label: `${menu.name} (${menu.application ?? ''})` })),
    [menusData]
  )

  const typeOptions = useMemo<IOptions[]>(
    () => [
      { value: 'link', label: t('link') },
      { value: 'header', label: t('header') }
    ],
    [t]
  )

  const validationSchema = Yup.object().shape({
    menu_id: Yup.string().required(t('menu_required')),
    name: Yup.string().required(t('name_required')),
    slug: Yup.string().required(t('slug_required')),
    type: Yup.mixed<MenuItemType>()
      .oneOf(['link', 'header'])
      .test('check-path-or-route', t('menu_item_path_or_route_error'), function (value) {
        if (value === 'header') {
          return !String(this.parent.route).trim() && !String(this.parent.path).trim()
        }

        return Boolean(String(this.parent.route).trim() || String(this.parent.path).trim())
      })
  })

  const mutator = useServiceStoreMenuItem()
  const mutatorUpdate = useServiceUpdateMenuItem(selectedMenuItem?.id ?? '')

  const { onSubmit } = useOnSubmit<IInitialValuesMenuItem>({
    mutateAsync: selectedMenuItem?.id ? mutatorUpdate.mutateAsync : mutator.mutateAsync,
    formatData: (data) => {
      if (data.type === 'header') {
        return { ...data, route: null as unknown as string, path: null as unknown as string }
      }

      return data
    },
    onSuccess: async () => {
      if (onSuccess) {
        onSuccess()
      }
    }
  })

  const filledValues = {
    ...initialValues,
    menu_id: selectedMenuItem?.menu_id ?? '',
    parent_id: selectedMenuItem?.parent_id ?? '',
    type: (selectedMenuItem?.type ?? 'link') as MenuItemType,
    name: selectedMenuItem?.name ?? '',
    slug: selectedMenuItem?.slug ?? '',
    route: selectedMenuItem?.route ?? '',
    path: selectedMenuItem?.path ?? '',
    icon: selectedMenuItem?.icon ?? '',
    sort_order: selectedMenuItem?.sort_order ?? 0,
    active: selectedMenuItem?.active ?? true
  }

  const formikProps = {
    validationSchema,
    initialValues: filledValues,
    onSubmit
  }

  return { formikProps, t, menuOptions, menusLoading, parentOptions, parentLoading, typeOptions, menuId, setMenuId }
}
