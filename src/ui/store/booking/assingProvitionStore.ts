import dayjs from 'dayjs'
import {Pinia, Store} from 'pinia-class-component'
import {RefundableOptions} from '~/interfaces/Booking/BookingRoomDetailData'
import {ReservationInfo} from '~/src/app/booking/domain/entities/reservationInfo'
import {selectedNights} from '~/src/app/calendar/domain/generator/CalendarDataGenerator'
import {
  AssignProvisionRequestDto,
  DesPreAssingProvisionRequestDto,
  FolioRequestDto
} from '~/src/app/provisions/assignProvision/dto/AssignProvisionRequestDto'
import {CreateRoomFolioRespondeDto} from '~/src/app/provisions/assignProvision/dto/CreateRoomFolioResponseDto'
import {UseAuth} from '../auth'
import {BookingStore} from '../bookingStore'
import {ValidateWeek52} from '~/src/app/filldatareservation/legacyBin/ValidateWeek52'
import {ProvitionOptionType} from '../../components/Booking/PEProvisionOption/PEProvisionOptionTypes'
import {ReservationTypes} from '~/src/app/filldatareservation/domain/reservationTypes'

@Store({
  name: 'assignProvisionStore'
})
export default class AssignProvisionStore extends Pinia {
  async preAssignProvision({rmFolio, context, provition}: AssignProvisionRequestDto) {
    const bookingStore = new BookingStore()
    bookingStore.preAssignProvisionToMember(rmFolio, context, provition)
  }

  async desPreAssing({rmFolio, selectedProvition, category}: DesPreAssingProvisionRequestDto) {
    const bookingStore = new BookingStore()
    const {arrivalDate, departureDate} = bookingStore.infoUserMember
    const authStore = new UseAuth()
    const numberOfSelectedNights = selectedNights(arrivalDate, departureDate)
    const nightsBetweenWeek52 = ValidateWeek52(arrivalDate, departureDate, numberOfSelectedNights)

    await bookingStore.desPreAssignProvisionMember({
      application: authStore.applicationUserMember,
      company: authStore.userCompany,
      provision: selectedProvition,
      reservation: rmFolio,
      category,
      isNational: bookingStore.infoUserMember._UserMember._isnational,
      chris: nightsBetweenWeek52 > 0
    })
  }

  async generateRoomFolio({
    room,
    roomCode,
    selectedRefundRate,
    numberOfSelectedNights,
    isMultiCategoryEngine,
    currentRoomIndex
  }: FolioRequestDto): Promise<CreateRoomFolioRespondeDto> {
    const bookingStore = new BookingStore()
    const {rmFolio, context, isProvisional, isImperial} = await bookingStore.createRoomFolio(
      room,
      roomCode,
      selectedRefundRate,
      numberOfSelectedNights,
      isMultiCategoryEngine,
      currentRoomIndex
    )

    return {
      rmFolio,
      context,
      isProvisional,
      isImperial
    }
  }

  generateRoomFolioPayload({room}: {room: ReservationInfo}): FolioRequestDto {
    const bookingStore = new BookingStore()
    const {checkIn, checkOut} = bookingStore.getBooking
    const arrivalDate = dayjs(checkIn).toDate()
    const departureDate = dayjs(checkOut).toDate()
    const numberOfSelectedNights = selectedNights(arrivalDate, departureDate)

    const roomCode = [String(room.roomSelected?.selectedCategory.RealCode)]
    const selectedRefundRate = [
      room.roomSelected?.selectedRefundRate === RefundableOptions.REFUNDABLE
    ]
    const isMultiCategoryEngine = false
    const currentRoomIndex = room.index

    return {
      room,
      roomCode,
      selectedRefundRate,
      numberOfSelectedNights,
      isMultiCategoryEngine,
      currentRoomIndex
    }
  }

