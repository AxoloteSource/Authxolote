import { useTranslation } from 'react-i18next'
import Button from '../Buttons/Button'
import { ButtonVariantEnum } from '../Buttons/enums/buttonVariant.enum'
import File from '../File/File'
import Modal from '../Modal/Modal'
import Typography from '../Typography'
import { TypographyVariantEnum } from '../Typography/enums/typographyVariant.enum'
import { IModalDocumentProps } from './IModalDocumentProps'

const ModalDocument = ({ isOpen, close, url, name, onClickApprove, onClickDecline }: IModalDocumentProps) => {
  const { t } = useTranslation()

  return (
    <Modal title={'Documento'} isOpen={isOpen} close={close}>
      <div className="flex flex-col gap-2">
        <Typography variant={TypographyVariantEnum.H3}>{name}</Typography>
        <File url={url} />
        <div className="mt-5 flex justify-end gap-2">
          <Button variant={ButtonVariantEnum.Outline} className={'btn-outline-success'} onClick={onClickApprove}>
            {t('approve')}
          </Button>
          <Button variant={ButtonVariantEnum.Outline} className={'btn-outline-danger'} onClick={onClickDecline}>
            {t('decline')}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default ModalDocument
