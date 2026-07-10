import Button from '@/components/Buttons/Button'
import { ButtonTypeEnum } from '@/components/Buttons/enums/buttonType.enum'
import InputSelect from '@/components/Form/Select/Select'
import { IOptions } from '@/components/Form/Select/interfaces/IOptions'
import { Color } from '@/enums/Color'
import { Form, Formik } from 'formik'
import { SendHorizontal } from 'lucide-react'

interface ICouponStepOneProps {
  t: (key: string) => string
  userListOptions: IOptions[]
  isLoadingUserLists: boolean
  handleUserListInputChange: (value: string) => void
  sendMutation: { isPending: boolean }
  handleSend: (listId: string) => void
}

export const CouponStepOne = ({
  t,
  userListOptions,
  isLoadingUserLists,
  handleUserListInputChange,
  sendMutation,
  handleSend
}: ICouponStepOneProps) => {
  return (
    <Formik initialValues={{ user_list_id: '' }} onSubmit={() => {}}>
      {(formik) => (
        <div className="flex flex-col items-center gap-4 py-10">
          <InputSelect<{ user_list_id: string }>
            className="w-full max-w-md"
            formik={formik}
            name="user_list_id"
            options={userListOptions}
            label={t('select_user_list')}
            onInputChange={handleUserListInputChange}
            isClearable
            isLoading={isLoadingUserLists}
            isSearchable={false}
          />
          <Button
            className="w-full max-w-md flex gap-2"
            type={ButtonTypeEnum.Button}
            color={Color.Primary}
            loading={sendMutation.isPending}
            disabled={!formik.values.user_list_id}
            onClick={() => handleSend(formik.values.user_list_id)}
          >
            <SendHorizontal size={18} />
            {t('send')}
          </Button>
        </div>
      )}
    </Formik>
  )
}
