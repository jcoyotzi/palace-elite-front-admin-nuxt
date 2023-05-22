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

import {
  _7Nights_6NightsGolf_1Week,
  _7Nights_6NightsGolf_1Week_1WeekGolf,
  _7Nights_7NightsGolf_1Week_1WeekGolf,
  _9Nights_9NightsGolf_2Weeks_2WeeksGolf
} from "~/test/src/app/rules/domain/data/provisions/aniversary/mocks/provisionsMock";

export const PAWeeksAndNightsUSAGolfHappiPathAMock: ProvisionAniversaryRulePayload = {
  market: 'USA',
  nightsToBook: 7,
  hotelHasGolf: true,
  provisions: _7Nights_6NightsGolf_1Week
}

export const PAWeeksAndNightsUSAGolfHappiPathBMock: ProvisionAniversaryRulePayload = {
  market: 'USA',
  nightsToBook: 7,
  hotelHasGolf: true,
  provisions: _7Nights_6NightsGolf_1Week_1WeekGolf
}

export const PAWeeksAndNightsUSAGolfHappiPathCMock: ProvisionAniversaryRulePayload = {
  market: 'USA',
  nightsToBook: 7,
  hotelHasGolf: true,
  provisions: _7Nights_7NightsGolf_1Week_1WeekGolf
}

export const PAWeeksAndNightsUSAGolfHappiPathDMock: ProvisionAniversaryRulePayload = {
  market: 'USA',
  nightsToBook: 9,
  hotelHasGolf: true,
  provisions: _9Nights_9NightsGolf_2Weeks_2WeeksGolf
}

export const PAWeeksAndNightsUSAGolfBadPathAMock: ProvisionAniversaryRulePayload = {
  market: 'USA',
  nightsToBook: 7,
  hotelHasGolf: false,
  provisions: _7Nights_7NightsGolf_1Week_1WeekGolf
}

export const PAWeeksAndNightsUSAGolfBadPathBMock: ProvisionAniversaryRulePayload = {
  market: 'USA',
  nightsToBook: 7,
  hotelHasGolf: false,
  provisions: _7Nights_7NightsGolf_1Week_1WeekGolf
}

export const PAWeeksAndNightsUSAGolfBadPathCMock: ProvisionAniversaryRulePayload = {
  market: 'USA',
  nightsToBook: 9,
  hotelHasGolf: false,
  provisions: _9Nights_9NightsGolf_2Weeks_2WeeksGolf
}
