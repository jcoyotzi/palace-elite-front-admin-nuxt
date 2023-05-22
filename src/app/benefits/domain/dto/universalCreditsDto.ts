export interface UniversalCreditsDetails {
  title: string
  subTitle: string
  subtitle?: string
  date: string
  invoice: number
  balance: number
  amount: number
}

export interface UniversalCreditsDto {
  title: string
  status: string
  headerDetail?: boolean
  active?: boolean
  textButton?: string
  expiration: string
  amount: number
  balance: number
  items: UniversalCreditsDetails[]
}
