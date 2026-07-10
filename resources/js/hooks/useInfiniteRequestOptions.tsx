export const useInfiniteRequestOptions = () => {
  const getPreviousPageParam = (firstPage: Record<string, unknown>) => {
    const cur = firstPage?.current_page
    return typeof cur === 'number' && cur > 1 ? cur - 1 : undefined
  }
  const getNextPageParam = (lastPage: Record<string, unknown>) => {
    const cur = lastPage?.current_page
    const last = lastPage?.last_page
    if (typeof cur === 'number' && typeof last === 'number') {
      return cur < last ? cur + 1 : undefined
    }
    const nextUrl = lastPage?.next_page_url as string | null
    if (nextUrl) {
      const m = /[?&]page=(\d+)/.exec(nextUrl)
      return m ? Number(m[1]) : undefined
    }
    return undefined
  }
  return {
    getPreviousPageParam,
    getNextPageParam
  }
}
