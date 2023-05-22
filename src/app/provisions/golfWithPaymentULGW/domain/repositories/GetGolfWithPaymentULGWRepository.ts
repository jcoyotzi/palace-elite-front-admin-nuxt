/*
 * Copyright (c) 2022.
 * Author: Enrique Nieto Martínez
 * Company: Palace Resorts
 * Created:  2022 / 11 / 24 11:16:33
 *
 */

import {
  GetGolfWithPaymentULGWPayloadDto
} from "app/provisions/golfWithPaymentULGW/domain/dto/getGolfWithPaymentULGWPayloadDto";
import {
  GetGolfWithPaymentULGWResponseDto
} from "app/provisions/golfWithPaymentULGW/domain/dto/GetGolfWithPaymentULGWResponseDto";
import {Response} from "app/network/common/domain/entity/response";

export interface GetGolfWithPaymentULGWRepository {
  get(payload: GetGolfWithPaymentULGWPayloadDto ): Promise<Response<Response<GetGolfWithPaymentULGWResponseDto[]>>> ;
}

