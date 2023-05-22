/*
 * Copyright (c) 2022.
 * Author: Enrique Nieto Martínez
 * Company: Palace Resorts
 * Created:  2022 / 11 / 23 7:55:30
 *
 */

import {inject, injectable} from "inversify";
import UseCase from "app/common/application/UseCase";
import {
  GetGolfWithPaymentULGWPayloadDto
} from "app/provisions/golfWithPaymentULGW/domain/dto/getGolfWithPaymentULGWPayloadDto";
import provisionTypes from "app/common/types/provisionTypes";
import {
  GetGolfWithPaymentULGWRepository
} from "app/provisions/golfWithPaymentULGW/domain/repositories/GetGolfWithPaymentULGWRepository";
import theme from "tailwindcss/defaultTheme";

@injectable()
export default class GetGolfWithPaymentULGWUseCase implements UseCase<GetGolfWithPaymentULGWPayloadDto, number> {
  constructor(
    @inject(provisionTypes.GetGolfWithPaymentULGWRepository)
    private readonly getULGWRepository: GetGolfWithPaymentULGWRepository
  ) {
  }

  async run(port: GetGolfWithPaymentULGWPayloadDto): Promise<number> {
    const data = await this.getULGWRepository.get(port);
    // @ts-ignore
    const cost = data.data?.data[0]._COSTO_TOTAL
    return cost === undefined ? -1 : cost
  }
}

