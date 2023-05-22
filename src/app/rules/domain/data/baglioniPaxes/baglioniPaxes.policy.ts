import {BaglioniHotelsEnum} from '../../entities/enum/baglioniEnum'

const baglioniHotels = Object.values(BaglioniHotelsEnum)

export const infantsMinor3Policy = {
  conditions: {
    any: [
      {
        all: [
          {
            fact: 'hotel',
            operator: 'notIn',
            value: [BaglioniHotelsEnum.BAMA]
          }
        ]
      }
    ]
  },
  event: {
    type: 'policy',
    params: {
      policy: {
        maxAgeInfants: 3,
        messageInfants: 'Infants < 2.99 years'
      }
    }
  }
}

export const infantsMinor2Policy = {
  conditions: {
    any: [
      {
        all: [
          {
            fact: 'hotel',
            operator: 'in',
            value: [BaglioniHotelsEnum.BAMA]
          }
        ]
      }
    ]
  },
  event: {
    type: 'policy',
    params: {
      policy: {
        maxAgeInfants: 2,
        messageInfants: 'Infants < 1.99 years'
      }
    }
  }
}

export const childsMinor12Policy = {
  conditions: {
    any: [
      {
        all: [
          {
            fact: 'hotel',
            operator: 'in',
            value: [BaglioniHotelsEnum.BAMA, BaglioniHotelsEnum.BAPU, BaglioniHotelsEnum.BASA]
          }
        ]
      }
    ]
  },
  event: {
    type: 'policy',
    params: {
      policy: {
        maxAgeChilds: 12,
        messageChilds: 'Chids < 11.99 years'
      }
    }
  }
}

export const childsMinor16Policy = {
  conditions: {
    any: [
      {
        all: [
          {
            fact: 'hotel',
            operator: 'notIn',
            value: [BaglioniHotelsEnum.BAMA, BaglioniHotelsEnum.BAPU, BaglioniHotelsEnum.BASA]
          }
        ]
      }
    ]
  },
  event: {
    type: 'policy',
    params: {
      policy: {
        maxAgeChilds: 16,
        messageChilds: 'Chids < 15.99 years'
      }
    }
  }
}

export const infantsRule = {
  conditions: {
    any: [
      {
        all: [
          /*
          {
            fact: 'hotel',
            operator: 'notIn',
            value: [BaglioniHotelsEnum.BAMA, BaglioniHotelsEnum.BAPU, BaglioniHotelsEnum.BASA]
          },

          {
            fact: 'children',
            operator: 'greaterThan',
            value: 0
          },
          */
          {
            fact: 'childrenAges',
            operator: 'contains',
            value: '{maxAgeInfants}'
          }
        ]
      }
    ]
  },
  event: {
    type: 'policy',
    params: {
      policy: {
        ageChildRule: true,
        messageChilds: 'Se paso de maxAgeInfants'
      }
    }
  }
}

export const PalacePolicy = {
  conditions: {
    any: [
      {
        all: [
          {
            fact: 'hotel',
            operator: 'notIn',
            value: baglioniHotels
          }
        ]
      }
    ]
  },
  event: {
    type: 'policy',
    params: {
      policy: {
        maxAgeInfants: 4,
        maxAgeChilds: 13,
        maxAgeKids: 18
      }
    }
  }
}
