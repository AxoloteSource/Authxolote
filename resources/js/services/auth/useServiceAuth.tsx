import { ApisEnum } from '@/configs/apisEnum'
import { usePOST } from '@/hooks/useApi'

const urlLogin = ApisEnum.BaseLogin

export const useServiceRegister = () =>
  usePOST({
    url: '/auth/register'
  })

export const useServiceLogin = () =>
  usePOST({
    url: '/api/v1/login',
    customHost: urlLogin
  })
