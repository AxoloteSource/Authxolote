import Card from '@/components/Card'
import CardTitle from '@/components/Card/partials/CardTitle'
import Chart from '@/components/Chart/Chart'
import InfoBoxAlt from '@/components/InfoBox/InfoBoxAlt/InfoBoxAlt'
import { Page } from '@/components/Page/Page'
import { CheckIcon } from '@mantine/core'
import { Inbox, Mailbox } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useHomePage } from './useHomePage'

const breadCrumblesItems = [{ children: 'home' }]

const HomePage = () => {
  const { pieOptions, barOptions, chartSeries, chartColors, stats } = useHomePage()
  const { t } = useTranslation()
  return (
    <Page titleTranslation="home" breadCrumblesItems={breadCrumblesItems}>
      <div className="space-y-6 p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <InfoBoxAlt title="Solicitudes" value={stats.solicitudes} icon={<Inbox className="h-full w-full" />} color={chartColors.primary} />
          <InfoBoxAlt title="Pendientes" value={stats.pendientes} icon={<Mailbox className="h-full w-full" />} color={chartColors.secondary} />
          <InfoBoxAlt title="Finalizadas" value={stats.finalizadas} icon={<CheckIcon className="h-full w-full" />} color={chartColors.success} />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card>
            <CardTitle>{t('request_statuses')}</CardTitle>

            <Chart title="" type="pie" series={chartSeries.pie.map((item) => item.data)} options={pieOptions} height={400} />
          </Card>
          <Card>
            <CardTitle>{t('request_day')}</CardTitle>
            <Chart title="" type="bar" series={chartSeries.bar} options={barOptions} />
          </Card>
        </div>
      </div>
    </Page>
  )
}

export default HomePage
