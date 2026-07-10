import Button from '@/components/Buttons/Button'
import { ButtonTypeEnum } from '@/components/Buttons/enums/buttonType.enum'
import { ButtonVariantEnum } from '@/components/Buttons/enums/buttonVariant.enum'
import { IModalFilterProps } from '@/components/Filters/ModalFilter/types'
import Modal from '@/components/Modal/Modal'
import { Form, Formik, FormikValues } from 'formik'
import { Funnel } from 'lucide-react'
import { useModalFilter } from './useModalFilter'

export const ModalFilter = <Values extends FormikValues>(props: IModalFilterProps<Values>) => {
  const { t, isOpen, validationSchema, title, children, initialValues, close, handleSubmit, onClear } = useModalFilter(props)

  return (
    <Modal className="w-full max-w-lg" title={title} isOpen={isOpen} close={close} icon={<Funnel />}>
      <Formik<Values> enableReinitialize initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {(formik) => (
          <Form className="grid grid-cols-12 gap-3">
            {typeof children === 'function' ? children(formik) : children}
            <div className="col-span-12 mt-3 flex justify-end gap-2">
              <Button onClick={() => onClear(formik)} type={ButtonTypeEnum.Button} color="danger" variant={ButtonVariantEnum.Outline}>
                {t('clear')}
              </Button>
              <Button className="" type={ButtonTypeEnum.Submit}>
                {t('filter')}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}
