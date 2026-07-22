import { IInputProps } from '@/components/Form/Input/interfaces/IInputProps'
import Input from '../Input/Input'

const TextArea = <T extends object>(props: IInputProps<T>) => {
  return <Input<T> {...props} as={'textarea'}></Input>
}

export default TextArea
