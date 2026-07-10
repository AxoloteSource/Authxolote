import { useOnSubmit } from '@/hooks/useOnSubmit'
import { IMessageList } from '@/interfaces/models/Message/IMessage'
import { useServiceSendMessage } from '@/services/chat/useServiceChatMessages'
import { formatDate } from '@/utils/formatData'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface UseInputSendMessageProps {
  receiverId: string
  scrollToBottom: () => void
  handleAddMessage: (newMessage: IMessageList) => void
}
export const useInputSendMessage = ({ receiverId, scrollToBottom, handleAddMessage }: UseInputSendMessageProps) => {
  const { t } = useTranslation()
  const [message, setMessage] = useState<string>('')
  const [error, setError] = useState<string[]>([])
  const mutator = useServiceSendMessage()

  const handleSuccess = () => {
    setMessage('')
    handleAddMessage({
      isSender: true,
      message,
      imagePath: '',
      timeAgo: formatDate(new Date().toISOString())
    })
    setError([])
    scrollToBottom()
  }

  const { onSubmit } = useOnSubmit({
    mutateAsync: mutator.mutateAsync,
    onSuccess: () => handleSuccess()
  })
  const handleSendMessage = () => {
    onSubmit(
      {
        message,
        user_id: receiverId
      },
      {
        setErrors: (errors: { message?: string[] }) => setError(errors?.message || [])
      }
    )
  }
  return {
    message,
    setMessage,
    handleSendMessage,
    t,
    error
  }
}
