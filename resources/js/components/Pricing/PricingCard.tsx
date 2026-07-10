import { ArrowIcon } from '@/components/Lists/IconListItem'
import { cn } from '@/lib/utils'

export interface PricingFeature {
  text: string
}

export interface PricingCardProps {
  variant?: 'basic' | 'toggle' | 'animated'
  title: string
  description: string
  price: number
  period: string
  features: string[]
  popular?: boolean
  popularLabel?: string
  buttonText?: string
  onButtonClick?: () => void
  className?: string
}

const BasicCard = ({ title, description, price, period, features, buttonText, onButtonClick }: PricingCardProps) => (
  <div className="group hover:border-primary rounded border border-black p-3 text-center transition-all lg:p-5 dark:border-[#1b2e4b]">
    <h3 className="text-xl lg:text-2xl">{title}</h3>
    <div className="group-hover:border-primary dark:border-white-dark mx-auto my-6 w-1/5 border-t border-black transition-all" />
    <p className="text-[15px]">{description}</p>
    <div className="group-hover:text-primary my-7 p-2.5 text-center text-lg transition-all">
      <strong className="group-hover:text-primary dark:text-white-dark text-3xl text-[#3b3f5c] transition-all lg:text-5xl">${price}</strong> /{' '}
      {period}
    </div>
    <ul className="group-hover:text-primary mb-5 space-y-2.5 font-semibold transition-all">
      {features.map((feature, i) => (
        <li key={i} className="flex items-center justify-center">
          <ArrowIcon className="text-primary inline h-3.5 w-3.5 ltr:mr-1 rtl:ml-1 rtl:rotate-180" />
          {feature}
        </li>
      ))}
    </ul>
    <button
      type="button"
      onClick={onButtonClick}
      className="btn hover:border-primary hover:bg-primary/10 hover:text-primary dark:border-white-dark/50 dark:text-white-dark w-full text-black shadow-none transition-all"
    >
      {buttonText}
    </button>
  </div>
)

const ToggleCard = ({ title, description, price, period, features, popular, popularLabel, buttonText, onButtonClick }: PricingCardProps) => (
  <div
    className={cn(
      'border-white-light border p-4 transition-all duration-300 lg:p-9 dark:border-[#1b2e4b]',
      popular ? 'relative rounded-t-md' : 'rounded-md hover:shadow-[0_0_15px_1px_rgba(113,106,202,0.20)] ltr:md:rounded-r-none rtl:md:rounded-l-none'
    )}
  >
    {popular && (
      <div className="bg-primary absolute inset-x-0 -top-0 flex h-10 items-center justify-center rounded-t-md text-base text-white md:-top-[30px]">
        {popularLabel}
      </div>
    )}
    <h3 className="dark:text-white-light mb-5 text-xl font-semibold text-black">{title}</h3>
    <p>{description}</p>
    <div className="my-7 p-2.5 text-center text-lg">
      <strong className={cn('text-xl lg:text-3xl', popular ? 'text-primary lg:text-4xl' : 'dark:text-white-light text-[#3b3f5c]')}>${price}</strong> /{' '}
      {period}
    </div>
    <div className="mb-6">
      <strong className="dark:text-white-light mb-3 inline-block text-[15px] text-black">Features</strong>
      <ul className="space-y-3">
        {features.map((feature, i) => (
          <li key={i}>{feature}</li>
        ))}
      </ul>
    </div>
    <button type="button" onClick={onButtonClick} className={cn('btn w-full', popular ? 'btn-primary' : 'btn-dark')}>
      {buttonText}
    </button>
  </div>
)

const AnimatedCard = ({ title, description, price, features, buttonText, onButtonClick }: PricingCardProps) => (
  <div className="group border-white-light rounded border transition-all duration-300 dark:border-[#1b2e4b]">
    <div className="border-white-light border-b p-5 pt-0 dark:border-[#1b2e4b]">
      <span className="dark:text-white-light border-primary flex h-[70px] w-[70px] -translate-y-[30px] items-center justify-center rounded border-2 bg-white text-xl font-bold text-[#3b3f5c] shadow-[0_0_15px_1px_rgba(113,106,202,0.20)] transition-all duration-300 group-hover:-translate-y-10 lg:h-[100px] lg:w-[100px] lg:text-3xl dark:bg-black">
        ${price}
      </span>
      <h3 className="mt-4 mb-2.5 text-xl lg:text-2xl">{title}</h3>
      <p className="text-[15px]">{description}</p>
    </div>
    <div className="p-5">
      <ul className="mb-5 space-y-2.5 font-semibold">
        {features.map((feature, i) => (
          <li key={i}>{feature}</li>
        ))}
      </ul>
      <button type="button" onClick={onButtonClick} className="btn btn-primary w-full">
        {buttonText}
      </button>
    </div>
  </div>
)

const variantMap = {
  basic: BasicCard,
  toggle: ToggleCard,
  animated: AnimatedCard
} as const

export const PricingCard = ({ variant = 'basic', ...props }: PricingCardProps) => {
  const Component = variantMap[variant]
  return <Component {...props} />
}

export default PricingCard
