import { ImageForm } from '@/appComponents/ImageForm/ImageForm'
import { Page } from '@/components/Page/Page'
import { DataTableFilter } from '@/components/Tables/DataTableFilter/DataTableFilter'
import { RoutesBackoffice } from '@/routes/modules/backoffice.routes'
import { useServiceIndexImages } from '@/services/rewards/images/useServiceImages'
import { FilterFormImage } from './partials/FilterFormImage'
import { useImagesPage } from './useImagesPage'

const breadCrumblesItems = [{ to: RoutesBackoffice.Home, children: 'home' }, { children: 'images' }]

const ImagesPage = () => {
  const { filters, open, renderersMap, handleSuccess, refreshKey, isOpen, close } = useImagesPage()

  return (
    <Page titleTranslation="images" breadCrumblesItems={breadCrumblesItems}>
      <DataTableFilter key={refreshKey} filters={filters} onClickNew={open} service={useServiceIndexImages} renderersMap={renderersMap}>
        {(formik) => <FilterFormImage formik={formik} />}
      </DataTableFilter>
      <ImageForm onSuccess={handleSuccess} close={close} isOpen={isOpen} />
    </Page>
  )
}

export default ImagesPage
