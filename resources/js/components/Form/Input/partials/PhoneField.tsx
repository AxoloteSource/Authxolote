import { useTranslation } from 'react-i18next'
import PhoneInput, { CountryData } from 'react-phone-input-2'
import { PhoneFieldProps } from '../interfaces/PhoneFieldProps'
// import 'react-phone-input-2/lib/style.css'

export const PhoneField = ({ field, form, nameCode, country }: PhoneFieldProps) => {
  const { t } = useTranslation()

  const removeCountryCode = (phone: string, code: string) => {
    return phone.startsWith(code) ? phone.substring(code.length) : phone
  }

  const onChange = async (value: string, country: CountryData) => {
    await form.setFieldValue(field.name, removeCountryCode(value, country.dialCode))
    await form.setFieldValue(nameCode, country.dialCode)
  }

  return (
    <PhoneInput
      country={country}
      value={`${form.values[nameCode]}${field.value}`}
      onChange={onChange}
      containerClass="w-full"
      inputClass="form-input w-full dark:bg-[#121e32] dark:border-gray-800 font-nunito"
      buttonClass="bg-gray-200 dark:bg-[#121e32] border-gray-300 dark:border-gray-800"
      dropdownClass="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-800 hover:red"
      searchClass="bg-gray-100 dark:bg-[#121e32] dark:text-white font-nunito"
      searchPlaceholder={t('search')}
      searchNotFound={t('not_found')}
      enableSearch={true}
      autoFormat={true}
    />
  )
}
