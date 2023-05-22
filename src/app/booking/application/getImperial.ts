import {inject, injectable} from 'inversify'
import {ImperialProvitionRequest} from '../domain/dto/provitionsRequest'
import UseCase from 'app/common/application/UseCase'
import bookingTypes from 'app/common/types/bookingTypes'
import {BookingRespository} from 'app/booking/domain/repositories/bookingRepository'
import {ImperialEntity} from '../domain/entities/imperialEntity'
import {ImperialMapper} from '../domain/mapper/imperialMapper'
import {Combination} from '../domain/dto/imperialDto'

@injectable()
export class GetImperialProvitions implements UseCase<ImperialProvitionRequest, any> {
  constructor(
    @inject(bookingTypes.bookingRepository)
    private readonly bookingRepository: BookingRespository
  ) {}

  async run(port: ImperialProvitionRequest): Promise<ImperialEntity> {
    const result = await this.bookingRepository.getImperialProvitions(port)
    const availableCombinations = ['B', 'LSC', 'LCC', 'CCP']

    let filteredResult: ImperialEntity | null = {}
    for (const [key, combinationValue] of Object.entries(result.data!.data as ImperialEntity)) {
      const filteredCombination = combinationValue.filter((combination: Combination) =>
        availableCombinations.includes(String(combination.Type))
      )

      if (filteredCombination.length > 0) {
        filteredResult = {
          ...filteredResult,
          [key]: filteredCombination
        }
      }
    }

    // @ts-ignore
    return filteredResult ? filteredResult : []
  }
}
