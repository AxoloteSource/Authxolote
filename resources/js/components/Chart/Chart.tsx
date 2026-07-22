import { IChartProps } from '@/components/Chart/IChartProps'
import ReactApexChart from 'react-apexcharts'

const Chart = ({ type = 'bar', series, options, height = 300, className = '' }: IChartProps) => {
  return (
    <div className={className}>
      <ReactApexChart options={options} series={series} type={type} height={height} />
    </div>
  )
}

export default Chart
