export const especialSuites = [
  'CNG',
  'GS',
  'SUPF1',
  'SUPF2',
  'CNG-HNY',
  'MEZ',
  'RGOB',
  'RJRS',
  'WL',
  'WO',
  'ASKK',
  'SWIM',
  'SAND',
  'JRS',
  'No Existe todavia',
  'PBV', // Baglioni start
  'PWV',
  'WVS',
  '2PSBV',
  'FBV',
  'PGBV',
  'PSBV',
  'PRE'
]

export const estandarSuites = [
  'SUP',
  'SUP-OV ',
  'JOF',
  'JRS',
  'PO',
  'RDLX',
  'RHNY',
  'SUP-OF',
  'GRS',
  'HNY',
  'JGS',
  'OS',
  'SUP-OV',
  'ON',
  'RS',
  'RV',
  'OV',
  'BV', // Baglioni start
  'WV'
]

export const presidentialSuites = [
  'PS1',
  'PS2',
  'RPRE',
  'A1',
  'A2D',
  'GP1',
  'GP2',
  'GP2K',
  'S1',
  'S2',
  'PG1',
  'PG2',
  'N1',
  'N2',
  'D1K',
  'D2K'
]

export const residenceSuites = ['R1', 'R2', 'R3', 'R4', 'RES', 'D2D']

export const villaSuites = ['VT1', 'VT2', 'VT3', 'GV1', 'GV2', 'GV3', 'GV4']

