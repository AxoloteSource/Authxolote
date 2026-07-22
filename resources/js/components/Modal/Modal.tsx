import { CloseButton } from '@/components/Buttons/CloseButton'
import { IModalProps } from '@/components/Modal/IModalProps'
import Typography from '@/components/Typography'
import { TypographyVariantEnum } from '@/components/Typography/enums/typographyVariant.enum'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { useModal } from './useModal'

const Modal = (props: IModalProps) => {
  const { title, children, isOpen, className, icon, close, preventCloseOutside } = useModal(props)

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" open={isOpen} onClose={preventCloseOutside}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0" />
        </Transition.Child>
        <div className="fixed inset-0 z-[100] overflow-y-auto bg-[var(--modal-background)]">
          <div className="flex min-h-screen items-start justify-center px-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                as="div"
                className={`panel dark:text-white-dark my-8 overflow-hidden rounded-lg border-0 p-0 text-black ${className ? className : ''}`}
              >
                <div className="bg-background flex items-center justify-between px-5 py-3">
                  <Typography variant={TypographyVariantEnum.H3} className="flex items-center gap-2">
                    {icon} {title}
                  </Typography>
                  <CloseButton onClick={close} />
                </div>
                <div className="p-5">{children}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default Modal
