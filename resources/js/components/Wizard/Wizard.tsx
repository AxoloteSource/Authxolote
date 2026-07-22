import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'
import { Fragment } from 'react'
import type { IWizardProps } from './IWizardProps'

export const Wizard = ({ steps, activeStep, onChange, className }: IWizardProps) => {
  if (!steps.length) return null

  return (
    <div className={cn('flex items-start', className)}>
      {steps.map((step, index) => {
        const isCompleted = index < activeStep
        const isActive = index === activeStep

        return (
          <Fragment key={index}>
            <div className="flex flex-col items-center">
              <button
                type="button"
                onClick={() => onChange?.(index)}
                disabled={!isCompleted && !isActive}
                className={cn(
                  'flex h-12 w-12 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all duration-200',
                  isCompleted && 'border-[var(--primary)] bg-[var(--primary)] text-white',
                  isActive && 'border-[var(--primary)] bg-[var(--primary)] text-white shadow-[var(--primary)]/30 shadow-lg',
                  !isCompleted && !isActive && 'border-[var(--border)] text-[var(--text-muted)]',
                  (isCompleted || isActive) && onChange && 'cursor-pointer hover:opacity-80',
                  !isCompleted && !isActive && 'cursor-default'
                )}
                aria-label={`${step.label}${isActive ? ' (active)' : ''}${isCompleted ? ' (completed)' : ''}`}
              >
                {isCompleted ? (
                  <Check className="h-5 w-5" strokeWidth={2.5} />
                ) : step.icon ? (
                  <span className={cn(!isActive && 'opacity-50')}>{step.icon}</span>
                ) : (
                  <span>{index + 1}</span>
                )}
              </button>
              <span
                className={cn(
                  'mt-2 text-center text-xs font-medium',
                  isActive && 'text-[var(--text)]',
                  isCompleted && 'text-[var(--text-muted)]',
                  !isCompleted && !isActive && 'text-[var(--text-muted)]'
                )}
              >
                {step.label}
              </span>
            </div>

            {index < steps.length - 1 && (
              <div
                className={cn(
                  'mx-2 mt-6 h-0.5 flex-1 self-start transition-colors duration-300',
                  isCompleted ? 'bg-[var(--primary)]' : 'bg-[var(--border)]'
                )}
              />
            )}
          </Fragment>
        )
      })}
    </div>
  )
}
