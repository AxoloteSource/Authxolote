import Button from '@/components/Buttons/Button'
import { ButtonTypeEnum } from '@/components/Buttons/enums/buttonType.enum'
import Checkbox from '@/components/Form/Checkbox/Checkbox'
import DragDopFileFormik from '@/components/Form/DargDropFile/DragDopFileFormik'
import { Input } from '@/components/Form/Input'
import { InputTypeEnum } from '@/components/Form/Input/InputType.enum'
import Modal from '@/components/Modal/Modal'
import { Color } from '@/enums/Color'
import { IItem } from '@/interfaces/models/Item/IItem'
import { Form, Formik } from 'formik'
import { IInitialValuesItem, useItemForm } from './useItemForm'

interface IItemFormProps {
  onSuccess?: () => void
  close: () => void
  isOpen: boolean
  selectedItem?: IItem | null
}

export const ItemForm = ({ close, selectedItem, isOpen, onSuccess }: IItemFormProps) => {
  const { formikProps, t } = useItemForm({ selectedItem, onSuccess })

  return (
    <Modal className="w-full max-w-lg" title={`${selectedItem?.id ? t('edit') : t('new')}`} isOpen={isOpen} close={close} closeOnOverlayClick={false}>
      <Formik enableReinitialize {...formikProps}>
        {(formik) => (
          <Form className="mb-4 grid grid-cols-12 gap-3 sm:grid-cols-12">
            <Input<IInitialValuesItem> className="col-span-12" name="name" type={InputTypeEnum.Text} label={`${t('name')}`} formik={formik} />
            <Input<IInitialValuesItem>
              className="col-span-12"
              name="external_item_id"
              type={InputTypeEnum.Text}
              label={`${t('external_item_id')}`}
              formik={formik}
            />
            <Checkbox<IInitialValuesItem> className="col-span-12" name="rewardable" label={`${t('rewardable')}`} formik={formik} />
            {formik.values.rewardable && (
              <Input<IInitialValuesItem>
                className="col-span-12"
                name="points_price"
                type={InputTypeEnum.Number}
                label={`${t('points_price')}`}
                formik={formik}
              />
            )}
            <Input<IInitialValuesItem>
              className="col-span-12"
              name="reward_points"
              type={InputTypeEnum.Number}
              label={`${t('reward_points')}`}
              formik={formik}
            />

            <div className="col-span-12">
              <label className="mb-2 block text-sm font-medium">{t('images')}</label>
              <DragDopFileFormik<IInitialValuesItem>
                name="images"
                formik={formik}
                isLoading={formik.isSubmitting}
                multiple={true}
                accept={{ 'image/*': ['.jpeg', '.jpg', '.png'] }}
              />
            </div>

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
