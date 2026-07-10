import { FormikProps } from 'formik/dist/types'
import { Accept } from 'react-dropzone'

export interface DragDopFileFormikProps<T> {
  multiple?: boolean
  name: Extract<keyof T, string>
  isLoading: boolean
  formik: FormikProps<T>
  accept?: Accept
}
