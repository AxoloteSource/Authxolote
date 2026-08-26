import Button from '@/components/Buttons/Button'
import { ButtonTypeEnum } from '@/components/Buttons/enums/buttonType.enum'
import { Input } from '@/components/Form/Input'
import { InputTypeEnum } from '@/components/Form/Input/InputType.enum'
import { IOptions } from '@/components/Form/Select/interfaces/IOptions'
import InputSelect from '@/components/Form/Select/Select'
import Switch from '@/components/Form/Switch'
import Modal from '@/components/Modal/Modal'
import { Color } from '@/enums/Color'
import { IMenuItem } from '@/interfaces/models/MenuItem/IMenuItem'
import { Form, Formik } from 'formik'
import { SingleValue } from 'react-select'
import { IInitialValuesMenuItem, useMenuItemForm } from './useMenuItemForm'

interface IMenuItemFormProps {
  onSuccess?: () => void
  close: () => void
  isOpen: boolean
  selectedMenuItem?: IMenuItem | null
}

export const MenuItemForm = ({ close, selectedMenuItem, isOpen, onSuccess }: IMenuItemFormProps) => {
  const { formikProps, t, menuOptions, menusLoading, parentOptions, parentLoading, typeOptions, setMenuId } = useMenuItemForm({
    selectedMenuItem,
    onSuccess
  })
  return (
    <Modal
      className="w-full max-w-lg"
      title={`${selectedMenuItem?.id ? t('update_menu_item') : t('new_menu_item')}`}
      isOpen={isOpen}
      close={close}
      closeOnOverlayClick={false}
    >
      <Formik enableReinitialize {...formikProps}>
        {(formik) => (
          <Form className="mb-4 grid grid-cols-12 gap-3 sm:grid-cols-12">
            <InputSelect<IInitialValuesMenuItem>
              className="col-span-12"
              name="menu_id"
              label={`${t('menu')}`}
              formik={formik}
              options={menuOptions}
              isLoading={menusLoading}
              onChange={(newValue) => {
                const value = (newValue as SingleValue<IOptions> | null)?.value
                setMenuId(value != null ? String(value) : '')
                formik.setFieldValue('parent_id', '')
              }}
            />
            <InputSelect<IInitialValuesMenuItem>
              className="col-span-12"
              name="parent_id"
              label={`${t('parent_item')}`}
              formik={formik}
              options={parentOptions}
              isLoading={parentLoading}
              onChange={(newValue) => {
                const value = (newValue as SingleValue<IOptions> | null)?.value
                formik.setFieldValue('parent_id', value != null ? String(value) : '')
              }}
            />
            <InputSelect<IInitialValuesMenuItem>
              className="col-span-12"
              name="type"
              label={`${t('type')}`}
              formik={formik}
              options={typeOptions}
              onChange={(newValue) => {
                const value = (newValue as SingleValue<IOptions> | null)?.value
                if (value === 'header') {
                  formik.setFieldValue('route', '')
                  formik.setFieldValue('path', '')
                }
              }}
            />
            <Input<IInitialValuesMenuItem> className="col-span-12" name="name" type={InputTypeEnum.Text} label={`${t('name')}`} formik={formik} />
            <Input<IInitialValuesMenuItem> className="col-span-12" name="slug" type={InputTypeEnum.Text} label={`${t('slug')}`} formik={formik} />
            {formik.values.type === 'link' && (
              <>
                <Input<IInitialValuesMenuItem> className="col-span-12" name="path" type={InputTypeEnum.Text} label={`${t('path')}`} formik={formik} />
                <Input<IInitialValuesMenuItem> className="col-span-12" name="route" type={InputTypeEnum.Text} label={`${t('route')}`} formik={formik} />
              </>
            )}
            <Input<IInitialValuesMenuItem> className="col-span-12" name="icon" type={InputTypeEnum.Text} label={`${t('icon')}`} formik={formik} />
            <Input<IInitialValuesMenuItem>
              className="col-span-12"
              name="sort_order"
              type={InputTypeEnum.Number}
              label={`${t('sort_order')}`}
              formik={formik}
            />
            <Switch<IInitialValuesMenuItem> className="col-span-12" name="active" label={`${t('active')}`} formik={formik} />
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
