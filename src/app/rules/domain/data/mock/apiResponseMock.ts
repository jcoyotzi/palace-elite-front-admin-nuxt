export const stages = [
  {
    policies: [
      {
        // GOLF CON PAGO
        conditions: {
          all: [
            {
              fact: 'golfWeeks',
              path: '$.ULGW',
              operator: 'greaterThanInclusive',
              value: 1
            }
          ]
        },
        event: {
          type: 'policy',
          params: {
            policy: {
              golfTypes: {
                ULGW: true
              }
            }
          }
        }
      },
      {
        // GOLF sin pago
        conditions: {
          all: [
            {
              fact: 'golfWeeks',
              path: '$.ULG',
              operator: 'greaterThanInclusive',
              value: 1
            },
            {
              fact: 'travellingWithAssociate',
              operator: 'equal',
              value: true
            }
          ]
        },
        event: {
          type: 'policy',
          params: {
            policy: {
              golfTypes: {
                ULG: true
              }
            }
          }
        }
      },
      {
        // SIN GOLF
        conditions: {
          all: [
            {
              fact: 'golfWeeks',
              path: '$.AINC',
              operator: 'greaterThanInclusive',
              value: 1
            }
          ]
        },
        event: {
          type: 'policy',
          params: {
            policy: {
              golfTypes: {
                AINC: true
              }
            }
          }
        }
      }
    ]
  }
]

export const facts = [
  // FACT 1
  {
    hotel: 'ZMGR',
    rateCode: 'PREFERENTIAL', //
    golfRate: {
      golfType: 'AINC',
      productId: 'AING',
      rate: 0
    },
    golfWeeks: {
      AINC: 9, // sin golf
      ULGW: 2, // GOlf con pago
      ULG: 0 // Golf sin pago
    },
    market: 'usa',
    travellingWithAssociate: false,
    affiliationLevel: 'RESIDENCE'
  },
  // FACT 2
  {
    hotel: 'ZMGR',
    rateCode: 'PREFERENTIAL', //
    golfRate: {
      golfType: 'AINC',
      productId: 'AING',
      rate: 0
    },
    golfWeeks: {
      AINC: 9, // sin golf
      ULGW: 0, // GOlf con pago
      ULG: 0 // Golf sin pago
    },
    market: 'usa',
    travellingWithAssociate: true,
    affiliationLevel: 'RESIDENCE'
  },
  // FACT 3
  {
    hotel: 'ZMGR',
    rateCode: 'PREFERENTIAL', //
    golfRate: {
      golfType: 'AINC',
      productId: 'AING',
      rate: 0
    },
    golfWeeks: {
      AINC: 1, // sin golf
      ULGW: 1, // GOlf con pago
      ULG: 1 // Golf sin pago
    },
    market: 'usa',
    travellingWithAssociate: false,
    affiliationLevel: 'RESIDENCE'
  }
]

export const apiResponseMock = {
  id: '1',
  stages: stages,
  fact: facts[2]
}
