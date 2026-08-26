import Button from '@/components/Buttons/Button'
import { ButtonTypeEnum } from '@/components/Buttons/enums/buttonType.enum'
import { Input } from '@/components/Form/Input'
import { InputTypeEnum } from '@/components/Form/Input/InputType.enum'
import { IOptions } from '@/components/Form/Select/interfaces/IOptions'
import Switch from '@/components/Form/Switch/Switch'
import InputSelect from '@/components/Form/Select/Select'
import { Color } from '@/enums/Color'
import { IMenuItem } from '@/interfaces/models/MenuItem/IMenuItem'
import { Form, Formik } from 'formik'
import { SingleValue } from 'react-select'
import { IInitialValuesMenuItem, useMenuItemForm } from './useMenuItemForm'

interface IMenuItemFormFieldsProps {
  onSuccess?: () => void
  onCancel: () => void
  selectedMenuItem?: IMenuItem | null
  menuId?: string
}

export const MenuItemFormFields = ({ selectedMenuItem, onSuccess, onCancel, menuId }: IMenuItemFormFieldsProps) => {
  const { formikProps, t, parentOptions, parentLoading, typeOptions } = useMenuItemForm({
    selectedMenuItem,
    onSuccess,
    menuId
  })

  return (
    <Formik enableReinitialize {...formikProps}>
      {(formik) => (
        <Form className="mb-4 grid grid-cols-12 gap-3 sm:grid-cols-12">
          <InputSelect<IInitialValuesMenuItem>
            className="col-span-12"
            name="type"
            label={`${t('type')}`}
            formik={formik}
            options={typeOptions}
            isLoading={false}
            onChange={(newValue) => {
              const value = (newValue as SingleValue<IOptions> | null)?.value
              if (value === 'header') {
                formik.setFieldValue('route', '')
                formik.setFieldValue('path', '')
              }
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
          <Input<IInitialValuesMenuItem> className="col-span-6" name="name" type={InputTypeEnum.Text} label={`${t('name')}`} formik={formik} />
          <Input<IInitialValuesMenuItem> className="col-span-6" name="slug" type={InputTypeEnum.Text} label={`${t('slug')}`} formik={formik} />
          {formik.values.type === 'link' && (
            <>
              <Input<IInitialValuesMenuItem> className="col-span-6" name="path" type={InputTypeEnum.Text} label={`${t('path')}`} formik={formik} />
              <Input<IInitialValuesMenuItem> className="col-span-6" name="route" type={InputTypeEnum.Text} label={`${t('route')}`} formik={formik} />
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
          <div className="col-span-12">
            <Switch<IInitialValuesMenuItem> name="active" label={t('active')} formik={formik} />
          </div>
          <div className="col-span-12 mt-3 flex justify-between gap-3">
            <Button className="col-span-12 md:col-span-6" onClick={onCancel} type={ButtonTypeEnum.Button} color={Color.White}>
              {t('cancel')}
            </Button>
            <Button className="col-span-12 md:col-span-6" type={ButtonTypeEnum.Submit} disabled={formik.isSubmitting}>
              {t('save')}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )
}
