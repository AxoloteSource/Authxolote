export const useChatSection = ({ setSelectedChat, selectUser }: { setSelectedChat: (id: number) => void; selectUser?: (user: string) => void }) => {
  const handleSelected = (conversationId: number, userId: string) => {
    setSelectedChat(conversationId)
    selectUser?.(userId)
  }
  return {
    handleSelected
  }
}
