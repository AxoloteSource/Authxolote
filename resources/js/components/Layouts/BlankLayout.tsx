import App from '@/app'
import { PropsWithChildren } from 'react'

const BlankLayout = ({ children }: PropsWithChildren) => {
  return (
    <App>
      <div className="dark:text-white-dark min-h-screen text-black">{children}</div>
    </App>
  )
}

export default BlankLayout
