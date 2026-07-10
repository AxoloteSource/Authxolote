import { IMessage } from '../Message/IMessage'
import { IUserChat } from '../User/IUserChat'

export type ConversationType = 'Individual' | 'Group'
export interface IChat {
  id: number
  conversation_type_id: number
  conversation_type: ConversationType
  user: IUserChat
  messages: IMessage
}

export interface IChatOtherContact {
  id: number
  full_name: string
}

export interface IChatList {
  id: number
  title: string
  subtitle: string
  optionalMessage: string
  userId?: string
}
