import {Combination} from '../dto/imperialDto'

export interface ImperialEntity {
  Basic?: Array<Combination>
  Lineals?: Array<Combination>
  LinealsWithCost?: Array<Combination>
  Combinations?: Array<Combination>
  CombinationsWithCost?: Array<Combination>
  ProvisionPromotions?: Array<Combination>
}
export interface ImperialProvitions {
  [key: string]: ImperialEntity | undefined
}

