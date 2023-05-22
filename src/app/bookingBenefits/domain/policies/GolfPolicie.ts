// data to compare could be retrived from a file or a database

import {
  EliteProductFact,
  Policies,
  EliteProductCodes
} from '../entities/rules/EliteProductRuleEntity'
import {EliteProductType} from '../entities/rules/reservationTypes'
import {GolfHotelCodes} from '~/src/app/ratesClever/infrastructure/getRoomsSorted'
import {BookingCategoryStatus} from '~/src/app/bookings/domain/enums/bookingCategoryStatus'
export const eligibleHotelsWithGolf: Array<GolfHotelCodes> = [
  'BP',
  'LBC',
  'MPC',
  'MPS',
  'MPG',
  'PL',
  'SP'
]
const preferentialReserve = [BookingCategoryStatus.PREFERENCIAL, BookingCategoryStatus.REFERIDO]
const regularReserve = [
  BookingCategoryStatus.PREFERENCIAL,
  BookingCategoryStatus.IMP_WEEKS,
  BookingCategoryStatus.INCENTIVA,
  BookingCategoryStatus.ANIVERSARIO,
  BookingCategoryStatus.REFERIDO
]
const weekType = EliteProductType.weekType
const nightType = EliteProductType.nightType

const allInclusiveCodeWeeks = EliteProductCodes.allInclusiveCodeWeeks
const paidGolfCodeWeeks = EliteProductCodes.paidGolfCodeWeeks
const freeGolfCodeWeeks = EliteProductCodes.freeGolfCodeWeeks
const allInclusiveCodeNights = EliteProductCodes.allInclusiveCodeNights
const paidGolfCodeNights = EliteProductCodes.paidGolfCodeNights
const freeGolfCodeNights = EliteProductCodes.freeGolfCodeNights

const maximumNights = 7

