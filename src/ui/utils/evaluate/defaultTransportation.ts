import { GuestRelationship } from "~/src/app/filldatareservation/domain/data/GuestRelationship"
import { leBlancPropertyCodes } from "~/src/app/property/domain/entities/propertyEntity"
import { MemberLevel } from "./memberLevel"

interface EvaluateDefaultTransportation {
  memberLevel: string
  whosTraveling: GuestRelationship
  traveledNights: number
  market: string
  propertyCode: string
}

export function evaluateDefaultTransportation({
  memberLevel,
  whosTraveling,
  traveledNights,
  market,
  propertyCode
}: EvaluateDefaultTransportation): number {
  if (memberLevel.toUpperCase() === MemberLevel.DIAMOND) {
    return 0
  }

  if (memberLevel.toUpperCase() === MemberLevel.VIP) {
    if (leBlancPropertyCodes.includes(propertyCode) && traveledNights >= 7) {
      return 0
    }
  }

  return 1
}
