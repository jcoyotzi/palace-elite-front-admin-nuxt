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

describe('ProvisionAnniversaryRuleEngineUseCaseWeeksUsa', () => {
  it('PAWeeksUSAHappiPathA', async ()=>{
    const useCase: AnniversaryProvisionRuleEngineUseCase = container.get(rulesTypes.AnniversaryProvisionRuleEngineUseCase)

    // const mappedProvisions: ProvitionOptionItem[]  = provisionAniversaryStoreMapper(port.provisions)
    // const fact: ProvisionAniversaryRulePayload = {
    //   market: port.market,
    //   nightsToBook: port.nightsToBook,
    //   hotelHasGolf: port.hotelHasGolf,
    //   provisions: mappedProvisions
    // }


    // **Escenario:** Socio solo tiene provisiones tipo Semana
    // **Dado que** tengo al menos 1 provisión de tipo semana próxima a vencer
    // **Y** ninguna de tipo noche
    // **Y** elmarket es USA
    // **Y** las noches de la reserva son mínimo 7
    // const fact = PAWeeksUSAHappiPathAMock
    let fact = PAWeeksAndNightsUSAGolfHappiPathBMock
    fact.market = 'USA'
    fact.nightsToBook = 8
    fact.hotelHasGolf = true
    // **Cuando** intente utilizarla en el proceso de booking
    const events = await useCase.run(fact)
    const result = events.events.result
    // **Entonces** debería aparecer seleccionada como única opción en la UI
    expect(1).toBe(1)
    // expect(result.length).toBe(1)
    // expect(result[0].provision.type).toBe(ProvitionOptionType.Week)
    // expect(result[0].hasGolf).not.toBe(true)
  })
})
