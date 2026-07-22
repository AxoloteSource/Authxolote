import { ApisEnum } from '@/configs/apisEnum'
import { AxiosRequestConfig } from 'axios'

export interface IAxiosProps<Params> {
  url: string
  params?: Params
  headers?: AxiosRequestConfig['headers']
  responseType?: AxiosRequestConfig['responseType']
  customHost?: ApisEnum
}

export interface IAxiosPostProps<Data, Params> {
  url: string
  data?: Data
  params?: Params
  headers?: AxiosRequestConfig['headers']
  responseType?: AxiosRequestConfig['responseType']
  customHost?: ApisEnum
}

export interface IUseGetProps {
  filters?: object
  url: string
  enabled?: boolean
  nameQuery?: string | null
  params?: object
  headers?: AxiosRequestConfig['headers']
  responseType?: AxiosRequestConfig['responseType']
  customHost?: ApisEnum
}

export interface IUseGETMutation {
  url: string
  onSuccess: () => void
  headers?: AxiosRequestConfig['headers']
  responseType?: AxiosRequestConfig['responseType']
}

export interface IUsePOSTProps {
  url: string
  onSuccess?: () => void
  onError?: () => void
  isFile?: boolean
  customHost?: ApisEnum
}

export interface IUsePUTProps {
  url: string
  onSuccess?: () => void
  onError?: () => void
  isFile?: boolean
  customHost?: ApisEnum
}

export interface IUseDELETEProps {
  url: string
  onSuccess?: () => void
  onError?: () => void
}
