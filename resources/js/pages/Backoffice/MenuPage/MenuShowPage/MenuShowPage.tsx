import Card from '@/components/Card/Card'
import CardTitle from '@/components/Card/partials/CardTitle'
import InputSelect from '@/components/Form/Select/Select'
import { IOptions } from '@/components/Form/Select/interfaces/IOptions'
import { MenuV2 } from '@/components/MenuV2/MenuV2'
import { resolveIcon } from '@/components/MenuV2/resolveIcon'
import { Page } from '@/components/Page/Page'
import { RoutesBackoffice } from '@/routes/modules/backoffice.routes'
import { Form, Formik } from 'formik'
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
  const {
    menu,
    roleOptions,
    rolesLoading,
    selectedMenuItem,
    handleEdit,
    handleToggleRole,
    handleDelete,
    handleCancel,
    handleSuccess,
    handleRoleChange
  } = useMenuShowPage()
  const { t } = useTranslation()

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
              <p className="text-sm text-gray-500">{t('menu_item_toggle_hint')}</p>
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
              <CardTitle>
                <span className="flex">
                  {resolveIcon(selectedMenuItem.icon, 'mr-2')}
                  {t(selectedMenuItem.name)}
                </span>
              </CardTitle>
              <MenuItemFormFields selectedMenuItem={selectedMenuItem} onSuccess={handleSuccess} onCancel={handleCancel} />
            </div>
          )}
        </Card>
      </div>
    </Page>
  )
}

export default MenuShowPage
