export interface IDashboardCharts {
  name: string
  finished: number
  pending: number
}

export interface IDashboardSummary {
  total_request: number
  finished: number
  pending: number
}

export interface IDashboardPieChart {
  name: string
  quantity: number
}
