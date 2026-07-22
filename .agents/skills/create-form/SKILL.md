---
name: create-form
description: Guide for creating a new form (Create/Edit) in the Backoffice (React + TypeScript)
globs: resources/js/pages/**/partials/*.tsx
---

### AI Agent Skills Guide: Creating Forms in the Backoffice

This guide details the process for creating a creation and edition form (Modal) following the pattern used in the application (example: `RoleForm`).

#### 1. File Structure
A form is generally organized in its own folder within the `partials/` directory of the page:

```
resources/js/pages/Backoffice/MyModule/MyPage/partials/MyForm/
├── MyForm.tsx         # Visual Component (View)
└── useMyForm.tsx      # Form Logic (Hook)
```

#### 2. Hook Definition (`useMyForm.tsx`)
The hook should handle initial values, validation with Yup, and data submission (`onSubmit`).

```tsx
import { useOnSubmit } from '@/hooks/useOnSubmit'
import { IMyModel } from '@/interfaces/models/MyModule/IMyModel'
import { useServiceStoreMyModel, useServiceUpdateMyModel } from '@/services/my-module/useServiceMyModel'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'

export interface IInitialValuesMyModel {
  name: string
  // ... other fields
}

const initialValues: IInitialValuesMyModel = {
  name: '',
}

interface IUseMyFormProps {
  selectedItem?: IMyModel | null
  onSuccess?: () => void
}

export const useMyForm = ({ selectedItem, onSuccess }: IUseMyFormProps) => {
  const { t } = useTranslation()
  
  const validationSchema = Yup.object().shape({
    name: Yup.string().required(t('name_required')),
  })

  const mutator = useServiceStoreMyModel()
  const mutatorUpdate = useServiceUpdateMyModel(selectedItem?.id ?? 0)

  const { onSubmit } = useOnSubmit<IInitialValuesMyModel>({
    mutateAsync: selectedItem?.id ? mutatorUpdate.mutateAsync : mutator.mutateAsync,
    onSuccess: async () => {
      if (onSuccess) onSuccess()
    }
  })

  const filledValues = {
    ...initialValues,
    name: selectedItem?.name ?? '',
  }

  const formikProps = {
    validationSchema,
    initialValues: filledValues,
    onSubmit
  }

  return { formikProps, t }
}
```

#### 3. The Form Component (`MyForm.tsx`)
Uses `Modal` from `@/components/Modal/Modal` and `Formik` to wrap the fields.

```tsx
import Button from '@/components/Buttons/Button'
import { ButtonTypeEnum } from '@/components/Buttons/enums/buttonType.enum'
import { Input } from '@/components/Form/Input'
import { InputTypeEnum } from '@/components/Form/Input/InputType.enum'
import Modal from '@/components/Modal/Modal'
import { Color } from '@/enums/Color'
import { IMyModel } from '@/interfaces/models/MyModule/IMyModel'
import { Form, Formik } from 'formik'
import { IInitialValuesMyModel } from './useMyForm'
import { useMyForm } from './useMyForm'

interface IMyFormProps {
  onSuccess?: () => void
  close: () => void
  isOpen: boolean
  selectedItem?: IMyModel | null
}

export const MyForm = ({ close, selectedItem, isOpen, onSuccess }: IMyFormProps) => {
  const { formikProps, t } = useMyForm({ selectedItem, onSuccess })
  
  return (
    <Modal
      className="w-full max-w-lg"
      title={`${selectedItem?.id ? t('update_item') : t('new_item')}`}
      isOpen={isOpen}
      close={close}
      closeOnOverlayClick={false}
    >
      <Formik enableReinitialize {...formikProps}>
        {(formik) => (
          <Form className="mb-4 grid grid-cols-12 gap-3">
            <Input<IInitialValuesMyModel> 
              className="col-span-12" 
              name="name" 
              type={InputTypeEnum.Text} 
              label={t('name')} 
              formik={formik} 
            />
            
            <div className="col-span-12 mt-3 flex justify-between gap-3">
              <Button onClick={close} type={ButtonTypeEnum.Button} color={Color.White}>
                {t('cancel')}
              </Button>
              <Button type={ButtonTypeEnum.Submit} disabled={formik.isSubmitting}>
                {t('save')}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}
```

#### 4. Integration in the Page
The form is usually organized in its own directory and imported into the page component.

```tsx
import { MyForm } from './partials/MyForm/MyForm'

// ... inside the Page component
<MyForm 
  onSuccess={handleSuccess} 
  selectedItem={selectedItem} 
  close={close} 
  isOpen={isOpen} 
/>
```

#### 5. Key Points
- **Translations:** Ensure that translation keys (`t('...')`) exist in the localization files.
- **Validation:** Use Yup to define clear validation rules.
- **Services:** Ensure you have the `store` and `update` services defined in `resources/js/services/`.
- **Styles:** Use Tailwind CSS classes for layout (e.g., `grid-cols-12`, `col-span-12`).
