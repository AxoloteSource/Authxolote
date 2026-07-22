import Button from '@/components/Buttons'
import { ButtonTypeEnum } from '@/components/Buttons/enums/buttonType.enum'
import { ButtonVariantEnum } from '@/components/Buttons/enums/buttonVariant.enum'
import { Input } from '@/components/Form/Input'
import { InputTypeEnum } from '@/components/Form/Input/InputType.enum'
import InfoBox from '@/components/InfoBox'
import { useServiceLogin } from '@/services/auth/useServiceAuth'
import { Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import { useLoginForm } from './useLoginForm'

const LoginForm = () => {
  const { t } = useTranslation()
  const mutation = useServiceLogin()
  const props = useLoginForm({ mutateAsync: mutation.mutateAsync })

  return (
    <InfoBox className="py-12 dark:bg-black">
      <div className="mb-8 text-center">
        {/*<img*/}
        {/*  src={isDark ? '/assets/logo.png' : '/assets/logo_dark.png'}*/}
        {/*  alt={t('brand_name')}*/}
        {/*  className="mx-auto w-full max-w-lg object-contain px-4 mt-4"*/}
        {/*/>*/}
      </div>
      <Formik {...props}>
        {(formik) => (
          <Form className="flex flex-col gap-3">
            <Input name="email" type={InputTypeEnum.Text} label={t('email')} formik={formik} />
            <Input name="password" type={InputTypeEnum.Password} label={t('password')} formik={formik} />
            <Button className="mt-4" type={ButtonTypeEnum.Submit} variant={ButtonVariantEnum.RoundAlt} loading={mutation.isPending}>
              {t('sign_in')}
            </Button>
          </Form>
        )}
      </Formik>
    </InfoBox>
  )
}

export default LoginForm
