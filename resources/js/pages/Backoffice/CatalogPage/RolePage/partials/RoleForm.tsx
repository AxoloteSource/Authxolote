import Button from '@/components/Buttons/Button'
import { ButtonTypeEnum } from '@/components/Buttons/enums/buttonType.enum'
import { Input } from '@/components/Form/Input'
import { InputTypeEnum } from '@/components/Form/Input/InputType.enum'
import Modal from '@/components/Modal/Modal'
import { Color } from '@/enums/Color'
import { IRole } from '@/interfaces/models/Role/IRole'
import { Form, Formik } from 'formik'
import { IInitialValuesNewRole, useRoleForm } from './useRoleForm'

interface IRoleFormProps {
  onSuccess?: () => void
  close: () => void
  isOpen: boolean
  selectedRole?: IRole | null
}
export const RoleForm = ({ close, selectedRole, isOpen, onSuccess }: IRoleFormProps) => {
  const { formikProps, t } = useRoleForm({ selectedRole, onSuccess })
  return (
    <Modal
      className="w-full max-w-lg"
      title={`${selectedRole?.id ? t('update_role') : t('new_role')}`}
      isOpen={isOpen}
      close={close}
      closeOnOverlayClick={false}
    >
      <Formik enableReinitialize {...formikProps}>
        {(formik) => (
          <Form className="mb-4 grid grid-cols-12 gap-3 sm:grid-cols-12">
            <Input<IInitialValuesNewRole> className="col-span-12" name="name" type={InputTypeEnum.Text} label={`${t('name')}`} formik={formik} />
            {!selectedRole?.id && (
              <Input<IInitialValuesNewRole>
                className="col-span-12"
                name="key"
                disabled={!!selectedRole?.id}
                type={InputTypeEnum.Text}
                label={`${t('key')}`}
                formik={formik}
              />
            )}
            <Input<IInitialValuesNewRole>
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
