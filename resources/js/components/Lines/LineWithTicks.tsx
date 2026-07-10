import React from 'react'

interface LineWithTicksProps {
  ticks: number[]
}

const LineWithTicks: React.FC<LineWithTicksProps> = ({ ticks }) => {
  return (
    <div className="absolute top-[10%] right-[5%] left-[7%] flex items-center justify-center pb-16">
      <div className="dark:bg-black-light relative h-[2px] w-full bg-black">
        {ticks.map((pos, index) => (
          <div
            key={index}
            //NOTE: It does not work on PROD without style
            style={{ left: `${pos}%` }}
            className={
              'absolute top-[0px] h-0 w-0 border-t-[6px] border-r-[1px] border-b-[6px] border-l-[1px] ' + 'dark:border-black-light border-black'
            }
          ></div>
        ))}
      </div>
    </div>
  )
}

export default LineWithTicks
