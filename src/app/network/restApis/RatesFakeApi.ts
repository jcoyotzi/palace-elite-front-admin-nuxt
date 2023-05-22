/*
 * Copyright (c) 2022.
 * Author: Enrique Nieto Martínez
 * Company: Palace Resorts
 * Created:  2022 / 9 / 21 3:59:23
 *
 */

import {injectable} from 'inversify'
import {AxiosApiFake, emptyResponse} from '../axiosServer/axiosApi'
import {HttpApi} from '../common/domain/entity/httpApi'
import {Payload} from 'app/common/domain/entities/payload'
import {Response} from 'app/common/domain/entities/response'

@injectable()
@AxiosApiFake({
  url: process.env.ratesApiUrl!,
  headers: {
    post: {
      'Content-Type': 'text/plain;charset=UTF-8'
    }
  },
  expected: {
    post: {
      status: 'Ok',
      code: 200,
      message: '',
      data: [
        {
          rate_plan: 'CLT',
          market: 'CLT',
          currency_code: 'USD',
          exchange_rate: '1.0000',
          rate_base_code: 'SOCIOS',
          rooms: [
            {
              room_type_category: 'JR',
              room_description: 'Ocean View Suite',
              max_ocupancy: '4',
              max_children: '3',
              include_kids: true,
              rates: [
                {
                  date_from: '2022-09-01',
                  date_to: '2022-09-21',
                  prices: [
                    {
                      pax_type: 'SGL',
                      group_pax: 'ADULT',
                      amount_base: 223.7,
                      amount_final: 223.7,
                      rate_exists: true,
                      promotions: []
                    },
                    {
                      pax_type: 'DBL',
                      group_pax: 'ADULT',
                      amount_base: 223.7,
                      amount_final: 223.7,
                      rate_exists: true,
                      promotions: []
                    },
                    {
                      pax_type: 'EXT',
                      group_pax: 'EXTRA',
                      amount_base: 78.29,
                      amount_final: 78.29,
                      rate_exists: true,
                      promotions: []
                    },
                    {
                      pax_type: 'CHL',
                      group_pax: 'CHILD',
                      amount_base: 70,
                      amount_final: 0,
                      rate_exists: true,
                      promotions: [
                        {
                          promotion_code: 'FREEKIDS',
                          description: 'FREEKIDS',
                          factor_value: -100,
                          idrate_factor_type: 'FREEPAXPERCENTAGE',
                          amount_promotion: -70,
                          idrate_promotion: 92978,
                          promotion_type: 'FREEPAX',
                          pax_type: 'CHILD'
                        }
                      ]
                    }
                  ]
                },
                {
                  date_from: '2022-09-22',
                  date_to: '2022-09-28',
                  prices: [
                    {
                      pax_type: 'SGL',
                      group_pax: 'ADULT',
                      amount_base: 223.7,
                      amount_final: 327.17,
                      rate_exists: true,
                      promotions: [
                        {
                          promotion_code: 'YM_IRON',
                          description: 'IRON',
                          factor_value: 46.254,
                          idrate_factor_type: 'PERCENTAGE',
                          amount_promotion: 103.47019799999998,
                          idrate_promotion: 91102,
                          promotion_type: '',
                          pax_type: ''
                        }
                      ]
                    },
                    {
                      pax_type: 'DBL',
                      group_pax: 'ADULT',
                      amount_base: 223.7,
                      amount_final: 327.17,
                      rate_exists: true,
                      promotions: [
                        {
                          promotion_code: 'YM_IRON',
                          description: 'IRON',
                          factor_value: 46.254,
                          idrate_factor_type: 'PERCENTAGE',
                          amount_promotion: 103.47019799999998,
                          idrate_promotion: 91102,
                          promotion_type: '',
                          pax_type: ''
                        }
                      ]
                    },
                    {
                      pax_type: 'EXT',
                      group_pax: 'EXTRA',
                      amount_base: 78.29,
                      amount_final: 114.5,
                      rate_exists: true,
                      promotions: [
                        {
                          promotion_code: 'YM_IRON',
                          description: 'IRON',
                          factor_value: 46.254,
                          idrate_factor_type: 'PERCENTAGE',
                          amount_promotion: 36.212256599999996,
                          idrate_promotion: 91102,
                          promotion_type: '',
                          pax_type: ''
                        }
                      ]
                    },
                    {
                      pax_type: 'CHL',
                      group_pax: 'CHILD',
                      amount_base: 70,
                      amount_final: 0,
                      rate_exists: true,
                      promotions: [
                        {
                          promotion_code: 'FREEKIDS',
                          description: 'FREEKIDS',
                          factor_value: -100,
                          idrate_factor_type: 'FREEPAXPERCENTAGE',
                          amount_promotion: -70,
                          idrate_promotion: 92978,
                          promotion_type: 'FREEPAX',
                          pax_type: 'CHILD'
                        }
                      ]
                    }
                  ]
                },
                {
                  date_from: '2022-09-29',
                  date_to: '2022-10-11',
                  prices: [
                    {
                      pax_type: 'SGL',
                      group_pax: 'ADULT',
                      amount_base: 223.7,
                      amount_final: 223.7,
                      rate_exists: true,
                      promotions: []
                    },
                    {
                      pax_type: 'DBL',
                      group_pax: 'ADULT',
                      amount_base: 223.7,
                      amount_final: 223.7,
                      rate_exists: true,
                      promotions: []
                    },
                    {
                      pax_type: 'EXT',
                      group_pax: 'EXTRA',
                      amount_base: 78.29,
                      amount_final: 78.29,
                      rate_exists: true,
                      promotions: []
                    },
                    {
                      pax_type: 'CHL',
                      group_pax: 'CHILD',
                      amount_base: 70,
                      amount_final: 0,
                      rate_exists: true,
                      promotions: [
                        {
                          promotion_code: 'FREEKIDS',
                          description: 'FREEKIDS',
                          factor_value: -100,
                          idrate_factor_type: 'FREEPAXPERCENTAGE',
                          amount_promotion: -70,
                          idrate_promotion: 92978,
                          promotion_type: 'FREEPAX',
                          pax_type: 'CHILD'
                        }
                      ]
                    }
                  ]
                },
                {
                  date_from: '2022-10-12',
                  date_to: '2022-10-14',
                  prices: [
                    {
                      pax_type: 'SGL',
                      group_pax: 'ADULT',
                      amount_base: 231.88,
                      amount_final: 231.88,
                      rate_exists: true,
                      promotions: []
                    },
                    {
                      pax_type: 'DBL',
                      group_pax: 'ADULT',
                      amount_base: 231.88,
                      amount_final: 231.88,
                      rate_exists: true,
                      promotions: []
                    },
                    {
                      pax_type: 'EXT',
                      group_pax: 'EXTRA',
                      amount_base: 81.16,
                      amount_final: 81.16,
                      rate_exists: true,
                      promotions: []
                    },
                    {
                      pax_type: 'CHL',
                      group_pax: 'CHILD',
                      amount_base: 70,
                      amount_final: 0,
                      rate_exists: true,
                      promotions: [
                        {
                          promotion_code: 'FREEKIDS',
                          description: 'FREEKIDS',
                          factor_value: -100,
                          idrate_factor_type: 'FREEPAXPERCENTAGE',
                          amount_promotion: -70,
                          idrate_promotion: 92978,
                          promotion_type: 'FREEPAX',
                          pax_type: 'CHILD'
                        }
                      ]
                    }
                  ]
                },
                {
                  date_from: '2022-10-15',
                  date_to: '2022-10-15',
                  prices: [
                    {
                      pax_type: 'SGL',
                      group_pax: 'ADULT',
                      amount_base: 223.7,
                      amount_final: 223.7,
                      rate_exists: true,
                      promotions: []
                    },
                    {
                      pax_type: 'DBL',
                      group_pax: 'ADULT',
                      amount_base: 223.7,
                      amount_final: 223.7,
                      rate_exists: true,
                      promotions: []
                    },
                    {
                      pax_type: 'EXT',
                      group_pax: 'EXTRA',
                      amount_base: 78.29,
                      amount_final: 78.29,
                      rate_exists: true,
                      promotions: []
                    },
                    {
                      pax_type: 'CHL',
                      group_pax: 'CHILD',
                      amount_base: 70,
                      amount_final: 0,
                      rate_exists: true,
                      promotions: [
                        {
                          promotion_code: 'FREEKIDS',
                          description: 'FREEKIDS',
                          factor_value: -100,
                          idrate_factor_type: 'FREEPAXPERCENTAGE',
                          amount_promotion: -70,
                          idrate_promotion: 92978,
                          promotion_type: 'FREEPAX',
                          pax_type: 'CHILD'
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      error: false,
      tag: ''
    },
    statusCode: 200
  }
})
export class RatesApiFake implements HttpApi {
  delete<T, U>(url: string, payload?: Payload<T>): Promise<Response<U>> {
    return emptyResponse<U>()
  }

  get<T, U>(url: string, payload?: Payload<T>): Promise<Response<U>> {
    return emptyResponse<U>()
  }

  post<T, U>(url: string, payload?: Payload<T>): Promise<Response<U>> {
    return emptyResponse<U>()
  }

  put<T, U>(url: string, payload?: Payload<T>): Promise<Response<U>> {
    return emptyResponse<U>()
  }
}
