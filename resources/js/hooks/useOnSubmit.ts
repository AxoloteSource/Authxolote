import { UseMutateAsyncFunction } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { sileo } from 'sileo'

export const useOnSubmit = <Request = Record<string, unknown>, Response = Record<string, unknown>>({
  mutateAsync,
  onSuccess,
  formatData = (data: Request) => data,
  onError
}: {
  mutateAsync: UseMutateAsyncFunction<AxiosResponse<Record<string, unknown>, Record<string, unknown>>, Error, unknown, unknown>
  onSuccess: (data: Response) => void
  formatData?: (data: Request) => Request
  onError?: (data: Error) => void
}) => {
  const onSubmit = async (data: Request, { setErrors }: { setErrors: (errors: Record<string, unknown>) => void }) => {
    try {
      console.log('data', formatData(data))
      const res = await mutateAsync(formatData(data))
      onSuccess(res.data)
    } catch (error: unknown) {
      if (error.response?.data?.data != null) {
        setErrors(error.response.data.data)
      }

      if (onError) {
        onError(error)
      } else if (error.response?.data.message != null) {
        sileo.error({
          title: 'Error',
          description: error.response.data.message
        })
      }
    }
  }

  return {
    onSubmit
  }
}
