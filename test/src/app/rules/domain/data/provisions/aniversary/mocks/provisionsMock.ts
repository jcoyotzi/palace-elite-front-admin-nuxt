/*
 * Copyright (c) 2022.
 * Author: Diego Ceron
 * Company: Palace Resorts
 * Created:  2022 / 11 / 15 4:11:25
 *
 */

import { ProvitionOptionItem, ProvitionOptionType } from "~/src/ui/components/Booking/PEProvisionOption/PEProvisionOptionTypes";

// Order First Nights, Second NightsGolf, Third Weeks, Fourth WeeksGolf

export const _7Nigths_1Week: ProvitionOptionItem[] = [
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
]

export const _6Nigths_1Week_1WeekGolf: ProvitionOptionItem[] = [
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
        name: 'Week 0 GOLF',
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
]

export const _6Nigths: ProvitionOptionItem[] = [
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
]

export const _1WeekGolf: ProvitionOptionItem[] = [
    {
        id: '0',
        category: 'ANVWKS',
        name: 'Week 0 GOLF',
        nights: null,
        validTo: {
            date: '2022-11-18T00:00:00',
            human: 'Nov 18, 2022',
        },
        daysToExpire: 3,
        type: ProvitionOptionType.Week,
        hasGolf: true
    },
]

