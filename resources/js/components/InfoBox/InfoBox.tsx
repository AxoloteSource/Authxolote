import React from 'react'

const InfoBox = (props: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={`infobox mb-5 w-full max-w-md justify-center rounded-md border border-gray-500/20 p-6 shadow-md ${props.className}`}>
      {props.children}
    </div>
  )
}

export default InfoBox
