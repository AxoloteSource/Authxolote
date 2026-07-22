import { IIfoBoxAltProps } from '@/components/InfoBox/InfoBoxAlt/InfoBoxAltProps'
import InfoBox from '../InfoBox'

const InfoBoxAlt = ({ title, value, icon }: IIfoBoxAltProps) => {
  return (
    <InfoBox>
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-lg font-semibold">{title}</h4>
          <p className="mt-2 text-3xl text-[var(--text)]">{value}</p>
        </div>
        <div className="h-10 w-10 text-[var(--text)]">{icon}</div>
      </div>
    </InfoBox>
  )
}

export default InfoBoxAlt
