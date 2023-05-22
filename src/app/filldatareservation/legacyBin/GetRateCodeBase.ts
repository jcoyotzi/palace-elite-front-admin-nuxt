export function GetRateCodeBase(_ReservationCostType: any, market: string) {
  try {
    const RatesCodesBase = {
      V: {
        USA: 'CLT',
        CANADA: 'CLTC',
        LATAM: 'CLTL',
        MEXICO: 'CLTX',
        UK: 'CLTE'
      },
      F: {
        USA: 'CLPR',
        CANADA: 'CLPRCAN',
        LATAM: 'CLPRLAT',
        MEXICO: 'CLPRMEX',
        UK: 'CLPRUK'
      }
    }
    // @ts-ignore
    return RatesCodesBase[_ReservationCostType][market]
  } catch (ex) {
    return ''
  }
}
