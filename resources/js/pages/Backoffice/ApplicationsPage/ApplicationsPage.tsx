import { Page } from '@/components/Page/Page'
import { DataTableFilter } from '@/components/Tables/DataTableFilter/DataTableFilter'
import { RoutesBackoffice } from '@/routes/modules/backoffice.routes'
import { useServiceIndexApplications } from '@/services/authxolote/applications/useServiceApplications'
import { FilterFormApplication } from './partials/FilterFormApplication'
import { ApplicationForm } from './partials/ApplicationForm/ApplicationForm'
import { useApplicationsPage } from './useApplicationsPage'

const breadCrumblesItems = [{ to: RoutesBackoffice.Home, children: 'home' }, { children: 'applications' }]

const ApplicationsPage = () => {
  const { filters, open, renderersMap, close, isOpen, selectedApplication, refreshKey, handleSuccess } = useApplicationsPage()
  return (
    <Page titleTranslation="applications" breadCrumblesItems={breadCrumblesItems}>
      <DataTableFilter
        key={refreshKey}
        filters={filters}
        onClickNew={open}
        service={useServiceIndexApplications}
        renderersMap={renderersMap}
      >
        {(formik) => <FilterFormApplication formik={formik} />}
      </DataTableFilter>
      <ApplicationForm onSuccess={handleSuccess} selectedApplication={selectedApplication} close={close} isOpen={isOpen} />
    </Page>
  )
}

export default ApplicationsPage
