import { GalleryTable } from '@/appComponents/GalleryTable/GalleryTable'
import { ImageForm } from '@/appComponents/ImageForm/ImageForm'
import Button from '@/components/Buttons/Button'
import { ButtonTypeEnum } from '@/components/Buttons/enums/buttonType.enum'
import { DatePicker } from '@/components/Form/DatePicker/DatePicker'
import { Input } from '@/components/Form/Input'
import { InputTypeEnum } from '@/components/Form/Input/InputType.enum'
import InputSelect from '@/components/Form/Select/Select'
import TextArea from '@/components/Form/TextArea/TextArea'
import { Tabs } from '@/components/Tabs'
import { Color } from '@/enums/Color'
import { IOptions } from '@/components/Form/Select/interfaces/IOptions'
import { IImage } from '@/interfaces/models/Image/IImage'
import { Form, Formik, FormikProps } from 'formik'
import { IInitialValuesCoupon } from './useCouponForm'

interface ICouponStepZeroProps {
  formikProps: Record<string, unknown>
  t: (key: string) => string
  couponTypeOptions: IOptions[]
  isLoadingCouponTypes: boolean
  handleCouponTypeInputChange: (value: string) => void
  selectedRecords: Record<string, unknown>[]
  setSelectedRecords: (records: Record<string, unknown>[]) => void
  handleSelectImage: (formik: FormikProps<IInitialValuesCoupon>) => (image: IImage | null) => void
  close: () => void
}

export const CouponStepZero = ({
  formikProps,
  t,
  couponTypeOptions,
  isLoadingCouponTypes,
  handleCouponTypeInputChange,
  selectedRecords,
  setSelectedRecords,
  handleSelectImage,
  close
}: ICouponStepZeroProps) => {
  return (
    <Formik enableReinitialize {...formikProps}>
      {(formik) => (
        <Form className="mb-4 grid grid-cols-12 gap-3">
          <Input<IInitialValuesCoupon> className="col-span-12" name="title" type={InputTypeEnum.Text} label={t('title')} formik={formik} />
          <TextArea<IInitialValuesCoupon> className="col-span-12" name="description" label={t('description')} formik={formik} />
          <InputSelect<IInitialValuesCoupon>
            className="col-span-12 md:col-span-6"
            formik={formik}
            name="coupon_type_id"
            options={couponTypeOptions}
            label={t('coupon_type')}
            onInputChange={handleCouponTypeInputChange}
            isLoading={isLoadingCouponTypes}
          />
          <Input<IInitialValuesCoupon>
            className="col-span-12 md:col-span-6"
            name="amount"
            type={InputTypeEnum.Number}
            label={t('amount')}
            formik={formik}
          />
          <DatePicker<IInitialValuesCoupon> className="col-span-12" name="expiration_date" label={t('expiration_date')} formik={formik} />

          <div className="col-span-12 rounded-lg border-2 border-dashed border-gray-300 p-4">
            <Tabs
              className="col-span-12"
              items={[
                {
                  id: 'nuve-imagen',
                  label: t('nuve_imagen'),
                  content: <ImageForm isModal={false} onSuccess={(image) => formik.setFieldValue('image_id', image.id)} />
                },
                {
                  id: 'galeria',
                  label: t('galeria'),
                  content: (
                    <GalleryTable
                      onSelect={handleSelectImage(formik)}
                      selectedRecords={selectedRecords}
                      setSelectedRecords={setSelectedRecords}
                    />
                  )
                }
              ]}
            />
          </div>

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
  )
}
