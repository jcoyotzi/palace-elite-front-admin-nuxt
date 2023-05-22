/*
 * Copyright (c) 2022.
 * Author: Enrique Nieto Martínez
 * Company: Palace Resorts
 * Created:  2022 / 11 / 15 11:48:30
 *
 */

import {v4 as uuidv4} from 'uuid';
import UseCase from "app/common/application/UseCase";
import {RuleEngineResponse} from "app/rules/application/runEngineUseCase";
import {
  ProvisionAniversaryRulePayload,
  ProvitionOption,
  ProvitionOptionDate,
  ProvitionOptionItem,
  ProvitionOptionNight,
  ProvitionOptionType,
} from "~/src/ui/components/Booking/PEProvisionOption/PEProvisionOptionTypes";
import ProvisionAniversaryReducer from "app/provisions/aniversary/domain/mappers/ProvisionAniversaryReducer";
import {injectable} from "inversify";
import {mergeNights, nightsAreNotEmpty} from "app/rules/application/provisions/anniversary/helpers";
import {
  ProvisionAniversaryRuleDirtyPayload,
  ProvisionAnniversaryRuleEngineResponse
} from "app/rules/application/provisions/anniversary/types";


@injectable()
export default class AnniversaryProvisionRuleEngineUseCase implements UseCase<ProvisionAniversaryRuleDirtyPayload, RuleEngineResponse> {
  constructor() {
  }

  async run(port: ProvisionAniversaryRulePayload): Promise<ProvisionAnniversaryRuleEngineResponse> {
    const {onlyNightsMarkets} = port
    const emptyProvitionOptionItem = {
      id: '-',
      category: '-',
      name: null,
      nights: null,
      validTo: null,
      daysToExpire: 0,
      type: ProvitionOptionType.Unkown,
      hasGolf: false
    }
    let reducer: ProvisionAniversaryReducer;
    reducer = new ProvisionAniversaryReducer(port, onlyNightsMarkets !== undefined ? onlyNightsMarkets : []);
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
        name: 'Anniversary Week',
        hasGolf: week?.hasGolf!,
        provision: week!,
      }
    }
    // week golf

    if (weekWithGolf !== undefined && weekWithGolf !== null) {
      const weekGolfId = uuidv4();
      weekGolfOption = {
        id: weekGolfId,
        // name: 'Week unlimited golf with additional payment',
        name: 'Anniversary Week With Golf',
        hasGolf: weekWithGolf?.hasGolf,
        provision: weekWithGolf,
      }
    }

    // nights
    if (nightsAreNotEmpty(nights)) {
      const nightsfId = uuidv4();
      nightsOption = {
        id: nightsfId,
        name: `Anniversary Night x ${nights !== undefined ? nights.length : ''}`,
        hasGolf: false,
        provision: nights !== undefined && nights !== null ? mergeNights(nights) : emptyProvitionOptionItem,
      }
    }


    // nights golf
    if (nightsAreNotEmpty(nightsGolf)) {
      const nightsGolffId = uuidv4();
      nightsGolfOption = {
        id: nightsGolffId,
        name: `Night x ${nightsGolf !== undefined ? nightsGolf.length : ''}`,
        hasGolf: true,
        provision: nightsGolf !== undefined && nightsGolf !== null ? mergeNights(nightsGolf) : emptyProvitionOptionItem,
      }
    }

    let result: any[] = [
      weekOption,
      weekGolfOption,
      nightsOption,
      nightsGolfOption
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
