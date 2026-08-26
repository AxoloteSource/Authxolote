import * as Icons from 'lucide-react'
import { Dot, type LucideProps } from 'lucide-react'
import { createElement, type ComponentType, type ReactNode } from 'react'

const icons = Icons as Record<string, ComponentType<LucideProps>>

export const resolveIcon = (name?: string | null, className?: string): ReactNode => {
  const Icon = !name ? Dot : (icons[name] ?? Dot)

  return createElement(Icon, { className })
}
