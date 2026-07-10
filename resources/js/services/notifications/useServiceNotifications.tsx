import { useGET } from '@/hooks/useApi'
import { IPaginateServiceProps } from '@/interfaces/IPaginateServiceProps'
import { INotification } from '@/interfaces/models/Notification/INotification'

interface INotificationResponse {
  notifications: INotification[]
  total_new_notifications: number
}

const url = '/api/v1/notifications'
export const useServiceIndexNotifications = ({ filters = [], search = null, page = 1, limit = 10, ...props }: IPaginateServiceProps) => {
  return useGET<{ data: INotificationResponse }>({
    ...props,
    url,
    filters: {
      filters,
      search,
      page,
      limit
    }
  })
}
