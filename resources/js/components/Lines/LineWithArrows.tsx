import React from 'react'

// TODO: Extract to other file
interface LineWithArrowsProps {
  left: string
  right: string
  fillColor: string
  borderColor: string
  label: string
}

const LineWithArrows: React.FC<LineWithArrowsProps> = ({ left, right, fillColor, borderColor, label }) => {
  return (
    <div className={`absolute ${left} ${right} flex items-center justify-center pb-16`}>
      <span className="absolute top-[-1.25rem] text-xs whitespace-nowrap">{label}</span>
      <div className={`relative h-[5px] w-full ${fillColor}`}>
        <div className={`absolute top-[-3px] left-0 h-0 w-0 border-t-[6px] border-r-[6px] border-b-[6px] ${borderColor}`}></div>
        <div
          className={`absolute top-[-3px] right-[-6px] h-0 w-0 border-t-[6px] border-b-[6px] border-l-[6px] border-t-transparent border-b-transparent ${borderColor}`}
        ></div>
      </div>
    </div>
  )
}

export default LineWithArrows
