import {BaglioniHotelsEnum} from '../../entities/enum/baglioniEnum'
import {EnumReservationCategory} from '../../entities/enum/pipelinesEnum'

export const facts = [
  {
    reservationType: EnumReservationCategory.PREFERENCIAL,
    hotel: BaglioniHotelsEnum.LUVE,
    adults: 2,
    children: 2,
    childrenAges: ['16', '3']
  },
  {
    reservationType: EnumReservationCategory.PREFERENCIAL,
    hotel: 'MPS',
    adults: 2,
    children: 2,
    childrenAges: ['16', '3']
  },
  {
    reservationType: EnumReservationCategory.PREFERENCIAL,
    hotel: 'BP',
    adults: 2,
    children: 1,
    childrenAges: ['10', '5']
  },
  {
    reservationType: EnumReservationCategory.PREFERENCIAL,
    hotel: BaglioniHotelsEnum.BAMA,
    adults: 2,
    children: 2,
    childrenAges: [3, 2]
  },
  {
    reservationType: EnumReservationCategory.PREFERENCIAL,
    hotel: BaglioniHotelsEnum.BAPU,
    adults: 2,
    children: 2,
    childrenAges: [4, 2]
  },
  {
    reservationType: EnumReservationCategory.PREFERENCIAL,
    hotel: BaglioniHotelsEnum.BAPU,
    adults: 2,
    children: 2,
    childrenAges: [14, 17]
  }
]
