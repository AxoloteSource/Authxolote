import { useClass } from '@/hooks/useClass'
import { useEffect, useImperativeHandle, useState } from 'react'
import { usePopper } from 'react-popper'
import { buttonClasses } from '../Buttons/useButton'
import { DropdownVariantEnum } from './DropdownVariantEnum'

import type { Ref } from 'react'

interface IUseDropdownProps {
  variant: DropdownVariantEnum
  color?: string
  forwardedRef: Ref<{ close: () => void }>
}

export const classes: Record<DropdownVariantEnum, string> = {
  ...buttonClasses,
  points: 'points-class',
  'points-alt': 'points-alt-class'
}

export const useDropdown = (props: IUseDropdownProps) => {
  const { variant, color, forwardedRef } = props
  const { customClass } = useClass(classes, variant, color)
  const [visibility, setVisibility] = useState(false)
  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(null)
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null)

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-end',
    strategy: 'fixed',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 0]
        }
      }
    ]
  })

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node
      if (referenceElement?.contains(target) || popperElement?.contains(target)) {
        return
      }

      setVisibility(false)
    }

    document.addEventListener('mousedown', handleDocumentClick)
    return () => {
      document.removeEventListener('mousedown', handleDocumentClick)
    }
  }, [referenceElement, popperElement])

  useImperativeHandle(forwardedRef, () => ({
    close() {
      setVisibility(false)
    }
  }))

  return {
    referenceRef: { current: referenceElement },
    setVisibility,
    visibility,
    popperRef: { current: popperElement },
    setReferenceElement,
    setPopperElement,
    styles,
    attributes,
    customClass
  }
}
