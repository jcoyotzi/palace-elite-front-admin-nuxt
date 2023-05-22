import Axios, {AxiosInstance} from 'axios'

import {Payload} from '../../common/domain/entities/payload'
import {Response} from '../../common/domain/entities/response'
import Exception from '../common/domain/entity/Exception'
import {HttpApi} from '../common/domain/entity/httpApi'

export default class AxiosServer implements HttpApi {
  protected axios!: AxiosInstance

  static init(baseUrl: string) {
    return new AxiosServer(baseUrl)
  }

  constructor(baseURL: string) {
    this.axios = Axios.create({
      baseURL,
      timeout: 1000 * 150 // Wait for 50 seconds
    })
  }

  async get<T, U>(url: string, pay?: Payload<T> | undefined): Promise<Response<U>> {
    try {
      const payload = {
        params: pay?.params,
        data: pay?.data,
        headers: pay?.headers,
        responseType: pay?.responseType
      }

      const response = await this.axios.get(url, payload)
      return {
        data: response.data,
        errors: response.data.errors,
        warnings: response.data.warnings
      }
    } catch (e: any) {
      const error = new Exception(0, [e.message], [])
      throw error
    }
  }

  async put<T, U>(url: string, payload?: Payload<T> | undefined): Promise<Response<U>> {
    try {
      const response = await this.axios.put(url, payload?.data, {
        headers: payload?.headers
      })
      return {
        data: response.data,
        errors: response.data.errors,
        warnings: response.data.warnings
      }
    } catch (e: any) {
      const error = new Exception(0, [e.message], [])
      throw error
    }
  }

  async post<T, U>(url: string, payload?: Payload<T> | undefined): Promise<Response<U>> {
    try {
      const response = await this.axios.post(url, payload?.data, {
        headers: payload?.headers
      })
      return {
        data: response.data,
        errors: response.data.errors,
        warnings: response.data.warnings
      }
    } catch (e: any) {
      const error = new Exception(0, [e.message], [])
      throw error
    }
  }

  async delete<T, U>(url: string, payload?: Payload<T> | undefined): Promise<Response<U>> {
    try {
      const response = await this.axios.delete(url, {
        params: payload?.params,
        data: payload?.data,
        headers: payload?.headers
      })
      return {
        data: response.data,
        errors: response.data.errors,
        warnings: response.data.warnings
      }
    } catch (e: any) {
      const error = new Exception(0, [e.message], [])
      throw error
    }
  }
}
