/*
 * Copyright (c) 2022.
 * Author: Enrique Nieto Martínez
 * Company: Palace Resorts
 * Created:  2022 / 11 / 14 9:14:46
 *
 */

import {
  ProvitionOptionDate, ProvitionOptionItem,
  ProvitionOptionNight, ProvitionOptionType
} from "../../../../../../../../../src/ui/components/Booking/PEProvisionOption/PEProvisionOptionTypes";

export const provisionsAniversaryHappyPathWeeksMock: ProvitionOptionItem[] = [
  {
    id: '0',
    category: 'ANVWKS',
    name: 'Week 0',
    nights: null,
    validTo: {
      date: '2022-11-18T00:00:00',
      human: 'Nov 18, 2022',
    },
    daysToExpire: 3,
    type: ProvitionOptionType.Week,
    hasGolf: false
  }
]
export const provisionsAniversaryBadPathWeeksMock: ProvitionOptionItem[] = [
  {
    id: '0',
    category: 'NOCHE',
    name: 'Night 0',
    nights: null,
    validTo: {
      date: '2022-11-18T00:00:00',
      human: 'Nov 18, 2022',
    },
    daysToExpire: 3,
    type: ProvitionOptionType.Night,
    hasGolf: false
  },
  {
    id: '1',
    category: 'HUYHUYHUYY',
    name: 'Unknown 0',
    nights: null,
    validTo: {
      date: '2022-11-18T00:00:00',
      human: 'Nov 18, 2022',
    },
    daysToExpire: 3,
    type: ProvitionOptionType.Unkown,
    hasGolf: false
  }
]


export const provisionsAniversaryWeeksGolfSameDateHappyPathMock: ProvitionOptionItem[] = [
  {
    id: '0',
    category: 'ANVWKS',
    name: 'Week 0',
    nights: null,
    validTo: {
      date: '2022-11-18T00:00:00',
      human: 'Nov 18, 2022',
    },
    daysToExpire: 3,
    type: ProvitionOptionType.Week,
    hasGolf: false
  },
  {
    id: '1',
    category: 'ANVWKS',
    name: 'Week 1',
    nights: null,
    validTo: {
      date: '2022-11-18T00:00:00',
      human: 'Nov 18, 2022',
    },
    daysToExpire: 3,
    type: ProvitionOptionType.Week,
    hasGolf: true
  }
]
export const provisionsAniversaryWeeksGolfDifferentDateHappyPathMock: ProvitionOptionItem[] = [
  {
    id: '0',
    category: 'HUYHUYHUY',
    name: 'Night 0',
    nights: null,
    validTo: {
      date: '2022-11-18T00:00:00',
      human: 'Nov 18, 2022',
    },
    daysToExpire: 3,
    type: ProvitionOptionType.Night,
    hasGolf: false
  },
  {
    id: '1',
    category: 'ANVWKS',
    name: 'Week 1',
    nights: null,
    validTo: {
      date: '2022-11-18T00:00:00',
      human: 'Nov 18, 2023',
    },
    daysToExpire: 368,
    type: ProvitionOptionType.Week,
    hasGolf: true
  }
]

export const provisionsAniversaryWeeksGolfHappyPathMock: ProvitionOptionItem[] = [
  {
    id: '1',
    category: 'ANVWKS',
    name: 'Week 2',
    nights: null,
    validTo: {
      date: '2022-11-19T00:00:00',
      human: 'Nov 19, 2022',
    },
    daysToExpire: 4,
    type: ProvitionOptionType.Week,
    hasGolf: true
  }
]
export const provisionsAniversaryWeeksGolfBadPathMock: ProvitionOptionItem[] = [
  {
    id: '1',
    category: 'ANVWKS',
    name: 'Week 2',
    nights: null,
    validTo: {
      date: '2022-11-19T00:00:00',
      human: 'Nov 19, 2022',
    },
    daysToExpire: 4,
    type: ProvitionOptionType.Week,
    hasGolf: false
  }
]

