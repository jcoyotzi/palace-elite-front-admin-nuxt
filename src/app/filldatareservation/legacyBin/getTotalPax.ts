export function GetTotalPax(
  adults: number = 0,
  children: number = 0,
  kids: number = 0,
  babies: number = 0
) {
  return adults + children + kids + babies
}
