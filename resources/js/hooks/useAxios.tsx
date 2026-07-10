import { AxiosContext } from '@/contexts/AxiosContext'
import { useContext } from 'react'

export const useAxios = () => {
  const context = useContext(AxiosContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
