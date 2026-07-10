import { LucideProps } from 'lucide-react'
import React from 'react'

export interface ITimeLineProps {
  title: string
  subTitle: string
  icon: React.FC<LucideProps>
  children: React.ReactNode
  help?: string
}
