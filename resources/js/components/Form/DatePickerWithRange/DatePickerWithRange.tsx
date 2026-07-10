'use client'

import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'

import { IDatePickerWithRangeProps } from '@/components/Form/DatePickerWithRange/IDatePickerWithRangeProps'
import { useDatepickerWithRange } from '@/components/Form/DatePickerWithRange/useDatepickerWithRange'
import { WrapInput } from '@/components/Form/WrapInput'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

export function DatePickerWithRange<T extends object>({
  className,
  name,
  formik,
  label,
  allowEmpty = false,
  initialValues
}: IDatePickerWithRangeProps<T>) {
  const { date, handleSelect } = useDatepickerWithRange({
    name,
    formik,
    allowEmpty,
    initialValues
  })

  return (
    <WrapInput name={name} formik={formik} label={label} className={className}>
      <Popover>
        <PopoverTrigger asChild>
          <Button id={name} variant={'outline'} className={cn('w-full justify-start text-left font-normal', !date && 'text-muted-foreground')}>
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "d 'de' MMMM 'de' y", { locale: es })} - {format(date.to, "d 'de' MMMM 'de' y", { locale: es })}
                </>
              ) : (
                format(date.from, "d 'de' MMMM 'de' y", { locale: es })
              )
            ) : (
              <span>Seleccionar fechas</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="z-[9999] w-auto p-0" align="start">
          <Calendar initialFocus mode="range" defaultMonth={date?.from} selected={date} onSelect={handleSelect} numberOfMonths={2} locale={es} />
        </PopoverContent>
      </Popover>
    </WrapInput>
  )
}
