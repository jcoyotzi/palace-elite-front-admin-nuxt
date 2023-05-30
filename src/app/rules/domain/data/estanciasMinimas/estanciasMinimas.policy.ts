import { EnumReservationCategory, EnumRoomCategory } from '../../entities/enum/pipelinesEnum'
import {EliteProductType} from '~/src/app/bookingBenefits/domain/entities/rules/reservationTypes'
import {EnumMarkets} from '~/src/app/common/domain/enums/markets'

export const StandardSuite = {
  conditions: {
    any: [
      {
        all: [
          {
            fact: 'reservationType',
            // path: '$.code',
            operator: 'in',
            value: [EnumReservationCategory.PREFERENCIAL]
          },
          {
            fact: 'roomType',
            operator: 'equal',
            value: EnumRoomCategory.ESTANDARD
          }
        ]
      },
      {
        all: [
          {
            fact: 'reservationType',
            // path: '$.code',
            operator: 'in',
            value: [
              EnumReservationCategory.INCENTIVA,
              EnumReservationCategory.ANIVERSARIO,
              EnumReservationCategory.IMP_WEEKS
            ]
          },
          {
            fact: 'roomType',
            operator: 'equal',
            value: EnumRoomCategory.ESTANDARD
          },
          {
            fact: 'productType',
            operator: 'equal',
            value: EliteProductType.nightType
          }
        ]
      }
    ]
  },
  event: {
    type: 'policy',
    params: {
      policy: {
        stayMinimal: 1
      }
    }
  }
}

export const StandardSuiteWeekProvision = {
  conditions: {
    all: [
      {
        fact: 'reservationType',
        // path: '$.code',
        operator: 'in',
        value: [
          EnumReservationCategory.INCENTIVA,
          EnumReservationCategory.ANIVERSARIO,
          EnumReservationCategory.IMP_WEEKS
        ]
      },
      {
        fact: 'roomType',
        operator: 'equal',
        value: EnumRoomCategory.ESTANDARD
      },
      {
        fact: 'productType',
        operator: 'equal',
        value: EliteProductType.weekType
      }
    ]
  },
  event: {
    type: 'policy',
    params: {
      policy: {
        stayMinimal: 7
      }
    }
  }
}

/*
export const WithMinimal = {
  conditions: {
    all: [
      {
        fact: 'reservationType',
        // path: '$.code',
        operator: 'in',
        value: [
          EnumReservationCategory.PREFERENCIAL,
          EnumReservationCategory.INCENTIVA,
          EnumReservationCategory.ANIVERSARIO,
          EnumReservationCategory.IMP_WEEKS,
          EnumReservationCategory.REFERIDOS
        ]
      },
      {
        fact: 'roomType',
        operator: 'notIn',
        value: [EnumRoomCategory.ESTANDARD]
      },
      {
        fact: 'stayMinimal',
        operator: 'equal',
        value: true
      }
    ]
  },
  event: {
    type: 'policy',
    params: {
      policy: {
        stayMinimal: '{stayMinimalDays}'
      }
    }
  }
}

{
  fact: 'stayMinimal',
  operator: 'equal',
  value: true
}
*/
export const SpecialSuiteMarketUSA = {
  conditions: {
    all: [
      {
        fact: 'reservationType',
        // path: '$.code',
        operator: 'in',
        value: [
          EnumReservationCategory.PREFERENCIAL,
          EnumReservationCategory.INCENTIVA,
          EnumReservationCategory.ANIVERSARIO,
          EnumReservationCategory.IMP_WEEKS
        ]
      },
      {
        fact: 'roomType',
        operator: 'equal',
        value: EnumRoomCategory.ESPECIAL
      },
      {
        fact: 'stayMinimal',
        operator: 'equal',
        value: false
      },
      {
        fact: 'market',
        operator: 'in',
        value: [EnumMarkets.USA, EnumMarkets.LATAM, EnumMarkets.CANADA]
      }
    ]
  },
  event: {
    type: 'policy',
    params: {
      policy: {
        stayMinimal: 7
      }
    }
  }
}

