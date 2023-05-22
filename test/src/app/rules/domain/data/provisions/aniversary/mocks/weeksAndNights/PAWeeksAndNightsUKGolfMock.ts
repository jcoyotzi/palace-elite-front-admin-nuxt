/*
 * Copyright (c) 2022.
 * Author: Diego Ceron
 * Company: Palace Resorts
 * Created:  2022 / 11 / 16
 *
 */

import {
    ProvisionAniversaryRulePayload
} from "~/src/ui/components/Booking/PEProvisionOption/PEProvisionOptionTypes";
import {
    _15Nights_15NightsGolf_2Weeks_2WeeksGolf,
    _7Nights_6NightsGolf_1Week,
    _7Nights_6NightsGolf_1Week_1WeekGolf,
    _7Nights_7NightsGolf_1Week_1WeekGolf
} from "~/test/src/app/rules/domain/data/provisions/aniversary/mocks/provisionsMock";

export const PAWeeksAndNightsUKGolfHappiPathAMock: ProvisionAniversaryRulePayload = {
    market: 'UK',
    nightsToBook: 7,
    hotelHasGolf: true,
    provisions: _7Nights_6NightsGolf_1Week
}

export const PAWeeksAndNightsUKGolfHappiPathBMock: ProvisionAniversaryRulePayload = {
    market: 'UK',
    nightsToBook: 7,
    hotelHasGolf: true,
    provisions: _7Nights_6NightsGolf_1Week_1WeekGolf
}

export const PAWeeksAndNightsUKGolfHappiPathCMock: ProvisionAniversaryRulePayload = {
    market: 'UK',
    nightsToBook: 7,
    hotelHasGolf: true,
    provisions: _7Nights_7NightsGolf_1Week_1WeekGolf
}

export const PAWeeksAndNightsUKGolfBadPathAMock: ProvisionAniversaryRulePayload = {
    market: 'UK',
    nightsToBook: 7,
    hotelHasGolf: false,
    provisions: _7Nights_6NightsGolf_1Week
}

export const PAWeeksAndNightsUKGolfBadPathBMock: ProvisionAniversaryRulePayload = {
    market: 'UK',
    nightsToBook: 7,
    hotelHasGolf: false,
    provisions: _7Nights_6NightsGolf_1Week_1WeekGolf
}

export const PAWeeksAndNightsUKGolfBadPathCMock: ProvisionAniversaryRulePayload = {
    market: 'UK',
    nightsToBook: 7,
    hotelHasGolf: false,
    provisions: _7Nights_7NightsGolf_1Week_1WeekGolf
}

export const PAWeeksAndNightsUKGolfBadPathDMock: ProvisionAniversaryRulePayload = {
    market: 'UK',
    nightsToBook: 15,
    hotelHasGolf: true,
    provisions: _15Nights_15NightsGolf_2Weeks_2WeeksGolf
}


export const PAWeeksAndNightsUKGolfBadPathEMock: ProvisionAniversaryRulePayload = {
    market: 'UK',
    nightsToBook: 15,
    hotelHasGolf: false,
    provisions: _15Nights_15NightsGolf_2Weeks_2WeeksGolf
}