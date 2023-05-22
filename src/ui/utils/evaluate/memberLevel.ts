interface EvaluateMemberLevel {
  memberLevel: string | MemberLevelCode
}


export enum MemberLevel {
  DIAMOND = 'DIAMOND',
  VIP = 'VIP',
  REGULAR = 'REGULAR'
}

export enum MemberLevelCode {
  babyResidence = 'BR',
  babyVilla = 'BV',
  diamondExperience = 'DE',
  residenceExperience = 'ER',
  vipPlatinum = 'V',
  residence = 'RE',
  vipDiamond = 'VD',
  villaEliteDiamond = 'VV',
  vipPlatinumSilverLB = 'PS',
  vipPlatinumLB = 'VL',
  vipPlatinumSilverLB2 = 'VP',
  vipSilver = 'VS',
  Exit = 'E',
  ExitA = 'EA',
  ExitB = 'EB',
  JacuzziElite = 'NE',
  Trial = 'TR'
}

export const diamondLevels: Array<MemberLevelCode | string> = [
  MemberLevelCode.babyResidence,
  MemberLevelCode.babyVilla,
  MemberLevelCode.diamondExperience,
  MemberLevelCode.residenceExperience,
  MemberLevelCode.residence,
  MemberLevelCode.vipDiamond,
  MemberLevelCode.villaEliteDiamond
]

export const vipLevels: Array<MemberLevelCode | string> = [
  MemberLevelCode.vipPlatinumSilverLB,
  MemberLevelCode.vipPlatinumLB,
  MemberLevelCode.vipPlatinumSilverLB2,
  MemberLevelCode.vipSilver,
  MemberLevelCode.vipPlatinum
]

export const regularLevels: Array<MemberLevelCode | string> = [
  MemberLevelCode.Exit,
  MemberLevelCode.ExitA,
  MemberLevelCode.ExitB,
  MemberLevelCode.JacuzziElite,
  MemberLevelCode.Trial
]

export function evaluateMemberLevel({memberLevel}: EvaluateMemberLevel): MemberLevel {
  if (diamondLevels.includes(memberLevel)) return MemberLevel.DIAMOND

  if (vipLevels.includes(memberLevel)) return MemberLevel.VIP

  if (regularLevels.includes(memberLevel)) return MemberLevel.REGULAR

  return MemberLevel.REGULAR
}

