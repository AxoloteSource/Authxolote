import { AlertTypeEnum } from '@/enums/types/AlertTypeEnum'

export interface IAlertSwalProps {
  type: AlertTypeEnum
  title?: string
  text?: string
}