export const SpecialSuiteMarketUSAWithMinimalStay = {
  conditions: {
    any: [
      {
        all: [
          {
            fact: 'reservationType',
            // path: '$.code',
            operator: 'in',
            value: [EnumReservationCategory.PREFERENCIAL]
          },
          {
            fact: 'roomType',
            operator: 'equal',
            value: EnumRoomCategory.ESPECIAL
          },
          {
            fact: 'stayMinimal',
            operator: 'equal',
            value: true
          },
          {
            fact: 'market',
            operator: 'in',
            value: [EnumMarkets.USA, EnumMarkets.LATAM, EnumMarkets.CANADA]
          }
        ]
      },
      {
        all: [
          {
            fact: 'reservationType',
            // path: '$.code',
            operator: 'in',
            value: [
              EnumReservationCategory.INCENTIVA,
              EnumReservationCategory.ANIVERSARIO,
              EnumReservationCategory.IMP_WEEKS
            ]
          },
          {
            fact: 'roomType',
            operator: 'equal',
            value: EnumRoomCategory.ESPECIAL
          },
          {
            fact: 'stayMinimal',
            operator: 'equal',
            value: true
          },
          {
            fact: 'market',
            operator: 'in',
            value: [EnumMarkets.USA, EnumMarkets.LATAM, EnumMarkets.CANADA]
          },
          {
            fact: 'productType',
            operator: 'equal',
            value: EliteProductType.nightType
          }
        ]
      }
    ]
  },
  event: {
    type: 'policy',
    params: {
      policy: {
        stayMinimal: 5
      }
    }
  }
}
export const SpecialSuiteMarketUSAWithMinimalStayWeekProvision = {
  conditions: {
    all: [
      {
        fact: 'reservationType',
        // path: '$.code',
        operator: 'in',
        value: [
          EnumReservationCategory.INCENTIVA,
          EnumReservationCategory.ANIVERSARIO,
          EnumReservationCategory.IMP_WEEKS
        ]
      },
      {
        fact: 'roomType',
        operator: 'equal',
        value: EnumRoomCategory.ESPECIAL
      },
      {
        fact: 'stayMinimal',
        operator: 'equal',
        value: true
      },
      {
        fact: 'market',
        operator: 'in',
        value: [EnumMarkets.USA, EnumMarkets.LATAM, EnumMarkets.CANADA]
      },
      {
        fact: 'productType',
        operator: 'equal',
        value: EliteProductType.weekType
      }
    ]
  },
  event: {
    type: 'policy',
    params: {
      policy: {
        stayMinimal: 7
      }
    }
  }
}

export const SpecialSuiteMarketNational = {
  conditions: {
    any: [
      {
        all: [
          {
            fact: 'reservationType',
            // path: '$.code',
            operator: 'in',
            value: [EnumReservationCategory.PREFERENCIAL]
          },
          {
            fact: 'roomType',
            operator: 'equal',
            value: EnumRoomCategory.ESPECIAL
          },
          {
            fact: 'stayMinimal',
            operator: 'equal',
            value: false
          },
          {
            fact: 'market',
            operator: 'in',
            value: [EnumMarkets.MEXICO]
          }
        ]
      },
      {
        all: [
          {
            fact: 'reservationType',
            // path: '$.code',
            operator: 'in',
            value: [
              EnumReservationCategory.INCENTIVA,
              EnumReservationCategory.ANIVERSARIO,
              EnumReservationCategory.IMP_WEEKS
            ]
          },
          {
            fact: 'roomType',
            operator: 'equal',
            value: EnumRoomCategory.ESPECIAL
          },
          {
            fact: 'stayMinimal',
            operator: 'equal',
            value: false
          },
          {
            fact: 'market',
            operator: 'in',
            value: [EnumMarkets.MEXICO]
          },
          {
            fact: 'productType',
            operator: 'equal',
            value: EliteProductType.nightType
          }
        ]
      }
    ]
  },
  event: {
    type: 'policy',
    params: {
      policy: {
        stayMinimal: 4
      }
    }
  }
}

