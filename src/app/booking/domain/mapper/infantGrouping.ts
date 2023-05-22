/*
 * Copyright (c) 2022.
 * Author: Enrique Nieto Martínez
 * Company: Palace Resorts
 * Created:  2022 / 12 / 1 2:47:8
 *
 */

export interface InfantsGrouped {
  kids: number
  children: number
  babies: number
  adults?: number
}

export interface RuleGrouping {
  maxAgeInfants: number // babies
  maxAgeChilds: number
  maxAgeKids?: number
}

export const infantGrouping = (childrenAges: string[], rules: RuleGrouping): InfantsGrouped => {
  const ages: number[] = childrenAges.map(item => Number(item))
  let infants = {
    kids: 0, // no existe en Baglioni
    children: 0, // child en Baglioni
    babies: 0, // Infants en Baglioni
    adults: 0 // Para sumar adultos en Baglioni
  }
  if (childrenAges.length === 0) {
    return infants
  }
  // Palace way
  for (const age of ages) {
    if (age < rules.maxAgeInfants) {
      // Palace: 4
      infants.babies++
    } else if (age < rules.maxAgeChilds) {
      // Palace 13
      infants.children++
    } else if (rules.maxAgeKids && age < rules.maxAgeKids) {
      // Palace 18
      infants.kids++
    } else {
      // Si es mayor sumar adultos
      infants.adults++
    }
  }

  return infants
}

export const isLockOffRoom = (
  adults: number,
  infants: any,
  max_children: number,
  maxOccupancy: number
) => {
  const paymentInfants = infants.children + infants.kids + infants.babies
  // Si la habitación NO aceptaniños y la reserva tiene niños de 0 a 18 años si cuentan como pax
  // Si la habitación acepta niños pero exceden el maximo de niños pues no se muestra el room
  const acceptKids = max_children > 0
  const noKidsAllowedPolicy = !acceptKids && paymentInfants > 0
  const kidsOverflowPolicy = acceptKids && paymentInfants > max_children
  if (noKidsAllowedPolicy || kidsOverflowPolicy) {
    return true
  }

  let paxByRoom = adults + paymentInfants

  const isMaxOccupancyOverflow = paxByRoom > maxOccupancy
  const isMaxChildrenOverflow = paymentInfants > max_children
  if (isMaxChildrenOverflow) {
    return isMaxChildrenOverflow
  }
  return isMaxOccupancyOverflow
}
