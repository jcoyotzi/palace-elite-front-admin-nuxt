/*
 * Copyright (c) 2022.
 * Author: Enrique Nieto Martínez
 * Company: Palace Resorts
 * Created:  2022 / 11 / 16 7:44:7
 *
 */

import {ProvitionOption} from "~/src/ui/components/Booking/PEProvisionOption/PEProvisionOptionTypes";

export type DirtyAnniversaryProvisions = any[]

export interface AnniversaryProvisionFact {
  market: string
  nightsToBook: number
  hotelHasGolf: boolean
}

export interface ProvisionAniversaryRuleDirtyPayload extends AnniversaryProvisionFact {
  provisions: DirtyAnniversaryProvisions
}

export interface ProvisionAnniversaryRuleEngineResponse {
  events: {
    result: ProvitionOption[]
  }
  overrides: any
}

