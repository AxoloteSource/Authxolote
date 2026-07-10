import { Divider } from '@/components/Divider/Divider'
import { usePerfectScroll } from '@/hooks/usePerfectScroll'
import { IChatList } from '@/interfaces/models/Chat/IChat'
import { useCallback } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { ChatUserCard } from './ChatItem/ChatUserCard'
import { ChatList } from './ChatList/ChatList'
import { ChatPanelProps } from './ChatPanelProps'
import { ChatSection } from './ChatSection/ChatSection'
import { NoChats } from './NoChats/NoChats'
import { SearchChats } from './SearchChats/SearchChats'

export const ChatPanel = ({
  scrollChatListProps,
  showMenu = false,
  setSelectedChat,
  chatList,
  otherContactsList,
  currentUser,
  setSearchIndex,
  handleToggleMessagesScroll,
  selectUser,
  selectedUser
}: ChatPanelProps) => {
  const { hasNextPage, isFetchingNextPage, fetchNextPage } = scrollChatListProps
  const { handleScrollY, scrollElRef, onYReachStart, t } = usePerfectScroll({ hasNextPage, isFetchingNextPage, fetchNextPage })

  const selectChat = useCallback(
    (chatId: number) => {
      handleToggleMessagesScroll()
      setSelectedChat(chatId)
    },
    [handleToggleMessagesScroll, setSelectedChat]
  )
  return (
    <div
      className={`panel absolute z-10 hidden h-full w-full max-w-xs flex-none space-y-4 overflow-hidden p-4 sm:h-[calc(100vh_-_150px)] xl:relative xl:block ${showMenu ? '!block' : ''}`}
    >
      <ChatUserCard title={`${currentUser.name}`} subtitle={`${currentUser.roleName}`} />
      <SearchChats setSearch={setSearchIndex} />
      <Divider />
      <PerfectScrollbar
        containerRef={(ref) => (scrollElRef.current = ref as HTMLDivElement)}
        onScrollY={handleScrollY}
        onYReachStart={onYReachStart}
        className="h-full"
        options={{ suppressScrollX: true, wheelPropagation: false }}
      >
        <ChatList>
          {!chatList.length && !otherContactsList.length && <NoChats />}
          {chatList.length > 0 && (
            <ChatSection<IChatList>
              title={`${t('chats')}`}
              iterator={chatList}
              setSelectedChat={selectChat}
              selectUser={selectUser}
              selectedUser={selectedUser}
            />
          )}
          {otherContactsList.length > 0 && (
            <ChatSection<IChatList>
              title={`${t('other_chats')}`}
              iterator={otherContactsList}
              setSelectedChat={selectChat}
              selectUser={selectUser}
              selectedUser={selectedUser}
            />
          )}
        </ChatList>
      </PerfectScrollbar>
    </div>
  )
}
