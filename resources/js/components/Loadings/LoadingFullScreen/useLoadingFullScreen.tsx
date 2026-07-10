import { useTranslation } from 'react-i18next'

export const useLoadingFullScreen = (message?: string) => {
  const { t } = useTranslation()
  const initialMessage = message ?? t('loading')

  return {
    t,
    initialMessage
  }
}
