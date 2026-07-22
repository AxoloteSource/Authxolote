import { IChatList } from '@/interfaces/models/Chat/IChat'

export interface ChatPanelProps {
  showMenu?: boolean
  setSelectedChat: (prop: number) => void
  chatList: IChatList[]
  otherContactsList: IChatList[]
  currentUser: { name: string; roleName: string }
  setSearchIndex: (value: string) => void
  scrollChatListProps: {
    hasNextPage: boolean
    isFetchingNextPage: boolean
    fetchNextPage: () => void
  }
  handleToggleMessagesScroll: () => void
  selectUser: (user: string) => void
  selectedUser: string
}
