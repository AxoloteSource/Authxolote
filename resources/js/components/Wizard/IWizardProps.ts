import { ReactNode } from 'react'

export interface IWizardStep {
  icon?: ReactNode
  label: string
}

export interface IWizardProps {
  steps: IWizardStep[]
  activeStep: number
  onChange?: (step: number) => void
  className?: string
}
