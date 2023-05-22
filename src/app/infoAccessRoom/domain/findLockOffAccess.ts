import {Detailacessroom} from 'app/infoAccessRoom/domain/detailAcessRoom'

export interface FindLockOffAccess {
  from: string
  to: string
  access: Detailacessroom[]
}
