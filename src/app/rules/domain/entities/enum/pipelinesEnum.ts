export const enum PipelinesEnum {
  STAY_MINIMAL = 'stayMinimal',
  STAY_MAXIMAL = 'stayMaximal',
  SEMANA52 = 'semana52',
  REFERRAL_MIN_PAX = 'referralMinPax',
  WHOLESALER_RESERVATIONS_RESTRICTED = 'wholesaler_reservations_restricted',
  IMPERIAL_POLICY = 'imperialPolicy',
  CANCELATIONS = 'cancelations',
  BAGLIONI_PAXES = 'baglioni_paxes',
  incentivePolicies = "incentivePolicies"
}

export const enum EnumReservationCategory {
  ADVA = 1,
  PREFERENCIAL = 'PREFERENCIAL',
  IMP_NIGHT = 3,
  IMP_WEEKS = 'IMP_WEEKS',
  REFERIDOS = 'REFERIDOS',
  BONO = 'BONO',
  INCENTIVA = 'INCENTIVA',
  REWARDS = 8,
  ANIVERSARIO = 'ANIVERSARIO',
  MOVE_IN = 10
}

export const enum EnumRoomCategoryLegacy {
  PRESIDENTIAL = 1,
  FAMILY = 2, // Standar
  JACUZZI = 3, // Standar
  VILLA = 4,
  GOVERNOR = 5, // Standar
  OTHER = 6, // Especial
  RESIDENCE = 7
}

export const enum EnumRoomCategory {
  ESTANDARD = 1,
  ESPECIAL = 2,
  PRESIDENTIAL = 3,
  RESIDENCE = 4,
  VILLA = 5
}

export const enum EnumReservationIds {
  ADVA = 1,
  PREFERENTIAL = 2,
  IMP_NIGHT = 3,
  IMP_WEEKS = 4,
  REFERRAL = 5,
  BONO = 6,
  INCENTIVE = 7,
  REWARDS = 8,
  ANIVERSARY = 9,
  MOVE_IN = 10
}

export enum RefundableOptions {
  NO_REFUNDABLE,
  REFUNDABLE,
}

export const enum FamiliarHotelCodes {
  MPS = 'MPS', // Moon Palace Sunrise
  MPC = 'MPC', // Moon Palace Nizuc
  MPG = 'MPG', //  Moon Palace The Grand Cancun
  ZCJG = 'ZCJG', // Moon Palace Jamaica
  BP = 'BP', // Beach Palace
  PL = 'PL', // Playacar Palace
  CZ = 'CZ' // Cozumel Palace
}

export const enum AdultHotelCodes {
  LBC = 'LBC', // Le Blanc Spa Resort Cancun
  ZPLB = 'ZPLB', // Le Blanc Spa Resort Los Cabos
  SP = 'SP' // Sun Palace
}
