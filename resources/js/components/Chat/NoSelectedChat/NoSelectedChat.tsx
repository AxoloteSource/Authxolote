import { Menu, MessageSquareMore } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { NoSelectedChatSvg } from './NoSelectedChatSvg'

export const NoSelectedChat = ({ handleOpenMenu }: { handleOpenMenu?: () => void }) => {
  const { t } = useTranslation()
  return (
    <div className="relative flex h-full items-center justify-center p-4">
      <button onClick={handleOpenMenu} className="hover:text-primary absolute top-4 text-lg xl:hidden ltr:left-4 rtl:right-4">
        <Menu />
      </button>
      <div className="flex flex-col items-center justify-center py-8">
        <div className="mb-8 h-[calc(100vh_-_320px)] min-h-[120px] w-[280px] text-white md:w-[430px] dark:text-black">
          <NoSelectedChatSvg />
        </div>
        <p className="bg-white-dark/20 mx-auto flex max-w-[190px] justify-center rounded-md p-2 font-semibold">
          <MessageSquareMore className="mt-1 ltr:mr-2 rtl:ml-2" />
          {t('click_user_to_chat')}
        </p>
      </div>
    </div>
  )
}
