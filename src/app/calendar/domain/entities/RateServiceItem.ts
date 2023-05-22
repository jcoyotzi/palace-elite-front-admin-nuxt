export interface RateServicePromotion {
  promotion_code: string
  description: string
  factor_value: number
  idrate_factor_type: string
  amount_promotion: number
  idrate_promotion: number
  promotion_type: string
  pax_type: string
}

export interface RateServicePrice {
  pax_type: string
  group_pax: string
  amount_base: number
  amount_final: number
  rate_exists: boolean
  promotions: RateServicePromotion[]
}

export interface RateServiceRate {
  date_from: string
  date_to: string
  prices: RateServicePrice[]
}

export interface RateServiceRoom {
  room_type_category: string
  room_description: string
  max_ocupancy: string
  max_children: string
  include_kids: boolean
  rates: RateServiceRate[]
}

export interface RateServiceItem {
  rate_plan: string
  market: string
  currency_code: string
  exchange_rate: string
  rate_base_code: string
  rooms: RateServiceRoom[]
}
