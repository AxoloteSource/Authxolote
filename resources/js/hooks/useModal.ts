import { useState } from 'react'

export const useModal = (initialStateIsOpen: boolean = false) => {
  const [isOpen, setIsOpen] = useState(initialStateIsOpen)

  const close = () => setIsOpen(false)
  const open = () => setIsOpen(true)

  return {
    isOpen,
    close,
    open
  }
}
