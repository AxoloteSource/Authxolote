import { forwardRef, type Ref } from 'react'
import { DropdownVariantEnum } from './DropdownVariantEnum'
import { IDropdownProps } from './IDropdownProps'
import { useDropdown } from './useDropdown'

const Dropdown = (props: IDropdownProps, forwardedRef: Ref<HTMLDivElement>) => {
  const { variant = DropdownVariantEnum.Outline, color = 'primary', children, className = undefined, title } = props

  const { setReferenceElement, setVisibility, visibility, setPopperElement, styles, attributes, customClass } = useDropdown({
    variant,
    color,
    forwardedRef
  })

  return (
    <div className="dropdown relative inline-flex align-middle">
      <button ref={setReferenceElement} type="button" className={[customClass, className].join(' ')} onClick={() => setVisibility(!visibility)}>
        <>
          {title}
          <span>
            <svg className="inline-block h-4 w-4 ltr:ml-1 rtl:mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 9L12 15L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </>
      </button>

      <div ref={setPopperElement} style={styles.popper} {...attributes.popper} className="z-[999]" onClick={() => setVisibility(!visibility)}>
        {visibility && <ul className="!min-w-[170px]">{children}</ul>}
      </div>
    </div>
  )
}

export default forwardRef(Dropdown)
