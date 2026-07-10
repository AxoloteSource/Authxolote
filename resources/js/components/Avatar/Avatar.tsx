import { IStatus, useAvatar } from './useAvatar'

interface IAvatarProps {
  status?: IStatus
  imagePath?: string
  className?: string
}

export const Avatar = ({ status, imagePath, className = '' }: IAvatarProps) => {
  const imgPath = imagePath ? imagePath : '/assets/images/user-profile.webp'
  const { avatarStatus } = useAvatar({ status: status ?? null })
  return (
    <>
      <div className="relative flex-none">
        <img src={imgPath} className={`h-10 w-10 rounded-full object-cover transition-all duration-300 ${className ?? ''}`} />
        {status && (
          <div className="absolute bottom-0 ltr:right-0 rtl:left-0">
            <div className={`${avatarStatus} h-4 w-4 rounded-full`}></div>
          </div>
        )}
      </div>
    </>
  )
}
