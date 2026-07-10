import { Divider } from '@/components/Divider/Divider'
import { usePerfectScroll } from '@/hooks/usePerfectScroll'
import { Loader } from 'lucide-react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { ChatUserCard } from '../ChatPanel/ChatItem/ChatUserCard'
import { SingleMessage } from '../SingleMessage/SingleMessage'
import { ActiveChatProps } from './IActiveChatProps'
import { ChatMessage } from './partials/ChatMessage/ChatMessage'
import { InputSendMessage } from './partials/InputSendMessage/InputSendMessage'
import { useActiveChat } from './useActiveChat'

export const ActiveChat = ({
  handleOpenMenu,
  messages,
  scrollMessageListProps,
  titleUserCard,
  subtitleUserCard,
  receiverId,
  selectedChat
}: ActiveChatProps) => {
  const { hasNextPage, isFetchingNextPage, fetchNextPage } = scrollMessageListProps
  const { handleScrollY, scrollElRef, onYReachStart, showNoMessages, showLoaderMessages, t, scrollToBottom } = usePerfectScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage
  })

  const { messageList, handleAddMessage } = useActiveChat({ messages, scrollToBottom, selectedChat })

  return (
    <div className="relative h-full">
      <ChatUserCard handleOpenMenu={handleOpenMenu} showMenu={true} className="p-4" title={`${titleUserCard}`} subtitle={`${subtitleUserCard}`} />
      <Divider />
      <PerfectScrollbar
        options={{ suppressScrollX: true, wheelPropagation: false }}
        className="scrollbar-container chat-conversation-box ps relative h-full sm:h-[calc(100vh_-_300px)]"
        containerRef={(ref) => (scrollElRef.current = ref as HTMLDivElement)}
        onScrollY={handleScrollY}
        onYReachStart={onYReachStart}
      >
        <div className="min-h-[400px] space-y-5 p-3 pb-[68px] sm:min-h-[300px] sm:pb-0">
          {showLoaderMessages && (
            <ChatMessage message={t('loading_messages')}>
              <Loader />
            </ChatMessage>
          )}
          {showNoMessages && <ChatMessage message={t('no_messages')} />}
          <div className="m-3 mt-0 block">
            {messageList.map((item, index) => (
              <SingleMessage key={index} {...item} />
            ))}
          </div>
        </div>
      </PerfectScrollbar>
      <InputSendMessage receiverId={receiverId} handleAddMessage={handleAddMessage} scrollToBottom={scrollToBottom} />
    </div>
  )
}
