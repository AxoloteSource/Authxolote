import { ApisEnum } from '@/configs/apisEnum'
import { IAxiosPostProps, IAxiosProps, IUseDELETEProps, IUseGetProps, IUsePOSTProps, IUsePUTProps } from '@/interfaces/IAxiosProps'
import { useInfiniteQuery, UseInfiniteQueryResult, useMutation, UseMutationResult, useQuery, UseQueryResult } from '@tanstack/react-query'
import { AxiosInstance, AxiosResponse } from 'axios'
import { useAxios } from './useAxios'
import { useInfiniteRequestOptions } from './useInfiniteRequestOptions'

const host = ApisEnum.BaseUrl
const headersImage = { 'content-type': 'multipart/form-data' }

// Sistema de Cola para limitar peticiones concurrentes
class RequestQueue {
  private activeRequests = 0
  private maxConcurrent = 2 // Máximo 2 peticiones simultáneas
  private queue: Array<() => void> = []

  async enqueue<T>(requestFn: () => Promise<T>): Promise<T> {
    if (this.activeRequests >= this.maxConcurrent) {
      await new Promise<void>((resolve) => {
        this.queue.push(resolve)
      })
    }

    this.activeRequests++

    try {
      return await requestFn()
    } finally {
      this.activeRequests--
      if (this.queue.length > 0) {
        const next = this.queue.shift()
        next?.()
      }
    }
  }
}

const requestQueue = new RequestQueue()

// 2. Funciones Axios con AbortController
export const axiosGET = async <Params>(
  axios: AxiosInstance,
  { url, params, headers = {}, responseType = 'json', customHost = host }: IAxiosProps<Params>,
  signal?: AbortSignal
): Promise<Record<string, unknown>> => {
  return requestQueue.enqueue(() =>
    axios
      .get(`${customHost}${url}`, {
        params,
        headers,
        responseType,
        signal
      })
      .then((res) => res.data ?? {})
  )
}

export const axiosPOST = <Data, Paras>(
  axios: AxiosInstance,
  { url, data, params, headers = {}, customHost = host }: IAxiosPostProps<Data, Paras>,
  signal?: AbortSignal
): Promise<AxiosResponse> => {
  return requestQueue.enqueue(() =>
    axios.post(`${customHost}${url}`, data, {
      params,
      headers,
      signal
    })
  )
}

export const axiosPUT = <Data, Paras>(axios: AxiosInstance, { url, data, params, headers = {}, customHost = host }: IAxiosPostProps<Data, Paras>) => {
  return axios.put(`${customHost}${url}`, data, {
    params,
    headers
  })
}

export const axiosDELETE = <Params>(axios: AxiosInstance, { url }: IAxiosProps<Params>, signal?: AbortSignal): Promise<AxiosResponse> => {
  return requestQueue.enqueue(() =>
    axios.delete(`${host}${url}`, {
      signal
    })
  )
}

export function useGET<Response>({
  filters = {},
  url,
  nameQuery = null,
  headers = {},
  enabled = true,
  responseType = 'json',
  customHost
}: IUseGetProps): UseQueryResult<Response> {
  const { axiosApi } = useAxios()

  return useQuery({
    queryKey: [nameQuery || url, filters],
    queryFn: async () => {
      const data = await axiosGET(axiosApi, { url, params: filters, headers, responseType, customHost })
      return (data ?? {}) as Response
    },
    retry: false,
    enabled,
    refetchOnWindowFocus: false
  })
}

export function usePUT<Response>({
  url,
  isFile = false,
  onSuccess = () => {},
  onError = () => {},
  customHost
}: IUsePUTProps): UseMutationResult<AxiosResponse<Response>> {
  let headers = {}
  if (isFile) headers = headersImage
  const { axiosApi } = useAxios()

  return useMutation({
    mutationFn: (data) => axiosPUT(axiosApi, { url, data, headers, customHost }),
    onSuccess,
    onError
  })
}

export function usePOST<Request>({
  url,
  onSuccess = () => {},
  onError = () => {},
  isFile = false,
  customHost
}: IUsePOSTProps): UseMutationResult<AxiosResponse<Request>> {
  let headers = {}
  if (isFile) headers = headersImage
  const { axiosApi } = useAxios()

  return useMutation({
    mutationFn: async (data) => {
      const controller = new AbortController()
      try {
        const response = await axiosPOST(axiosApi, { url, data, headers, customHost }, controller.signal)
        return response
      } finally {
        // controller.abort() // No abortar aquí, o asegurar que sea después de terminar
      }
    },
    onSuccess,
    onError
  })
}

export function useDELETE<Request>({ url, onSuccess = () => {}, onError = () => {} }: IUseDELETEProps): UseMutationResult<AxiosResponse<Request>> {
  const { axiosApi } = useAxios()

  return useMutation({
    mutationFn: async () => {
      const controller = new AbortController()
      try {
        const response = await axiosDELETE(axiosApi, { url }, controller.signal)
        return response
      } finally {
        // controller.abort()
      }
    },
    onSuccess,
    onError
  })
}

export function useInfiniteGET<Response>({
  filters = {},
  url,
  nameQuery = null,
  headers = {},
  responseType = 'json',
  enabled = true,
  customHost
}: IUseGetProps): UseInfiniteQueryResult<Response> {
  const { axiosApi } = useAxios()
  const { getPreviousPageParam, getNextPageParam } = useInfiniteRequestOptions()
  return useInfiniteQuery({
    queryKey: [nameQuery || url, filters],
    queryFn: async ({ pageParam }) => {
      const data = await axiosGET(axiosApi, { url, params: { ...filters, page: pageParam }, headers, responseType, customHost })
      return (data ?? {}) as Response
    },
    getPreviousPageParam,
    getNextPageParam,
    initialPageParam: 1,
    enabled,
    retry: false,
    refetchOnWindowFocus: false
  })
}
