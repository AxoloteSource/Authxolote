import { cn } from '@/lib/utils'

export interface PricingToggleProps {
  value: boolean
  onChange: (value: boolean) => void
  monthlyLabel?: string
  yearlyLabel?: string
  yearlyBadge?: string
  className?: string
}

export const PricingToggle = ({ value, onChange, monthlyLabel = 'Monthly', yearlyLabel = 'Yearly', yearlyBadge, className }: PricingToggleProps) => {
  return (
    <div className={cn('mt-5 flex justify-center space-x-4 text-base font-semibold md:mt-10', className)}>
      <span className={!value ? 'text-primary' : 'text-white-dark'}>{monthlyLabel}</span>

      <label className="relative h-6 w-12">
        <input
          type="checkbox"
          checked={value}
          onChange={() => onChange(!value)}
          className="peer absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
        />
        <span className="bg-icon outline_checkbox peer-checked:border-primary peer-checked:before:bg-primary dark:border-white-dark dark:before:bg-white-dark block h-full rounded-full border-2 border-[#ebedf2] transition-all before:absolute before:bottom-1 before:h-4 before:w-4 before:rounded-full before:bg-[#ebedf2] before:bg-[url(/assets/images/close.svg)] before:bg-center before:bg-no-repeat before:transition-all before:duration-300 peer-checked:before:bg-[url(/assets/images/checked.svg)] ltr:before:left-1 ltr:peer-checked:before:left-7 rtl:before:right-1 rtl:peer-checked:before:right-7" />
      </label>

      <span className="relative">
        <span className={value ? 'text-primary' : 'text-white-dark'}>{yearlyLabel}</span>
        {yearlyBadge && (
          <span className="bg-success absolute my-auto hidden rounded-full px-2 py-0.5 text-xs whitespace-nowrap text-white ltr:left-full ltr:ml-2 rtl:right-full rtl:mr-2">
            {yearlyBadge}
          </span>
        )}
      </span>
    </div>
  )
}

export default PricingToggle
