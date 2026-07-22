import { IRootState } from '@/store'
import { User } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const ErrorForbidden = () => {
  const { t } = useTranslation()
  useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode)

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="px-6 py-16 text-center font-semibold before:absolute before:left-1/2 before:container before:aspect-square before:-translate-x-1/2 before:rounded-full before:bg-[linear-gradient(180deg,#4361EE_0%,rgba(67,97,238,0)_50.73%)] before:opacity-10 md:py-20">
        <div className="relative">
          <User className="mx-auto -mt-10 w-full max-w-xs object-cover md:-mt-14 md:max-w-xl" />
          <p className="mt-5 text-base dark:text-white">{t('forbidden_text')}</p>
          <Link to="/" className="btn btn-primary mx-auto !mt-7 w-max border-0 uppercase shadow-none">
            {t('start')}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ErrorForbidden
