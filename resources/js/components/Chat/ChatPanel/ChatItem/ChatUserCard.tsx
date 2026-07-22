import { Avatar } from '@/components/Avatar/Avatar'
import { Menu } from 'lucide-react'
import { IChatUserCardProps } from './IChatUserCardProps'

export const ChatUserCard = ({
  id,
  title,
  subtitle,
  optionalMessage,
  isButtonHover = false,
  isActive = false,
  className = '',
  showMenu = false,
  handleOpenMenu,
  onClickOpenChat
}: IChatUserCardProps) => {
  return (
    <button
      onClick={() => onClickOpenChat && onClickOpenChat(id!)}
      className={`flex w-full ${isActive ? 'bg-gray-100' : ''} items-center justify-between rounded-md p-2 ${isButtonHover ? 'dark:hover:text-primary hover:text-primary cursor-pointer hover:bg-gray-100 dark:hover:bg-[#050b14]' : ''} ${className}`}
    >
      {showMenu && (
        <div className="hover:text-primary mr-2 p-2 text-lg xl:hidden">
          <Menu onClick={handleOpenMenu} />
        </div>
      )}
      <div className="flex-1">
        <div className={`flex items-center ${className ?? ''}`}>
          <div className="flex-none">
            <Avatar className="md:h-auto md:w-12" />
          </div>
          <div className="mx-3 ltr:text-left rtl:text-right">
            <p className="mb-1 font-semibold">{title}</p>
            <p className="text-white-dark text-xs">{subtitle}</p>
          </div>
        </div>
      </div>
      {optionalMessage && (
        <div className="text-xs font-semibold whitespace-nowrap">
          <p>{optionalMessage}</p>
        </div>
      )}
    </button>
  )
}
