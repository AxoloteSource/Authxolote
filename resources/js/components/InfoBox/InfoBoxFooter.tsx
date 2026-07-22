import { PropsWithChildren } from 'react'

const InfoBoxFooter = ({ children }: PropsWithChildren) => {
  return (
    <div className="mt-6">
      <div className="text-center text-gray-700">{children}</div>
    </div>
  )
}

export default InfoBoxFooter
