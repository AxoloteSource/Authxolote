import { IInfoBoxTitleProps } from '@/components/InfoBox/Interfaces/infoBoxTitleProps.interface'

const InfoBoxTitle = ({ children, subtitle }: IInfoBoxTitleProps) => {
  return (
    <div className="mb-12 text-center">
      <h2 className="mb-2 text-3xl font-bold text-gray-600">{children}</h2>
      {subtitle && (
        <div className="flex items-center justify-center space-x-2">
          <span className="h-px w-16 bg-gray-300"></span>
          <span className="font-normal text-gray-500">{subtitle}</span>
          <span className="h-px w-16 bg-gray-300"></span>
        </div>
      )}
    </div>
  )
}

export default InfoBoxTitle
