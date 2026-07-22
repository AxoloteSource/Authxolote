import { Page } from '@/components/Page/Page'
import { DataTableFilter } from '@/components/Tables/DataTableFilter/DataTableFilter'
import { RoutesBackoffice } from '@/routes/modules/backoffice.routes'
import { useServiceIndexUserLists } from '@/services/authxolote/userLists/useServiceUserLists'
import { FilterFormUserList } from './partials/FilterFormUserList'
import { UserListForm } from './partials/UserListForm'
import { useUserListPage } from './useUserListPage'

const breadCrumblesItems = [{ to: RoutesBackoffice.Home, children: 'home' }, { children: 'user_lists' }]

const UserListPage = () => {
  const { filters, open, renderersMap, close, isOpen, selectedUserList, refreshKey, handleSuccess } = useUserListPage()
  return (
    <Page titleTranslation="user_lists" breadCrumblesItems={breadCrumblesItems}>
      <DataTableFilter key={refreshKey} filters={filters} onClickNew={open} service={useServiceIndexUserLists} renderersMap={renderersMap}>
        {(formik) => <FilterFormUserList formik={formik} />}
      </DataTableFilter>
      <UserListForm onSuccess={handleSuccess} selectedUserList={selectedUserList} close={close} isOpen={isOpen} />
    </Page>
  )
}

export default UserListPage
