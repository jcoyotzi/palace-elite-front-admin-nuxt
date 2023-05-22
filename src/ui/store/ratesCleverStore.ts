import {Pinia, Store} from 'pinia-class-component'
import {lazyInject} from '~/src/container'
import ratesCleverTypes from '~/src/app/common/types/ratesCleverTypes'
import GetRoomRatesUseCase, {
  RatesCleverPayloadByHotelDto
} from '~/src/app/ratesClever/application/getRoomRatesUseCase'
import {
  RoomRatesClever,
  RoomRatesCleverFormatted
} from '~/src/app/ratesClever/domain/entities/roomRatesClever'
import {RoomsFormatted} from '~/src/app/ratesClever/domain/mappers/getRoom'
import {CleverRoomCode, RatesCleverPayloadDto} from 'app/ratesClever/domain/dto/RatesCleverPayloadDto'
import {RatesCleverRepository} from '~/src/app/ratesClever/domain/repositories/ratesCleverRepository'
import RoomRatesCleverRawMapper from '~/src/app/ratesClever/domain/mappers/roomRatesCleverRawMapper'
import {BookingStore} from '~/src/ui/store/bookingStore'
import {RoomBookingEntity} from 'app/booking/domain/entities/roomBookingEntity'
import {RoomAccess} from 'app/roomAccess/domain/entities/roomAccess'
import {
  infantGrouping,
  InfantsGrouped,
  isLockOffRoom,
  RuleGrouping
} from 'app/booking/domain/mapper/infantGrouping'
import {GetAvailableCategoriesDTO} from '~/src/app/ratesClever/domain/dto/GetAvailableCategoriesDTO'
import {GetAvailableCategoriesResponseDTO} from '~/src/app/ratesClever/domain/dto/GetAvailableCategoriesResponseDTO'
import {PropertiesStore} from './propertiesStore'
import { PropertyEntity } from '~/src/app/property/domain/entities/propertyEntity'
import { getRoomsSorted } from '~/src/app/ratesClever/infrastructure/getRoomsSorted'

export interface isLockOffPayload {
  maxOccupancy: number
  max_adults: number
  max_children: number
  roomIndex: number
  bookingRooms: RoomBookingEntity
}

export interface StoredPayloadForFetch {
  payload: RatesCleverPayloadDto
  propertyCode: string
  roomIndex: number
  originalAccessRooms: RoomAccess[]
}

@Store({
  name: 'RatesCleverStore'
})
export class RatesCleverStore extends Pinia {
  @lazyInject(ratesCleverTypes.GetRoomRatesUseCase)
  private readonly getRoomRatesUseCase!: GetRoomRatesUseCase
  // region State

  @lazyInject(ratesCleverTypes.RatesCleverRespository)
  private readonly ratesCleverRespository!: RatesCleverRepository

  raw: RoomRatesClever | null = null
  formated: RoomRatesCleverFormatted | null = null
  rooms: any | null = null
  presidentialRooms: any | null = null
  //@ts-ignore
  availableCategoriesForBooking: GetAvailableCategoriesResponseDTO[] = []

  fetchPayload: StoredPayloadForFetch | null = null

  setRooms(rooms: any) {
    this.rooms = rooms
  }

  setfetchPayload(data: StoredPayloadForFetch) {
    this.fetchPayload = structuredClone(data)
  }
  // end region

  // region Getters
  get rawData(): RoomRatesClever | null {
    return this.raw
  }

  get formattedData(): RoomRatesCleverFormatted | null {
    return this.formated
  }

  get roomsData(): RoomsFormatted[] | null {
    //
    if (this.presidentialRooms) return this.rooms.concat(this.presidentialRooms)
    /* debugger */
    return this.rooms
  }
  // endregion

  // region Actions
  getRatesByCode(code: string, lockOff: boolean = false) {
    const data = this.roomsData?.find(
      // @ts-ignore
      (roomRate: RoomsFormatted) => roomRate?.roomCode === code && roomRate?.isLockOff === lockOff
    )
    return data
  }

