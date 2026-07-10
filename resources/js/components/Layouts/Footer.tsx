import { RoutesBackoffice } from '@/routes/modules/backoffice.routes'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const Footer = () => {
  const { t } = useTranslation()
  return (
    <div className="dark:text-white-dark mt-auto p-6 pt-0 text-center ltr:sm:text-left rtl:sm:text-right">
      {/* TODO: Obtener el nombre desde translations */}© {new Date().getFullYear()}. {t('brand_name')} {t('reserved_rights')}.{' '}
      <Link target="_blank" to={RoutesBackoffice.Home} className="text-primary hover:underline">
        {t('privacy_policy')}
      </Link>{' '}
      {' | '}
      <Link target="_blank" to={RoutesBackoffice.Home} className="text-primary hover:underline">
        {t('terms_and_conditions')}
      </Link>
    </div>
  )
}

export default Footer
