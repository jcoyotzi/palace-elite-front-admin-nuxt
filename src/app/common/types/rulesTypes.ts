import AnniversaryProvisionRuleEngineUseCase
  from "app/rules/application/provisions/anniversary/AnniversaryProvisionRuleEngineUseCase";
import IncentiveProvisionRuleEngineUseCase
  from "app/rules/application/provisions/incentive/IncentiveProvisionRuleEngineUseCase";

export default {
  rulesRepository: Symbol('rulesRepository'),
  runEngineUseCase: Symbol('runEngineUseCase'),
  AnniversaryProvisionRuleEngineUseCase: Symbol('AnniversaryProvisionRuleEngineUseCase'),
  IncentiveProvisionRuleEngineUseCase: Symbol('IncentiveProvisionRuleEngineUseCase')
}
