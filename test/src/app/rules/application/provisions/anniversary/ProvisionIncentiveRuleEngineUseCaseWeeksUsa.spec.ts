/*
 * Copyright (c) 2022.
 * Author: Enrique Nieto Martínez
 * Company: Palace Resorts
 * Created:  2022 / 11 / 15 11:48:30
 *
 */
import {container} from '~/src/container'
import {
  PAWeeksUSAHappiPathAMock
} from "~/test/src/app/rules/domain/data/provisions/aniversary/mocks/weeks/PAWeeksUSAMock";
import AnniversaryProvisionRuleEngineUseCase
  from "app/rules/application/provisions/anniversary/AnniversaryProvisionRuleEngineUseCase";
import rulesTypes from "app/common/types/rulesTypes";
import {ProvitionOptionType} from "~/src/ui/components/Booking/PEProvisionOption/PEProvisionOptionTypes";
import {
  PAWeeksAndNightsUSAGolfHappiPathBMock
} from "~/test/src/app/rules/domain/data/provisions/aniversary/mocks/weeksAndNights/PAWeeksAndNightsUSAGolfMock";
import IncentiveProvisionRuleEngineUseCase
  from "app/rules/application/provisions/incentive/IncentiveProvisionRuleEngineUseCase";

describe('ProvisionIncentiveRuleEngineUseCaseWeeksUsa', () => {
  it('PIWeeksUSAHappiPathA', async ()=>{
    const useCase: IncentiveProvisionRuleEngineUseCase = container.get(rulesTypes.IncentiveProvisionRuleEngineUseCase)
    const fact = PAWeeksAndNightsUSAGolfHappiPathBMock
    fact.market = 'USA'
    fact.nightsToBook = 6
    fact.hotelHasGolf = true

    const events = await useCase.run(fact)
    const result = events.events.result

    expect(1).toBe(1)
  })
})
