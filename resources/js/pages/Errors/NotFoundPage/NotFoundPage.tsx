import { IRootState } from '@/store'
import { setPageTitle } from '@/store/themeConfigSlice'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setPageTitle(t('page_not_found')))
  }, [dispatch, t])

  useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode)

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="px-6 py-16 text-center font-semibold before:absolute before:left-1/2 before:container before:aspect-square before:-translate-x-1/2 before:rounded-full before:bg-[linear-gradient(180deg,#4361EE_0%,rgba(67,97,238,0)_50.73%)] before:opacity-10 md:py-20">
        <div className="relative">
          <p className="mt-5 text-base dark:text-white">{t('page_not_found')}</p>
          <Link to="/" className="btn btn-primary mx-auto !mt-7 w-max border-0 uppercase shadow-none">
            {t('start')}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
