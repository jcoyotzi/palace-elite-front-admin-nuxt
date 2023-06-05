import {inject, injectable} from 'inversify'
import { BookingRespository } from '../domain/repositories/bookingRepository'
import UseCase from 'app/common/application/UseCase'
import bookingTypes from 'app/common/types/bookingTypes'

@injectable()
export class GetMinimumStay implements UseCase<{application: string}, any> {
  constructor(
    @inject(bookingTypes.bookingRepository)
    private readonly bookingRepository: BookingRespository
  ) {}

  run(payload: {application: string}): Promise<any> {
    const result = this.bookingRepository.getMinimumStay(payload)
    return result
  }
}