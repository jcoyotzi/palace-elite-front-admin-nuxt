import {PackageRatesByRsv} from './packageRateByRsv'

export interface PackageByPromotion {
  Recnum: number
  RecnumPromo: number
  CodePackage: string
  TypeMember: string
  Status: string
  PackageRatesbyRsv: PackageRatesByRsv
}