export const _1Week_1WeekGolf: ProvitionOptionItem[] = [
    {
        id: '0',
        category: 'ANVWKS',
        name: 'Week 0 GOLF',
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
        id: '1',
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
]

export const _2Weeks_2WeeksGolf: ProvitionOptionItem[] = [
    {
        id: '0',
        category: 'ANVWKS',
        name: 'Week 0 GOLF',
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
        id: '1',
        category: 'ANVWKS',
        name: 'Week 1 GOLF',
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
        id: '3',
        category: 'ANVWKS',
        name: 'Week 0',
        nights: null,
        validTo: {
            date: '2022-11-20T00:00:00',
            human: 'Nov 20, 2022',
        },
        daysToExpire: 5,
        type: ProvitionOptionType.Week,
        hasGolf: false
    },
    {
        id: '4',
        category: 'ANVWKS',
        name: 'Week ',
        nights: null,
        validTo: {
            date: '2022-21-18T00:00:00',
            human: 'Nov 21, 2022',
        },
        daysToExpire: 6,
        type: ProvitionOptionType.Week,
        hasGolf: false
    },
]

export const _7Nights_6NightsGolf_1Week: ProvitionOptionItem[] = [
    // #region 7 Nights
    {
        id: '1',
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
        id: '2',
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
        id: '3',
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
        id: '4',
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
        id: '5',
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
        id: '6',
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
        id: '7',
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
    // #endregion
    // #region 6 Nigths Golf
    {
        id: '8',
        category: 'NOCHE',
        name: null,
        nights: [

            {
                name: 'Night 1 GOLF',
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
        id: '9',
        category: 'NOCHE',
        name: null,
        nights: [
            {
                name: 'Night 2 GOLF',
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
        id: '10',
        category: 'NOCHE',
        name: null,
        nights: [
            {
                name: 'Night 3 GOLF',
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
        id: '11',
        category: 'NOCHE',
        name: null,
        nights: [
            {
                name: 'Night 4 GOLF',
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
        id: '12',
        category: 'NOCHE',
        name: null,
        nights: [
            {
                name: 'Night 5 GOLF',
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
        id: '13',
        category: 'NOCHE',
        name: null,
        nights: [
            {
                name: 'Night 5 GOLF',
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
        id: '14',
        category: 'NOCHE',
        name: null,
        nights: [
            {
                name: 'Night 6 GOLF',
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
    // #endregion
    // #region 1 Week
    {
        id: '16',
        category: 'ANVWKS',
        name: 'Week 1',
        nights: null,
        validTo: {
            date: '2022-11-18T00:00:00',
            human: 'Nov 18, 2022',
        },
        daysToExpire: 3,
        type: ProvitionOptionType.Week,
        hasGolf: false
    },
    // #endregion
]

export const _7Nights_6NightsGolf_1Week_1WeekGolf: ProvitionOptionItem[] = [
    // #region 7 Nights
    {
        id: '0',
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
        id: '1',
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
        id: '2',
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
        id: '3',
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
        id: '4',
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
        id: '5',
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
        id: '6',
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
        id: '7',
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
    // #endregion
    // #region 6 Nigths Golf
    {
        id: '8',
        category: 'NOCHE',
        name: null,
        nights: [

            {
                name: 'Night 1 GOLF',
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
        id: '9',
        category: 'NOCHE',
        name: null,
        nights: [
            {
                name: 'Night 2 GOLF',
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
        id: '10',
        category: 'NOCHE',
        name: null,
        nights: [
            {
                name: 'Night 3 GOLF',
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
        id: '11',
        category: 'NOCHE',
        name: null,
        nights: [
            {
                name: 'Night 4 GOLF',
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
        id: '12',
        category: 'NOCHE',
        name: null,
        nights: [
            {
                name: 'Night 5 GOLF',
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
        id: '14',
        category: 'NOCHE',
        name: null,
        nights: [
            {
                name: 'Night 6 GOLF',
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
    // #endregion
    // #region 1 Week
    {
        id: '15',
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
    // #endregion
    // #region 1 Week Golf
    {
        id: '16',
        category: 'ANVWKS',
        name: 'Week 0 GOLF',
        nights: null,
        validTo: {
            date: '2022-11-19T00:00:00',
            human: 'Nov 19, 2022',
        },
        daysToExpire: 3,
        type: ProvitionOptionType.Week,
        hasGolf: true
    },

]

export const _7Nights_7NightsGolf_1Week_1WeekGolf: ProvitionOptionItem[] = [
    // #region 7 Nights
    {
        id: '0',
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
        id: '1',
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
        id: '2',
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
        id: '3',
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
        id: '4',
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
        id: '5',
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
        id: '6',
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
        id: '7',
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
    // #endregion
    // #region 7 Nigths Golf
    {
        id: '8',
        category: 'NOCHE',
        name: null,
        nights: [

            {
                name: 'Night 1 GOLF',
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
        id: '9',
        category: 'NOCHE',
        name: null,
        nights: [
            {
                name: 'Night 2 GOLF',
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
        id: '10',
        category: 'NOCHE',
        name: null,
        nights: [
            {
                name: 'Night 3 GOLF',
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
        id: '11',
        category: 'NOCHE',
        name: null,
        nights: [
            {
                name: 'Night 4 GOLF',
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
        id: '12',
        category: 'NOCHE',
        name: null,
        nights: [
            {
                name: 'Night 5 GOLF',
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
        id: '13',
        category: 'NOCHE',
        name: null,
        nights: [
            {
                name: 'Night 6 GOLF',
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
        id: '14',
        category: 'NOCHE',
        name: null,
        nights: [
            {
                name: 'Night 7 GOLF',
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
    // #endregion
    // #region 1 Week
    {
        id: '15',
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
    // #endregion
    // #region 1 Week Golf
    {
        id: '16',
        category: 'ANVWKS',
        name: 'Week 0',
        nights: null,
        validTo: {
            date: '2022-11-18T00:00:00',
            human: 'Nov 18, 2022',
        },
        daysToExpire: 3,
        type: ProvitionOptionType.Week,
        hasGolf: true
    },
    // #endregion
]

export const _9Nights_9NightsGolf_2Weeks_2WeeksGolf: ProvitionOptionItem[] = [
    // #region 9 Nigths
    {
        id: '0',
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
        id: '1',
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
        id: '2',
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
        id: '3',
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
        id: '4',
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
        id: '6',
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
        id: '7',
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
        id: '8',
        category: 'NOCHE',
        name: null,
        nights: [
            {
                name: 'Night 8',
                validTo: {
                    date: '2022-11-23T00:00:00',
                    human: 'Nov 23, 2022',
                }
            }
        ],
        validTo: null,
        daysToExpire: 8,
        type: ProvitionOptionType.Night,
        hasGolf: false
    },
    {
        id: '9',
        category: 'NOCHE',
        name: null,
        nights: [
            {
                name: 'Night 9',
                validTo: {
                    date: '2022-11-24T00:00:00',
                    human: 'Nov 24, 2022',
                }
            }
        ],
        validTo: null,
        daysToExpire: 8,
        type: ProvitionOptionType.Night,
        hasGolf: false
    },
    // #endregion 9 Nigths
    // #region 9 Nigths Golf
    {
        id: '10',
        category: 'NOCHE',
        name: null,
        nights: [

            {
                name: 'Night 1 GOLF',
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
        id: '11',
        category: 'NOCHE',
        name: null,
        nights: [
            {
                name: 'Night 2 GOLF',
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
        id: '12',
        category: 'NOCHE',
        name: null,
        nights: [
            {
                name: 'Night 3 GOLF',
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
        id: '13',
        category: 'NOCHE',
        name: null,
        nights: [
            {
                name: 'Night 4 GOLF',
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
        id: '14',
        category: 'NOCHE',
        name: null,
        nights: [
            {
                name: 'Night 5 GOLF',
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
        id: '15',
        category: 'NOCHE',
        name: null,
        nights: [
            {
                name: 'Night 6 GOLF',
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
        id: '16',
        category: 'NOCHE',
        name: null,
        nights: [
            {
                name: 'Night 7 GOLF',
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
    {
        id: '17',
        category: 'NOCHE',
        name: null,
        nights: [
            {
                name: 'Night 8 GOLF',
                validTo: {
                    date: '2022-11-23T00:00:00',
                    human: 'Nov 23, 2022',
                }
            }
        ],
        validTo: null,
        daysToExpire: 8,
        type: ProvitionOptionType.Night,
        hasGolf: true
    },
    {
        id: '18',
        category: 'NOCHE',
        name: null,
        nights: [
            {
                name: 'Night 9 GOLF',
                validTo: {
                    date: '2022-11-24T00:00:00',
                    human: 'Nov 24, 2022',
                }
            }
        ],
        validTo: null,
        daysToExpire: 9,
        type: ProvitionOptionType.Night,
        hasGolf: true
    },
    // #endregion 9 Nigths Golf
    // #region 2 Weeks
    {
        id: '19',
        category: 'ANVWKS',
        name: 'Week 0',
        nights: null,
        validTo: {
            date: '2022-11-20T00:00:00',
            human: 'Nov 20, 2022',
        },
        daysToExpire: 5,
        type: ProvitionOptionType.Week,
        hasGolf: false
    },
    {
        id: '20',
        category: 'ANVWKS',
        name: 'Week ',
        nights: null,
        validTo: {
            date: '2022-21-18T00:00:00',
            human: 'Nov 21, 2022',
        },
        daysToExpire: 6,
        type: ProvitionOptionType.Week,
        hasGolf: false
    },
    // #endregion 2 Weeks
    // #region 2 Weeks Golf
    {
        id: '21',
        category: 'ANVWKS',
        name: 'Week 0 GOLF',
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
        id: '22',
        category: 'ANVWKS',
        name: 'Week 1 GOLF',
        nights: null,
        validTo: {
            date: '2022-11-19T00:00:00',
            human: 'Nov 19, 2022',
        },
        daysToExpire: 4,
        type: ProvitionOptionType.Week,
        hasGolf: true
    },
    // #endregion 2 Weeks Golf
]

export const _15Nights_15NightsGolf_2Weeks_2WeeksGolf: ProvitionOptionItem[] = [
    // #region 15 Nigths
    {
        id: '1',
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
        id: '2',
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
        id: '3',
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
        id: '4',
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
        id: '5',
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
        id: '6',
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
        id: '7',
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
        id: '8',
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
        id: '9',
        category: 'NOCHE',
        name: null,
        nights: [
            {
                name: 'Night 9',
                validTo: {
                    date: '2022-11-23T00:00:00',
                    human: 'Nov 23, 2022',
                }
            }
        ],
        validTo: null,
        daysToExpire: 8,
        type: ProvitionOptionType.Night,
        hasGolf: false
    },
    {
        id: '10',
        category: 'NOCHE',
        name: null,
        nights: [
            {
                name: 'Night 10',
                validTo: {
                    date: '2022-11-24T00:00:00',
                    human: 'Nov 24, 2022',
                }
            }
        ],
        validTo: null,
        daysToExpire: 8,
        type: ProvitionOptionType.Night,
        hasGolf: false
    },
    {
        id: '11',
        category: 'NOCHE',
        name: null,
        nights: [
            {
                name: 'Night 11',
                validTo: {
                    date: '2022-11-25T00:00:00',
                    human: 'Nov 25, 2022',
                }
            }
        ],
        validTo: null,
        daysToExpire: 9,
        type: ProvitionOptionType.Night,
        hasGolf: false
    },
    {
        id: '12',
        category: 'NOCHE',
        name: null,
        nights: [
            {
                name: 'Night 12',
                validTo: {
                    date: '2022-11-26T00:00:00',
                    human: 'Nov 26, 2022',
                }
            }
        ],
        validTo: null,
        daysToExpire: 10,
        type: ProvitionOptionType.Night,
        hasGolf: false
    },
    {
        id: '13',
        category: 'NOCHE',
        name: null,
        nights: [
            {
                name: 'Night 13',
                validTo: {
                    date: '2022-11-27T00:00:00',
                    human: 'Nov 27, 2022',
                }
            }
        ],
        validTo: null,
        daysToExpire: 11,
        type: ProvitionOptionType.Night,
        hasGolf: false
    },
    {
        id: '14',
        category: 'NOCHE',
        name: null,
        nights: [
            {
                name: 'Night 14',
                validTo: {
                    date: '2022-11-28T00:00:00',
                    human: 'Nov 28, 2022',
                }
            }
        ],
        validTo: null,
        daysToExpire: 12,
        type: ProvitionOptionType.Night,
        hasGolf: false
    },
    {
        id: '15',
        category: 'NOCHE',
        name: null,
        nights: [
            {
                name: 'Night 15',
                validTo: {
                    date: '2022-11-29T00:00:00',
                    human: 'Nov 29, 2022',
                }
            }
        ],
        validTo: null,
        daysToExpire: 13,
        type: ProvitionOptionType.Night,
        hasGolf: false
    },
    // #endregion 15 Nigths
    // #region 15 Nigths Golf
    {
        id: '16',
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
        id: '17',
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
        id: '18',
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
        id: '19',
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
        id: '20',
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
        id: '21',
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
        id: '22',
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
    {
        id: '23',
        category: 'NOCHE',
        name: null,
        nights: [
            {
                name: 'Night 8 Golf',
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
    {
        id: '24',
        category: 'NOCHE',
        name: null,
        nights: [
            {
                name: 'Night 9 Golf',
                validTo: {
                    date: '2022-11-23T00:00:00',
                    human: 'Nov 23, 2022',
                }
            }
        ],
        validTo: null,
        daysToExpire: 8,
        type: ProvitionOptionType.Night,
        hasGolf: true
    },
    {
        id: '25',
        category: 'NOCHE',
        name: null,
        nights: [
            {
                name: 'Night 10 Golf',
                validTo: {
                    date: '2022-11-24T00:00:00',
                    human: 'Nov 24, 2022',
                }
            }
        ],
        validTo: null,
        daysToExpire: 8,
        type: ProvitionOptionType.Night,
        hasGolf: true
    },
    {
        id: '26',
        category: 'NOCHE',
        name: null,
        nights: [
            {
                name: 'Night 11 Golf',
                validTo: {
                    date: '2022-11-25T00:00:00',
                    human: 'Nov 25, 2022',
                }
            }
        ],
        validTo: null,
        daysToExpire: 9,
        type: ProvitionOptionType.Night,
        hasGolf: true
    },
    {
        id: '27',
        category: 'NOCHE',
        name: null,
        nights: [
            {
                name: 'Night 12 Golf',
                validTo: {
                    date: '2022-11-26T00:00:00',
                    human: 'Nov 26, 2022',
                }
            }
        ],
        validTo: null,
        daysToExpire: 10,
        type: ProvitionOptionType.Night,
        hasGolf: true
    },
    {
        id: '28',
        category: 'NOCHE',
        name: null,
        nights: [
            {
                name: 'Night 13 Golf',
                validTo: {
                    date: '2022-11-27T00:00:00',
                    human: 'Nov 27, 2022',
                }
            }
        ],
        validTo: null,
        daysToExpire: 11,
        type: ProvitionOptionType.Night,
        hasGolf: true
    },
    {
        id: '29',
        category: 'NOCHE',
        name: null,
        nights: [
            {
                name: 'Night 14 Golf',
                validTo: {
                    date: '2022-11-28T00:00:00',
                    human: 'Nov 28, 2022',
                }
            }
        ],
        validTo: null,
        daysToExpire: 12,
        type: ProvitionOptionType.Night,
        hasGolf: true
    },
    {
        id: '30',
        category: 'NOCHE',
        name: null,
        nights: [
            {
                name: 'Night 15 Golf',
                validTo: {
                    date: '2022-11-29T00:00:00',
                    human: 'Nov 29, 2022',
                }
            }
        ],
        validTo: null,
        daysToExpire: 13,
        type: ProvitionOptionType.Night,
        hasGolf: true
    },
    // #endregion 15 Nigths Golf
    // #region 2 Weeks
    {
        id: '31',
        category: 'ANVWKS',
        name: 'Week 0',
        nights: null,
        validTo: {
            date: '2022-11-20T00:00:00',
            human: 'Nov 20, 2022',
        },
        daysToExpire: 5,
        type: ProvitionOptionType.Week,
        hasGolf: false
    },
    {
        id: '32',
        category: 'ANVWKS',
        name: 'Week ',
        nights: null,
        validTo: {
            date: '2022-21-18T00:00:00',
            human: 'Nov 21, 2022',
        },
        daysToExpire: 6,
        type: ProvitionOptionType.Week,
        hasGolf: false
    },
    // #endregion 2 Weeks
    // #region 2 Weeks Golf
    {
        id: '33',
        category: 'ANVWKS',
        name: 'Week 0 GOLF',
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
        id: '34',
        category: 'ANVWKS',
        name: 'Week 1 GOLF',
        nights: null,
        validTo: {
            date: '2022-11-19T00:00:00',
            human: 'Nov 19, 2022',
        },
        daysToExpire: 4,
        type: ProvitionOptionType.Week,
        hasGolf: true
    },
    // #endregion 2 Weeks Golf
]