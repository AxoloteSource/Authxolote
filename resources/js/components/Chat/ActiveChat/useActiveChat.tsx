import { IMessageList } from '@/interfaces/models/Message/IMessage'
import { useMemo, useState } from 'react'

export const useActiveChat = ({
  messages,
  scrollToBottom
}: {
  messages: IMessageList[]
  scrollToBottom: () => void
  selectedChat?: number | null
}) => {
  const [extraMessages, setExtraMessages] = useState<IMessageList[]>([])

  const baseMessages = useMemo(() => messages, [messages])

  const messageList = useMemo(() => [...baseMessages, ...extraMessages], [baseMessages, extraMessages])

  const handleAddMessage = (newMessage: IMessageList) => {
    setExtraMessages((prev) => [...prev, newMessage])
    scrollToBottom()
  }

  return {
    handleAddMessage,
    messageList
  }
}