export const SpecialSuiteMarketNationalWeekProvision = {
  conditions: {
    all: [
      {
        fact: 'reservationType',
        // path: '$.code',
        operator: 'in',
        value: [
          EnumReservationCategory.INCENTIVA,
          EnumReservationCategory.ANIVERSARIO,
          EnumReservationCategory.IMP_WEEKS
        ]
      },
      {
        fact: 'roomType',
        operator: 'equal',
        value: EnumRoomCategory.ESPECIAL
      },
      {
        fact: 'stayMinimal',
        operator: 'equal',
        value: false
      },
      {
        fact: 'market',
        operator: 'in',
        value: [EnumMarkets.MEXICO]
      },
      {
        fact: 'productType',
        operator: 'equal',
        value: EliteProductType.weekType
      }
    ]
  },
  event: {
    type: 'policy',
    params: {
      policy: {
        stayMinimal: 7
      }
    }
  }
}

export const SpecialSuiteMarketNationalWithMinimalStay = {
  conditions: {
    any: [
      {
        all: [
          {
            fact: 'reservationType',
            // path: '$.code',
            operator: 'in',
            value: [EnumReservationCategory.PREFERENCIAL]
          },
          {
            fact: 'roomType',
            operator: 'equal',
            value: EnumRoomCategory.ESPECIAL
          },
          {
            fact: 'stayMinimal',
            operator: 'equal',
            value: true
          },
          {
            fact: 'market',
            operator: 'in',
            value: [EnumMarkets.MEXICO]
          }
        ]
      },
      {
        all: [
          {
            fact: 'reservationType',
            // path: '$.code',
            operator: 'in',
            value: [
              EnumReservationCategory.INCENTIVA,
              EnumReservationCategory.ANIVERSARIO,
              EnumReservationCategory.IMP_WEEKS
            ]
          },
          {
            fact: 'roomType',
            operator: 'equal',
            value: EnumRoomCategory.ESPECIAL
          },
          {
            fact: 'stayMinimal',
            operator: 'equal',
            value: true
          },
          {
            fact: 'market',
            operator: 'in',
            value: [EnumMarkets.MEXICO]
          },
          {
            fact: 'productType',
            operator: 'equal',
            value: EliteProductType.nightType
          }
        ]
      }
    ]
  },
  event: {
    type: 'policy',
    params: {
      policy: {
        stayMinimal: 4
      }
    }
  }
}

export const SpecialSuiteMarketNationalWeekProvisionWithMinimalStay = {
  conditions: {
    all: [
      {
        fact: 'reservationType',
        // path: '$.code',
        operator: 'in',
        value: [
          EnumReservationCategory.INCENTIVA,
          EnumReservationCategory.ANIVERSARIO,
          EnumReservationCategory.IMP_WEEKS
        ]
      },
      {
        fact: 'roomType',
        operator: 'equal',
        value: EnumRoomCategory.ESPECIAL
      },
      {
        fact: 'stayMinimal',
        operator: 'equal',
        value: true
      },
      {
        fact: 'market',
        operator: 'in',
        value: [EnumMarkets.MEXICO]
      },
      {
        fact: 'productType',
        operator: 'equal',
        value: EliteProductType.weekType
      }
    ]
  },
  event: {
    type: 'policy',
    params: {
      policy: {
        stayMinimal: 7
      }
    }
  }
}

export const SpecialSuiteMarketUK = {
  conditions: {
    all: [
      {
        fact: 'reservationType',
        // path: '$.code',
        operator: 'in',
        value: [
          EnumReservationCategory.PREFERENCIAL,
          EnumReservationCategory.INCENTIVA,
          EnumReservationCategory.ANIVERSARIO,
          EnumReservationCategory.IMP_WEEKS
        ]
      },
      {
        fact: 'roomType',
        operator: 'equal',
        value: EnumRoomCategory.ESPECIAL
      },
      {
        fact: 'stayMinimal',
        operator: 'equal',
        value: false
      },
      {
        fact: 'market',
        operator: 'in',
        value: [EnumMarkets.UK]
      }
    ]
  },
  event: {
    type: 'policy',
    params: {
      policy: {
        stayMinimal: 10
      }
    }
  }
}

