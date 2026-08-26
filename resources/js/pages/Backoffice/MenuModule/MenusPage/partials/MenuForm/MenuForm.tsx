import Button from '@/components/Buttons/Button'
import { ButtonTypeEnum } from '@/components/Buttons/enums/buttonType.enum'
import { Input } from '@/components/Form/Input'
import { InputTypeEnum } from '@/components/Form/Input/InputType.enum'
import InputSelect from '@/components/Form/Select/Select'
import Switch from '@/components/Form/Switch'
import Modal from '@/components/Modal/Modal'
import { Color } from '@/enums/Color'
import { IMenu } from '@/interfaces/models/Menu/IMenu'
import { Form, Formik } from 'formik'
import { IInitialValuesMenu, useMenuForm } from './useMenuForm'

interface IMenuFormProps {
  onSuccess?: () => void
  close: () => void
  isOpen: boolean
  selectedMenu?: IMenu | null
}

export const MenuForm = ({ close, selectedMenu, isOpen, onSuccess }: IMenuFormProps) => {
  const { formikProps, t, applicationOptions, applicationsLoading } = useMenuForm({ selectedMenu, onSuccess })
  return (
    <Modal
      className="w-full max-w-lg"
      title={`${selectedMenu?.id ? t('update_menu') : t('new_menu')}`}
      isOpen={isOpen}
      close={close}
      closeOnOverlayClick={false}
    >
      <Formik enableReinitialize {...formikProps}>
        {(formik) => (
          <Form className="mb-4 grid grid-cols-12 gap-3 sm:grid-cols-12">
            <InputSelect<IInitialValuesMenu>
              className="col-span-12"
              name="application_id"
              label={`${t('application')}`}
              formik={formik}
              options={applicationOptions}
              isLoading={applicationsLoading}
            />
            <Input<IInitialValuesMenu> className="col-span-12" name="name" type={InputTypeEnum.Text} label={`${t('name')}`} formik={formik} />
            <Input<IInitialValuesMenu> className="col-span-12" name="slug" type={InputTypeEnum.Text} label={`${t('slug')}`} formik={formik} />
            <Input<IInitialValuesMenu> className="col-span-12" name="icon" type={InputTypeEnum.Text} label={`${t('icon')}`} formik={formik} />
            <Input<IInitialValuesMenu>
              className="col-span-12"
              name="sort_order"
              type={InputTypeEnum.Number}
              label={`${t('sort_order')}`}
              formik={formik}
            />
            <Switch<IInitialValuesMenu> className="col-span-12" name="active" label={`${t('active')}`} formik={formik} />
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
