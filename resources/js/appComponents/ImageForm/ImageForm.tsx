import Button from '@/components/Buttons/Button'
import { ButtonTypeEnum } from '@/components/Buttons/enums/buttonType.enum'
import DragDopFileFormik from '@/components/Form/DargDropFile/DragDopFileFormik'
import Modal from '@/components/Modal/Modal'
import { Color } from '@/enums/Color'
import { IImage } from '@/interfaces/models/Image/IImage'
import { Form, Formik, FormikProps } from 'formik'
import { IInitialValuesImage, useImageForm } from './useImageForm'

interface IImageFormProps {
  onSuccess?: (image: IImage) => void
  close?: () => void
  isOpen?: boolean
  isModal?: boolean
}

interface IFormFieldsProps {
  formik: FormikProps<IInitialValuesImage>
  close?: () => void
  t: (key: string) => string
  isNested?: boolean
}

const FormFields = ({ formik, close, t, isNested = false }: IFormFieldsProps) => (
  <>
    <div className="col-span-12">
      <label className="mb-2 block text-sm font-medium">{t('images')}</label>
      <DragDopFileFormik<IInitialValuesImage>
        name="image"
        formik={formik}
        isLoading={formik.isSubmitting}
        multiple={false}
        accept={{ 'image/*': ['.jpeg', '.jpg', '.png'] }}
      />
    </div>

    <div className="col-span-12 mt-3 flex justify-between gap-3">
      <Button className="col-span-12 md:col-span-6" onClick={close} type={ButtonTypeEnum.Button} color={Color.White}>
        {t('cancel')}
      </Button>
      <Button
        className="col-span-12 md:col-span-6"
        type={isNested ? ButtonTypeEnum.Button : ButtonTypeEnum.Submit}
        disabled={formik.isSubmitting}
        onClick={isNested ? () => formik.handleSubmit() : undefined}
      >
        {t('save_image')}
      </Button>
    </div>
  </>
)

export const ImageForm = ({ close, isOpen, onSuccess, isModal = true }: IImageFormProps) => {
  const { formikProps, t } = useImageForm({ onSuccess })

  if (!isModal) {
    return (
      <Formik enableReinitialize {...formikProps}>
        {(formik) => (
          <div className="mb-4 grid grid-cols-12 gap-3 sm:grid-cols-12">
            <FormFields formik={formik} close={close} t={t} isNested />
          </div>
        )}
      </Formik>
    )
  }

  return (
    <Modal className="w-full max-w-lg" title={t('new')} isOpen={isOpen ?? false} close={close} closeOnOverlayClick={false}>
      <Formik enableReinitialize {...formikProps}>
        {(formik) => (
          <Form className="mb-4 grid grid-cols-12 gap-3 sm:grid-cols-12">
            <FormFields formik={formik} close={close} t={t} />
          </Form>
        )}
      </Formik>
    </Modal>
  )
}
