import { IUserChat } from '../User/IUserChat'

export interface IMessage {
  id: number
  conversation_id: number
  sender_id: string
  sender: IUserChat
  message: string
  created_at: string
  updated_at: string
}

export interface IMessageList {
  message: string
  isSender: boolean
  imagePath: string
  timeAgo: string
}
