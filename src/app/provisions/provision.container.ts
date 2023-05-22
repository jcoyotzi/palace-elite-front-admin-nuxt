/*
 * Copyright (c) 2022.
 * Author: Enrique Nieto Martínez
 * Company: Palace Resorts
 * Created:  2022 / 11 / 24 2:45:36
 *
 */

import {ContainerModule, interfaces} from 'inversify'
import {
  GetGolfWithPaymentULGWRepository
} from "app/provisions/golfWithPaymentULGW/domain/repositories/GetGolfWithPaymentULGWRepository";
import provisionTypes from "app/common/types/provisionTypes";
import GetGolfWithPaymentULGWServiceRepository
  from "app/provisions/golfWithPaymentULGW/domain/repositories/GetGolfWithPaymentULGWServiceRepository";
import GetGolfWithPaymentULGWUseCase from "app/provisions/golfWithPaymentULGW/getGolfWithPaymentULGWUseCase";

export default new ContainerModule((bind: interfaces.Bind) => {
  bind<GetGolfWithPaymentULGWRepository>(provisionTypes.GetGolfWithPaymentULGWRepository).to(GetGolfWithPaymentULGWServiceRepository)
  bind<GetGolfWithPaymentULGWUseCase>(provisionTypes.GetGolfWithPaymentULGWUseCase).to(GetGolfWithPaymentULGWUseCase)
})
