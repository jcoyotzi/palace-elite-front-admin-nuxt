export interface PreferentialWeeksAndNightsAssets {
  total: number
  used: number
  value: number
  labelStart: string
  labelEnd: string
}

export default interface PreferentialWeeksAndNightsDto {
  title: string
  assets: PreferentialWeeksAndNightsAssets[]
}
