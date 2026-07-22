import Button from '@/components/Buttons/Button'
import { ButtonTypeEnum } from '@/components/Buttons/enums/buttonType.enum'
import { Input } from '@/components/Form/Input'
import { InputTypeEnum } from '@/components/Form/Input/InputType.enum'
import Modal from '@/components/Modal/Modal'
import { Color } from '@/enums/Color'
import { IUserList } from '@/interfaces/models/UserList/IUserList'
import { Form, Formik } from 'formik'
import { IInitialValuesNewUserList, useUserListForm } from './useUserListForm'

interface IUserListFormProps {
  onSuccess?: () => void
  close: () => void
  isOpen: boolean
  selectedUserList?: IUserList | null
}

export const UserListForm = ({ close, selectedUserList, isOpen, onSuccess }: IUserListFormProps) => {
  const { formikProps, t } = useUserListForm({ selectedUserList, onSuccess })
  return (
    <Modal
      className="w-full max-w-lg"
      title={`${selectedUserList?.id ? t('update_user_list') : t('new_user_list')}`}
      isOpen={isOpen}
      close={close}
      closeOnOverlayClick={false}
    >
      <Formik enableReinitialize {...formikProps}>
        {(formik) => (
          <Form className="mb-4 grid grid-cols-12 gap-3 sm:grid-cols-12">
            <Input<IInitialValuesNewUserList> className="col-span-12" name="name" type={InputTypeEnum.Text} label={`${t('name')}`} formik={formik} />
            <Input<IInitialValuesNewUserList> className="col-span-12" name="slug" type={InputTypeEnum.Text} label={`${t('slug')}`} formik={formik} />
            <Input<IInitialValuesNewUserList>
              className="col-span-12"
              name="description"
              type={InputTypeEnum.Text}
              label={`${t('description')}`}
              formik={formik}
            />
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
