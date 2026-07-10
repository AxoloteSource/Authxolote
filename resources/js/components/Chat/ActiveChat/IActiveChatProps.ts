import { IMessageList } from '@/interfaces/models/Message/IMessage'

export interface ActiveChatProps {
  handleOpenMenu?: () => void
  messages: IMessageList[]
  scrollMessageListProps: {
    hasNextPage: boolean
    isFetchingNextPage: boolean
    fetchNextPage: () => void
  }
  titleUserCard: string
  subtitleUserCard: string
  receiverId: string
  selectedChat: number
}
