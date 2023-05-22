/*
 * Copyright (c) 2022.
 * Author: Diego Ceron
 * Company: Palace Resorts
 * Created:  2022 / 11 / 18
 *
 */

import {
    ProvisionAniversaryRulePayload,
} from "~/src/ui/components/Booking/PEProvisionOption/PEProvisionOptionTypes";

import { _1WeekGolf, _1Week_1WeekGolf, _2Weeks_2WeeksGolf } from "~/test/src/app/rules/domain/data/provisions/aniversary/mocks/provisionsMock";

export const PAWeeksMXGolfBadPathAMock: ProvisionAniversaryRulePayload = {
    market: 'MX',
    nightsToBook: 7,
    hotelHasGolf: false,
    provisions: _1WeekGolf
}


export const PAWeeksMXGolfBadPathBMock: ProvisionAniversaryRulePayload = {
    market: 'MX',
    nightsToBook: 7,
    hotelHasGolf: false,
    provisions: _1Week_1WeekGolf
}

export const PAWeeksMXGolfBadPathCMock: ProvisionAniversaryRulePayload = {
    market: 'MX',
    nightsToBook: 15,
    hotelHasGolf: false,
    provisions: _2Weeks_2WeeksGolf
}
