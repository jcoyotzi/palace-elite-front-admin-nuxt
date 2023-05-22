import {ContainerModule, interfaces} from 'inversify'
import reservationTypes from '../common/types/reservationTypes'
import GetUserReservationTypesAvailable from '../reservation/application/GetUserReservationTypesAvailable'
import UseCase from '../common/application/UseCase'
import {ReservationRepository} from './domain/repositories/reservationRepository'
import ReservationServiceRepository from './domain/repositories/reservationServiceRepository'
import {
  GetReservationTypesByAffiliationNumber
} from '~/src/app/reservation/domain/dto/getReservationTypesByAffiliationNumber'
import {Reservation} from '~/src/app/reservation/domain/entities/reservation'
import {GetNextReservationFolioByHotel} from "app/reservation/application/GetNextReservationFolioByHotel";
import {GetExistsContractMappedProvision} from "app/reservation/application/GetExistsContractMappedProvision";

export default new ContainerModule((bind: interfaces.Bind) => {
  bind<ReservationRepository>(reservationTypes.reservationRepository).to(
    ReservationServiceRepository
  )
  bind<UseCase<GetReservationTypesByAffiliationNumber, Reservation[]>>(
    reservationTypes.getUserReservationTypesAvailable
  ).to(GetUserReservationTypesAvailable)

  bind<GetNextReservationFolioByHotel>(reservationTypes.getNextReservationFolioByHotel).to(GetNextReservationFolioByHotel)
  bind<GetExistsContractMappedProvision>(reservationTypes.GetExistsContractMappedProvision).to(GetExistsContractMappedProvision)
})
