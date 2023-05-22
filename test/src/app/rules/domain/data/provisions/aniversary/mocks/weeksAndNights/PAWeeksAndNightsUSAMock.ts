/*
 * Copyright (c) 2022.
 * Author: Diego Ceron
 * Company: Palace Resorts
 * Created:  2022 / 11 / 15 4:11:25
 *
 */

import {
  ProvisionAniversaryRulePayload
} from "~/src/ui/components/Booking/PEProvisionOption/PEProvisionOptionTypes";

import { _7Nigths_1Week, _6Nigths_1Week_1WeekGolf, _6Nigths } from "~/test/src/app/rules/domain/data/provisions/aniversary/mocks/provisionsMock";

export const PAWeeksAndNightsUSAHappiPathAMock: ProvisionAniversaryRulePayload = {
  market: 'USA',
  nightsToBook: 7,
  hotelHasGolf: false,
  provisions: _7Nigths_1Week
}

export const PAWeeksAndNightsUSAHappiPathBMock: ProvisionAniversaryRulePayload = {
  market: 'USA',
  nightsToBook: 7,
  hotelHasGolf: false,
  provisions: _6Nigths_1Week_1WeekGolf
}

export const PAWeeksAndNightsUSABadPathAMock: ProvisionAniversaryRulePayload = {
  market: 'USA',
  nightsToBook: 7,
  hotelHasGolf: false,
  provisions: _6Nigths
}