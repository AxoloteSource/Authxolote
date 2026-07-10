import { Page } from '@/components/Page/Page'
import { useTranslation } from 'react-i18next'

const ScanPage = () => {
  const { t } = useTranslation()

  const breadCrumbles = [{ label: t('home'), url: '/' }, { label: t('scan') }]

  return (
    <Page titleTranslation="scan_title" breadCrumblesItems={breadCrumbles}>
      <div className="p-4">
        <p>{t('scan_description')}</p>
      </div>
    </Page>
  )
}

export default ScanPage
