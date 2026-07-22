import { ITimeLineProps } from '@/components/TimeLine/ITimeLineProps'

export const TimeLine = (props: ITimeLineProps) => {
  const { title, children } = props
  return (
    <>
      <div className="mb-5 flex items-center justify-between">
        <h5 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h5>
      </div>
      <div className="mb-5">{children}</div>
    </>
  )
}
