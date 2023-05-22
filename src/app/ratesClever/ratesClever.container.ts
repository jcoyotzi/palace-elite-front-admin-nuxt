/*
 * Copyright (c) 2022.
 * Author: Enrique Nieto Martínez
 * Company: Palace Resorts
 * Created:  2022 / 9 / 22 11:16:25
 *
 */

import {ContainerModule, interfaces} from 'inversify'
import {RatesCleverRepository} from '~/src/app/ratesClever/domain/repositories/ratesCleverRepository'
import ratesCleverTypes from '~/src/app/common/types/ratesCleverTypes'
import RatesCleverServiceRepository from '~/src/app/ratesClever/domain/repositories/ratesCleverServiceRepository'
import GetRoomRatesUseCase from '~/src/app/ratesClever/application/getRoomRatesUseCase'
export default new ContainerModule((bind: interfaces.Bind) => {
  bind<RatesCleverRepository>(ratesCleverTypes.RatesCleverRespository).to(
    RatesCleverServiceRepository
  )
  bind<GetRoomRatesUseCase>(ratesCleverTypes.GetRoomRatesUseCase).to(GetRoomRatesUseCase)
})
