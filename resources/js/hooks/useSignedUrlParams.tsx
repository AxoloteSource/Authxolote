import { IRequestEventParams } from '@/services/requestEvent/interfaces/IRequestEventParams'
import { useMemo } from 'react'

export const useSignedUrlParams = (signedUrl: string | null): IRequestEventParams | null => {
  const params = useMemo<IRequestEventParams | null>(() => {
    if (!signedUrl) {
      return null
    }

    try {
      const url = new URL(signedUrl)
      const searchParams = url.searchParams

      const code = searchParams.get('code')
      const contact = searchParams.get('contact')
      const expires = searchParams.get('expires')
      const folio = searchParams.get('folio')
      const signature = searchParams.get('signature')

      if (code && contact && expires && folio && signature) {
        const parsedCode = parseInt(code)
        const parsedExpires = parseInt(expires)

        if (isNaN(parsedCode) || isNaN(parsedExpires)) {
          console.error('Invalid numeric parameters in signed URL')
          return null
        }

        return {
          code: parsedCode,
          contact,
          expires: parsedExpires,
          folio,
          signature
        }
      } else {
        console.error('Missing required parameters in signed URL:', { code, contact, expires, folio, signature })
        return null
      }
    } catch (error) {
      console.error('Error parsing signed URL:', error)
      return null
    }
  }, [signedUrl])

  return params
}
