import { IFileProps } from '@/components/File/IFileProps'
import { useShowFile } from '@/services/file/useFileService'

const File = ({ className = '', url }: IFileProps) => {
  const { data, isLoading } = useShowFile(url)

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className={className}>
      {data!.type.startsWith('image/') && <img src={URL.createObjectURL(new Blob([data!]))} alt="File" />}
      {data!.type == 'application/pdf' && <embed src={URL.createObjectURL(new Blob([data!]))} type="application/pdf" width="100%" height="600px" />}
    </div>
  )
}

export default File
