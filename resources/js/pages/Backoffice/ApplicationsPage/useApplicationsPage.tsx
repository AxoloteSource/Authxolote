import Button from '@/components/Buttons/Button'
import { IFilters } from '@/components/Filters/ModalFilter/types'
import { useModal } from '@/hooks/useModal'
import { useRefreshKey } from '@/hooks/useRefreshKey'
import { IApplication } from '@/interfaces/models/Application/IApplication'
import { useServiceDeleteApplication, useServiceIndexApplications } from '@/services/authxolote/applications/useServiceApplications'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export interface IFilterSearchApplication {
  name: string
}

export const useApplicationsPage = () => {
  const { isOpen, open, close } = useModal(false)
  const { t } = useTranslation()
  const [selectedApplication, setSelectedApplication] = useState<IApplication | null>(null)
  const filters: IFilters<IFilterSearchApplication>[] = [
    {
      property: 'name',
      initialValue: ''
    }
  ]

  const { refreshKey, handleSuccess } = useRefreshKey({ module: 'application', service: useServiceIndexApplications, close })

  const handleEdit = (data: IApplication) => {
    open()
    setSelectedApplication(data)
  }

  const handleOpen = () => {
    open()
    setSelectedApplication(null)
  }

  const handleDeleteAction = (data: IApplication) => () => {
    const confirmed = window.confirm(t('confirm_delete_application'))
    if (confirmed) {
      const { mutateAsync } = useServiceDeleteApplication(data.id)
      mutateAsync({}).then(() => {
        handleSuccess()
      })
    }
  }

  const renderersMap = {
    actions: (data: IApplication) => {
      return (
        <div className="flex gap-2">
          <Button onClick={() => handleEdit(data)}>{t('edit')}</Button>
          <Button onClick={handleDeleteAction(data)}>{t('delete')}</Button>
        </div>
      )
    }
  }

  return {
    isOpen,
    open: handleOpen,
    close,
    filters,
    renderersMap,
    selectedApplication,
    refreshKey,
    handleSuccess
  }
}
