import {inject, injectable} from "inversify";
import reservationTypes from "app/common/types/reservationTypes";
import {ReservationRepository} from "app/reservation/domain/repositories/reservationRepository";
import {
  GetExistsContractMappedProvisionRequest
} from "app/reservation/domain/dto/getExistsContractMappedProvisionRequest";

@injectable()
export class GetExistsContractMappedProvision {
  constructor(
    @inject(reservationTypes.reservationRepository)
    private readonly reservationRepository: ReservationRepository
  ) {}

  run(port: GetExistsContractMappedProvisionRequest): Promise<boolean> {
    const response = this.reservationRepository.getExistsContractMappedProvision(port)
    // @ts-ignore
    return response.data
  }
}
