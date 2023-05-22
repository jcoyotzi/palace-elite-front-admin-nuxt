import 'reflect-metadata'
import RunEngineUseCase from '~/src/app/rules/application/runEngineUseCase'
import {PipelinesEnum} from '~/src/app/rules/domain/entities/enum/pipelinesEnum'
import {container} from '~/src/container'
import rulesTypes from '~/src/app/common/types/rulesTypes'
import dayjs from 'dayjs'
import toEpochTimeStamp from "~/src/ui/utils/toEpochTimeStamp";
describe('PolicyEvaluator Use Case', () => {
  const runEngine: RunEngineUseCase = container.get(rulesTypes.runEngineUseCase)
  let imperial = null

  it('Validando recibir Policies', async () => {
    const fact = {
      checkInDate:  toEpochTimeStamp('2020-12-25'),
      expirationDate:  toEpochTimeStamp('2020-12-25')
    }
    const pipeline = PipelinesEnum.IMPERIAL_POLICY

    const data = await runEngine.run({fact, pipeline})
    expect(data.events?.compliance).toBe(undefined)
  })

  it('NO CHECKIN > EXPIRATION ', async () => {

    const fact = {
      checkInDate: toEpochTimeStamp('2020-12-26'),
      expirationDate: toEpochTimeStamp('2020-12-25')
    }
    const pipeline = PipelinesEnum.IMPERIAL_POLICY
    const data = await runEngine.run({fact, pipeline})
    expect(data.events?.compliance).toBe(undefined)
  })
  it('can travel 2 pax and correct checkin ', async () => {

    const fact = {
      checkInDate: toEpochTimeStamp('2020-12-25'),
      expirationDate: toEpochTimeStamp('2020-12-25')
    }
    const pipeline = PipelinesEnum.IMPERIAL_POLICY
    const data = await runEngine.run({fact, pipeline})
    expect(data.events?.compliance).toBe(undefined)
  })
})
