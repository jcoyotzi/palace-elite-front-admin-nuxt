/*
 * Copyright (c) 2022.
 * Author: Enrique Nieto Martínez
 * Company: Palace Resorts
 * Created:  2022 / 11 / 15 11:48:30
 *
 */

import {v4 as uuidv4} from 'uuid';
import UseCase from "app/common/application/UseCase";
import {injectable} from "inversify";
import {
  ProvisionAniversaryRuleDirtyPayload,
  ProvisionAnniversaryRuleEngineResponse
} from "app/rules/application/provisions/incentive/types";
import {RuleEngineResponse} from "app/rules/application/runEngineUseCase";
import ProvisionAniversaryReducer from "app/provisions/aniversary/domain/mappers/ProvisionAniversaryReducer";
import {
  ProvisionAniversaryRulePayload,
  ProvitionOption
} from "~/src/ui/components/Booking/PEProvisionOption/PEProvisionOptionTypes";

@injectable()
export default class IncentiveProvisionRuleEngineUseCase implements UseCase<ProvisionAniversaryRuleDirtyPayload, RuleEngineResponse> {
  constructor() {
  }

  async run(port: ProvisionAniversaryRulePayload): Promise<ProvisionAnniversaryRuleEngineResponse> {
    const {onlyNightsMarkets} = port
    const reducer = new ProvisionAniversaryReducer(port, onlyNightsMarkets !== undefined ? onlyNightsMarkets : [])
    const resultRaw = reducer.run()

    // week
    const {week, weekWithGolf, nights, nightsGolf} = resultRaw
    let weekOption: ProvitionOption | null = null
    let nightsOption: ProvitionOption | null = null
    let weekGolfOption: ProvitionOption | null = null
    let nightsGolfOption: ProvitionOption | null = null

    if (week !== undefined && week !== null) {
      const weekId = uuidv4();
      weekOption = {
        id: weekId,
        name: 'Incentive Week',
        hasGolf: week?.hasGolf!,
        provision: week!,
      }
    }
    // week golf

    if (weekWithGolf !== undefined && weekWithGolf !== null) {
      const weekGolfId = uuidv4();
      weekGolfOption = {
        id: weekGolfId,
        name: 'Incentive Week With Golf',
        hasGolf: weekWithGolf?.hasGolf,
        provision: weekWithGolf,
      }
    }

    // // nights
    // if (nightsAreNotEmpty(nights)) {
    //   const nightsfId = uuidv4();
    //   nightsOption = {
    //     id: nightsfId,
    //     name: `Night x ${nights.length}`,
    //     hasGolf: false,
    //     provision: mergeNights(nights),
    //   }
    // }
    //
    // // nights golf
    // if (nightsAreNotEmpty(nightsGolf)) {
    //   const nightsGolffId = uuidv4();
    //   nightsGolfOption = {
    //     id: nightsGolffId,
    //     name: `Night x ${nightsGolf.length}`,
    //     hasGolf: true,
    //     provision: mergeNights(nightsGolf),
    //   }
    // }

    let result: any[] = [
      weekOption,
      weekGolfOption,
      // nightsOption,
      // nightsGolfOption
    ]
    result = result.filter(item => item !== null && item !== undefined)
    return {
      events: {
        result
      },
      overrides: {}
    }
  }

}
