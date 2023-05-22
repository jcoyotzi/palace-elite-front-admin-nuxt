import {PropertyEntity} from './propertyEntity'

export interface Property {
  isAvailable(property: PropertyEntity): boolean
}

export enum HotelBrands {
  Baglioni = 'BA'
}
