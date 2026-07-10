import { IAction } from '@/interfaces/models/Actions/IAction'
import { useServiceUpdateRoleAction } from '@/services/authxolote/roleActions/useServiceRoleActions'
import { Switch } from '@mantine/core'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'

export const ActionSwitch = ({ data }: { data: IAction }) => {
  const [searchParams] = useSearchParams()
  const roleId = searchParams.get('roleId')
  const { t } = useTranslation()
  const [optimisticActive, setOptimisticActive] = useState<boolean | null>(null)
  const checked = useMemo(() => optimisticActive ?? data.active, [optimisticActive, data.active])
  const mutation = useServiceUpdateRoleAction(roleId!, data.id)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.currentTarget.checked
    mutation.mutate(
      { active: newValue },
      {
        onSuccess: () => setOptimisticActive(null)
      }
    )
  }

  return (
    <Switch
      classNames={{
        label: 'text-gray-800 dark:text-white-dark'
      }}
      className="col-span-12"
      name="active"
      label={checked ? t('active') : t('inactive')}
      checked={checked}
      disabled={mutation.isPending}
      onChange={handleChange}
    />
  )
}
