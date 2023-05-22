import {injectable, inject} from 'inversify'
import {ResortCreditDTO} from '../dto/resortCreditDto'
import {ResortCreditsRepository} from './resortCreditRepository'
import {Response} from '~/src/app/network/common/domain/entity/response'
import httpTypes from '~/src/app/common/types/httpTypes'
import {HttpApi} from '~/src/app/network/common/domain/entity/httpApi'
import { currentLocale } from '~/src/ui/utils/currentLocaleByCookie'

@injectable()
export default class ResortCreditsServiceRepository implements ResortCreditsRepository {
  constructor(@inject(httpTypes.strapiHttpApi) private readonly http: HttpApi) {}

  getResortCreditActivities(resort: string): Promise<Response<ResortCreditDTO>> {
    const query = [
      `populate=resortCreditBenefits.media.media`,
      `populate[1]=resortCreditBenefits.property`,
      `filters[resortCreditBenefits][property][externalId][$eq]=${resort}`,
      `locale=${currentLocale()}`
    ].join('&');

    return this.http.get(`/api/resort-credit-benefit-groups?${query}`)
  }
}
