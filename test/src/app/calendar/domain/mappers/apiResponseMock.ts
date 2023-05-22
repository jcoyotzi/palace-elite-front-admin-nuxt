export const apiResponseMock = {
  data: {
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
              },
              {
                date_from: '2022-10-16',
                date_to: '2022-11-10',
                prices: [
                  {
                    pax_type: 'SGL',
                    group_pax: 'ADULT',
                    amount_base: 245.34,
                    amount_final: 245.34,
                    rate_exists: true,
                    promotions: []
                  },
                  {
                    pax_type: 'DBL',
                    group_pax: 'ADULT',
                    amount_base: 245.34,
                    amount_final: 245.34,
                    rate_exists: true,
                    promotions: []
                  },
                  {
                    pax_type: 'EXT',
                    group_pax: 'EXTRA',
                    amount_base: 85.87,
                    amount_final: 85.87,
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
                date_from: '2022-11-11',
                date_to: '2022-11-11',
                prices: [
                  {
                    pax_type: 'SGL',
                    group_pax: 'ADULT',
                    amount_base: 254.32,
                    amount_final: 254.32,
                    rate_exists: true,
                    promotions: []
                  },
                  {
                    pax_type: 'DBL',
                    group_pax: 'ADULT',
                    amount_base: 254.32,
                    amount_final: 254.32,
                    rate_exists: true,
                    promotions: []
                  },
                  {
                    pax_type: 'EXT',
                    group_pax: 'EXTRA',
                    amount_base: 89.01,
                    amount_final: 89.01,
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
                date_from: '2022-11-12',
                date_to: '2022-11-17',
                prices: [
                  {
                    pax_type: 'SGL',
                    group_pax: 'ADULT',
                    amount_base: 245.34,
                    amount_final: 245.34,
                    rate_exists: true,
                    promotions: []
                  },
                  {
                    pax_type: 'DBL',
                    group_pax: 'ADULT',
                    amount_base: 245.34,
                    amount_final: 245.34,
                    rate_exists: true,
                    promotions: []
                  },
                  {
                    pax_type: 'EXT',
                    group_pax: 'EXTRA',
                    amount_base: 85.87,
                    amount_final: 85.87,
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
                date_from: '2022-11-18',
                date_to: '2022-11-18',
                prices: [
                  {
                    pax_type: 'SGL',
                    group_pax: 'ADULT',
                    amount_base: 254.32,
                    amount_final: 254.32,
                    rate_exists: true,
                    promotions: []
                  },
                  {
                    pax_type: 'DBL',
                    group_pax: 'ADULT',
                    amount_base: 254.32,
                    amount_final: 254.32,
                    rate_exists: true,
                    promotions: []
                  },
                  {
                    pax_type: 'EXT',
                    group_pax: 'EXTRA',
                    amount_base: 89.01,
                    amount_final: 89.01,
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
                date_from: '2022-11-19',
                date_to: '2022-11-21',
                prices: [
                  {
                    pax_type: 'SGL',
                    group_pax: 'ADULT',
                    amount_base: 254.32,
                    amount_final: 339.14,
                    rate_exists: true,
                    promotions: [
                      {
                        promotion_code: 'YM_THNX',
                        description: 'Thanksgiving',
                        factor_value: 33.35,
                        idrate_factor_type: 'PERCENTAGE',
                        amount_promotion: 84.81572,
                        idrate_promotion: 82559,
                        promotion_type: '',
                        pax_type: ''
                      }
                    ]
                  },
                  {
                    pax_type: 'DBL',
                    group_pax: 'ADULT',
                    amount_base: 254.32,
                    amount_final: 339.14,
                    rate_exists: true,
                    promotions: [
                      {
                        promotion_code: 'YM_THNX',
                        description: 'Thanksgiving',
                        factor_value: 33.35,
                        idrate_factor_type: 'PERCENTAGE',
                        amount_promotion: 84.81572,
                        idrate_promotion: 82559,
                        promotion_type: '',
                        pax_type: ''
                      }
                    ]
                  },
                  {
                    pax_type: 'EXT',
                    group_pax: 'EXTRA',
                    amount_base: 89.01,
                    amount_final: 118.69,
                    rate_exists: true,
                    promotions: [
                      {
                        promotion_code: 'YM_THNX',
                        description: 'Thanksgiving',
                        factor_value: 33.35,
                        idrate_factor_type: 'PERCENTAGE',
                        amount_promotion: 29.684835000000003,
                        idrate_promotion: 82559,
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
                date_from: '2022-11-22',
                date_to: '2022-11-26',
                prices: [
                  {
                    pax_type: 'SGL',
                    group_pax: 'ADULT',
                    amount_base: 245.34,
                    amount_final: 327.16,
                    rate_exists: true,
                    promotions: [
                      {
                        promotion_code: 'YM_THNX',
                        description: 'Thanksgiving',
                        factor_value: 33.35,
                        idrate_factor_type: 'PERCENTAGE',
                        amount_promotion: 81.82089,
                        idrate_promotion: 82559,
                        promotion_type: '',
                        pax_type: ''
                      }
                    ]
                  },
                  {
                    pax_type: 'DBL',
                    group_pax: 'ADULT',
                    amount_base: 245.34,
                    amount_final: 327.16,
                    rate_exists: true,
                    promotions: [
                      {
                        promotion_code: 'YM_THNX',
                        description: 'Thanksgiving',
                        factor_value: 33.35,
                        idrate_factor_type: 'PERCENTAGE',
                        amount_promotion: 81.82089,
                        idrate_promotion: 82559,
                        promotion_type: '',
                        pax_type: ''
                      }
                    ]
                  },
                  {
                    pax_type: 'EXT',
                    group_pax: 'EXTRA',
                    amount_base: 85.87,
                    amount_final: 114.51,
                    rate_exists: true,
                    promotions: [
                      {
                        promotion_code: 'YM_THNX',
                        description: 'Thanksgiving',
                        factor_value: 33.35,
                        idrate_factor_type: 'PERCENTAGE',
                        amount_promotion: 28.637645000000003,
                        idrate_promotion: 82559,
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
                date_from: '2022-11-27',
                date_to: '2022-12-23',
                prices: [
                  {
                    pax_type: 'SGL',
                    group_pax: 'ADULT',
                    amount_base: 245.34,
                    amount_final: 245.34,
                    rate_exists: true,
                    promotions: []
                  },
                  {
                    pax_type: 'DBL',
                    group_pax: 'ADULT',
                    amount_base: 245.34,
                    amount_final: 245.34,
                    rate_exists: true,
                    promotions: []
                  },
                  {
                    pax_type: 'EXT',
                    group_pax: 'EXTRA',
                    amount_base: 85.87,
                    amount_final: 85.87,
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
                date_from: '2022-12-24',
                date_to: '2022-12-31',
                prices: [
                  {
                    pax_type: 'SGL',
                    group_pax: 'ADULT',
                    amount_base: 363.52,
                    amount_final: 363.52,
                    rate_exists: true,
                    promotions: []
                  },
                  {
                    pax_type: 'DBL',
                    group_pax: 'ADULT',
                    amount_base: 363.52,
                    amount_final: 363.52,
                    rate_exists: true,
                    promotions: []
                  },
                  {
                    pax_type: 'EXT',
                    group_pax: 'EXTRA',
                    amount_base: 127.23,
                    amount_final: 127.23,
                    rate_exists: true,
                    promotions: []
                  },
                  {
                    pax_type: 'CHL',
                    group_pax: 'CHILD',
                    amount_base: 77.25,
                    amount_final: 77.25,
                    rate_exists: true,
                    promotions: []
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
  }
}
