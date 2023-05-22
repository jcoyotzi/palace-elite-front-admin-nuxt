/*
 * Copyright (c) 2022.
 * Author: Enrique Nieto Martínez
 * Company: Palace Resorts
 * Created:  2022 / 9 / 17 4:15:38
 *
 */

const apiServerTemplate = `
import {injectable} from "inversify";
import {AxiosApi, emptyResponseWithParams} from "../axiosServer/axiosApi";
import {Payload} from "../../common/domain/entities/payload";
import {Response} from "../../common/domain/entities/response";
import {HttpApi} from "../common/domain/entity/httpApi";

@injectable()
@AxiosApi({
  url: '$API_URL$'
})
export class $CLASS_NAME$ implements HttpApi {
  delete<T, U>(url: string, payload?: Payload<T>): Promise<Response<U>> {
    return emptyResponseWithParams<U>(url, payload);
  }

  get<T, U>(url: string, payload?: Payload<T>): Promise<Response<U>> {
    return emptyResponseWithParams<U>(url, payload);
  }

  post<T, U>(url: string, payload?: Payload<T>): Promise<Response<U>> {
    return emptyResponseWithParams<U>(url, payload);
  }

  put<T, U>(url: string, payload?: Payload<T>): Promise<Response<U>> {
    return emptyResponseWithParams<U>(url, payload);
  }
}

`

module.exports = {apiServerTemplate}
