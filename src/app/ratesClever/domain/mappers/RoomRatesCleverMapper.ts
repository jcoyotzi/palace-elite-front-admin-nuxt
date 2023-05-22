import dayjs from 'dayjs'
// import {
//   RoomRatesClever,
//   RoomRatesCleverFormatted,
//   RoomRatesCleverNightPrice,
//   RoomRatesCleverNightPriceFormatted,
//   RoomRefundableRate,
//   RoomRefundableRateFormated
// } from '~/src/app/ratesClever/domain/entities/roomRatesClever'
import {usdFormatter} from '~/src/app/common/mapper/moneyFormatters'
//
const priceFormatter = (currency: string) => {
  return (price: number) => {
    return `${usdFormatter.format(price)} ${currency}`
  }
}

export function dateToMonthDay(date: string): string {
  return dayjs(date).format('MMM D')
}
//
// export default class RoomRatesCleverMapper {
//   private priceFormat: Function
//
//   constructor(private readonly data: RoomRatesClever) {
//     this.priceFormat = priceFormatter(data.currency)
//   }
//
//   map(): RoomRatesCleverFormatted {
//     const {
//       currency,
//       pricesPerNight,
//       refundable,
//       nonRefundable
//     } = this.data
//
//     const pricesPerNightFormatted = pricesPerNight.map(item =>
//       RoomRatesCleverMapper.mapPrice(item, this.priceFormat)
//     )
//     return {
//       currency,
//       pricesPerNight: pricesPerNightFormatted,
//       refundable: refundable.map(item => this.mapRoomRefundableRate(item)),
//       nonRefundable: nonRefundable.map(item => this.mapRoomRefundableRate(item))
//     }
//   }
//
//   public mapRoomRefundableRate(data: RoomRefundableRate): RoomRefundableRateFormated {
//     return {
//       rateLbl: data.label,
//       ratePrice: this.priceFormat(data.price),
//       value: data.value,
//       checked: data.checked
//     }
//   }
//
//   public static mapPrice(
//     item: RoomRatesCleverNightPrice,
//     priceFormat: Function
//   ): RoomRatesCleverNightPriceFormatted {
//     const {date, price, regularPrice} = item
//
//     return {
//       date: dateToMonthDay(date),
//       price: priceFormat(price),
//       dashedPrice: priceFormat(regularPrice)
//     }
//   }
// }
