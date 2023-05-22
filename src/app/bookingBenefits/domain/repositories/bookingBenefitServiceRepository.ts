import {inject, injectable} from 'inversify'
import {BookingBenefitResponseDto} from '../dto/bookingBenefitDto'
import httpTypes from '../../../common/types/httpTypes'
import {Response} from '../../../common/domain/entities/response'
import {HttpApi} from '../../../network/common/domain/entity/httpApi'
import {BookingBenefitRepository} from '~/src/app/bookingBenefits/domain/repositories/bookingBenefitRepository'
import { currentLocale } from '~/src/ui/utils/currentLocaleByCookie'

@injectable()
export default class BookingBenefitServiceRepository implements BookingBenefitRepository {
  constructor(@inject(httpTypes.strapiHttpApi) private readonly httpJs: HttpApi) {}

  get(): Promise<Response<BookingBenefitResponseDto>> {
    return this.httpJs.get(`api/benefit-groups?populate=deep&sort=id&locale=${currentLocale()}`)
  }
}
