/*
 * Copyright (c) 2022.
 * Author: Enrique Nieto Martínez
 * Company: Palace Resorts
 * Created:  2022 / 11 / 24 2:38:0
 *
 */

import {
  GetGolfWithPaymentULGWRepository
} from "app/provisions/golfWithPaymentULGW/domain/repositories/GetGolfWithPaymentULGWRepository";
import {inject, injectable} from "inversify";
import httpTypes from "app/common/types/httpTypes";
import {Response} from "app/network/common/domain/entity/response";
import {HttpApi} from "app/network/common/domain/entity/httpApi";
import {
  GetGolfWithPaymentULGWPayloadDto
} from "app/provisions/golfWithPaymentULGW/domain/dto/getGolfWithPaymentULGWPayloadDto";
import {
  GetGolfWithPaymentULGWResponseDto
} from "app/provisions/golfWithPaymentULGW/domain/dto/GetGolfWithPaymentULGWResponseDto";

@injectable()
export default class GetGolfWithPaymentULGWServiceRepository implements GetGolfWithPaymentULGWRepository {
  constructor(@inject(httpTypes.intelligenceXHttpApi) private readonly http: HttpApi) {}

  get(payload: GetGolfWithPaymentULGWPayloadDto): Promise<Response<Response<GetGolfWithPaymentULGWResponseDto[]>>> {
    const {type, checkOut, checkIn} = payload
    const url = `/benefit/golf-cost/type/${type}/check-in/${checkIn}/check-out/${checkOut}`
    return this.http.get(url);
  }

}
