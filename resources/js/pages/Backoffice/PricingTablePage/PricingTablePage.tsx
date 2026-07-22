import Card from '@/components/Card/Card'
import { Page } from '@/components/Page/Page'
import { PricingCard } from '@/components/Pricing/PricingCard'
import { PricingToggle } from '@/components/Pricing/PricingToggle'
import { useState } from 'react'

const basicPlans = [
  {
    title: 'Beginner Savers',
    description: 'For people who are starting out in the water saving business',
    price: 19,
    period: 'monthly',
    features: ['Free water saving e-book', 'Free access to forums', 'Beginners tips']
  },
  {
    title: 'Advanced Savers',
    description: "For experienced water savers who'd like to push their limits",
    price: 29,
    period: 'monthly',
    features: ['Free water saving e-book', 'Free access to forums', 'Advanced saving tips']
  },
  {
    title: 'Pro Savers',
    description: "For all the professionals who'd like to educate others, too",
    price: 79,
    period: 'monthly',
    features: ['Access to all books', 'Unlimited board topics', 'Beginners tips']
  }
]

const togglePlans = [
  {
    title: 'Cloud Hosting',
    description: 'cPanel/WHM included. Intel Xeon E3 with guaranteed 2GB RAM.',
    price: 25,
    period: 'monthly',
    features: ['Single Domain', '50 GB SSD', '1 TB Premium Bandwidth']
  },
  {
    title: 'VPS Hosting',
    description: 'cPanel/WHM included. Intel Xeon E5 with guaranteed 4GB RAM.',
    price: 70,
    period: 'monthly',
    features: ['5 Domains', '100 GB SSD', '2 TB Premium Bandwidth'],
    popular: true,
    popularLabel: 'Most Popular'
  },
  {
    title: 'Business Hosting',
    description: 'cPanel/WHM included. Intel Xeon E5 with guaranteed 8GB RAM.',
    price: 115,
    period: 'monthly',
    features: ['Unlimited Domains', '1 TB SSD', '5 TB Premium Bandwidth']
  }
]

const animatedPlans = [
  {
    title: 'Freelancer',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    price: 49,
    period: 'month',
    features: ['Support forum', 'Free hosting', '2 hours of support', '5GB of storage space']
  },
  {
    title: 'Small business',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    price: 89,
    period: 'month',
    features: ['Unlimited calls', 'Free hosting', '10 hours of support', '10GB of storage space']
  },
  {
    title: 'Larger business',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    price: 129,
    period: 'month',
    features: ['Unlimited calls', 'Free hosting', 'Unlimited hours of support', '1TB of storage space']
  }
]

const breadCrumblesItems = [{ to: '/backoffice/home', children: 'home' }, { children: 'Pricing Tables' }]

const PricingTablePage = () => {
  const [yearlyPrice, setYearlyPrice] = useState(false)

  return (
    <Page titleTranslation="Pricing Tables" breadCrumblesItems={breadCrumblesItems}>
      <div className="space-y-8 pt-5">
        <Card className="!p-6">
          <div className="mb-5 flex items-center justify-between">
            <h5 className="dark:text-white-light text-lg font-semibold">Basic</h5>
          </div>
          <div className="mx-auto max-w-[320px] md:max-w-[990px]">
            <div className="space-y-4 md:flex md:space-y-0 md:space-x-4">
              {basicPlans.map((plan, i) => (
                <PricingCard key={i} variant="basic" {...plan} />
              ))}
            </div>
          </div>
        </Card>

        <Card className="!p-6">
          <div className="mb-5 flex items-center justify-between">
            <h5 className="dark:text-white-light text-lg font-semibold">Toggle</h5>
          </div>
          <div className="dark:text-white-dark mx-auto max-w-[320px] md:max-w-[1140px]">
            <PricingToggle value={yearlyPrice} onChange={setYearlyPrice} yearlyBadge="20% Off" />
            <div className="text-white-dark mt-5 space-y-4 md:mt-16 md:flex md:space-y-0">
              {togglePlans.map((plan, i) => (
                <PricingCard key={i} variant="toggle" {...plan} period={yearlyPrice ? 'yearly' : 'monthly'} />
              ))}
            </div>
          </div>
        </Card>

        <Card className="!p-6">
          <div className="mb-5 flex items-center justify-between">
            <h5 className="dark:text-white-light text-lg font-semibold">Animated</h5>
          </div>
          <div className="dark:text-white-dark mx-auto mt-20 max-w-[1140px]">
            <div className="space-y-14 md:flex md:space-y-0 md:space-x-4">
              {animatedPlans.map((plan, i) => (
                <PricingCard key={i} variant="animated" {...plan} />
              ))}
            </div>
          </div>
        </Card>
      </div>
    </Page>
  )
}

export default PricingTablePage
