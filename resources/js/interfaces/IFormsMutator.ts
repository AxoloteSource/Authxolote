import { UseMutateAsyncFunction } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

export interface IFormsMutator {
  mutateAsync: UseMutateAsyncFunction<AxiosResponse<Record<string, unknown>, Record<string, unknown>>, Error, unknown, unknown>
}
