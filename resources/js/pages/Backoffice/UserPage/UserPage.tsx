import { Page } from '@/components/Page/Page'
import { DataTableFilter } from '@/components/Tables/DataTableFilter/DataTableFilter'
import { RoutesBackoffice } from '@/routes/modules/backoffice.routes'
import { useServiceIndexUsers } from '@/services/authxolote/users/useServiceUsers'
import { FilterFormUser } from './partials/FilterFormUser'
import { useUserPage } from './useUserPage'

const breadCrumblesItems = [{ to: RoutesBackoffice.Home, children: 'home' }, { children: 'users' }]

const UserPage = () => {
  const { filters, renderersMap } = useUserPage()
  return (
    <Page titleTranslation="users" breadCrumblesItems={breadCrumblesItems}>
      <DataTableFilter filters={filters} onClickNew={() => {}} service={useServiceIndexUsers} renderersMap={renderersMap} showNewButton={false} withoutFilters={false}>
        {(formik) => <FilterFormUser formik={formik} />}
      </DataTableFilter>
    </Page>
  )
}

export default UserPage
