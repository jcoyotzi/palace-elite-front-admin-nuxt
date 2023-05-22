import { IOffer, RoomRate } from "../dto/rewardNightDTO"

export class RoomRateMapper {
  static mapRoomRates(ratesArray: RoomRate[]) {
    const array = [...ratesArray]
    if (!array) return

    return this.mapRates(array)
  }

  static mapRates(array: RoomRate[]): IOffer[] {
    const mappedArray = array.map((block) => {
      const { ota, hotel, rate } = block

      const lastPrice = ota ? Math.round(ota.reduce((sum, current) => sum + current.price, 0) / ota.length) : null
      const currentPrice = rate ? Math.round(rate.reduce((sum, current) => sum + current.price, 0) / rate.length) : null
      const discount = lastPrice && currentPrice ? 100 - Math.round((100 * currentPrice) / lastPrice) : null

      return {
        hotel,
        lastPrice,
        discount,
        currentPrice,
        concept: 'avg/night'
      }
    })

    return mappedArray;
  }
}
