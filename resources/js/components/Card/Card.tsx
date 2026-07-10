import { CardProps } from '@mantine/core'

const Card = (props: CardProps) => {
  const { className, ...restProps } = props
  const classList = ['panel', className].filter(Boolean).join(' ')

  return <div {...(restProps as React.HTMLAttributes<HTMLDivElement>)} className={classList} />
}

export default Card
