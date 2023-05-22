import {inject, injectable} from 'inversify'
import httpTypes from '../../../common/types/httpTypes'
import { TermsAndConditionsRepository } from './termsAndConditionsRepository'
import {Response} from '~/src/app/common/domain/entities/response'
import {HttpApi} from '~/src/app/network/common/domain/entity/httpApi'
import { GetTermsAndConditionsDto } from '~/src/app/bookings/domain/dto/getTermsAndConditionsDto'
import { currentLocale } from '~/src/ui/utils/currentLocaleByCookie'

@injectable()
export default class TermsAndConditionsServiceRepository implements TermsAndConditionsRepository {
  constructor(
    @inject(httpTypes.strapiHttpApi) private readonly httpJs: HttpApi,
  ) {}

  getTandC(code: string): Promise<Response<GetTermsAndConditionsDto>> {
    return this.httpJs.get(`/api/terms-and-conditions?filters[code][$eq]=${code}&populate=deep&locale=${currentLocale()}`)
  }
}
