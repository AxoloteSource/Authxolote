import axios, { AxiosInstance } from 'axios'
import { ApisEnum } from './apisEnum'

export const axiosApi: AxiosInstance = axios.create({
  baseURL: String(ApisEnum.BaseUrl),
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})
