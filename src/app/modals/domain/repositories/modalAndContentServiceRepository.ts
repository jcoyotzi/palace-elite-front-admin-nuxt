import {inject, injectable} from 'inversify'
import httpTypes from '../../../common/types/httpTypes'
import {Response} from '~/src/app/common/domain/entities/response'
import {HttpApi} from '~/src/app/network/common/domain/entity/httpApi'
import {ModalAndContentRepository} from './modalAndContentRepository'
import { currentLocale } from '~/src/ui/utils/currentLocaleByCookie'

@injectable()
export default class ModalAndContentServiceRepository implements ModalAndContentRepository {
  constructor(@inject(httpTypes.strapiHttpApi) private readonly httpJs: HttpApi) {}

  getModal(code: string): Promise<Response<any>> {
    return this.httpJs
      .get(`/api/modal-and-contents?filters[code][$eq]=${code}&populate=deep&locale=${currentLocale()}`)
      .catch(error => {
        console.log(error)
        return null as any
      })
  }
}
