'use client'

import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'
import * as React from 'react'

import { IDatePickerProps } from '@/components/Form/DatePicker/IDatePickerProps'
import { useDatepicker } from '@/components/Form/DatePicker/useDatepicker'
import { WrapInput } from '@/components/Form/WrapInput'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

export function DatePicker<T extends object>({ className, name, formik, label, allowEmpty = false, initialValue }: IDatePickerProps<T>) {
  const { date, handleSelect } = useDatepicker<T>({
    name,
    formik,
    allowEmpty,
    initialValue
  })

  const [open, setOpen] = React.useState(false)

  const handleSelectAndClose = (newDate: Date | undefined) => {
    handleSelect(newDate)
    if (newDate) {
      setOpen(false)
    }
  }

  return (
    <WrapInput name={name} formik={formik} label={label} className={className}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={name}
            variant={'outline'}
            className={cn('form-input w-full justify-start text-left font-normal', !date && 'text-muted-foreground')}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "d 'de' MMMM 'de' y", { locale: es }) : <span>Seleccionar fecha</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="z-[9999] w-auto p-0" align="start">
          <Calendar initialFocus mode="single" defaultMonth={date} selected={date} onSelect={handleSelectAndClose} numberOfMonths={1} locale={es} />
        </PopoverContent>
      </Popover>
    </WrapInput>
  )
}
