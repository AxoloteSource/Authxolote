import { IModalProps } from '@/components/Modal/IModalProps'

export const useModal = (props: IModalProps) => {
  const { title, children, isOpen, close, className = '', icon = null, closeOnOverlayClick = true } = props

  const preventCloseOutside = () => {
    if (closeOnOverlayClick) {
      close()
    }
  }

  return {
    title,
    children,
    isOpen,
    className,
    icon,
    closeOnOverlayClick,
    close,
    preventCloseOutside
  }
}
