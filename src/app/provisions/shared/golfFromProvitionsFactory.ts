import GolfFromProvisionsDto from './golfFromProvitionsDto'

export const enum GolfFromProvitionsVariants {
  FREE,
  WITH_CHARGE,
  EMPTY
}

export const golfFromProvitionsFactory = (
  variant: number,
  priceAmount = 0
): GolfFromProvisionsDto | null => {
  let result = null
  switch (variant) {
    case GolfFromProvitionsVariants.FREE:
      result = {
        id: 'ULGAPNG',
        currency: 'USD',
        description: 'Starting at',
        price: priceAmount,
        freeText: 'Free'
      }
      break
    case GolfFromProvitionsVariants.WITH_CHARGE:
      result = {
        id: 'ULGAPNG',
        currency: 'USD',
        description: 'Starting at',
        price: priceAmount,
        freeText: `With charge`
      }
      break
  }

  return result
}
