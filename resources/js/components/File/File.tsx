import { IFileProps } from '@/components/File/IFileProps'
import { useShowFile } from '@/services/file/useFileService'
import { useTranslation } from 'react-i18next'

const File = ({ className = '', url }: IFileProps) => {
  const { t } = useTranslation()
  const { data, isLoading } = useShowFile(url)

  if (isLoading) {
    return <div>{t('loading')}</div>
  }

  return (
    <div className={className}>
      {data!.type.startsWith('image/') && <img src={URL.createObjectURL(new Blob([data!]))} alt="File" />}
      {data!.type == 'application/pdf' && <embed src={URL.createObjectURL(new Blob([data!]))} type="application/pdf" width="100%" height="600px" />}
    </div>
  )
}

export default File
