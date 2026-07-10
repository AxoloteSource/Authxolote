import Modal from '@/components/Modal/Modal'
import { Wizard } from '@/components/Wizard'
import { ICoupon } from '@/interfaces/models/Coupon/ICoupon'
import { Ticket, User } from 'lucide-react'
import { useCouponForm } from './useCouponForm'
import { CouponStepZero } from './CouponStepZero'
import { CouponStepOne } from './CouponStepOne'

interface ICouponFormProps {
  onSuccess?: () => void
  close: () => void
  isOpen: boolean
  selectedItem?: ICoupon | null
  initialStep?: number
}

export const CouponForm = ({ close, selectedItem, initialStep = 0, isOpen, onSuccess }: ICouponFormProps) => {
  const {
    formikProps,
    t,
    currentStep,
    setCurrentStep,
    couponTypeOptions,
    isLoadingCouponTypes,
    handleCouponTypeInputChange,
    userListOptions,
    isLoadingUserLists,
    handleUserListInputChange,
    sendMutation,
    handleSend,
    selectedRecords,
    setSelectedRecords,
    handleSelectImage
  } = useCouponForm({ selectedItem, onSuccess, close, isOpen, initialStep })

  return (
    <Modal
      className="w-full max-w-4xl"
      title={`${selectedItem?.id ? t('update_coupon') : t('new_coupon')}`}
      isOpen={isOpen}
      close={close}
      closeOnOverlayClick={false}
    >
      <Wizard
        className="mb-8"
        activeStep={currentStep}
        onChange={setCurrentStep}
        steps={[
          { icon: <Ticket size={18} />, label: t('coupon') },
          { icon: <User size={18} />, label: t('users') }
        ]}
      />

      {currentStep === 0 && (
        <CouponStepZero
          formikProps={formikProps}
          t={t}
          couponTypeOptions={couponTypeOptions}
          isLoadingCouponTypes={isLoadingCouponTypes}
          handleCouponTypeInputChange={handleCouponTypeInputChange}
          selectedRecords={selectedRecords}
          setSelectedRecords={setSelectedRecords}
          handleSelectImage={handleSelectImage}
          close={close}
        />
      )}

      {currentStep === 1 && (
        <CouponStepOne
          t={t}
          userListOptions={userListOptions}
          isLoadingUserLists={isLoadingUserLists}
          handleUserListInputChange={handleUserListInputChange}
          sendMutation={sendMutation}
          handleSend={handleSend}
        />
      )}
    </Modal>
  )
}
