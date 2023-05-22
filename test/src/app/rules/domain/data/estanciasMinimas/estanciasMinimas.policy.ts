export const StandardSuite = {
  conditions: {
    all: [
      {
        fact: 'reservationType',
        // path: '$.code',
        operator: 'in',
        value: ['preferencial', 'incentivo', 'aniversario']
      },
      {
        fact: 'roomType',
        operator: 'equal',
        value: 'standard'
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

export const WithMinimal = {
  conditions: {
    all: [
      {
        fact: 'reservationType',
        // path: '$.code',
        operator: 'in',
        value: ['preferencial', 'incentivo', 'aniversario']
      },
      {
        fact: 'roomType',
        operator: 'notIn',
        value: ['standard']
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

export const SpecialSuiteMarketUSA = {
  conditions: {
    all: [
      {
        fact: 'reservationType',
        // path: '$.code',
        operator: 'in',
        value: ['preferencial', 'incentivo', 'aniversario']
      },
      {
        fact: 'roomType',
        operator: 'equal',
        value: 'special'
      },
      {
        fact: 'stayMinimal',
        operator: 'equal',
        value: false
      },
      {
        fact: 'market',
        operator: 'in',
        value: ['USA', 'LATAM', 'CANADA']
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
    all: [
      {
        fact: 'reservationType',
        // path: '$.code',
        operator: 'in',
        value: ['preferencial', 'incentivo', 'aniversario']
      },
      {
        fact: 'roomType',
        operator: 'equal',
        value: 'special'
      },
      {
        fact: 'stayMinimal',
        operator: 'equal',
        value: false
      },
      {
        fact: 'market',
        operator: 'in',
        value: ['NATIONAL']
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

export const SpecialSuiteMarketUK = {
  conditions: {
    all: [
      {
        fact: 'reservationType',
        // path: '$.code',
        operator: 'in',
        value: ['preferencial', 'incentivo', 'aniversario']
      },
      {
        fact: 'roomType',
        operator: 'equal',
        value: 'special'
      },
      {
        fact: 'stayMinimal',
        operator: 'equal',
        value: false
      },
      {
        fact: 'market',
        operator: 'in',
        value: ['UK', 'ROW']
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

export const PresidentialSuiteMarketUSA = {
  conditions: {
    all: [
      {
        fact: 'reservationType',
        // path: '$.code',
        operator: 'in',
        value: ['preferencial', 'incentivo', 'aniversario']
      },
      {
        fact: 'roomType',
        operator: 'equal',
        value: 'presidential'
      },
      {
        fact: 'stayMinimal',
        operator: 'equal',
        value: false
      },
      {
        fact: 'market',
        operator: 'in',
        value: ['USA', 'LATAM', 'CANADA']
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
    all: [
      {
        fact: 'reservationType',
        // path: '$.code',
        operator: 'in',
        value: ['preferencial', 'incentivo', 'aniversario']
      },
      {
        fact: 'roomType',
        operator: 'equal',
        value: 'presidential'
      },
      {
        fact: 'stayMinimal',
        operator: 'equal',
        value: false
      },
      {
        fact: 'market',
        operator: 'in',
        value: ['NATIONAL']
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

export const PresidentialSuiteMarketUK = {
  conditions: {
    all: [
      {
        fact: 'reservationType',
        // path: '$.code',
        operator: 'in',
        value: ['preferencial', 'incentivo', 'aniversario']
      },
      {
        fact: 'roomType',
        operator: 'equal',
        value: 'presidential'
      },
      {
        fact: 'stayMinimal',
        operator: 'equal',
        value: false
      },
      {
        fact: 'market',
        operator: 'in',
        value: ['UK', 'ROW']
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

export const ResidenceSuiteMarketUSA = {
  conditions: {
    all: [
      {
        fact: 'reservationType',
        // path: '$.code',
        operator: 'in',
        value: ['preferencial', 'incentivo', 'aniversario']
      },
      {
        fact: 'roomType',
        operator: 'equal',
        value: 'residence'
      },
      {
        fact: 'stayMinimal',
        operator: 'equal',
        value: false
      },
      {
        fact: 'market',
        operator: 'in',
        value: ['USA', 'LATAM', 'CANADA']
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
        value: ['preferencial', 'incentivo', 'aniversario']
      },
      {
        fact: 'roomType',
        operator: 'equal',
        value: 'residence'
      },
      {
        fact: 'stayMinimal',
        operator: 'equal',
        value: false
      },
      {
        fact: 'market',
        operator: 'in',
        value: ['NATIONAL']
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
        value: ['preferencial', 'incentivo', 'aniversario']
      },
      {
        fact: 'roomType',
        operator: 'equal',
        value: 'residence'
      },
      {
        fact: 'stayMinimal',
        operator: 'equal',
        value: false
      },
      {
        fact: 'market',
        operator: 'in',
        value: ['UK', 'ROW']
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
        value: ['preferencial', 'incentivo', 'aniversario']
      },
      {
        fact: 'roomType',
        operator: 'equal',
        value: 'villa'
      },
      {
        fact: 'stayMinimal',
        operator: 'equal',
        value: false
      },
      {
        fact: 'market',
        operator: 'in',
        value: ['USA', 'LATAM', 'CANADA']
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
        value: ['preferencial', 'incentivo', 'aniversario']
      },
      {
        fact: 'roomType',
        operator: 'equal',
        value: 'villa'
      },
      {
        fact: 'stayMinimal',
        operator: 'equal',
        value: false
      },
      {
        fact: 'market',
        operator: 'in',
        value: ['NATIONAL']
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
        value: ['preferencial', 'incentivo', 'aniversario']
      },
      {
        fact: 'roomType',
        operator: 'equal',
        value: 'villa'
      },
      {
        fact: 'stayMinimal',
        operator: 'equal',
        value: false
      },
      {
        fact: 'market',
        operator: 'in',
        value: ['UK', 'ROW']
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

export const ReferralMarketUSA = {
  conditions: {
    all: [
      {
        fact: 'reservationType',
        // path: '$.code',
        operator: 'in',
        value: ['referral']
      },
      {
        fact: 'stayMinimal',
        operator: 'equal',
        value: true
      },
      {
        fact: 'market',
        operator: 'in',
        value: ['USA', 'LATAM', 'CANADA']
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

export const ReferralMarketNational = {
  conditions: {
    all: [
      {
        fact: 'reservationType',
        // path: '$.code',
        operator: 'in',
        value: ['referral']
      },
      {
        fact: 'stayMinimal',
        operator: 'equal',
        value: true
      },
      {
        fact: 'market',
        operator: 'in',
        value: ['NATIONAL']
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
        value: ['referral']
      },
      {
        fact: 'stayMinimal',
        operator: 'equal',
        value: true
      },
      {
        fact: 'market',
        operator: 'in',
        value: ['UK', 'ROW']
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
