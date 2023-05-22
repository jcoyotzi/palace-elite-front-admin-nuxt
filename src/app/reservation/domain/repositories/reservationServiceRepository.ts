import {inject, injectable} from 'inversify'
import httpTypes from '../../../common/types/httpTypes'
import {HttpApi} from '../../../network/common/domain/entity/httpApi'
import {Reservation} from '../entities/reservation'
import {Response} from '../../../network/common/domain/entity/response'
import {ReservationRepository} from '~/src/app/reservation/domain/repositories/reservationRepository'
import {CreateNewReservationResponseDto} from 'app/reservation/domain/dto/createNewReservationResponseDto'
import {CreateNewReservationDto} from 'app/reservation/domain/dto/createNewReservationDto'
import {
  GetNextReservationFolioByHotelResponseDto
} from "app/reservation/domain/dto/getNextReservationFolioByHotelResponseDto";
import {
  GetExistsContractMappedProvisionRequest
} from "app/reservation/domain/dto/getExistsContractMappedProvisionRequest";
import {RoomFolio} from "app/filldatareservation/domain/roomFolio";
import {ReservationTypes} from "app/filldatareservation/domain/reservationTypes";

@injectable()
export default class ReservationServiceRepository implements ReservationRepository {
  constructor(@inject(httpTypes.intelligenceXHttpApi) private readonly http: HttpApi) {}

  getReservationTypesAvailable(
    affiliationNumber: string,
    isNational: boolean = false,
    showNotSure: boolean = true
  ): Promise<Response<Reservation[]>> {
    return this.http.get('/reservation/type', {
      params: {
        'request.showNotSure': showNotSure,
        'request.isNational': isNational,
        'request.application': affiliationNumber
      }
    })
  }

  async createNewReservation(payload: CreateNewReservationDto): Promise<CreateNewReservationResponseDto> {
    try {
      const { data } = await this.http.post('/bookings/reservation', {data: payload})
      // @ts-ignore
      return data?.data as CreateNewReservationResponseDto;
    } catch(error) {
      throw new Error('Error createNewReservation')
    }
  }

  getNextReservationFolioByHotel(hotel: string): Promise<Response<GetNextReservationFolioByHotelResponseDto>> {
    return this.http.get(`/booking-engine/next-reservation-folio/hotel/${hotel}`)
  }

  getExistsContractMappedProvision(payload: GetExistsContractMappedProvisionRequest): Promise<Response<boolean>> {
    return this.http.get('/membership/exists-contract-mapped-provision-controller', {
      params: {
        ...payload,
      }
    })
  }

  async preAssignProvisionToMember(
    roomFolio: RoomFolio,
    application: string,
    company: number,
    allot3: ReservationTypes,
    isNational: boolean,
    provision: any,
    market: string,
  ): Promise<void> {
    await this.http.post(`/bookings/pre-assign-member-provision/application/${application}/company/${company}`, {
      data: {
        reservation: roomFolio,
        provision,
        useRateCodeProcess: true,
        isInternet: true,
        isNational,
        isProvisionCombination: true,
        assignedContract: {
          mkt_seg: market,
          allot3,
        },
      }
    })
  }

  async preAssignCombinationsMember(
    roomFolio: RoomFolio,
    provision: any,
    isNational: boolean,
    allot3: ReservationTypes,
    application: string,
    company: number,
    market: string,
    callWithNull: boolean = false,
  ) {

    let assignedContract: any = null;

    if (!callWithNull) {
      assignedContract = {
        mkt_seg: market,
        allot3,
      }
    }

    return await this.http.post(`/membership/combination-preassign-provision-member`, {
      data: {
        application,
        company,
        reservation: roomFolio,
        provision: provision ? [...provision] : [],
        useRateCodeProcess: true,
        isInternet: true,
        isNational,
        setDepositAndRate: true,
        isProvisionCombination: true,
        assignedContract,
      }
    })
  }

  async getContractByPromotion(
    application: string,
    checking: number,
    checkout: number,
    company: number,
    roomCode: number,
    category: number,
    hotel: string,
    nights: number
  ): Promise<any> {
    const response = await this.http.get(
      `/contract/promotion-array/application/${application}/company/${company}/hotel/${hotel}/check-in/${checking}/check-out/${checkout}/nights/${nights}/room/${roomCode}/category/${category}`
    );

    // @ts-ignore 😈
    return response.data.data;
  }

  desPreAssignProvision(values: any): Promise<any> {
    return this.http.post(`/bookings/despre-assign-member-provision-by-id/application/${values.application}/company/${values.company}`, {
      data: {
        "isNational": values.isNational,
        "onlyChristmas": values.chris,
        "category": values.category,
        "type": values.provision.TYPE,
        "provisionFolio": values.provision.FOLIO,
        "hotel": values.reservation.Hotel,
        "reservationFolio": values.reservation.Folio,
      }
    })
  }

  getInfoRmAccessByCompanyApplication(values: any): Promise<any> {
    return this.http.get('bookings/room/info', {
      params: {
        'infoAccessRoomRequestDTO.company': values.company,
        'infoAccessRoomRequestDTO.application': values.application,
        'infoAccessRoomRequestDTO.includeDetails': true
      }
    })
  }
}