export const provisionsAniversaryNightsWeeksHappyPathMock: ProvitionOptionItem[] = [
  {
    id: '0',
    category: 'ANVWKS',
    name: 'Week 0',
    nights: null,
    validTo: {
      date: '2022-11-18T00:00:00',
      human: 'Nov 18, 2022',
    },
    daysToExpire: 3,
    type: ProvitionOptionType.Week,
    hasGolf: false
  },
  {
    id: '1',
    category: 'ANVWKS',
    name: 'Week 1',
    nights: null,
    validTo: {
      date: '2022-11-19T00:00:00',
      human: 'Nov 19, 2022',
    },
    daysToExpire: 4,
    type: ProvitionOptionType.Week,
    hasGolf: true
  },
  {
    id: '2',
    category: 'NOCHE',
    name: null,
    nights: [

      {
        name: 'Night 1',
        validTo: {
          date: '2022-11-18T00:00:00',
          human: 'Nov 18, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 3,
    type: ProvitionOptionType.Night,
    hasGolf: false
  },
  {
    id: '3',
    category: 'NOCHE',
    name: null,
    nights: [
      {
        name: 'Night 2',
        validTo: {
          date: '2022-11-18T00:00:00',
          human: 'Nov 18, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 3,
    type: ProvitionOptionType.Night,
    hasGolf: false
  },
  {
    id: '4',
    category: 'NOCHE',
    name: null,
    nights: [
      {
        name: 'Night 3',
        validTo: {
          date: '2022-11-19T00:00:00',
          human: 'Nov 19, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 4,
    type: ProvitionOptionType.Night,
    hasGolf: false
  },
  {
    id: '5',
    category: 'NOCHE',
    name: null,
    nights: [
      {
        name: 'Night 4',
        validTo: {
          date: '2022-11-20T00:00:00',
          human: 'Nov 20, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 5,
    type: ProvitionOptionType.Night,
    hasGolf: false
  },
  {
    id: '6',
    category: 'NOCHE',
    name: null,
    nights: [
      {
        name: 'Night 5',
        validTo: {
          date: '2022-11-20T00:00:00',
          human: 'Nov 20, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 5,
    type: ProvitionOptionType.Night,
    hasGolf: false
  },
  {
    id: '7',
    category: 'NOCHE',
    name: null,
    nights: [
      {
        name: 'Night 5',
        validTo: {
          date: '2022-11-21T00:00:00',
          human: 'Nov 21, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 6,
    type: ProvitionOptionType.Night,
    hasGolf: false
  },
  {
    id: '8',
    category: 'NOCHE',
    name: null,
    nights: [
      {
        name: 'Night 6',
        validTo: {
          date: '2022-11-22T00:00:00',
          human: 'Nov 22, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 7,
    type: ProvitionOptionType.Night,
    hasGolf: false
  },
  {
    id: '9',
    category: 'NOCHE',
    name: null,
    nights: [
      {
        name: 'Night 7',
        validTo: {
          date: '2022-11-22T00:00:00',
          human: 'Nov 22, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 7,
    type: ProvitionOptionType.Night,
    hasGolf: false
  },
  {
    id: '10',
    category: 'NOCHE',
    name: null,
    nights: [
      {
        name: 'Night 8',
        validTo: {
          date: '2022-11-22T00:00:00',
          human: 'Nov 22, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 7,
    type: ProvitionOptionType.Night,
    hasGolf: false
  },
  {
    id: '11',
    category: 'NOCHE',
    name: null,
    nights: [
      {
        name: 'Night 9',
        validTo: {
          date: '2022-11-22T00:00:00',
          human: 'Nov 22, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 7,
    type: ProvitionOptionType.Night,
    hasGolf: false
  },
]
export const provisionsAniversaryNightsWeeksBadPathMock: ProvitionOptionItem[] = [
  {
    id: '0',
    category: 'ANVWKS',
    name: 'Week 0',
    nights: null,
    validTo: {
      date: '2022-11-18T00:00:00',
      human: 'Nov 18, 2022',
    },
    daysToExpire: 3,
    type: ProvitionOptionType.Week,
    hasGolf: false
  },
  {
    id: '1',
    category: 'ANVWKS',
    name: 'Week 1',
    nights: null,
    validTo: {
      date: '2022-11-19T00:00:00',
      human: 'Nov 19, 2022',
    },
    daysToExpire: 4,
    type: ProvitionOptionType.Week,
    hasGolf: true
  },
  {
    id: '2',
    category: 'NOCHE',
    name: null,
    nights: [

      {
        name: 'Night 1',
        validTo: {
          date: '2022-11-18T00:00:00',
          human: 'Nov 18, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 3,
    type: ProvitionOptionType.Night,
    hasGolf: false
  },
  {
    id: '3',
    category: 'NOCHE',
    name: null,
    nights: [
      {
        name: 'Night 2',
        validTo: {
          date: '2022-11-18T00:00:00',
          human: 'Nov 18, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 3,
    type: ProvitionOptionType.Night,
    hasGolf: false
  },
  {
    id: '4',
    category: 'NOCHE',
    name: null,
    nights: [
      {
        name: 'Night 3',
        validTo: {
          date: '2022-11-19T00:00:00',
          human: 'Nov 19, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 4,
    type: ProvitionOptionType.Night,
    hasGolf: false
  },
  {
    id: '5',
    category: 'NOCHE',
    name: null,
    nights: [
      {
        name: 'Night 4',
        validTo: {
          date: '2022-11-20T00:00:00',
          human: 'Nov 20, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 5,
    type: ProvitionOptionType.Night,
    hasGolf: false
  },
  {
    id: '6',
    category: 'NOCHE',
    name: null,
    nights: [
      {
        name: 'Night 5',
        validTo: {
          date: '2022-11-20T00:00:00',
          human: 'Nov 20, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 5,
    type: ProvitionOptionType.Night,
    hasGolf: false
  },
]

export const provisionsAniversaryNightsHappyPathMock: ProvitionOptionItem[] = [
  {
    id: '2',
    category: 'NOCHE',
    name: null,
    nights: [

      {
        name: 'Night 1',
        validTo: {
          date: '2022-11-18T00:00:00',
          human: 'Nov 18, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 3,
    type: ProvitionOptionType.Night,
    hasGolf: false
  },
  {
    id: '3',
    category: 'NOCHE',
    name: null,
    nights: [
      {
        name: 'Night 2',
        validTo: {
          date: '2022-11-18T00:00:00',
          human: 'Nov 18, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 3,
    type: ProvitionOptionType.Night,
    hasGolf: false
  },
  {
    id: '4',
    category: 'NOCHE',
    name: null,
    nights: [
      {
        name: 'Night 3',
        validTo: {
          date: '2022-11-19T00:00:00',
          human: 'Nov 19, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 4,
    type: ProvitionOptionType.Night,
    hasGolf: false
  },
  {
    id: '5',
    category: 'NOCHE',
    name: null,
    nights: [
      {
        name: 'Night 4',
        validTo: {
          date: '2022-11-20T00:00:00',
          human: 'Nov 20, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 5,
    type: ProvitionOptionType.Night,
    hasGolf: false
  },
  {
    id: '6',
    category: 'NOCHE',
    name: null,
    nights: [
      {
        name: 'Night 5',
        validTo: {
          date: '2022-11-20T00:00:00',
          human: 'Nov 20, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 5,
    type: ProvitionOptionType.Night,
    hasGolf: false
  },
  {
    id: '7',
    category: 'NOCHE',
    name: null,
    nights: [
      {
        name: 'Night 6',
        validTo: {
          date: '2022-11-21T00:00:00',
          human: 'Nov 21, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 6,
    type: ProvitionOptionType.Night,
    hasGolf: false
  },
  {
    id: '8',
    category: 'NOCHE',
    name: null,
    nights: [
      {
        name: 'Night 7',
        validTo: {
          date: '2022-11-22T00:00:00',
          human: 'Nov 22, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 7,
    type: ProvitionOptionType.Night,
    hasGolf: false
  },
  {
    id: '9',
    category: 'NOCHE',
    name: null,
    nights: [
      {
        name: 'Night 8',
        validTo: {
          date: '2022-11-22T00:00:00',
          human: 'Nov 22, 2024',
        }
      }
    ],
    validTo: null,
    daysToExpire: 737,
    type: ProvitionOptionType.Night,
    hasGolf: false
  },
  {
    id: '10',
    category: 'PEPA_PIG',
    name: null,
    nights: [
      {
        name: 'Unknown 666',
        validTo: {
          date: '2022-11-22T00:00:00',
          human: 'Nov 22, 2024',
        }
      }
    ],
    validTo: null,
    daysToExpire: 737,
    type: ProvitionOptionType.Unkown,
    hasGolf: false
  },
]
export const provisionsAniversaryNightsBadPathMock: ProvitionOptionItem[] = [
  {
    id: '2',
    category: 'NOCHE',
    name: null,
    nights: [

      {
        name: 'Night 1',
        validTo: {
          date: '2022-11-18T00:00:00',
          human: 'Nov 18, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 3,
    type: ProvitionOptionType.Night,
    hasGolf: false
  },
  {
    id: '3',
    category: 'NOCHE',
    name: null,
    nights: [
      {
        name: 'Night 2',
        validTo: {
          date: '2022-11-18T00:00:00',
          human: 'Nov 18, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 3,
    type: ProvitionOptionType.Night,
    hasGolf: false
  },
  {
    id: '4',
    category: 'NOCHE',
    name: null,
    nights: [
      {
        name: 'Night 3',
        validTo: {
          date: '2022-11-19T00:00:00',
          human: 'Nov 19, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 4,
    type: ProvitionOptionType.Night,
    hasGolf: false
  },
]

export const provisionsAniversaryNightsGolfHappyPathMock: ProvitionOptionItem[] = [
  {
    id: '2',
    category: 'NOCHE',
    name: null,
    nights: [

      {
        name: 'Night 1',
        validTo: {
          date: '2022-11-18T00:00:00',
          human: 'Nov 18, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 3,
    type: ProvitionOptionType.Night,
    hasGolf: false
  },
  {
    id: '3',
    category: 'NOCHE',
    name: null,
    nights: [
      {
        name: 'Night 2',
        validTo: {
          date: '2022-11-18T00:00:00',
          human: 'Nov 18, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 3,
    type: ProvitionOptionType.Night,
    hasGolf: false
  },
  {
    id: '4',
    category: 'NOCHE',
    name: null,
    nights: [
      {
        name: 'Night 3',
        validTo: {
          date: '2022-11-19T00:00:00',
          human: 'Nov 19, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 4,
    type: ProvitionOptionType.Night,
    hasGolf: false
  },
  {
    id: '5',
    category: 'NOCHE',
    name: null,
    nights: [
      {
        name: 'Night 4',
        validTo: {
          date: '2022-11-20T00:00:00',
          human: 'Nov 20, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 5,
    type: ProvitionOptionType.Night,
    hasGolf: false
  },
  {
    id: '6',
    category: 'NOCHE',
    name: null,
    nights: [
      {
        name: 'Night 5',
        validTo: {
          date: '2022-11-20T00:00:00',
          human: 'Nov 20, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 5,
    type: ProvitionOptionType.Night,
    hasGolf: false
  },
  {
    id: '7',
    category: 'NOCHE',
    name: null,
    nights: [
      {
        name: 'Night 6',
        validTo: {
          date: '2022-11-21T00:00:00',
          human: 'Nov 21, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 6,
    type: ProvitionOptionType.Night,
    hasGolf: false
  },
  {
    id: '8',
    category: 'NOCHE',
    name: null,
    nights: [
      {
        name: 'Night 7',
        validTo: {
          date: '2022-11-22T00:00:00',
          human: 'Nov 22, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 7,
    type: ProvitionOptionType.Night,
    hasGolf: false
  },
  {
    id: '9',
    category: 'NOCHE',
    name: null,
    nights: [
      {
        name: 'Night 8',
        validTo: {
          date: '2022-11-22T00:00:00',
          human: 'Nov 22, 2024',
        }
      }
    ],
    validTo: null,
    daysToExpire: 737,
    type: ProvitionOptionType.Night,
    hasGolf: false
  },
  {
    id: '10',
    category: 'PEPA_PIG',
    name: null,
    nights: [
      {
        name: 'Unknown 666',
        validTo: {
          date: '2022-11-22T00:00:00',
          human: 'Nov 22, 2024',
        }
      }
    ],
    validTo: null,
    daysToExpire: 737,
    type: ProvitionOptionType.Unkown,
    hasGolf: false
  },
  {
    id: '11',
    category: 'PEPA_PIG',
    name: null,
    nights: [
      {
        name: 'Unknown 333',
        validTo: {
          date: '2022-11-22T00:00:00',
          human: 'Nov 22, 2024',
        }
      }
    ],
    validTo: null,
    daysToExpire: 737,
    type: ProvitionOptionType.Unkown,
    hasGolf: false
  },
  {
    id: '12',
    category: 'NOCHE',
    name: null,
    nights: [

      {
        name: 'Night 1 Golf',
        validTo: {
          date: '2022-11-18T00:00:00',
          human: 'Nov 18, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 3,
    type: ProvitionOptionType.Night,
    hasGolf: true
  },
  {
    id: '13',
    category: 'NOCHE',
    name: null,
    nights: [
      {
        name: 'Night 2 Golf',
        validTo: {
          date: '2022-11-18T00:00:00',
          human: 'Nov 18, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 3,
    type: ProvitionOptionType.Night,
    hasGolf: true
  },
  {
    id: '14',
    category: 'NOCHE',
    name: null,
    nights: [
      {
        name: 'Night 3 Golf',
        validTo: {
          date: '2022-11-19T00:00:00',
          human: 'Nov 19, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 4,
    type: ProvitionOptionType.Night,
    hasGolf: true
  },
  {
    id: '15',
    category: 'NOCHE',
    name: null,
    nights: [
      {
        name: 'Night 4 Golf',
        validTo: {
          date: '2022-11-20T00:00:00',
          human: 'Nov 20, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 5,
    type: ProvitionOptionType.Night,
    hasGolf: true
  },
  {
    id: '16',
    category: 'NOCHE',
    name: null,
    nights: [
      {
        name: 'Night 5 Golf',
        validTo: {
          date: '2022-11-20T00:00:00',
          human: 'Nov 20, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 5,
    type: ProvitionOptionType.Night,
    hasGolf: true
  },
  {
    id: '17',
    category: 'NOCHE',
    name: null,
    nights: [
      {
        name: 'Night 6 Golf',
        validTo: {
          date: '2022-11-21T00:00:00',
          human: 'Nov 21, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 6,
    type: ProvitionOptionType.Night,
    hasGolf: true
  },
  {
    id: '18',
    category: 'NOCHE',
    name: null,
    nights: [
      {
        name: 'Night 7 Golf',
        validTo: {
          date: '2022-11-22T00:00:00',
          human: 'Nov 22, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 7,
    type: ProvitionOptionType.Night,
    hasGolf: true
  },
]
export const provisionsAniversaryNightsGolfBadPathMock: ProvitionOptionItem[] = [
  {
    id: '2',
    category: 'NOCHE',
    name: null,
    nights: [

      {
        name: 'Night 1',
        validTo: {
          date: '2022-11-18T00:00:00',
          human: 'Nov 18, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 3,
    type: ProvitionOptionType.Night,
    hasGolf: false
  },
  {
    id: '3',
    category: 'NOCHE',
    name: null,
    nights: [
      {
        name: 'Night 2',
        validTo: {
          date: '2022-11-18T00:00:00',
          human: 'Nov 18, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 3,
    type: ProvitionOptionType.Night,
    hasGolf: false
  },
  {
    id: '4',
    category: 'NOCHE',
    name: null,
    nights: [
      {
        name: 'Night 3',
        validTo: {
          date: '2022-11-19T00:00:00',
          human: 'Nov 19, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 4,
    type: ProvitionOptionType.Night,
    hasGolf: false
  },
  {
    id: '5',
    category: 'NOCHE',
    name: null,
    nights: [
      {
        name: 'Night 4',
        validTo: {
          date: '2022-11-20T00:00:00',
          human: 'Nov 20, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 5,
    type: ProvitionOptionType.Night,
    hasGolf: false
  },
  {
    id: '6',
    category: 'NOCHE',
    name: null,
    nights: [
      {
        name: 'Night 5',
        validTo: {
          date: '2022-11-20T00:00:00',
          human: 'Nov 20, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 5,
    type: ProvitionOptionType.Night,
    hasGolf: false
  },
  {
    id: '7',
    category: 'NOCHE',
    name: null,
    nights: [
      {
        name: 'Night 6',
        validTo: {
          date: '2022-11-21T00:00:00',
          human: 'Nov 21, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 6,
    type: ProvitionOptionType.Night,
    hasGolf: false
  },
  {
    id: '8',
    category: 'NOCHE',
    name: null,
    nights: [
      {
        name: 'Night 7',
        validTo: {
          date: '2022-11-22T00:00:00',
          human: 'Nov 22, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 7,
    type: ProvitionOptionType.Night,
    hasGolf: false
  },
  {
    id: '9',
    category: 'NOCHE',
    name: null,
    nights: [
      {
        name: 'Night 8',
        validTo: {
          date: '2022-11-22T00:00:00',
          human: 'Nov 22, 2024',
        }
      }
    ],
    validTo: null,
    daysToExpire: 737,
    type: ProvitionOptionType.Night,
    hasGolf: false
  },
  {
    id: '10',
    category: 'PEPA_PIG',
    name: null,
    nights: [
      {
        name: 'Unknown 666',
        validTo: {
          date: '2022-11-22T00:00:00',
          human: 'Nov 22, 2024',
        }
      }
    ],
    validTo: null,
    daysToExpire: 737,
    type: ProvitionOptionType.Unkown,
    hasGolf: false
  },
  {
    id: '11',
    category: 'PEPA_PIG',
    name: null,
    nights: [
      {
        name: 'Unknown 333',
        validTo: {
          date: '2022-11-22T00:00:00',
          human: 'Nov 22, 2024',
        }
      }
    ],
    validTo: null,
    daysToExpire: 737,
    type: ProvitionOptionType.Unkown,
    hasGolf: false
  },
  {
    id: '12',
    category: 'NOCHE',
    name: null,
    nights: [

      {
        name: 'Night 1 Golf',
        validTo: {
          date: '2022-11-18T00:00:00',
          human: 'Nov 18, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 3,
    type: ProvitionOptionType.Night,
    hasGolf: true
  },
  {
    id: '13',
    category: 'NOCHE',
    name: null,
    nights: [
      {
        name: 'Night 2 Golf',
        validTo: {
          date: '2022-11-18T00:00:00',
          human: 'Nov 18, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 3,
    type: ProvitionOptionType.Night,
    hasGolf: true
  },
  {
    id: '14',
    category: 'NOCHE',
    name: null,
    nights: [
      {
        name: 'Night 3 Golf',
        validTo: {
          date: '2022-11-19T00:00:00',
          human: 'Nov 19, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 4,
    type: ProvitionOptionType.Night,
    hasGolf: true
  },
  {
    id: '15',
    category: 'NOCHE',
    name: null,
    nights: [
      {
        name: 'Night 4 Golf',
        validTo: {
          date: '2022-11-20T00:00:00',
          human: 'Nov 20, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 5,
    type: ProvitionOptionType.Night,
    hasGolf: true
  },
  {
    id: '16',
    category: 'NOCHE',
    name: null,
    nights: [
      {
        name: 'Night 5 Golf',
        validTo: {
          date: '2022-11-20T00:00:00',
          human: 'Nov 20, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 5,
    type: ProvitionOptionType.Night,
    hasGolf: true
  },
  {
    id: '17',
    category: 'NOCHE',
    name: null,
    nights: [
      {
        name: 'Night 6 Golf',
        validTo: {
          date: '2022-11-21T00:00:00',
          human: 'Nov 21, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 6,
    type: ProvitionOptionType.Night,
    hasGolf: true
  },
]

export const provisionsAniversaryNightsGolfHappyPathWeeksGolfHappyPathMock: ProvitionOptionItem[] = [
  {
    id: '0',
    category: 'ANVWKS',
    name: 'Week 0',
    nights: null,
    validTo: {
      date: '2022-11-18T00:00:00',
      human: 'Nov 18, 2022',
    },
    daysToExpire: 3,
    type: ProvitionOptionType.Week,
    hasGolf: false
  },
  {
    id: '1',
    category: 'ANVWKS',
    name: 'Week 0 Golf',
    nights: null,
    validTo: {
      date: '2022-11-18T00:00:00',
      human: 'Nov 18, 2022',
    },
    daysToExpire: 3,
    type: ProvitionOptionType.Week,
    hasGolf: true
  },
  {
    id: '2',
    category: 'NOCHE',
    name: null,
    nights: [

      {
        name: 'Night 1',
        validTo: {
          date: '2022-11-18T00:00:00',
          human: 'Nov 18, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 3,
    type: ProvitionOptionType.Night,
    hasGolf: false
  },
  {
    id: '3',
    category: 'NOCHE',
    name: null,
    nights: [
      {
        name: 'Night 2',
        validTo: {
          date: '2022-11-18T00:00:00',
          human: 'Nov 18, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 3,
    type: ProvitionOptionType.Night,
    hasGolf: false
  },
  {
    id: '4',
    category: 'NOCHE',
    name: null,
    nights: [
      {
        name: 'Night 3',
        validTo: {
          date: '2022-11-19T00:00:00',
          human: 'Nov 19, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 4,
    type: ProvitionOptionType.Night,
    hasGolf: false
  },
  {
    id: '5',
    category: 'NOCHE',
    name: null,
    nights: [
      {
        name: 'Night 4',
        validTo: {
          date: '2022-11-20T00:00:00',
          human: 'Nov 20, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 5,
    type: ProvitionOptionType.Night,
    hasGolf: false
  },
  {
    id: '6',
    category: 'NOCHE',
    name: null,
    nights: [
      {
        name: 'Night 5',
        validTo: {
          date: '2022-11-20T00:00:00',
          human: 'Nov 20, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 5,
    type: ProvitionOptionType.Night,
    hasGolf: false
  },
  {
    id: '7',
    category: 'NOCHE',
    name: null,
    nights: [
      {
        name: 'Night 6',
        validTo: {
          date: '2022-11-21T00:00:00',
          human: 'Nov 21, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 6,
    type: ProvitionOptionType.Night,
    hasGolf: false
  },
  {
    id: '8',
    category: 'NOCHE',
    name: null,
    nights: [
      {
        name: 'Night 7',
        validTo: {
          date: '2022-11-22T00:00:00',
          human: 'Nov 22, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 7,
    type: ProvitionOptionType.Night,
    hasGolf: false
  },
  {
    id: '9',
    category: 'NOCHE',
    name: null,
    nights: [
      {
        name: 'Night 8',
        validTo: {
          date: '2022-11-22T00:00:00',
          human: 'Nov 22, 2024',
        }
      }
    ],
    validTo: null,
    daysToExpire: 737,
    type: ProvitionOptionType.Night,
    hasGolf: false
  },
  {
    id: '10',
    category: 'PEPA_PIG',
    name: null,
    nights: [
      {
        name: 'Unknown 666',
        validTo: {
          date: '2022-11-22T00:00:00',
          human: 'Nov 22, 2024',
        }
      }
    ],
    validTo: null,
    daysToExpire: 737,
    type: ProvitionOptionType.Unkown,
    hasGolf: false
  },
  {
    id: '11',
    category: 'PEPA_PIG',
    name: null,
    nights: [
      {
        name: 'Unknown 333',
        validTo: {
          date: '2022-11-22T00:00:00',
          human: 'Nov 22, 2024',
        }
      }
    ],
    validTo: null,
    daysToExpire: 737,
    type: ProvitionOptionType.Unkown,
    hasGolf: false
  },
  {
    id: '12',
    category: 'NOCHE',
    name: null,
    nights: [

      {
        name: 'Night 1 Golf',
        validTo: {
          date: '2022-11-18T00:00:00',
          human: 'Nov 18, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 3,
    type: ProvitionOptionType.Night,
    hasGolf: true
  },
  {
    id: '13',
    category: 'NOCHE',
    name: null,
    nights: [
      {
        name: 'Night 2 Golf',
        validTo: {
          date: '2022-11-18T00:00:00',
          human: 'Nov 18, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 3,
    type: ProvitionOptionType.Night,
    hasGolf: true
  },
  {
    id: '14',
    category: 'NOCHE',
    name: null,
    nights: [
      {
        name: 'Night 3 Golf',
        validTo: {
          date: '2022-11-19T00:00:00',
          human: 'Nov 19, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 4,
    type: ProvitionOptionType.Night,
    hasGolf: true
  },
  {
    id: '15',
    category: 'NOCHE',
    name: null,
    nights: [
      {
        name: 'Night 4 Golf',
        validTo: {
          date: '2022-11-20T00:00:00',
          human: 'Nov 20, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 5,
    type: ProvitionOptionType.Night,
    hasGolf: true
  },
  {
    id: '16',
    category: 'NOCHE',
    name: null,
    nights: [
      {
        name: 'Night 5 Golf',
        validTo: {
          date: '2022-11-20T00:00:00',
          human: 'Nov 20, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 5,
    type: ProvitionOptionType.Night,
    hasGolf: true
  },
  {
    id: '17',
    category: 'NOCHE',
    name: null,
    nights: [
      {
        name: 'Night 6 Golf',
        validTo: {
          date: '2022-11-21T00:00:00',
          human: 'Nov 21, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 6,
    type: ProvitionOptionType.Night,
    hasGolf: true
  },
  {
    id: '18',
    category: 'NOCHE',
    name: null,
    nights: [
      {
        name: 'Night 7 Golf',
        validTo: {
          date: '2022-11-22T00:00:00',
          human: 'Nov 22, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 7,
    type: ProvitionOptionType.Night,
    hasGolf: true
  },
]
export const provisionsAniversaryNightsGolfBadPathWeeksGolfHappyPathMock: ProvitionOptionItem[] = [
  {
    id: '0',
    category: 'ANVWKS',
    name: 'Week 0',
    nights: null,
    validTo: {
      date: '2022-11-18T00:00:00',
      human: 'Nov 18, 2022',
    },
    daysToExpire: 3,
    type: ProvitionOptionType.Week,
    hasGolf: false
  },
  {
    id: '1',
    category: 'ANVWKS',
    name: 'Week 1 Golf',
    nights: null,
    validTo: {
      date: '2022-11-18T00:00:00',
      human: 'Nov 18, 2022',
    },
    daysToExpire: 3,
    type: ProvitionOptionType.Week,
    hasGolf: true
  },
  {
    id: '2',
    category: 'NOCHE',
    name: null,
    nights: [

      {
        name: 'Night 1',
        validTo: {
          date: '2022-11-18T00:00:00',
          human: 'Nov 18, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 3,
    type: ProvitionOptionType.Night,
    hasGolf: false
  },
  {
    id: '3',
    category: 'NOCHE',
    name: null,
    nights: [
      {
        name: 'Night 2',
        validTo: {
          date: '2022-11-18T00:00:00',
          human: 'Nov 18, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 3,
    type: ProvitionOptionType.Night,
    hasGolf: false
  },
  {
    id: '4',
    category: 'NOCHE',
    name: null,
    nights: [
      {
        name: 'Night 3',
        validTo: {
          date: '2022-11-19T00:00:00',
          human: 'Nov 19, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 4,
    type: ProvitionOptionType.Night,
    hasGolf: false
  },
  {
    id: '5',
    category: 'NOCHE',
    name: null,
    nights: [
      {
        name: 'Night 4',
        validTo: {
          date: '2022-11-20T00:00:00',
          human: 'Nov 20, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 5,
    type: ProvitionOptionType.Night,
    hasGolf: false
  },
  {
    id: '6',
    category: 'NOCHE',
    name: null,
    nights: [
      {
        name: 'Night 5',
        validTo: {
          date: '2022-11-20T00:00:00',
          human: 'Nov 20, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 5,
    type: ProvitionOptionType.Night,
    hasGolf: false
  },
  {
    id: '7',
    category: 'NOCHE',
    name: null,
    nights: [
      {
        name: 'Night 6',
        validTo: {
          date: '2022-11-21T00:00:00',
          human: 'Nov 21, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 6,
    type: ProvitionOptionType.Night,
    hasGolf: false
  },
  {
    id: '8',
    category: 'NOCHE',
    name: null,
    nights: [
      {
        name: 'Night 7',
        validTo: {
          date: '2022-11-22T00:00:00',
          human: 'Nov 22, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 7,
    type: ProvitionOptionType.Night,
    hasGolf: false
  },
  {
    id: '9',
    category: 'NOCHE',
    name: null,
    nights: [
      {
        name: 'Night 8',
        validTo: {
          date: '2022-11-22T00:00:00',
          human: 'Nov 22, 2024',
        }
      }
    ],
    validTo: null,
    daysToExpire: 737,
    type: ProvitionOptionType.Night,
    hasGolf: false
  },
  {
    id: '10',
    category: 'PEPA_PIG',
    name: null,
    nights: [
      {
        name: 'Unknown 666',
        validTo: {
          date: '2022-11-22T00:00:00',
          human: 'Nov 22, 2024',
        }
      }
    ],
    validTo: null,
    daysToExpire: 737,
    type: ProvitionOptionType.Unkown,
    hasGolf: false
  },
  {
    id: '11',
    category: 'PEPA_PIG',
    name: null,
    nights: [
      {
        name: 'Unknown 333',
        validTo: {
          date: '2022-11-22T00:00:00',
          human: 'Nov 22, 2024',
        }
      }
    ],
    validTo: null,
    daysToExpire: 737,
    type: ProvitionOptionType.Unkown,
    hasGolf: false
  },
  {
    id: '12',
    category: 'NOCHE',
    name: null,
    nights: [

      {
        name: 'Night 1 Golf',
        validTo: {
          date: '2022-11-18T00:00:00',
          human: 'Nov 18, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 3,
    type: ProvitionOptionType.Night,
    hasGolf: true
  },
  {
    id: '13',
    category: 'NOCHE',
    name: null,
    nights: [
      {
        name: 'Night 2 Golf',
        validTo: {
          date: '2022-11-18T00:00:00',
          human: 'Nov 18, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 3,
    type: ProvitionOptionType.Night,
    hasGolf: true
  },
  {
    id: '14',
    category: 'NOCHE',
    name: null,
    nights: [
      {
        name: 'Night 3 Golf',
        validTo: {
          date: '2022-11-19T00:00:00',
          human: 'Nov 19, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 4,
    type: ProvitionOptionType.Night,
    hasGolf: true
  },
  {
    id: '15',
    category: 'NOCHE',
    name: null,
    nights: [
      {
        name: 'Night 4 Golf',
        validTo: {
          date: '2022-11-20T00:00:00',
          human: 'Nov 20, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 5,
    type: ProvitionOptionType.Night,
    hasGolf: true
  },
  {
    id: '16',
    category: 'NOCHE',
    name: null,
    nights: [
      {
        name: 'Night 5 Golf',
        validTo: {
          date: '2022-11-20T00:00:00',
          human: 'Nov 20, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 5,
    type: ProvitionOptionType.Night,
    hasGolf: true
  },
  {
    id: '17',
    category: 'NOCHE',
    name: null,
    nights: [
      {
        name: 'Night 6 Golf',
        validTo: {
          date: '2022-11-21T00:00:00',
          human: 'Nov 21, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 6,
    type: ProvitionOptionType.Night,
    hasGolf: true
  },
]
export const provisionsAniversaryNightsGolfBadPathWeeksGolfBadPathMock: ProvitionOptionItem[] = [
  {
    id: '0',
    category: 'ANVWKS',
    name: 'Week 0',
    nights: null,
    validTo: {
      date: '2022-11-18T00:00:00',
      human: 'Nov 18, 2022',
    },
    daysToExpire: 3,
    type: ProvitionOptionType.Week,
    hasGolf: false
  },
  {
    id: '2',
    category: 'NOCHE',
    name: null,
    nights: [

      {
        name: 'Night 1',
        validTo: {
          date: '2022-11-18T00:00:00',
          human: 'Nov 18, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 3,
    type: ProvitionOptionType.Night,
    hasGolf: false
  },
  {
    id: '3',
    category: 'NOCHE',
    name: null,
    nights: [
      {
        name: 'Night 2',
        validTo: {
          date: '2022-11-18T00:00:00',
          human: 'Nov 18, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 3,
    type: ProvitionOptionType.Night,
    hasGolf: false
  },
  {
    id: '4',
    category: 'NOCHE',
    name: null,
    nights: [
      {
        name: 'Night 3',
        validTo: {
          date: '2022-11-19T00:00:00',
          human: 'Nov 19, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 4,
    type: ProvitionOptionType.Night,
    hasGolf: false
  },
  {
    id: '5',
    category: 'NOCHE',
    name: null,
    nights: [
      {
        name: 'Night 4',
        validTo: {
          date: '2022-11-20T00:00:00',
          human: 'Nov 20, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 5,
    type: ProvitionOptionType.Night,
    hasGolf: false
  },
  {
    id: '6',
    category: 'NOCHE',
    name: null,
    nights: [
      {
        name: 'Night 5',
        validTo: {
          date: '2022-11-20T00:00:00',
          human: 'Nov 20, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 5,
    type: ProvitionOptionType.Night,
    hasGolf: false
  },
  {
    id: '7',
    category: 'NOCHE',
    name: null,
    nights: [
      {
        name: 'Night 6',
        validTo: {
          date: '2022-11-21T00:00:00',
          human: 'Nov 21, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 6,
    type: ProvitionOptionType.Night,
    hasGolf: false
  },
  {
    id: '8',
    category: 'NOCHE',
    name: null,
    nights: [
      {
        name: 'Night 7',
        validTo: {
          date: '2022-11-22T00:00:00',
          human: 'Nov 22, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 7,
    type: ProvitionOptionType.Night,
    hasGolf: false
  },
  {
    id: '9',
    category: 'NOCHE',
    name: null,
    nights: [
      {
        name: 'Night 8',
        validTo: {
          date: '2022-11-22T00:00:00',
          human: 'Nov 22, 2024',
        }
      }
    ],
    validTo: null,
    daysToExpire: 737,
    type: ProvitionOptionType.Night,
    hasGolf: false
  },
  {
    id: '10',
    category: 'PEPA_PIG',
    name: null,
    nights: [
      {
        name: 'Unknown 666',
        validTo: {
          date: '2022-11-22T00:00:00',
          human: 'Nov 22, 2024',
        }
      }
    ],
    validTo: null,
    daysToExpire: 737,
    type: ProvitionOptionType.Unkown,
    hasGolf: false
  },
  {
    id: '11',
    category: 'PEPA_PIG',
    name: null,
    nights: [
      {
        name: 'Unknown 333',
        validTo: {
          date: '2022-11-22T00:00:00',
          human: 'Nov 22, 2024',
        }
      }
    ],
    validTo: null,
    daysToExpire: 737,
    type: ProvitionOptionType.Unkown,
    hasGolf: false
  },
  {
    id: '14',
    category: 'NOCHE',
    name: null,
    nights: [
      {
        name: 'Night 3 Golf',
        validTo: {
          date: '2022-11-19T00:00:00',
          human: 'Nov 19, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 4,
    type: ProvitionOptionType.Night,
    hasGolf: true
  },
  {
    id: '15',
    category: 'NOCHE',
    name: null,
    nights: [
      {
        name: 'Night 4 Golf',
        validTo: {
          date: '2022-11-20T00:00:00',
          human: 'Nov 20, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 5,
    type: ProvitionOptionType.Night,
    hasGolf: true
  },
  {
    id: '16',
    category: 'NOCHE',
    name: null,
    nights: [
      {
        name: 'Night 5 Golf',
        validTo: {
          date: '2022-11-20T00:00:00',
          human: 'Nov 20, 2022',
        }
      }
    ],
    validTo: null,
    daysToExpire: 5,
    type: ProvitionOptionType.Night,
    hasGolf: true
  },
]
