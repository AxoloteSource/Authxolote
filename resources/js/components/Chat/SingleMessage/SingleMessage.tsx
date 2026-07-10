import { Avatar } from '@/components/Avatar/Avatar'
import { ISingleMessageProps } from './ISingleMessageProps'

export const SingleMessage = ({ imagePath, message, isSender, timeAgo }: ISingleMessageProps) => {
  return (
    <>
      <div className="mt-4 mb-4">
        <div className={`flex items-start gap-3 ${isSender ? 'justify-end' : ''}`}>
          <div className={`flex-none ${isSender ? 'order-2' : ''}`}>
            <Avatar imagePath={imagePath} />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div
                className={`${isSender ? '!bg-primary rounded-md bg-black/10 p-4 py-2 text-white ltr:rounded-br-none rtl:rounded-bl-none dark:bg-gray-800' : 'rounded-md bg-black/10 p-4 py-2 ltr:rounded-bl-none rtl:rounded-br-none dark:bg-gray-800'}`}
              >
                {message}
              </div>
            </div>
            <div className={`text-white-dark text-xs ${isSender ? 'ltr:text-right rtl:text-left' : ''}`}>{timeAgo}</div>
          </div>
        </div>
      </div>
    </>
  )
}
