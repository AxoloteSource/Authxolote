import Modal from '@/components/Modal/Modal'
import { IMenuItem } from '@/interfaces/models/MenuItem/IMenuItem'
import { useTranslation } from 'react-i18next'
import { MenuItemFormFields } from './MenuItemFormFields'

interface IMenuItemFormProps {
  onSuccess?: () => void
  close: () => void
  isOpen: boolean
  selectedMenuItem?: IMenuItem | null
}

export const MenuItemForm = ({ close, selectedMenuItem, isOpen, onSuccess }: IMenuItemFormProps) => {
  const { t } = useTranslation()

  return (
    <Modal
      className="w-full max-w-lg"
      title={`${selectedMenuItem?.id ? t('update_menu_item') : t('new_menu_item')}`}
      isOpen={isOpen}
      close={close}
      closeOnOverlayClick={false}
    >
      <MenuItemFormFields selectedMenuItem={selectedMenuItem} onSuccess={onSuccess} onCancel={close} />
    </Modal>
  )
}
