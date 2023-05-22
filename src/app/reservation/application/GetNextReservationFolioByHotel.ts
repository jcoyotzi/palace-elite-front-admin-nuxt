import {inject, injectable} from "inversify";
import reservationTypes from "app/common/types/reservationTypes";
import {ReservationRepository} from "app/reservation/domain/repositories/reservationRepository";
import { GetNextReservationFolioByHotelResponseDto } from "app/reservation/domain/dto/getNextReservationFolioByHotelResponseDto"

@injectable()
export class GetNextReservationFolioByHotel {
  constructor(
    @inject(reservationTypes.reservationRepository)
    private readonly reservationRepository: ReservationRepository
  ) {}

  async run(port: string): Promise<GetNextReservationFolioByHotelResponseDto> {
    const response = await this.reservationRepository.getNextReservationFolioByHotel(port)
    // @ts-ignore
    return response.data!.data
  }
}
