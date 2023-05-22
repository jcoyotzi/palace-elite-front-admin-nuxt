import {Pinia, Store} from 'pinia-class-component'
import {lazyInject} from '~/src/container'
import companionTypes from 'app/common/types/companionTypes'
import AddCompanionUseCase from 'app/companion/application/addCompanionUseCase'
import {AddCompanionPayload, AddCompanionPayloadDto} from 'app/companion/domain/dto/addCompanionPayloadDto'

@Store({
  name: 'CompanionStore'
})
export class CompanionStore extends Pinia {
  @lazyInject(companionTypes.addCompanionUseCase)
  private readonly addCompanionUseCase!: AddCompanionUseCase

  async saveCompanion(companionData: AddCompanionPayloadDto) {
    try {
      const response = await this.addCompanionUseCase.run({
        data: companionData
      })

      if (response.data) {
        return response.data
      }
    } catch (e) {
      throw e
    }
  }
}
