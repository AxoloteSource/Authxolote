import { Page } from '@/components/Page/Page'
import { DataTableFilter } from '@/components/Tables/DataTableFilter/DataTableFilter'
import { RoutesBackoffice } from '@/routes/modules/backoffice.routes'
import { useServiceIndexMenuItems } from '@/services/authxolote/menuItems/useServiceMenuItems'
import { FilterFormMenuItem } from './partials/FilterFormMenuItem'
import { MenuItemForm } from './partials/MenuItemForm/MenuItemForm'
import { useMenuItemsPage } from './useMenuItemsPage'

const breadCrumblesItems = [{ to: RoutesBackoffice.Home, children: 'home' }, { children: 'menu_items' }]

const MenuItemsPage = () => {
  const { filters, open, renderersMap, rowExpansion, close, isOpen, selectedMenuItem, refreshKey, handleSuccess } = useMenuItemsPage()
  return (
    <Page titleTranslation="menu_items" breadCrumblesItems={breadCrumblesItems}>
      <DataTableFilter
        key={refreshKey}
        filters={filters}
        onClickNew={open}
        service={useServiceIndexMenuItems}
        renderersMap={renderersMap}
        rowExpansion={rowExpansion}
      >
        {(formik) => <FilterFormMenuItem formik={formik} />}
      </DataTableFilter>
      <MenuItemForm onSuccess={handleSuccess} selectedMenuItem={selectedMenuItem} close={close} isOpen={isOpen} />
    </Page>
  )
}

export default MenuItemsPage