export const SpecialSuiteMarketUKWithMinimalStay = {
  conditions: {
    all: [
      {
        fact: 'reservationType',
        // path: '$.code',
        operator: 'in',
        value: [
          EnumReservationCategory.PREFERENCIAL,
          EnumReservationCategory.INCENTIVA,
          EnumReservationCategory.ANIVERSARIO,
          EnumReservationCategory.IMP_WEEKS
        ]
      },
      {
        fact: 'roomType',
        operator: 'equal',
        value: EnumRoomCategory.ESPECIAL
      },
      {
        fact: 'stayMinimal',
        operator: 'equal',
        value: true
      },
      {
        fact: 'market',
        operator: 'in',
        value: [EnumMarkets.UK]
      }
    ]
  },
  event: {
    type: 'policy',
    params: {
      policy: {
        stayMinimal: 7
      }
    }
  }
}

export const PresidentialSuiteMarketUSA = {
  conditions: {
    all: [
      {
        fact: 'reservationType',
        // path: '$.code',
        operator: 'in',
        value: [
          EnumReservationCategory.PREFERENCIAL,
          EnumReservationCategory.INCENTIVA,
          EnumReservationCategory.ANIVERSARIO,
          EnumReservationCategory.IMP_WEEKS
        ]
      },
      {
        fact: 'roomType',
        operator: 'equal',
        value: EnumRoomCategory.PRESIDENTIAL
      },
      {
        fact: 'stayMinimalPresidential',
        operator: 'equal',
        value: false
      },
      {
        fact: 'market',
        operator: 'in',
        value: [EnumMarkets.USA, EnumMarkets.LATAM, EnumMarkets.CANADA]
      }
    ]
  },
  event: {
    type: 'policy',
    params: {
      policy: {
        stayMinimal: 7
      }
    }
  }
}

export const PresidentialSuiteMarketUSAWithMinimalStay = {
  conditions: {
    any: [
      {
        all: [
          {
            fact: 'reservationType',
            // path: '$.code',
            operator: 'in',
            value: [EnumReservationCategory.PREFERENCIAL]
          },
          {
            fact: 'roomType',
            operator: 'equal',
            value: EnumRoomCategory.PRESIDENTIAL
          },
          {
            fact: 'stayMinimalPresidential',
            operator: 'equal',
            value: true
          },
          {
            fact: 'market',
            operator: 'in',
            value: [EnumMarkets.USA, EnumMarkets.LATAM, EnumMarkets.CANADA]
          }
        ]
      },
      {
        all: [
          {
            fact: 'reservationType',
            // path: '$.code',
            operator: 'in',
            value: [
              EnumReservationCategory.INCENTIVA,
              EnumReservationCategory.ANIVERSARIO,
              EnumReservationCategory.IMP_WEEKS
            ]
          },
          {
            fact: 'roomType',
            operator: 'equal',
            value: EnumRoomCategory.PRESIDENTIAL
          },
          {
            fact: 'stayMinimalPresidential',
            operator: 'equal',
            value: true
          },
          {
            fact: 'market',
            operator: 'in',
            value: [EnumMarkets.USA, EnumMarkets.LATAM, EnumMarkets.CANADA]
          },
          {
            fact: 'productType',
            operator: 'equal',
            value: EliteProductType.nightType
          }
        ]
      }
    ]
  },
  event: {
    type: 'policy',
    params: {
      policy: {
        stayMinimal: 4
      }
    }
  }
}
export const PresidentialSuiteMarketUSAWeekProvisionWithMinimalStay = {
  conditions: {
    all: [
      {
        fact: 'reservationType',
        // path: '$.code',
        operator: 'in',
        value: [
          EnumReservationCategory.INCENTIVA,
          EnumReservationCategory.ANIVERSARIO,
          EnumReservationCategory.IMP_WEEKS
        ]
      },
      {
        fact: 'roomType',
        operator: 'equal',
        value: EnumRoomCategory.PRESIDENTIAL
      },
      {
        fact: 'stayMinimalPresidential',
        operator: 'equal',
        value: true
      },
      {
        fact: 'market',
        operator: 'in',
        value: [EnumMarkets.USA, EnumMarkets.LATAM, EnumMarkets.CANADA]
      },
      {
        fact: 'productType',
        operator: 'equal',
        value: EliteProductType.weekType
      }
    ]
  },
  event: {
    type: 'policy',
    params: {
      policy: {
        stayMinimal: 7
      }
    }
  }
}

