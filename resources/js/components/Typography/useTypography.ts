import { useClass } from '@/hooks/useClass'
import { IUseTypographyProps } from './interfaces/useTypographyProps.interface'

const classes = {
  h1: 'text-3xl',
  h2: 'text-2xl',
  h3: 'text-xl',
  h4: 'text-lg',
  h5: 'text-sm',
  h6: 'text-xs',
  p: 'text-base',
  label: ''
}

export const useTypography = (props: IUseTypographyProps) => {
  const { variant, color } = props
  let { customClass } = useClass(classes, variant, color)

  if (color) {
    customClass += ` text-${color}`
  }

  if (props.fontBold) {
    customClass += ` font-bold`
  }

  const tag =
    {
      p: 'p',
      h1: 'h1',
      h2: 'h2',
      h3: 'h3',
      h4: 'h4',
      h5: 'h5',
      h6: 'h6',
      label: 'label'
    }[variant] || 'p'

  return {
    customClass,
    tag
  }
}
