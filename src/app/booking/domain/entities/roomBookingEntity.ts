import { InfantsGrouped } from "../mappers/infantGrouping"

export interface RoomBookingEntity {
  adults: number
  children: number
  childrenages: string[]
  id: number
  name: string
}

export interface RoomBookingEntityForPayload {
  id: number
  name: string
  adults: number
  children: number
  babies: number
  kids: number
  childs: number
  childrenages: string[]
  infants: InfantsGrouped
}