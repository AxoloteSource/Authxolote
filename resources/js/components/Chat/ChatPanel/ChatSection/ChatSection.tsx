import { IChatList } from '@/interfaces/models/Chat/IChat'
import { ChatUserCard } from '../ChatItem/ChatUserCard'
import { useChatSection } from './useChatSection'

interface ChatSectionProps<T extends IChatList> {
  title: string
  iterator: T[]
  setSelectedChat: (id: number) => void
  selectUser?: (user: string) => void
  selectedUser?: string
}

export const ChatSection = <T extends IChatList>({ title, iterator, setSelectedChat, selectUser, selectedUser }: ChatSectionProps<T>) => {
  const { handleSelected } = useChatSection({ setSelectedChat, selectUser })
  return (
    <>
      <h1>{title}</h1>
      {iterator.map(({ id, title, subtitle = '', optionalMessage, userId }, index) => (
        <ChatUserCard
          onClickOpenChat={() => handleSelected(id, userId ?? '')}
          isActive={selectedUser == (userId ?? '')}
          isButtonHover={true}
          id={id}
          title={title}
          subtitle={subtitle}
          optionalMessage={optionalMessage}
          key={index}
        />
      ))}
    </>
  )
}
