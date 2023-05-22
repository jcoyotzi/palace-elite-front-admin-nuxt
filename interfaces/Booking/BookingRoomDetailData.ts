export enum CustomBreakpoints {
  DESKTOP = 1024,
  MOBILE = 768
}

export enum Rates {
  PREFERENIAL = 'preferential',
  REFERAL = 'REFERIDOS',
  IMPERIAL = 'imperial',
  BONUS = 'BONO',
  ANIVERSARY = 'ANIVERSARIO',
  INCENTIVE = 'INCENTIVA'
}

export enum RefundableOptions {
  REFUNDABLE = 'refundable',
  NO_REFUNDABLE = 'nonRefundable'
}

export interface IRates {
  label: string
  value?: string
  notes?: string
  id?: string
}

export enum PromotionID {
  REGULAR2X1 = 9,
  WEEK52 = 12
}
