// import { Badge } from '@/components/Badge/Badge'
import { ITimeLineProps } from '@/components/TimeLine/TimeLineItem/ITimeLineProps'
import React from 'react'

export const TimeLineItem = (props: ITimeLineProps) => {
  const { title, subTitle, children, icon } = props

  return (
    <div className="flex">
      <div className="relative z-[2] mb-5 before:absolute before:top-12 before:-bottom-[15px] before:left-1/2 before:-z-[1] before:block before:h-auto before:w-0 before:-translate-x-1/2 before:border-l-2 before:border-gray-200 ltr:mr-8 rtl:ml-8 dark:before:border-[#191e3a]">
        <div className="flex items-center justify-center rounded-full border-2 border-gray-200 bg-white p-3 dark:border-gray-600 dark:bg-black">
          {icon && React.createElement(icon, { size: 24, className: 'text-gray-700 dark:text-gray-300' })}
        </div>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h4 className="text-xl font-bold break-words text-blue-600 ltr:text-left rtl:text-right dark:text-blue-400">{title}</h4>
          {/* {help && (
            <Badge tooltip={{ content: help }} shape="pill">
              i
            </Badge>
          )} */}
        </div>
        <p className="break-words text-gray-600 ltr:text-left rtl:text-right dark:text-gray-300">{subTitle}</p>

        <div className="max-w-full overflow-hidden">{children}</div>
      </div>
    </div>
  )
}
