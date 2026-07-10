import { AlertTextTypeEnum } from '@/enums/types/AlertTextTypeEnum'
import { alertClassNames } from '@/utils/alertClassNames'

export const useAlertIcon = (type: AlertTextTypeEnum) => {
  return alertClassNames[type]
}
