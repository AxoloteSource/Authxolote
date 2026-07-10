import { Page } from '@/components/Page/Page'
import { DataTableFilter } from '@/components/Tables/DataTableFilter/DataTableFilter'
import { RoutesBackoffice } from '@/routes/modules/backoffice.routes'
import { useServiceIndexItems } from '@/services/rewards/items/useServiceItems'
import { FilterFormItem } from './partials/FilterFormItem'
import { ItemForm } from './partials/ItemForm'
import { useItemPage } from './useItemPage'

const breadCrumblesItems = [
  { to: RoutesBackoffice.Home, children: 'home' },
  { to: RoutesBackoffice.Catalog, children: 'catalogs' },
  { children: 'items' }
]

const ItemsPage = () => {
  const { filters, open, renderersMap, close, isOpen, selectedItem, refreshKey, handleSuccess } = useItemPage()

  return (
    <Page titleTranslation="items" breadCrumblesItems={breadCrumblesItems}>
      <DataTableFilter key={refreshKey} filters={filters} onClickNew={open} service={useServiceIndexItems} renderersMap={renderersMap}>
        {(formik) => <FilterFormItem formik={formik} />}
      </DataTableFilter>
      <ItemForm onSuccess={handleSuccess} selectedItem={selectedItem} close={close} isOpen={isOpen} />
    </Page>
  )
}

export default ItemsPage
