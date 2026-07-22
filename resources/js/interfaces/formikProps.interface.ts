import { ObjectSchema } from 'yup'

export interface IFormikProps<Request> {
  initialValues: Request
  validationSchema: ObjectSchema<Record<string, unknown>>
  onSubmit: (data: Request, { setErrors }: { setErrors: (errors: Record<string, unknown>) => void }) => Promise<void>
}
