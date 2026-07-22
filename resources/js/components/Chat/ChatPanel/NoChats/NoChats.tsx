import { useTranslation } from 'react-i18next'

export const NoChats = () => {
  const { t } = useTranslation()
  return <div>{t('no_chats')}</div>
}
