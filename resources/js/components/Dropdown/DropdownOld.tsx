import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { usePopper } from 'react-popper'

import type { ReactNode, Ref } from 'react'

interface DropdownOldProps {
  placement?: string
  offset?: number[]
  btnClassName?: string
  button: ReactNode
  children: ReactNode
}

const DropdownOld = (props: DropdownOldProps, forwardedRef: Ref<{ close: () => void }>) => {
  const [visibility, setVisibility] = useState(false)
  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(null)
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null)

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: props.placement || 'bottom-end',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: props.offset || [0]
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

  return (
    <>
      <button ref={setReferenceElement} type="button" className={props.btnClassName} onClick={() => setVisibility(!visibility)}>
        {props.button}
      </button>

      <div ref={setPopperElement} style={styles.popper} {...attributes.popper} className="z-50" onClick={() => setVisibility(!visibility)}>
        {visibility && props.children}
      </div>
    </>
  )
}

export default forwardRef(DropdownOld)
