import { InputWithIcon } from '@/components/Form/Input/inputWithIcon'
import { Search } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export const SearchChats = ({ setSearch }: { setSearch: (search: string) => void }) => {
  const { t } = useTranslation()
  return (
    <div className="relative">
      <InputWithIcon
        name={`search`}
        placeholder={`${t('search')} ...`}
        inputCallback={(e) => setSearch(e.target.value)}
        IconComponent={() => <Search onClick={() => console.log('click')} />}
      />
    </div>
  )
}