export const hotelRooms = {
  BP: {
    specialSuites: ['CNG', 'GS', 'SUPF1', 'SUPF2'],
    standardSuites: ['SUP', 'SUP-OV'],
    presidentialSuites: [...presidentialSuites],
    residenceSuites: [...residenceSuites],
    villaSuites: [...villaSuites]
  },
  CZ: {
    specialSuites: ['CNG-HNY', 'MEZ'],
    standardSuites: ['JRS', 'JOF'],
    presidentialSuites: [...presidentialSuites],
    residenceSuites: [...residenceSuites],
    villaSuites: [...villaSuites]
  },
  LBC: {
    specialSuites: ['WL', 'WO', 'RJRS', 'RGOB'],
    standardSuites: ['RDLX', 'PO', 'OV', 'RHNY'],
    presidentialSuites: [...presidentialSuites],
    residenceSuites: [...residenceSuites],
    villaSuites: [...villaSuites]
  },
  MPC: {
    specialSuites: ['CNG', 'ASKK', 'SUPF1', 'SUPF2'],
    standardSuites: ['SUP', 'SUP-OV', 'SUP-OF'],
    presidentialSuites: [...presidentialSuites],
    residenceSuites: [...residenceSuites],
    villaSuites: [...villaSuites]
  },
  MPG: {
    specialSuites: ['SWIM', 'GS', 'SUPF1', 'SUPF2'],
    standardSuites: ['GRS', 'HNY'],
    presidentialSuites: [...presidentialSuites],
    residenceSuites: [...residenceSuites],
    villaSuites: [...villaSuites]
  },
  MPS: {
    specialSuites: ['CNG', 'SWIM', 'ASKK', 'SUPF1', 'SUPF2'],
    standardSuites: ['JGS', 'SUP', 'SUP-OV'],
    presidentialSuites: [...presidentialSuites],
    residenceSuites: [...residenceSuites],
    villaSuites: [...villaSuites]
  },
  PL: {
    specialSuites: ['CNG', 'SAND', 'GS'],
    standardSuites: ['PL', 'SUP-OV'],
    presidentialSuites: [...presidentialSuites],
    residenceSuites: [...residenceSuites],
    villaSuites: [...villaSuites]
  },
  SP: {
    specialSuites: ['JRS', 'CNG', 'GS'],
    standardSuites: ['OS', 'SUP-OV'],
    presidentialSuites: [...presidentialSuites],
    residenceSuites: [...residenceSuites],
    villaSuites: [...villaSuites]
  },
  ZCJG: {
    specialSuites: ['CNG', 'WL', 'JRS', 'GS', 'SUPF1', 'SUPF2'],
    standardSuites: ['RV', 'ON', 'RS', 'SUP-OV'],
    presidentialSuites: [...presidentialSuites],
    residenceSuites: [...residenceSuites],
    villaSuites: [...villaSuites]
  },
  PLZCVPC: {
    specialSuites: ['VCP'],
    standardSuites: [],
    presidentialSuites: [],
    residenceSuites: [],
    villaSuites: []
  },
  ZPLB: {
    specialSuites: ['WL', 'WO', 'RJRS', 'RGOB'],
    standardSuites: ['RDLX', 'PO', 'OV', 'RHNY', 'RGOB'],
    presidentialSuites: [...presidentialSuites],
    residenceSuites: [...residenceSuites],
    villaSuites: [...villaSuites]
  },
  BALO: {
    standardSuites: ['A1K', 'E1K', 'JSUC', 'JSDK', 'JSEP', 'SUDK', 'JSUCF'],
    specialSuites: ['SUE', 'DEV', 'CHELS', 'SUDF'],
    presidentialSuites: ['PRE', 'KENS', 'HYDE', 'GSR'],
    residenceSuites: [],
    villaSuites: []
  },
  LUVE: {
    standardSuites: ['B1D', 'A1D', 'B1DV', 'JSU', 'SUI'],
    specialSuites: ['JSUF', 'JSUL', 'GOLD', 'SUL', 'TIZ', 'GIOR'],
    presidentialSuites: ['SANS', 'SANS2', 'STG', 'STG2'],
    residenceSuites: [],
    villaSuites: []
  },
  RERO: {
    standardSuites: ['A1D', 'B1D', 'C1S', 'GA1D', 'JSU'],
    specialSuites: ['SUI', 'GA1F', 'SUF', 'DOL', 'SUF3', 'REG', 'LUD', 'MAR'],
    presidentialSuites: ['REG2', 'LUD2', 'RPS3'],
    residenceSuites: [],
    villaSuites: []
  },
  BASA: {
    standardSuites: ['B1D', 'GA1D', 'JSU', 'P1DV', 'JSUV'],
    specialSuites: ['SUF', 'PSUV', 'SUV', 'FAM', 'SANP', 'MAD', 'TAV'],
    presidentialSuites: [],
    residenceSuites: [],
    villaSuites: []
  },
  CABA: {
    standardSuites: ['B1D', 'A1D', 'A1B', 'JSUT'],
    specialSuites: ['SUI', 'TER', 'LEO', 'MIL', 'SUF'],
    presidentialSuites: ['MONTE', 'BRERA'],
    residenceSuites: [],
    villaSuites: []
  },
  SAFI: {
    standardSuites: ['A1K', 'GA1D', 'JSU', 'JSUT'],
    specialSuites: ['SUI', 'JSUF'],
    presidentialSuites: ['PRE', 'GSR', 'SCRS'],
    residenceSuites: [],
    villaSuites: []
  },
  BAPU: {
    standardSuites: ['A1D', 'A1DV', 'JSU', 'DUP', 'JSUV', 'FAM'],
    specialSuites: ['SUI', 'SUE'],
    presidentialSuites: ['SUV', 'OTR', 'SAL'],
    residenceSuites: [],
    villaSuites: []
  },
  BAMA: {
    standardSuites: ['BV', 'WV', 'WVS'],
    specialSuites: ['PWV', 'PBV', 'PGBV', 'PSBV', 'FBV'],
    presidentialSuites: ['2PSBV', 'PRE'],
    residenceSuites: [],
    villaSuites: []
  }
}

export enum PresidentialCategoryCodes {
  PresidentialSuite1 = 'PS1',
  PresidentialSuite2 = 'PS2',
  DiamondSuiteKing1 = 'D1K',
  DiamondSuiteKing2 = 'D2K',
  DiamondSuiteDouble = 'D2D',
  TwoBedroomGrandPresidentialSuite1 = 'GP1',
  TwoBedroomGrandPresidentialSuite2 = 'GP2',
}
export const baglioniHotelsWithBono = {
  BALO: ['A1K'],
  LUVE: ['B1DV'],
  RERO: ['B1D'],
  BAMA: ['BV'],
  BAPU: ['A1D'],
  BASA: ['B1D'],
  CABA: ['A1D'],
  SAFI: ['A1K']
}

export interface EvaluateHotelRoom {
  hotelCode: string
  roomCode: string
}

export enum BaglioniSpecialSuitesCodesEnum {
  GRAND_BAGLIONI_MALDIVES_VILLA = 'PRE',
}
