import {Response} from '~/src/app/network/common/domain/entity/response'
import {Reservation} from '~/src/app/reservation/domain/entities/reservation'
import {CreateNewReservationDto} from 'app/reservation/domain/dto/createNewReservationDto'
import {CreateNewReservationResponseDto} from 'app/reservation/domain/dto/createNewReservationResponseDto'
import {
  GetNextReservationFolioByHotelResponseDto
} from "app/reservation/domain/dto/getNextReservationFolioByHotelResponseDto";
import {
  GetExistsContractMappedProvisionRequest
} from "app/reservation/domain/dto/getExistsContractMappedProvisionRequest";
import {
  GetExistsContractMappedProvisionResponseDto
} from "app/reservation/domain/dto/getExistsContractMappedProvisionResponseDto";
import {RoomFolio} from "app/filldatareservation/domain/roomFolio";
import {ReservationTypes} from "app/filldatareservation/domain/reservationTypes";

export interface ReservationRepository {
  getReservationTypesAvailable(
    affiliationNumber: string,
    isNational?: boolean,
    showNotSure?: boolean
  ): Promise<Response<Reservation[]>>

  createNewReservation(
    payload: CreateNewReservationDto
  ): Promise<CreateNewReservationResponseDto>

  getNextReservationFolioByHotel(
    hotel: string
  ): Promise<Response<GetNextReservationFolioByHotelResponseDto>>

  getExistsContractMappedProvision(payload: GetExistsContractMappedProvisionRequest): Promise<Response<boolean>>

  preAssignProvisionToMember(
    roomFolio: RoomFolio,
    application: string,
    company: number,
    allot3: ReservationTypes,
    isNational: boolean,
    market: string,
    provision: any,
  ): Promise<void>;

  getContractByPromotion(
    application: string,
    checking: number,
    checkout: number,
    company: number,
    roomCode: number,
    category: number,
    hotel: string,
    nights: number
  ): Promise<any>;

  preAssignCombinationsMember(
    roomFolio: RoomFolio,
    provision: any,
    isNational: boolean,
    allot3: ReservationTypes,
    application: string,
    company: number,
    market: string,
    callWithNull?: boolean,
  ): Promise<any>;

  desPreAssignProvision(values: any): Promise<any>;

  getInfoRmAccessByCompanyApplication(values: any): Promise<any>;
}