  findSelectedProvitionOnRoom({room}: {room: ReservationInfo}) {
    const isProvisional =
      room.roomSelected?.selectedOption?.id === ReservationTypes.INCENTIVA ||
      room.roomSelected?.selectedOption?.id === ReservationTypes.ANIVERSARIO

    const isImperial =
      room.roomSelected?.selectedOption?.id === ReservationTypes.IMP_NIGHT ||
      room.roomSelected?.selectedOption?.id === ReservationTypes.IMP_WEEKS

    if (isProvisional || isImperial) {
      let provition: any | null = {}

      if (room.roomSelected?.selectedOption?.id === ReservationTypes.ANIVERSARIO) {
        if (
          room.roomSelected?.provisions?.anniversary?.provision?.type === ProvitionOptionType.Week
        ) {
          provition = room.roomSelected?.provisions?.anniversary?.provision.raw
        } else {
          const aniversaryProvition = room.roomSelected?.provisions?.anniversary?.provision?.nights
          const isNight = provition !== null
          provition = isNight ? aniversaryProvition![0].raw : aniversaryProvition
        }
        // @ts-ignore
      } else if (room.roomSelected!.selectedOption?.id === ReservationTypes.INCENTIVA) {
        provition = room.roomSelected?.provisions?.incentive?.provision.raw
        // provition = currentIncentiveProvisionMock[0]
      } else {
        provition = room.roomSelected!.selectedProvition
      }

      provition.HOTEL = room.folioContent?.context.Hotel
      provition.RM_TYPE = room.folioContent?.context.rm_type
      provition.APPLICATION = room.folioContent?.context.Member
      provition.ARV_DATE = room.folioContent?.rmFolio?.Arv_date
      provition.HOTFOLIO = room.folioContent?.rmFolio?.Folio
      provition.STATUS = 'R'

      if (isProvisional && room.roomSelected?.provisions?.anniversary !== undefined) {
        if (
          room.roomSelected?.provisions?.anniversary?.provision?.type === ProvitionOptionType.Night
        ) {
          const copyFromProvisions = structuredClone(
            room.roomSelected?.provisions?.anniversary?.provision.nights
          )

          // @ts-ignore
          for (const copyFromProvision of copyFromProvisions) {
            const rawProvision = copyFromProvision.raw

            rawProvision.HOTEL = room.folioContent?.context.Hotel
            rawProvision.RM_TYPE = room.folioContent?.context.rm_type
            rawProvision.APPLICATION = room.folioContent?.context.Member
            rawProvision.ARV_DATE = room.folioContent?.rmFolio?.Arv_date
            rawProvision.HOTFOLIO = room.folioContent?.rmFolio?.Folio
            rawProvision.STATUS = 'R'

            return provition
          }
        } else {
          return provition
        }
      }

      if (isImperial && room.folio === 0) {
        let provitions: any = []

        provitions = room.roomSelected?.selectedCombination?.Provisions?.map(provitionNight => {
          provitionNight.HOTEL = room.folioContent?.context.Hotel
          provitionNight.RM_TYPE = room.folioContent?.context.rm_type
          provitionNight.APPLICATION = room.folioContent?.context.Member
          provitionNight.ARV_DATE = room.folioContent?.rmFolio?.Arv_date as any as string
          provitionNight.HOTFOLIO = room.folioContent?.rmFolio?.Folio
          provitionNight.STATUS = 'R'

          return provitionNight
        })

        return provitions
      }
    }
  }

  getCategoryNumber({room}: {room: ReservationInfo}): number {
    const selectedOptionId = room.roomSelected?.selectedOption?.id

    if (
      [ReservationTypes.IMP_NIGHT, ReservationTypes.IMP_WEEKS].includes(
        room.roomSelected?.selectedOption!.id! as number
      )
    ) {
      return room.roomSelected?.selectedProvition?.Category == 'IMPNIG' ? 3 : 4
    }

    return Number(selectedOptionId)
  }
}
