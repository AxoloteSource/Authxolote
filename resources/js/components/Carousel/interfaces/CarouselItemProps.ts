import React from 'react'

export interface CarouselItemProps {
  children?: React.ReactNode
  image: Blob | undefined
  title?: string
  description?: string
}
