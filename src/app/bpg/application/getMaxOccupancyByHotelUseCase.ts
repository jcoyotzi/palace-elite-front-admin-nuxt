import {injectable, inject} from 'inversify'
import UseCase from '../../common/application/UseCase'
import bpgTypes from '../../common/types/bpgTypes'
import {BPGRepository} from '../domain/repositories/bpgRepository'
import { GetMaxOccupancyByHotelRequest, MaxOccupancyByHotelAndRoomType } from '../domain/entities/maxOccupancyByHotel'
import MaxOccupanciesByHotelMapper from '../domain/mapper/MaxOccupanciesByHotelMapper'

@injectable()
export default class GetMaxOccupancyByHotelUseCase implements UseCase<GetMaxOccupancyByHotelRequest, MaxOccupancyByHotelAndRoomType[]>
{
  constructor(
    @inject(bpgTypes.bpgRepository)
    private readonly bpgRepository: BPGRepository
  ) {}

  async run(request: GetMaxOccupancyByHotelRequest): Promise<MaxOccupancyByHotelAndRoomType[]> {
    const data = await this.bpgRepository.getMaxOccupancyByHotel(request)
    return MaxOccupanciesByHotelMapper.map(data?.data?.data || [])
  }
}