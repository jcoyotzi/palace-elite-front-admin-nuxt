import {Image} from 'node_modules/@pr-elite-components-library/lib/src/types/GenericTypes/Image.interface'

export interface RequestRates {
  begin: string
  end: string
  market: string
  costType: string
}

export interface IRate {
  date_from: string
  date_to: string
  price: number
}
export interface RoomRate {
  hotel: string
  ota: IRate[],
  rate: IRate[]
}

export interface RoomRateData {
  data: RoomRate[]
}

export interface OfferExpiration {
  text: string
  endTime: string | number | Date
  uppercase: boolean
}

export interface IOffer {
  hotel: string
  lastPrice: number | null
  discount: number | null
  currentPrice: number | null
  concept: string
}

export interface IRewardNight {
  externalId: string
  title: string
  summary: string
  services: string
  amenities: string
  offerExpiration: OfferExpiration | null
  specialOffer: boolean
  images: Image[]
  category: string
}

export interface PropertySearch {
  id: number
  attributes: {
    externalId: string
    buildSearch: {
      id: number
      title: string
      type: string
      isSpecialOffer: boolean
      specialOfferLabel: string
      description: string
      content: string
      viewAmenitiesLabel: string
      viewAmenitiesContent: string
      offerEndsLabel: string
      offerEndsDate: string
      slider: {
        data: {
          id: number
          attributes: Image
        }[]
      }
    }
  }
}

export interface RewardNightDTO {
  data: PropertySearch[]
}