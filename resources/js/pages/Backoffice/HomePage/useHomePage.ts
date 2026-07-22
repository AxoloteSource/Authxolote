// import { IDashboardCharts, IDashboardPieChart } from '@/interfaces/IDashboardCharts'
// import { useServiceIndexBarCharts, useServiceIndexPieChart, useServiceIndexSummary } from '@/services/dashboard/useServiceDashboard'
import { ApexOptions } from 'apexcharts'
import { useTranslation } from 'react-i18next'

interface DashboardStats {
  solicitudes: number
  pendientes: number
  finalizadas: number
}

interface ChartOptionsConfig {
  title: string
  categories?: string[]
  customOptions?: ApexOptions
}

export const chartColors = {
  primary: '#7c3aed',
  secondary: '#4f46e5',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444'
}

const baseOptions: ApexOptions = {
  chart: {
    toolbar: { show: false },
    animations: { speed: 800 }
  },
  xaxis: {
    labels: { style: { fontSize: '14px' } },
    axisTicks: { show: false }
  },
  yaxis: {
    labels: { style: { fontSize: '14px' } },
    forceNiceScale: true
  },
  dataLabels: { enabled: false },
  title: {
    align: 'left',
    style: { fontSize: '16px', fontWeight: 'bold' }
  },
  tooltip: { theme: 'light' },
  colors: Object.values(chartColors),
  grid: { borderColor: '#e5e7eb' },
  legend: { position: 'top' }
}

const presets = {
  pie: (): ApexOptions => ({
    chart: { type: 'pie' },
    responsive: [
      {
        breakpoint: 480,
        options: { legend: { position: 'bottom' } }
      }
    ],
    stroke: { show: false }
  }),
  bar: (categories: string[]): ApexOptions => ({
    chart: { type: 'bar' },
    plotOptions: {
      bar: {
        columnWidth: '50%',
        dataLabels: { position: 'top' }
      }
    },
    xaxis: { categories }
  })
}

const generateOptions = (config: ChartOptionsConfig): ApexOptions => ({
  ...baseOptions,
  ...config.customOptions,
  title: { ...baseOptions.title, text: config.title },
  xaxis: {
    ...baseOptions.xaxis,
    categories: config.categories || [],
    ...config.customOptions?.xaxis
  }
})

const useProcessBarChartData = () => {
  // const { isLoading, data } = useServiceIndexBarCharts()
  const isLoading = true
  const data: Record<string, unknown> | null = null
  const weekFinished: Array<number> = [0, 0, 0, 0, 0, 0, 0]
  const weekPending: Array<number> = [0, 0, 0, 0, 0, 0, 0]

  if (!isLoading && Array.isArray(data)) {
    // data.forEach((item: any) => {
    //   weekFinished.push(item.finished)
    //   weekPending.push(item.pending)
    // })
  }

  return {
    weekFinished: weekFinished,
    weekPending: weekPending
  }
}

export const useHomePage = () => {
  const { t } = useTranslation()
  const { weekFinished, weekPending } = useProcessBarChartData()
  // const { isLoading, data } = useServiceIndexSummary()
  // const { isLoading: isLoadingPieChart, data: dataPieChart } = useServiceIndexPieChart()
  const isLoading = true
  const data: Record<string, unknown> | null = null
  const isLoadingPieChart = true
  const dataPieChart: Record<string, unknown> | null = null

  const stats: DashboardStats = {
    solicitudes: !isLoading && data ? data.total_request : 0,
    pendientes: !isLoading && data ? data.pending : 0,
    finalizadas: !isLoading && data ? data.finished : 0
  }

  const chartCategories = [t('monday'), t('tuesday'), t('wednesday'), t('thursday'), t('friday'), t('saturday'), t('sunday')]
  const pendingData =
    !isLoadingPieChart && Array.isArray(dataPieChart)
      ? (dataPieChart.find((item: Record<string, unknown>) => item.name == t('pending'))?.quantity ?? 0)
      : 0
  const completedData =
    !isLoadingPieChart && Array.isArray(dataPieChart)
      ? (dataPieChart.find((item: Record<string, unknown>) => item.name == t('completed'))?.quantity ?? 0)
      : 0

  const chartSeries = {
    pie: [
      { name: t('completed'), data: completedData, color: chartColors.primary },
      { name: t('pending'), data: pendingData, color: chartColors.secondary }
    ],
    bar: [
      {
        name: t('completed'),
        data: weekFinished,
        color: chartColors.primary
      },
      {
        name: t('pending'),
        data: weekPending,
        color: chartColors.secondary
      }
    ]
  }

  const pieOptions = generateOptions({
    title: '',
    customOptions: {
      ...presets.pie(),
      labels: chartSeries.pie.map((item) => item.name),
      colors: chartSeries.pie.map((item) => item.color || '#000'),
      dataLabels: {
        enabled: true,
        style: {
          fontSize: '14px',
          colors: ['#fff']
        }
      },
      legend: {
        show: true,
        position: 'bottom',
        horizontalAlign: 'center',
        labels: {
          colors: chartColors.secondary,
          useSeriesColors: false
        }
      }
    }
  })

  const barOptions = generateOptions({
    title: '',
    categories: chartCategories,
    customOptions: {
      ...presets.bar(chartCategories),
      dataLabels: {
        enabled: true,
        style: {
          colors: ['#fff'],
          fontSize: '12px'
        }
      },
      legend: {
        position: 'bottom',
        labels: { colors: chartColors.secondary }
      }
    }
  })

  return {
    stats,
    chartSeries,
    chartCategories,
    pieOptions,
    barOptions,
    chartColors
  }
}