// define a rule for reserves that can be used with paid golf
export const paidGolfPolicyWeeks = {
  conditions: {
    any: [
      {
        all: [
          {
            fact: 'reserveType',
            operator: 'in',
            value: preferentialReserve
          },
          {
            fact: 'hotel',
            operator: 'in',
            value: eligibleHotelsWithGolf
          },
          {
            fact: paidGolfCodeWeeks,
            operator: 'greaterThan',
            value: 0
          }
        ]
      },
      {
        all: [
          {
            fact: 'reserveType',
            operator: 'in',
            value: regularReserve
          },
          {
            fact: 'hotel',
            operator: 'in',
            value: eligibleHotelsWithGolf
          },
          {
            fact: paidGolfCodeWeeks,
            operator: 'greaterThan',
            value: 0
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
        message: 'Reserve can be used with paid golf',
        code: paidGolfCodeWeeks,
        type: weekType
      }
    }
  }
}

export const freeGolfPolicyWeeks = {
  conditions: {
    any: [
      {
        all: [
          {
            fact: 'reserveType',
            operator: 'in',
            value: preferentialReserve
          },
          {
            fact: 'hotel',
            operator: 'in',
            value: eligibleHotelsWithGolf
          },
          {
            fact: 'travelWithBeneficiary',
            operator: 'equal',
            value: true
          },
          {
            fact: freeGolfCodeWeeks,
            operator: 'greaterThan',
            value: 0
          }
        ]
      },
      {
        all: [
          {
            fact: 'reserveType',
            operator: 'in',
            value: regularReserve
          },
          {
            fact: 'hotel',
            operator: 'in',
            value: eligibleHotelsWithGolf
          },
          {
            fact: freeGolfCodeWeeks,
            operator: 'greaterThan',
            value: 0
          },
          {
            fact: 'travelWithBeneficiary',
            operator: 'equal',
            value: true
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
        message: 'Reserve can be used with free golf',
        code: freeGolfCodeWeeks,
        type: weekType
      }
    }
  }
}

export const allInclusivePolicyWeeks = {
  conditions: {
    any: [
      {
        all: [
          {
            fact: 'reserveType',
            operator: 'in',
            value: preferentialReserve
          },
          {
            fact: 'hotel',
            operator: 'notIn',
            value: eligibleHotelsWithGolf
          },
          {
            fact: allInclusiveCodeWeeks,
            operator: 'greaterThan',
            value: 0
          }
        ]
      },
      {
        all: [
          {
            fact: 'reserveType',
            operator: 'in',
            value: regularReserve
          },
          {
            fact: 'hotel',
            operator: 'in',
            value: eligibleHotelsWithGolf
          },
          {
            fact: allInclusiveCodeWeeks,
            operator: 'greaterThan',
            value: 0
          }
        ]
      },
      {
        all: [
          {
            fact: 'reserveType',
            operator: 'in',
            value: regularReserve
          },
          {
            fact: 'hotel',
            operator: 'in',
            value: eligibleHotelsWithGolf
          },
          {
            fact: 'selectedGolfOption',
            operator: 'equal',
            value: false
          },
          {
            fact: allInclusiveCodeWeeks,
            operator: 'greaterThan',
            value: 0
          }
        ]
      },
      {
        all: [
          {
            fact: 'hotel',
            operator: 'notIn',
            value: eligibleHotelsWithGolf
          },
          {
            fact: allInclusiveCodeWeeks,
            operator: 'greaterThan',
            value: 0
          }
        ]
      },
      {
        all: [
          {
            fact: 'reserveType',
            operator: 'in',
            value: preferentialReserve
          },
          {
            fact: allInclusiveCodeWeeks,
            operator: 'greaterThan',
            value: '{weeksToUse}'
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
        message: 'Reserve can be used with all inclusive',
        code: allInclusiveCodeWeeks,
        type: weekType
      }
    }
  }
}

export const paidGolfPolicyNights = {
  conditions: {
    any: [
      {
        all: [
          {
            fact: 'reserveType',
            operator: 'in',
            value: preferentialReserve
          },
          {
            fact: 'hotel',
            operator: 'in',
            value: eligibleHotelsWithGolf
          },
          {
            fact: paidGolfCodeNights,
            operator: 'greaterThan',
            value: 0
          },
          {
            fact: 'nights',
            operator: 'lessThan',
            value: maximumNights
          }
        ]
      },
      {
        all: [
          {
            fact: 'reserveType',
            operator: 'in',
            value: regularReserve
          },
          {
            fact: 'hotel',
            operator: 'in',
            value: eligibleHotelsWithGolf
          },
          {
            fact: paidGolfCodeNights,
            operator: 'greaterThan',
            value: 0
          },
          {
            fact: paidGolfCodeNights,
            operator: 'greaterThanInclusive',
            value: '{nightsToUse}'
          }
        ]
      },
      {
        all: [
          {
            fact: 'reserveType',
            operator: 'in',
            value: preferentialReserve
          },
          {
            fact: 'hotel',
            operator: 'in',
            value: eligibleHotelsWithGolf
          },
          {
            fact: paidGolfCodeNights,
            operator: 'greaterThan',
            value: 0
          },
          {
            fact: paidGolfCodeNights,
            operator: 'greaterThanInclusive',
            value: '{nightsToUse}'
          }
        ]
      },
      // if weeks version is not available, use nights version
      {
        all: [
          {
            fact: 'reserveType',
            operator: 'in',
            value: preferentialReserve
          },
          {
            fact: 'hotel',
            operator: 'in',
            value: eligibleHotelsWithGolf
          },
          {
            fact: paidGolfCodeNights,
            operator: 'greaterThan',
            value: 0
          },
          {
            fact: 'nights',
            operator: 'lessThan',
            value: maximumNights
          },
          {
            fact: paidGolfCodeWeeks,
            operator: 'equal',
            value: 0
          }
        ]
      },
      {
        all: [
          {
            fact: 'reserveType',
            operator: 'in',
            value: regularReserve
          },
          {
            fact: 'hotel',
            operator: 'in',
            value: eligibleHotelsWithGolf
          },
          {
            fact: paidGolfCodeNights,
            operator: 'greaterThan',
            value: 0
          },
          {
            fact: paidGolfCodeNights,
            operator: 'greaterThanInclusive',
            value: '{nightsToUse}'
          },
          {
            fact: paidGolfCodeWeeks,
            operator: 'equal',
            value: 0
          }
        ]
      },
      {
        all: [
          {
            fact: 'reserveType',
            operator: 'in',
            value: preferentialReserve
          },
          {
            fact: 'hotel',
            operator: 'in',
            value: eligibleHotelsWithGolf
          },
          {
            fact: paidGolfCodeNights,
            operator: 'greaterThan',
            value: 0
          },
          {
            fact: paidGolfCodeNights,
            operator: 'greaterThanInclusive',
            value: '{nightsToUse}'
          },
          {
            fact: paidGolfCodeWeeks,
            operator: 'equal',
            value: 0
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
        message: 'Reserve can be used with paid golf nights',
        code: paidGolfCodeNights,
        type: nightType
      }
    }
  }
}
export const freeGolfPolicyNights = {
  conditions: {
    any: [
      {
        all: [
          {
            fact: 'reserveType',
            operator: 'in',
            value: preferentialReserve
          },
          {
            fact: 'hotel',
            operator: 'in',
            value: eligibleHotelsWithGolf
          },
          {
            fact: freeGolfCodeNights,
            operator: 'greaterThan',
            value: 0
          },
          {
            fact: 'travelWithBeneficiary',
            operator: 'equal',
            value: true
          },
          {
            fact: freeGolfCodeNights,
            operator: 'greaterThanInclusive',
            value: '{nightsToUse}'
          }
        ]
      },
      {
        all: [
          {
            fact: 'reserveType',
            operator: 'in',
            value: regularReserve
          },
          {
            fact: 'hotel',
            operator: 'in',
            value: eligibleHotelsWithGolf
          },
          {
            fact: 'travelWithBeneficiary',
            operator: 'equal',
            value: true
          },
          {
            fact: freeGolfCodeNights,
            operator: 'greaterThan',
            value: 0
          },
          {
            fact: 'nights',
            operator: 'lessThan',
            value: '{nightsToUse}'
          }
        ]
      },
      {
        all: [
          {
            fact: 'reserveType',
            operator: 'in',
            value: preferentialReserve
          },
          {
            fact: 'hotel',
            operator: 'in',
            value: eligibleHotelsWithGolf
          },
          {
            fact: freeGolfCodeNights,
            operator: 'greaterThan',
            value: 0
          },
          {
            fact: 'travelWithBeneficiary',
            operator: 'equal',
            value: true
          },
          {
            fact: freeGolfCodeNights,
            operator: 'greaterThanInclusive',
            value: '{nightsToUse}'
          },
          {
            fact: freeGolfCodeWeeks,
            operator: 'equal',
            value: 0
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
        message: 'Reserve can be used with free golf nights',
        code: freeGolfCodeNights,
        type: nightType
      }
    }
  }
}
export const allInclusivePolicyNights = {
  conditions: {
    any: [
      {
        all: [
          {
            fact: 'reserveType',
            operator: 'in',
            value: preferentialReserve
          },
          {
            fact: 'hotel',
            operator: 'notIn',
            value: eligibleHotelsWithGolf
          },
          {
            fact: allInclusiveCodeNights,
            operator: 'greaterThan',
            value: 0
          },
          {
            fact: 'nights',
            operator: 'lessThan',
            value: maximumNights
          }
        ]
      },
      {
        all: [
          {
            fact: 'reserveType',
            operator: 'in',
            value: regularReserve
          },
          {
            fact: 'hotel',
            operator: 'in',
            value: eligibleHotelsWithGolf
          },
          {
            fact: allInclusiveCodeNights,
            operator: 'greaterThan',
            value: 0
          },
          {
            fact: 'nights',
            operator: 'lessThan',
            value: maximumNights
          }
        ]
      },
      {
        all: [
          {
            fact: 'reserveType',
            operator: 'in',
            value: regularReserve
          },
          {
            fact: 'hotel',
            operator: 'in',
            value: eligibleHotelsWithGolf
          },
          {
            fact: 'selectedGolfOption',
            operator: 'equal',
            value: false
          },
          {
            fact: allInclusiveCodeNights,
            operator: 'greaterThan',
            value: 0
          },
          {
            fact: 'nights',
            operator: 'lessThan',
            value: maximumNights
          }
        ]
      },
      {
        all: [
          {
            fact: 'hotel',
            operator: 'notIn',
            value: eligibleHotelsWithGolf
          },
          {
            fact: allInclusiveCodeNights,
            operator: 'greaterThan',
            value: 0
          },
          {
            fact: allInclusiveCodeNights,
            operator: 'greaterThan',
            value: 0
          },
          {
            fact: 'nights',
            operator: 'lessThan',
            value: maximumNights
          }
        ]
      },
      {
        all: [
          {
            fact: 'reserveType',
            operator: 'in',
            value: preferentialReserve
          },
          {
            fact: 'hotel',
            operator: 'notIn',
            value: eligibleHotelsWithGolf
          },
          {
            fact: allInclusiveCodeNights,
            operator: 'greaterThan',
            value: 0
          },
          {
            fact: allInclusiveCodeWeeks,
            operator: 'equal',
            value: 0
          }
        ]
      },
      {
        all: [
          {
            fact: 'reserveType',
            operator: 'in',
            value: regularReserve
          },
          {
            fact: 'hotel',
            operator: 'in',
            value: eligibleHotelsWithGolf
          },
          {
            fact: allInclusiveCodeNights,
            operator: 'greaterThan',
            value: 0
          },
          {
            fact: allInclusiveCodeWeeks,
            operator: 'equal',
            value: 0
          }
        ]
      },
      {
        all: [
          {
            fact: 'reserveType',
            operator: 'in',
            value: regularReserve
          },
          {
            fact: 'hotel',
            operator: 'in',
            value: eligibleHotelsWithGolf
          },
          {
            fact: 'selectedGolfOption',
            operator: 'equal',
            value: false
          },
          {
            fact: allInclusiveCodeNights,
            operator: 'greaterThan',
            value: 0
          },
          {
            fact: allInclusiveCodeWeeks,
            operator: 'equal',
            value: 0
          }
        ]
      },
      {
        all: [
          {
            fact: 'hotel',
            operator: 'notIn',
            value: eligibleHotelsWithGolf
          },
          {
            fact: allInclusiveCodeNights,
            operator: 'greaterThan',
            value: 0
          },
          {
            fact: allInclusiveCodeNights,
            operator: 'greaterThan',
            value: 0
          },
          {
            fact: allInclusiveCodeWeeks,
            operator: 'equal',
            value: 0
          }
        ]
      },
      {
        all: [
          {
            fact: 'reserveType',
            operator: 'in',
            value: preferentialReserve
          },
          {
            fact: allInclusiveCodeNights,
            operator: 'greaterThan',
            value: 0
          },
          {
            fact: allInclusiveCodeNights,
            operator: 'greaterThanInclusive',
            value: '{nightsToUse}'
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
        message: 'Reserve can be used with all inclusive nights',
        code: allInclusiveCodeNights,
        type: nightType
      }
    }
  }
}

export const formatPolicyToEvaluate = (
  policies: Array<Policies> | Policies,
  fact: EliteProductFact
) => {
  if (Array.isArray(policies))
    return {
      stages: [
        {
          policies: [],
          expressions: [
            {
              nightsToUse: 'nights'
            }
          ]
        },
        {
          policies
        }
      ],
      fact
    }
  return {
    stages: [
      {
        policies: [],
        expresions: [
          {
            nightsToUse: 'nights',
            // converted nights to use to weeks
            weeksToUse: ' nights / 7'
          }
        ]
      },
      {
        policies: [policies]
      }
    ],
    fact
  }
}
