import { Page } from '@/components/Page/Page'
import { RoutesBackoffice } from '@/routes/modules/backoffice.routes'

const breadCrumblesItems = [{ to: RoutesBackoffice.Home, children: 'home' }, { children: 'catalogs' }]

const CatalogPage = () => {
  return <Page titleTranslation="catalogs" breadCrumblesItems={breadCrumblesItems}></Page>
}

export default CatalogPage
