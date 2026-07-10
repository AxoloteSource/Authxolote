import { useLocation } from 'react-router-dom'

export const useUrlQuery = (): URLSearchParams => {
  const { search } = useLocation()
  return new URLSearchParams(search)
}