  async fetchData(payload: RatesCleverPayloadDto, propertyCode: string) {

    let payloadWithAvailableCategories = Object.assign({}, payload)
    payloadWithAvailableCategories.availableReservationCategories =
      this.availableCategoriesForBooking

    let mutablePayload: RatesCleverPayloadDto = structuredClone(payloadWithAvailableCategories)
    const bookingStoreInstance = new BookingStore()
    const propertiesStore = new PropertiesStore()
    const currentRoomIndex = bookingStoreInstance.roomIndex
    
    const childrenAgesRaw =
      bookingStoreInstance.reservationInfo[currentRoomIndex]?.roomsPax?.childrenages
    const childrenAges = childrenAgesRaw === undefined ? [] : childrenAgesRaw

    const data = await propertiesStore.fetchGroupingData(
      bookingStoreInstance.getBooking.propertyCode
    )

    const rules = data.events as RuleGrouping

    const infants: InfantsGrouped = infantGrouping(childrenAges as string[], rules)

    if (infants.adults) {
      //mutablePayload.adult += infants.adults
    }

    mutablePayload.infants = infants

    try {
      const payloadUsecase: RatesCleverPayloadByHotelDto = {
        payload: mutablePayload,
        propertyCode
      }
      const data = await this.getRoomRatesUseCase.run(payloadUsecase)
      this.rooms.push(data[0])
    } catch (e: any) {
      console.log(e)
    }
  }

  async prepareRoomCodesRequest(payload: RatesCleverPayloadDto, propertyCode: string) {

    const { roomCodes } = payload

    const roomCodesSorted = this.sortCategories(roomCodes, payload.hotel)

    payload.roomCodes = roomCodesSorted;

    for (let i = 0; i < roomCodes.length; i++) {
      const tempAccess = {
        ...payload,
        roomCodes: [payload.roomCodes[i]]
      }
      await this.fetchData(tempAccess, propertyCode)
    }

  }

  sortCategories(categiries: CleverRoomCode[], hotelCode: string) {
    const roomOrder = getRoomsSorted(hotelCode)
    const tempCategories = [...categiries]

    tempCategories.sort(function (categoryA, categoryB) {
      // @ts-ignore
      const defaultSort: RoomSort = {
        orderPosition: roomOrder.length
      }

      const categoryToSortA =
        roomOrder.find(indexedRoom => indexedRoom.roomCode === categoryA.code) ?? defaultSort
      const categoryToSortB =
        roomOrder.find(indexedRoom => indexedRoom.roomCode === categoryB.code) ?? defaultSort

      return categoryToSortA?.orderPosition - categoryToSortB?.orderPosition
    })

    return tempCategories
  }

  async fetchDataRetry(newRoomIndex: number) {
    const bookingStoreInstance = new BookingStore()
    const propertiesStore = new PropertiesStore()

    // @ts-ignore
    let newPayload: StoredPayloadForFetch = structuredClone(this.fetchPayload)

    const roomsAccessCodes = newPayload.originalAccessRooms.map(room => ({
      room
    }))

    newPayload.payload.adult = bookingStoreInstance.reservationInfo[newRoomIndex].roomsPax.adults
    // TODO: aca se deben quitar bebes para no cobrar en paxes

    const data = await propertiesStore.fetchGroupingData(
      bookingStoreInstance.getBooking.propertyCode
    )

    const rules = data.events as RuleGrouping

    newPayload.payload.infants = infantGrouping(
      bookingStoreInstance.reservationInfo[newRoomIndex].roomsPax.childrenages as string[],
      rules
    )

    if (newPayload.payload.infants.adults) {
      newPayload.payload.adult += newPayload.payload.infants.adults
    }

    newPayload.roomIndex = newRoomIndex

    newPayload.payload.roomCodes = roomsAccessCodes.map(actualRoom => ({
      code: actualRoom.room.RealCode,
      isLockOff: actualRoom.room.isLockOff ?? false,
      lockoffType: actualRoom.room.isLockOff ? 'L1' : ''
    }))

    this.fetchPayload = structuredClone(newPayload)

    if (newRoomIndex > 0 && this.fetchPayload !== null) {
      this.rooms = []
      await this.prepareRoomCodesRequest(newPayload.payload, newPayload.propertyCode)
    }

  }

  async getAvailableCategoriesForBooking(params: GetAvailableCategoriesDTO) {
    const availableCategories = await this.ratesCleverRespository.getAvailableCategories(params)
    console.log({
      availableCategories
    })
    this.availableCategoriesForBooking = availableCategories
    console.log('availableCategoriesForBooking: ', this.availableCategoriesForBooking)
  }
  // endregion
}
