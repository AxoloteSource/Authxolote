import { Page } from '@/components/Page/Page'
import { DataTableFilter } from '@/components/Tables/DataTableFilter/DataTableFilter'
import { RoutesBackoffice } from '@/routes/modules/backoffice.routes'
import { useServiceIndexRoleActions } from '@/services/authxolote/roleActions/useServiceRoleActions'
import { FilterFormRoleAction } from './partials/FilterFormRoleAction'
import { useRoleActionPage } from './useRoleActionPage'

const breadCrumblesItems = [
  { to: RoutesBackoffice.Home, children: 'home' },
  { to: RoutesBackoffice.Role, children: 'roles' },
  { children: 'actions' }
]

const RoleActionPage = () => {
  const { open, filters, renderersMap, refreshKey, roleId } = useRoleActionPage()
  return (
    <Page titleTranslation="Actions" breadCrumblesItems={breadCrumblesItems}>
      <DataTableFilter
        showNewButton={false}
        key={refreshKey}
        filters={filters}
        onClickNew={open}
        payload={{ roleId: roleId! }}
        service={useServiceIndexRoleActions}
        renderersMap={renderersMap}
      >
        {(formik) => <FilterFormRoleAction formik={formik} />}
      </DataTableFilter>
    </Page>
  )
}

export default RoleActionPage
