import { IMenu } from './IMenu'
import { IMenuItem } from '../MenuItem/IMenuItem'

export interface IMenuShow extends IMenu {
  items: IMenuItem[]
}
