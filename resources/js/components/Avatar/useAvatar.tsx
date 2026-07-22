export type IStatus = 'busy' | 'available' | null
export const useAvatar = ({ status }: { status: IStatus }) => {
  let statusClass = ''
  switch (status) {
    case 'busy':
      statusClass = 'bg-warning'
      break
    case 'available':
      statusClass = 'bg-success'
      break
    default:
      statusClass = 'bg-success'
      break
  }
  return {
    avatarStatus: statusClass
  }
}