export const PresidentialSuiteMarketNational = {
  conditions: {
    any: [
      {
        all: [
          {
            fact: 'reservationType',
            // path: '$.code',
            operator: 'in',
            value: [EnumReservationCategory.PREFERENCIAL]
          },
          {
            fact: 'roomType',
            operator: 'equal',
            value: EnumRoomCategory.PRESIDENTIAL
          },
          {
            fact: 'stayMinimalPresidential',
            operator: 'equal',
            value: false
          },
          {
            fact: 'market',
            operator: 'in',
            value: [EnumMarkets.MEXICO]
          }
        ]
      },
      {
        all: [
          {
            fact: 'reservationType',
            // path: '$.code',
            operator: 'in',
            value: [
              EnumReservationCategory.INCENTIVA,
              EnumReservationCategory.ANIVERSARIO,
              EnumReservationCategory.IMP_WEEKS
            ]
          },
          {
            fact: 'roomType',
            operator: 'equal',
            value: EnumRoomCategory.PRESIDENTIAL
          },
          {
            fact: 'stayMinimalPresidential',
            operator: 'equal',
            value: false
          },
          {
            fact: 'market',
            operator: 'in',
            value: [EnumMarkets.MEXICO]
          },
          {
            fact: 'productType',
            operator: 'equal',
            value: EliteProductType.nightType
          }
        ]
      }
    ]
  },
  event: {
    type: 'policy',
    params: {
      policy: {
        stayMinimal: 5
      }
    }
  }
}
export const PresidentialSuiteMarketNationalWeekProvision = {
  conditions: {
    all: [
      {
        fact: 'reservationType',
        // path: '$.code',
        operator: 'in',
        value: [
          EnumReservationCategory.INCENTIVA,
          EnumReservationCategory.ANIVERSARIO,
          EnumReservationCategory.IMP_WEEKS
        ]
      },
      {
        fact: 'roomType',
        operator: 'equal',
        value: EnumRoomCategory.PRESIDENTIAL
      },
      {
        fact: 'stayMinimalPresidential',
        operator: 'equal',
        value: false
      },
      {
        fact: 'market',
        operator: 'in',
        value: [EnumMarkets.MEXICO]
      },
      {
        fact: 'productType',
        operator: 'equal',
        value: EliteProductType.weekType
      }
    ]
  },
  event: {
    type: 'policy',
    params: {
      policy: {
        stayMinimal: 7
      }
    }
  }
}

export const PresidentialSuiteMarketNationalWithMinimalStay = {
  conditions: {
    any: [
      {
        all: [
          {
            fact: 'reservationType',
            // path: '$.code',
            operator: 'in',
            value: [EnumReservationCategory.PREFERENCIAL]
          },
          {
            fact: 'roomType',
            operator: 'equal',
            value: EnumRoomCategory.PRESIDENTIAL
          },
          {
            fact: 'stayMinimalPresidential',
            operator: 'equal',
            value: true
          },
          {
            fact: 'market',
            operator: 'in',
            value: [EnumMarkets.MEXICO]
          }
        ]
      },
      {
        all: [
          {
            fact: 'reservationType',
            // path: '$.code',
            operator: 'in',
            value: [
              EnumReservationCategory.INCENTIVA,
              EnumReservationCategory.ANIVERSARIO,
              EnumReservationCategory.IMP_WEEKS
            ]
          },
          {
            fact: 'roomType',
            operator: 'equal',
            value: EnumRoomCategory.PRESIDENTIAL
          },
          {
            fact: 'stayMinimalPresidential',
            operator: 'equal',
            value: true
          },
          {
            fact: 'market',
            operator: 'in',
            value: [EnumMarkets.MEXICO]
          },
          {
            fact: 'productType',
            operator: 'equal',
            value: EliteProductType.nightType
          }
        ]
      }
    ]
  },
  event: {
    type: 'policy',
    params: {
      policy: {
        stayMinimal: 4
      }
    }
  }
}

export const PresidentialSuiteMarketNationalWeekProvisionWithMinimalStay = {
  conditions: {
    all: [
      {
        fact: 'reservationType',
        // path: '$.code',
        operator: 'in',
        value: [
          EnumReservationCategory.INCENTIVA,
          EnumReservationCategory.ANIVERSARIO,
          EnumReservationCategory.IMP_WEEKS
        ]
      },
      {
        fact: 'roomType',
        operator: 'equal',
        value: EnumRoomCategory.PRESIDENTIAL
      },
      {
        fact: 'stayMinimalPresidential',
        operator: 'equal',
        value: true
      },
      {
        fact: 'market',
        operator: 'in',
        value: [EnumMarkets.MEXICO]
      },
      {
        fact: 'productType',
        operator: 'equal',
        value: EliteProductType.weekType
      }
    ]
  },
  event: {
    type: 'policy',
    params: {
      policy: {
        stayMinimal: 7
      }
    }
  }
}

