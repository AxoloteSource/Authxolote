import { CircleX } from 'lucide-react'

export const CloseButton = ({ ...props }) => {
  return (
    <button {...props} type="button" className="text-[var(--text)]">
      <CircleX size={22} />
    </button>
  )
}
