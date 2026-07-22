export interface IChatUserCardProps {
  id?: number
  title: string
  subtitle: string
  optionalMessage?: string
  isButtonHover?: boolean
  isActive?: boolean
  className?: string
  showMenu?: boolean
  handleOpenMenu?: () => void
  onClickOpenChat?: (props: number) => void
}
