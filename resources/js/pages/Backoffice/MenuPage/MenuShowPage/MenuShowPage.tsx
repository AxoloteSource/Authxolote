import { alertSwal } from '@/components/AlertSwal/AlertSwal'
import Card from '@/components/Card/Card'
import CardTitle from '@/components/Card/partials/CardTitle'
import InputSelect from '@/components/Form/Select/Select'
import { IOptions } from '@/components/Form/Select/interfaces/IOptions'
import { MenuV2 } from '@/components/MenuV2/MenuV2'
import { Page } from '@/components/Page/Page'
import { AlertTypeEnum } from '@/enums/types/AlertTypeEnum'
import { IMenuItem } from '@/interfaces/models/MenuItem/IMenuItem'
import { RoutesBackoffice } from '@/routes/modules/backoffice.routes'
import { useServiceDeleteMenuItem, useServiceToggleMenuItemRole } from '@/services/authxolote/menuItems/useServiceMenuItems'
import { Form, Formik } from 'formik'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SingleValue, MultiValue } from 'react-select'
import { MenuItemFormFields } from '../MenuItemsPage/partials/MenuItemForm/MenuItemFormFields'
import { useMenuShowPage } from './useMenuShowPage'

const breadCrumblesItems = [
  { to: RoutesBackoffice.Home, children: 'home' },
  { to: RoutesBackoffice.MenuMenus, children: 'menus' },
  { children: 'menu_show' }
]

interface IInitialValuesMenuShow {
  role_id: string
}

const MenuShowPage = () => {
  const { menu, roleOptions, rolesLoading, setRoleId, roleId, refetchMenu } = useMenuShowPage()
  const { t } = useTranslation()
  const [selectedMenuItem, setSelectedMenuItem] = useState<IMenuItem | null>(null)
  const { mutateAsync: deleteMenuItem } = useServiceDeleteMenuItem()
  const { mutateAsync: toggleMenuItemRole } = useServiceToggleMenuItemRole()

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

  const handleSuccess = () => {
    setSelectedMenuItem(null)
    refetchMenu()
  }

  const handleRoleChange = (newValue: SingleValue<IOptions> | MultiValue<IOptions>) => {
    const value = (newValue as SingleValue<IOptions> | null)?.value
    setRoleId(value != null ? String(value) : null)
  }

  return (
    <Page titleTranslation="menu_show" breadCrumblesItems={breadCrumblesItems}>
      <div className="flex gap-4">
        <div className="flex w-full max-w-sm flex-col gap-4">
          <Card>
            <Formik<IInitialValuesMenuShow> initialValues={{ role_id: '' }} onSubmit={() => {}}>
              {(formik) => (
                <Form>
                  <InputSelect<IInitialValuesMenuShow>
                    name="role_id"
                    label={t('role')}
                    formik={formik}
                    options={roleOptions}
                    isLoading={rolesLoading}
                    onChange={handleRoleChange}
                  />
                </Form>
              )}
            </Formik>
          </Card>
          <Card>
            <CardTitle>{t('menu')}</CardTitle>
            <nav className={`sidebar py-4 shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-all duration-300`}>
              <ul className="relative space-y-0.5 p-4 py-0 font-semibold">
                <li className="nav-item">
                  <MenuV2 menu={menu} editMode onEdit={handleEdit} onDelete={handleDelete} onToggleRole={handleToggleRole} />
                </li>
              </ul>
            </nav>
            <div className="mt-4 flex flex-col gap-2 border-t border-[var(--border)] pt-4">
              <span className="text-sm font-semibold">{t('legend')}</span>
              <div className="flex flex-col justify-start gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="inline-block rounded border border-[var(--border)] px-2 py-1">A</span>
                  <span>{t('menu_item_active')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block rounded bg-gray-500 px-2 py-1 text-white">A</span>
                  <span>{t('menu_item_missing_role')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block rounded border border-[var(--border)] px-2 py-1 text-gray-400">A</span>
                  <span>{t('menu_item_disabled')}</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
        <Card className="w-full">
          {selectedMenuItem && (
            <div>
              <MenuItemFormFields selectedMenuItem={selectedMenuItem} onSuccess={handleSuccess} onCancel={handleCancel} />
            </div>
          )}
        </Card>
      </div>
    </Page>
  )
}

export default MenuShowPage
