import Axios, {AxiosInstance} from 'axios'
import {injectable} from 'inversify'
import {HttpJS} from '../domain/httpJS'
import Exception from './di/Exception'
import {Payload} from '@/src/app/common/domain/entities/payload'
import {Response} from '@/src/app/common/domain/entities/response'

@injectable()
export default class AxiosJsonServer implements HttpJS {
  private axios!: AxiosInstance

  constructor() {
    this.axios = Axios.create({
      baseURL: process.env.jsonApiUrl
    })
  }

  async get<T, U>(url: string, payload?: Payload<T>): Promise<Response<U>> {
    try {
      const response = await this.axios.get(url, {
        params: payload?.params,
        data: payload?.data
      })
      // if (response.data.data.total) response.data.data.total = Number(response.headers['x-total-count']);
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

  async post<T, U>(url: string, payload?: Payload<T>): Promise<Response<U>> {
    try {
      const response = await this.axios.post(url, payload?.data)
      return {
        data: response.data.data,
        errors: response.data.data.errors,
        warnings: response.data.data.warnings
      }
    } catch (e: any) {
      const error = new Exception(0, [e.message], [])
      throw error
    }
  }

  async delete<T, U>(url: string, payload?: Payload<T>): Promise<Response<U>> {
    try {
      const response = await this.axios.get(url, {
        params: payload?.params,
        data: payload?.data
      })
      return {
        data: response.data.data,
        errors: response.data.data.errors,
        warnings: response.data.data.warnings
      }
    } catch (e: any) {
      const error = new Exception(0, [e.message], [])
      throw error
    }
  }
}