export const PresidentialSuiteMarketUK = {
  conditions: {
    all: [
      {
        fact: 'reservationType',
        // path: '$.code',
        operator: 'in',
        value: [
          EnumReservationCategory.PREFERENCIAL,
          EnumReservationCategory.INCENTIVA,
          EnumReservationCategory.ANIVERSARIO,
          EnumReservationCategory.IMP_WEEKS
        ]
      },
      {
        fact: 'roomType',
        operator: 'equal',
        value: EnumRoomCategory.PRESIDENTIAL
      },
      {
        fact: 'stayMinimalPresidential',
        operator: 'equal',
        value: false
      },
      {
        fact: 'market',
        operator: 'in',
        value: [EnumMarkets.UK]
      }
    ]
  },
  event: {
    type: 'policy',
    params: {
      policy: {
        stayMinimal: 10
      }
    }
  }
}

export const PresidentialSuiteMarketUKWithMinimalStay = {
  conditions: {
    any: [
      {
        all: [
          {
            fact: 'reservationType',
            // path: '$.code',
            operator: 'in',
            value: [EnumReservationCategory.PREFERENCIAL]
          },
          {
            fact: 'roomType',
            operator: 'equal',
            value: EnumRoomCategory.PRESIDENTIAL
          },
          {
            fact: 'stayMinimalPresidential',
            operator: 'equal',
            value: true
          },
          {
            fact: 'market',
            operator: 'in',
            value: [EnumMarkets.UK]
          }
        ]
      },
      {
        all: [
          {
            fact: 'reservationType',
            // path: '$.code',
            operator: 'in',
            value: [
              EnumReservationCategory.INCENTIVA,
              EnumReservationCategory.ANIVERSARIO,
              EnumReservationCategory.IMP_WEEKS
            ]
          },
          {
            fact: 'roomType',
            operator: 'equal',
            value: EnumRoomCategory.PRESIDENTIAL
          },
          {
            fact: 'stayMinimalPresidential',
            operator: 'equal',
            value: true
          },
          {
            fact: 'market',
            operator: 'in',
            value: [EnumMarkets.UK]
          },
          {
            fact: 'productType',
            operator: 'equal',
            value: EliteProductType.nightType
          }
        ]
      }
    ]
  },
  event: {
    type: 'policy',
    params: {
      policy: {
        stayMinimal: 5
      }
    }
  }
}

export const PresidentialSuiteMarketUKWeekProvisionWithMinimalStay = {
  conditions: {
    all: [
      {
        fact: 'reservationType',
        // path: '$.code',
        operator: 'in',
        value: [
          EnumReservationCategory.INCENTIVA,
          EnumReservationCategory.ANIVERSARIO,
          EnumReservationCategory.IMP_WEEKS
        ]
      },
      {
        fact: 'roomType',
        operator: 'equal',
        value: EnumRoomCategory.PRESIDENTIAL
      },
      {
        fact: 'stayMinimalPresidential',
        operator: 'equal',
        value: true
      },
      {
        fact: 'market',
        operator: 'in',
        value: [EnumMarkets.UK]
      },
      {
        fact: 'productType',
        operator: 'equal',
        value: EliteProductType.weekType
      }
    ]
  },
  event: {
    type: 'policy',
    params: {
      policy: {
        stayMinimal: 7
      }
    }
  }
}

export const ResidenceSuiteMarketUSA = {
  conditions: {
    all: [
      {
        fact: 'reservationType',
        // path: '$.code',
        operator: 'in',
        value: [
          EnumReservationCategory.PREFERENCIAL,
          EnumReservationCategory.INCENTIVA,
          EnumReservationCategory.ANIVERSARIO,
          EnumReservationCategory.IMP_WEEKS
        ]
      },
      {
        fact: 'roomType',
        operator: 'equal',
        value: EnumRoomCategory.RESIDENCE
      },
      {
        fact: 'stayMinimal',
        operator: 'equal',
        value: false
      },
      {
        fact: 'market',
        operator: 'in',
        value: [EnumMarkets.USA, EnumMarkets.LATAM, EnumMarkets.CANADA]
      }
    ]
  },
  event: {
    type: 'policy',
    params: {
      policy: {
        stayMinimal: 7
      }
    }
  }
}

