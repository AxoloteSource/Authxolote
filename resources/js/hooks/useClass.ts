export const useClass = <Enum extends string>(classes: Record<Enum, string>, variant: Enum, color?: string) => {
  const getClass = () => {
    return classes[variant]?.replace('{color}', color ?? '')
  }

  return {
    customClass: getClass()
  }
}
