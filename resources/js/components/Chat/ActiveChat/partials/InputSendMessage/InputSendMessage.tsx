import { TextAreaSendMessage } from '@/components/Form/TextArea/TextAreaSendMessage'
import { IMessageList } from '@/interfaces/models/Message/IMessage'
import { SendHorizontal } from 'lucide-react'
import { useInputSendMessage } from './useInputSendMessage'

export const InputSendMessage = ({
  receiverId,
  scrollToBottom,
  handleAddMessage
}: {
  receiverId: string
  scrollToBottom: () => void
  handleAddMessage: (newMessage: IMessageList) => void
}) => {
  const { setMessage, handleSendMessage, t, message, error } = useInputSendMessage({ receiverId, scrollToBottom, handleAddMessage })
  return (
    <div className="absolute bottom-0 left-0 w-full p-4">
      <div className="w-full items-center space-x-3 sm:flex rtl:space-x-reverse">
        <div className="relative flex-1">
          <TextAreaSendMessage
            error={error}
            name={`message`}
            value={message}
            inputCallback={(e) => setMessage(e.target.value)}
            placeholder={`${t('type_message')} ...`}
            IconComponent={() => <SendHorizontal onClick={() => message !== '' && handleSendMessage()} />}
            inputKeyUpCallback={(e) => e.key === 'Enter' && message !== '' && !e.shiftKey && handleSendMessage()}
          />
        </div>
      </div>
    </div>
  )
}
