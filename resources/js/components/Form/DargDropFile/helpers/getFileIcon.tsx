import { Archive, File, FileAudio, FileCode, FileImage, FileSpreadsheet, FileText, FileVideo } from 'lucide-react'

export const getFileIcon = (fileName: string) => {
  const extension = fileName.split('.').pop()?.toLowerCase()

  const iconProps = { size: 20, className: 'flex-shrink-0' }

  if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp', 'ico'].includes(extension || '')) {
    return <FileImage {...iconProps} className="flex-shrink-0" />
  }

  if (['pdf'].includes(extension || '')) {
    return <FileText {...iconProps} className="flex-shrink-0" />
  }

  if (['doc', 'docx', 'txt', 'rtf', 'odt'].includes(extension || '')) {
    return <FileText {...iconProps} className="flex-shrink-0" />
  }

  if (['xls', 'xlsx', 'csv', 'ods'].includes(extension || '')) {
    return <FileSpreadsheet {...iconProps} className="flex-shrink-0" />
  }

  if (['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv', 'webm'].includes(extension || '')) {
    return <FileVideo {...iconProps} className="flex-shrink-0" />
  }

  if (['mp3', 'wav', 'ogg', 'flac', 'aac', 'm4a'].includes(extension || '')) {
    return <FileAudio {...iconProps} className="flex-shrink-0" />
  }

  if (['zip', 'rar', '7z', 'tar', 'gz', 'bz2'].includes(extension || '')) {
    return <Archive {...iconProps} className="flex-shrink-0" />
  }

  if (['js', 'ts', 'jsx', 'tsx', 'html', 'css', 'json', 'xml', 'php', 'py', 'java', 'cpp', 'c', 'h'].includes(extension || '')) {
    return <FileCode {...iconProps} className="flex-shrink-0" />
  }

  return <File {...iconProps} />
}
