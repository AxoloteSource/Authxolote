import { ITimeLineDetailProps } from '@/components/TimeLine/TimeLineDetail/ITimeLineDetailProps'
import React from 'react'

const TimeLineDetail = (props: ITimeLineDetailProps) => {
  const { title, icon, description } = props
  return (
    <div className="mt-0 mb-0 max-w-full overflow-hidden sm:mt-7">
      {icon &&
        React.createElement(icon, { size: 24, className: 'text-gray-100 dark:text-gray-400 inline-block align-text-bottom ltr:mr-2.5 rtl:ml-2.5' })}
      <h6 className="mb-2 inline-block text-lg font-bold break-words text-gray-900 dark:text-gray-100">{title}</h6>
      <p className="font-semibold break-words whitespace-pre-wrap text-gray-600 ltr:pl-8 rtl:pr-8 dark:text-gray-400">{description}</p>
    </div>
  )
}

export default TimeLineDetail
