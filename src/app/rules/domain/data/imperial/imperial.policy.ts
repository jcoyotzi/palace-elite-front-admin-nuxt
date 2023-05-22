export const imperialPolicy = {
  conditions: {
    any: [
      {
        all: [
          {
            fact: 'checkInDate',
            operator: 'lessThan',
            value: '{expirationDate}'
          }
        ]
      }
    ]
  },
  event: {
    type: 'policy',
    params: {
      policy: {
        compliance: true,
        message: 'Can reserve'
      }
    }
  }
}
