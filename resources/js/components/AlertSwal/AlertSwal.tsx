import { AlertTypeEnum } from '@/enums/types/AlertTypeEnum'
import Swal from 'sweetalert2'
import { IAlertSwalProps } from './IAlertSwalProps'

export const alertSwal = ({ type, title, text }: IAlertSwalProps) => {
  const toastMixin = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 4000,
    showCloseButton: true,
    width: 300,
    didOpen: (toast) => {
      toast.style.padding = '6px 10px'
      const titleEl = toast.querySelector('.swal2-title') as HTMLElement | null
      if (titleEl) {
        titleEl.style.fontSize = '0.9rem'
        titleEl.style.fontWeight = '500'
      }
      const iconEl = toast.querySelector('.swal2-icon') as HTMLElement | null
      if (iconEl) {
        iconEl.style.marginRight = '6px'
        iconEl.style.width = '1.5em'
        iconEl.style.height = '1.5em'
        iconEl.style.fontSize = '0.9em'
      }
    }
  })

  switch (type) {
    case AlertTypeEnum.Success:
      Swal.fire({
        title: title || 'Bien',
        text: text || 'Proceso completado correctamente.',
        icon: 'success'
      })
      break
    case AlertTypeEnum.Info:
      Swal.fire({
        title: title || 'Información',
        text: text || '',
        icon: 'info'
      })
      break
    case AlertTypeEnum.Warning:
      Swal.fire({
        title: title || 'Advertencia',
        text: text || '',
        icon: 'warning'
      })
      break
    case AlertTypeEnum.Question:
      Swal.fire({
        title: title || '¿Está seguro?',
        text: text || '',
        icon: 'question'
      })
      break
    case AlertTypeEnum.Error:
      Swal.fire({
        title: title || 'Error',
        text: text || 'Something went wrong.',
        icon: 'error'
      })
      break
    case AlertTypeEnum.Confirm:
      return Swal.fire({
        title: title || '¿Está seguro que desea realizar este proceso?',
        text: text || 'No podrás revertir este proceso!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'Cancelar'
      })
    case AlertTypeEnum.SuccessNotification:
      return toastMixin
        .mixin({
          customClass: { popup: 'color-success' }
        })
        .fire({ title: title || 'Proceso completado correctamente.' })
    case AlertTypeEnum.InfoNotification:
      return toastMixin
        .mixin({
          customClass: { popup: 'color-info' }
        })
        .fire({ title: title || 'Información' })
    case AlertTypeEnum.WarningNotification:
      return toastMixin
        .mixin({
          customClass: { popup: 'color-warning' }
        })
        .fire({ title: title || 'Advertencia' })
    case AlertTypeEnum.ErrorNotification:
      return toastMixin
        .mixin({
          customClass: { popup: 'color-danger' }
        })
        .fire({ title: title || 'Ocurrió un error' })
    default:
      break
  }
}