export const ResidenceSuiteMarketNational = {
  conditions: {
    all: [
      {
        fact: 'reservationType',
        // path: '$.code',
        operator: 'in',
        value: [
          EnumReservationCategory.PREFERENCIAL,
          EnumReservationCategory.INCENTIVA,
          EnumReservationCategory.ANIVERSARIO,
          EnumReservationCategory.IMP_WEEKS
        ]
      },
      {
        fact: 'roomType',
        operator: 'equal',
        value: EnumRoomCategory.RESIDENCE
      },
      {
        fact: 'stayMinimal',
        operator: 'equal',
        value: false
      },
      {
        fact: 'market',
        operator: 'in',
        value: [EnumMarkets.MEXICO]
      }
    ]
  },
  event: {
    type: 'policy',
    params: {
      policy: {
        stayMinimal: 7
      }
    }
  }
}

export const ResidenceSuiteMarketUK = {
  conditions: {
    all: [
      {
        fact: 'reservationType',
        // path: '$.code',
        operator: 'in',
        value: [
          EnumReservationCategory.PREFERENCIAL,
          EnumReservationCategory.INCENTIVA,
          EnumReservationCategory.ANIVERSARIO,
          EnumReservationCategory.IMP_WEEKS,
          EnumReservationCategory.REFERIDOS
        ]
      },
      {
        fact: 'roomType',
        operator: 'equal',
        value: EnumRoomCategory.RESIDENCE
      },
      {
        fact: 'stayMinimal',
        operator: 'equal',
        value: false
      },
      {
        fact: 'market',
        operator: 'in',
        value: [EnumMarkets.UK]
      }
    ]
  },
  event: {
    type: 'policy',
    params: {
      policy: {
        stayMinimal: 7
      }
    }
  }
}

export const VillaSuiteMarketUSA = {
  conditions: {
    all: [
      {
        fact: 'reservationType',
        // path: '$.code',
        operator: 'in',
        value: [
          EnumReservationCategory.PREFERENCIAL,
          EnumReservationCategory.INCENTIVA,
          EnumReservationCategory.ANIVERSARIO,
          EnumReservationCategory.IMP_WEEKS,
          EnumReservationCategory.REFERIDOS
        ]
      },
      {
        fact: 'roomType',
        operator: 'equal',
        value: EnumRoomCategory.VILLA
      },
      {
        fact: 'stayMinimal',
        operator: 'equal',
        value: false
      },
      {
        fact: 'market',
        operator: 'in',
        value: [EnumMarkets.USA, EnumMarkets.LATAM, EnumMarkets.CANADA]
      }
    ]
  },
  event: {
    type: 'policy',
    params: {
      policy: {
        stayMinimal: 7
      }
    }
  }
}

export const VillaSuiteMarketNational = {
  conditions: {
    all: [
      {
        fact: 'reservationType',
        // path: '$.code',
        operator: 'in',
        value: [
          EnumReservationCategory.PREFERENCIAL,
          EnumReservationCategory.INCENTIVA,
          EnumReservationCategory.ANIVERSARIO,
          EnumReservationCategory.IMP_WEEKS,
          EnumReservationCategory.REFERIDOS
        ]
      },
      {
        fact: 'roomType',
        operator: 'equal',
        value: EnumRoomCategory.VILLA
      },
      {
        fact: 'stayMinimal',
        operator: 'equal',
        value: false
      },
      {
        fact: 'market',
        operator: 'in',
        value: [EnumMarkets.MEXICO]
      }
    ]
  },
  event: {
    type: 'policy',
    params: {
      policy: {
        stayMinimal: 7
      }
    }
  }
}

