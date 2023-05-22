import {Store, Pinia} from 'pinia-class-component'
import termsAndCoditionsTypes from '~/src/app/common/types/termsAndCoditionsTypes'
import { lazyInject } from '~/src/container'
import GetTermsAndConditionsUseCase from '~/src/app/termsAndCoditions/application/getTermsAndConditionsUseCase'

@Store({
  name: 'termAndConditionsStore'
})
export class TermsAndConditionsStore extends Pinia {
  @lazyInject(termsAndCoditionsTypes.getTermsAndConditionsUseCase)
  private readonly getTermsAndConditionsUseCase!: GetTermsAndConditionsUseCase

  async fetchTermsStrapi(code: string) {
    const data = await this.getTermsAndConditionsUseCase.run(code)
    return data?.data[0]
  }
}
