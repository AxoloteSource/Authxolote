import { ReactNode } from 'react'

export const ChatList = ({ children }: { children: ReactNode }) => {
  return (
    <div className="!mt-0">
      <div className="relative space-y-0.5 ltr:-mr-3.5 ltr:pr-3.5 rtl:-ml-3.5 rtl:pl-3.5">{children}</div>
    </div>
  )
}
