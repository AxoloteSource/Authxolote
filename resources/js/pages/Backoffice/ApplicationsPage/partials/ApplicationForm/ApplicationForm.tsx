import Button from '@/components/Buttons/Button'
import { ButtonTypeEnum } from '@/components/Buttons/enums/buttonType.enum'
import { Input } from '@/components/Form/Input'
import { InputTypeEnum } from '@/components/Form/Input/InputType.enum'
import Switch from '@/components/Form/Switch'
import TextArea from '@/components/Form/TextArea/TextArea'
import Modal from '@/components/Modal/Modal'
import { Color } from '@/enums/Color'
import { IApplication } from '@/interfaces/models/Application/IApplication'
import { Form, Formik } from 'formik'
import { IInitialValuesApplication, useApplicationForm } from './useApplicationForm'

interface IApplicationFormProps {
  onSuccess?: () => void
  close: () => void
  isOpen: boolean
  selectedApplication?: IApplication | null
}

export const ApplicationForm = ({ close, selectedApplication, isOpen, onSuccess }: IApplicationFormProps) => {
  const { formikProps, t } = useApplicationForm({ selectedApplication, onSuccess })
  return (
    <Modal
      className="w-full max-w-lg"
      title={`${selectedApplication?.id ? t('update_application') : t('new_application')}`}
      isOpen={isOpen}
      close={close}
      closeOnOverlayClick={false}
    >
      <Formik enableReinitialize {...formikProps}>
        {(formik) => (
          <Form className="mb-4 grid grid-cols-12 gap-3 sm:grid-cols-12">
            <Input<IInitialValuesApplication> className="col-span-12" name="name" type={InputTypeEnum.Text} label={`${t('name')}`} formik={formik} />
            <Input<IInitialValuesApplication> className="col-span-12" name="slug" type={InputTypeEnum.Text} label={`${t('slug')}`} formik={formik} />
            <TextArea<IInitialValuesApplication>
              className="col-span-12"
              name="description"
              label={`${t('description')}`}
              formik={formik}
              rows={3}
            />
            <Switch<IInitialValuesApplication> className="col-span-12" name="active" label={`${t('active')}`} formik={formik} />
            <div className="col-span-12 mt-3 flex justify-between gap-3">
              <Button className="col-span-12 md:col-span-6" onClick={close} type={ButtonTypeEnum.Button} color={Color.White}>
                {t('cancel')}
              </Button>
              <Button className="col-span-12 md:col-span-6" type={ButtonTypeEnum.Submit} disabled={formik.isSubmitting}>
                {t('save')}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}
