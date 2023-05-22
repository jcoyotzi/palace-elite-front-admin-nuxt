import {ContainerModule, interfaces} from 'inversify'
import rulesTypes from '../common/types/rulesTypes'
import RunEngineUseCase from './application/runEngineUseCase'
import {RulesRepository} from './domain/repositories/rulesRepository'
import RulesServiceRepository from './domain/repositories/rulesServiceRepository'
import AnniversaryProvisionRuleEngineUseCase
  from "app/rules/application/provisions/anniversary/AnniversaryProvisionRuleEngineUseCase";
import IncentiveProvisionRuleEngineUseCase
  from "app/rules/application/provisions/incentive/IncentiveProvisionRuleEngineUseCase";

/*  Contenedor de inversify (Injección de depencias Rules)  */

export default new ContainerModule((bind: interfaces.Bind) => {
  bind<RulesRepository>(rulesTypes.rulesRepository).to(RulesServiceRepository)
  bind<RunEngineUseCase>(rulesTypes.runEngineUseCase).to(RunEngineUseCase)
  bind<AnniversaryProvisionRuleEngineUseCase>(rulesTypes.AnniversaryProvisionRuleEngineUseCase).to(AnniversaryProvisionRuleEngineUseCase)
  bind<IncentiveProvisionRuleEngineUseCase>(rulesTypes.IncentiveProvisionRuleEngineUseCase).to(IncentiveProvisionRuleEngineUseCase)
})
