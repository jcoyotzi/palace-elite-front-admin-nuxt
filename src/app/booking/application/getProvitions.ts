import {inject, injectable} from 'inversify'
import {ProvitionsRequest} from '../domain/dto/provitionsRequest'
import UseCase from 'app/common/application/UseCase'
import bookingTypes from 'app/common/types/bookingTypes'
import {BookingRespository} from 'app/booking/domain/repositories/bookingRepository'

@injectable()
export class GetProvitions implements UseCase<ProvitionsRequest, any> {
  constructor(
    @inject(bookingTypes.bookingRepository) private readonly bookingRepository: BookingRespository
  ) {}

  async run(port: ProvitionsRequest): Promise<any> {
    const result = await this.bookingRepository.getProvitions(port)
    // @ts-ignore
    return result.data!.data
  }
}
