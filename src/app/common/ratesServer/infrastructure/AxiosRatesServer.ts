import Axios, {AxiosInstance} from 'axios'
import {injectable} from 'inversify'
import {HttpRates} from '../../../common/ratesServer/domain/httpRates'
import {Payload} from '../../../common/domain/entities/payload'
import {Response} from '../../../common/domain/entities/response'
import RatesException from './di/RatesException'

@injectable()
export default class AxiosRatesServer implements HttpRates {
  private axios!: AxiosInstance

  constructor() {
    this.axios = Axios.create({
      baseURL: process.env.RATES_API_URL
    })
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
      throw new RatesException(0, [e.message], [])
    }
  }
}
