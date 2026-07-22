import { ApexOptions } from 'apexcharts'

export interface IChartProps {
  title: string
  type?: 'line' | 'bar' | 'area' | 'pie' | 'donut' | 'radialBar'
  series: ApexAxisChartSeries | ApexNonAxisChartSeries
  options: ApexOptions
  height?: number | string
  className?: string
}
