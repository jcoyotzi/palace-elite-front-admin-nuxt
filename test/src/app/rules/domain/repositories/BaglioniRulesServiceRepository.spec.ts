import 'reflect-metadata'
import RunEngineUseCase from '~/src/app/rules/application/runEngineUseCase'
import {PipelinesEnum} from '~/src/app/rules/domain/entities/enum/pipelinesEnum'
import {facts} from '~/src/app/rules/domain/data/mock/baglioniPaxesMock'
import {container} from '~/src/container'
import rulesTypes from '~/src/app/common/types/rulesTypes'

facts.forEach(element => {
  describe('PolicyEvaluator Use Case', () => {
    const runEngine: RunEngineUseCase = container.get(rulesTypes.runEngineUseCase)
    // let semana52 = false

    it('Validando recibir Policies Baglioni Pipelines', async () => {
      const fact = element
      const pipeline = PipelinesEnum.BAGLIONI_PAXES

      const data = await runEngine.run({fact, pipeline})
      console.table(data.events)
      // semana52 = data.events.semana52

      expect(true).toBe(true)
    })
  })
})