export const VillaSuiteMarketUK = {
  conditions: {
    all: [
      {
        fact: 'reservationType',
        // path: '$.code',
        operator: 'in',
        value: [
          EnumReservationCategory.PREFERENCIAL,
          EnumReservationCategory.INCENTIVA,
          EnumReservationCategory.ANIVERSARIO,
          EnumReservationCategory.IMP_WEEKS,
          EnumReservationCategory.REFERIDOS
        ]
      },
      {
        fact: 'roomType',
        operator: 'equal',
        value: EnumRoomCategory.VILLA
      },
      {
        fact: 'stayMinimal',
        operator: 'equal',
        value: false
      },
      {
        fact: 'market',
        operator: 'in',
        value: [EnumMarkets.UK]
      }
    ]
  },
  event: {
    type: 'policy',
    params: {
      policy: {
        stayMinimal: 10
      }
    }
  }
}

/** REFERIDOS **/

export const ReferralMarketUSAWithAuth = {
  conditions: {
    all: [
      {
        fact: 'reservationType',
        // path: '$.code',
        operator: 'in',
        value: [EnumReservationCategory.REFERIDOS]
      },
      {
        fact: 'stayMinimalReferral',
        operator: 'equal',
        value: true
      },
      {
        fact: 'market',
        operator: 'in',
        value: [EnumMarkets.USA, EnumMarkets.LATAM, EnumMarkets.CANADA]
      }
    ]
  },
  event: {
    type: 'policy',
    params: {
      policy: {
        stayMinimal: 5
      }
    }
  }
}

export const ReferralMarketNationalWithAuth = {
  conditions: {
    all: [
      {
        fact: 'reservationType',
        // path: '$.code',
        operator: 'in',
        value: [EnumReservationCategory.REFERIDOS]
      },
      {
        fact: 'stayMinimalReferral',
        operator: 'equal',
        value: true
      },
      {
        fact: 'market',
        operator: 'in',
        value: [EnumMarkets.MEXICO]
      }
    ]
  },
  event: {
    type: 'policy',
    params: {
      policy: {
        stayMinimal: 4
      }
    }
  }
}

export const ReferralMarketUKWithAuth = {
  conditions: {
    all: [
      {
        fact: 'reservationType',
        // path: '$.code',
        operator: 'in',
        value: [EnumReservationCategory.REFERIDOS]
      },
      {
        fact: 'stayMinimalReferral',
        operator: 'equal',
        value: true
      },
      {
        fact: 'market',
        operator: 'in',
        value: [EnumMarkets.UK]
      }
    ]
  },
  event: {
    type: 'policy',
    params: {
      policy: {
        stayMinimal: 7
      }
    }
  }
}

export const ReferralMarketUSA = {
  conditions: {
    all: [
      {
        fact: 'reservationType',
        // path: '$.code',
        operator: 'in',
        value: [EnumReservationCategory.REFERIDOS]
      },
      {
        fact: 'stayMinimalReferral',
        operator: 'equal',
        value: false
      },
      {
        fact: 'market',
        operator: 'in',
        value: [EnumMarkets.USA, EnumMarkets.LATAM, EnumMarkets.CANADA]
      }
    ]
  },
  event: {
    type: 'policy',
    params: {
      policy: {
        stayMinimal: 7
      }
    }
  }
}

export const ReferralMarketNational = {
  conditions: {
    all: [
      {
        fact: 'reservationType',
        // path: '$.code',
        operator: 'in',
        value: [EnumReservationCategory.REFERIDOS]
      },
      {
        fact: 'stayMinimalReferral',
        operator: 'equal',
        value: false
      },
      {
        fact: 'market',
        operator: 'in',
        value: [EnumMarkets.MEXICO]
      }
    ]
  },
  event: {
    type: 'policy',
    params: {
      policy: {
        stayMinimal: 4
      }
    }
  }
}

export const ReferralMarketUK = {
  conditions: {
    all: [
      {
        fact: 'reservationType',
        // path: '$.code',
        operator: 'in',
        value: [EnumReservationCategory.REFERIDOS]
      },
      {
        fact: 'stayMinimalReferral',
        operator: 'equal',
        value: false
      },
      {
        fact: 'market',
        operator: 'in',
        value: [EnumMarkets.UK]
      }
    ]
  },
  event: {
    type: 'policy',
    params: {
      policy: {
        stayMinimal: 10
      }
    }
  }
}
