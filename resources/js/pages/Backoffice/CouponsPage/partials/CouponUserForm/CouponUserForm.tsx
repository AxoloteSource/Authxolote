import Button from '@/components/Buttons/Button'
import { ButtonTypeEnum } from '@/components/Buttons/enums/buttonType.enum'
import InputSelect from '@/components/Form/Select/Select'
import Modal from '@/components/Modal/Modal'
import { Color } from '@/enums/Color'
import { useSelectService } from '@/hooks/useSelectService'
import { ICoupon } from '@/interfaces/models/Coupon/ICoupon'
import { useServiceIndexUsers } from '@/services/users/useServiceUsers'
import { Form, Formik } from 'formik'
import { IInitialValuesCouponUser, useCouponUserForm } from './useCouponUserForm'

interface ICouponUserFormProps {
  onSuccess?: () => void
  close: () => void
  isOpen: boolean
  selectedItem?: ICoupon | null
}

export const CouponUserForm = ({ close, selectedItem, isOpen, onSuccess }: ICouponUserFormProps) => {
  const { formikProps, t } = useCouponUserForm({ selectedItem: selectedItem!, onSuccess })

  const { options, handleInputChange, isLoading } = useSelectService({
    useService: useServiceIndexUsers,
    storeKey: 'id',
    label: 'name'
  })

  return (
    <Modal className="w-full max-w-lg" title={t('link_users_to_coupon')} isOpen={isOpen} close={close} closeOnOverlayClick={false}>
      <Formik enableReinitialize {...formikProps}>
        {(formik) => (
          <Form className="mb-4 grid grid-cols-12 gap-3">
            <InputSelect<IInitialValuesCouponUser>
              className="col-span-12"
              formik={formik}
              name="user_ids"
              options={options}
              label={`${t('users')}`}
              onInputChange={handleInputChange}
              isLoading={isLoading}
              isMulti
              filterOption={() => true}
            />

            <div className="col-span-12 mt-3 flex justify-between gap-3">
              <Button className="w-full md:w-auto" onClick={close} type={ButtonTypeEnum.Button} color={Color.White}>
                {t('cancel')}
              </Button>
              <Button className="w-full md:w-auto" type={ButtonTypeEnum.Submit} disabled={formik.isSubmitting}>
                {t('save')}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}
