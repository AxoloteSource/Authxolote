import { SizeEnum } from '@/enums/SizeEnum'
import { useClass } from '@/hooks/useClass'
import { Link } from 'react-router-dom'
import { ButtonTypeEnum } from './enums/buttonType.enum'
import { ButtonVariantEnum } from './enums/buttonVariant.enum'
import { IUseButtonProps } from './interfaces/userButtonProps.interface'

export const buttonClasses = {
  'round-alternate':
    'btn w-full flex justify-center btn-primary text-gray-100 p-4 rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500',
  rounded: 'btn rounded-full btn-{color} cursor-pointer',
  'rounded-outline': 'btn rounded-full btn-outline-{color} cursor-pointer',
  icon: "'ltr:ml-auto rtl:mr-auto btn p-2 rounded-full btn-{color} cursor-pointer",
  solid: 'btn btn-{color} cursor-pointer',
  outline: 'btn btn-outline-{color} cursor-pointer',
  circle: 'btn rounded-full p-5 btn-{color} cursor-pointer',
  'icon-outline': 'btn btn-outline-{color} cursor-pointer'
}

export const buttonSizeClasses: Record<SizeEnum, string> = {
  [SizeEnum.XXS]: 'p-1 text-xs',
  [SizeEnum.XS]: 'p-1.5 text-xs',
  [SizeEnum.SM]: 'p-2 text-sm',
  [SizeEnum.MD]: 'p-2.5 text-sm',
  [SizeEnum.LG]: 'p-3 text-base',
  [SizeEnum.XL]: 'p-4 text-lg'
}

export const useButton = (props: IUseButtonProps) => {
  const { variant, color, type, className = '', to = '', disabled, loading, children, size = SizeEnum.MD } = props
  const { customClass } = useClass(buttonClasses, variant, color)
  const sizeClass = buttonSizeClasses[size]

  const getType = () => {
    if (type == ButtonTypeEnum.Submit) {
      return ButtonTypeEnum.Submit
    }
    return ButtonTypeEnum.Button
  }

  const newClass = `${customClass} ${sizeClass} ${className}`
  const tag = type === ButtonTypeEnum.Link ? Link : 'button'
  const tagProps =
    type === ButtonTypeEnum.Link
      ? { to: to, className: `${newClass}`, disabled: !!(disabled || loading) }
      : {
          type: getType(),
          className: `${newClass}`,
          disabled: !!(disabled || loading)
        }

  const spinner = <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white border-l-transparent align-middle"></span>

  const customChildren = loading ? spinner : variant === ButtonVariantEnum.Circle ? <span className="absolute">{children}</span> : children

  return {
    tag,
    tagProps,
    customChildren
  }
}
