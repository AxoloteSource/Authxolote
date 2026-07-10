export interface IModalDocumentProps {
  url: string
  isOpen: boolean
  close: () => void
  name: string
  onClickDecline: () => unknown
  onClickApprove: () => unknown
  typeId: number
}
