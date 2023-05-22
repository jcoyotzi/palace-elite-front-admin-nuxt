import {PackageRatesByRsv} from '~/src/app/roomAccess/domain/entities/packageRateByRsv'

export interface PackageByPromotion {
  Recnum: number
  RecnumPromo: number
  CodePackage: string
  TypeMember: string
  Status: string
  PackageRatesbyRsv: PackageRatesByRsv
}
