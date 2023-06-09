export enum CatalogImperials {
  IMPWKS = 'IMPWKS',
  IMPNIG = 'IMPNIG'
}

export enum CatalogAnniversary {
  ANVWKS = 'ANVWKS',
  ANVNIG = 'ANVNIG'
}

export enum CatalogIncentivo {
  INCWKS = 'INCWKS'
}

export const allCatalogsValues = [
  ...Object.values(CatalogAnniversary),
  ...Object.values(CatalogIncentivo),
  ...Object.values(CatalogImperials)
]

export interface AllCatalogsDto {
  IMPWKS: string
  IMPNIG: string
  ANVWKS: string
  ANVNIG: string
  INCWKS: string
}

export enum Provisions {
  YATE = 'YATE',
  CONCERT = 'CONCERT',
  CONCIERGE = 'CONCIERGE',
  GOLFRND = 'GOLFRND',
  UGBWEEK = 'UGBWEEK',
  UGBNIG = 'UGBNIG'
}

export enum Promotions {
  KIDS_AND_TEENS = '18'
}

export enum CatalogGroupsIds {
  RESIDENCE = 'R',
  BABY_RESIDENCE = 'BR',
  VILLAS = 'V',
  BABY_VILLAS = 'BV',
  PRESIDENTIAL_DIAMOND = 'PD',
  FAMILY_SUITE = 'F'
}

export enum BaglioniVillas {
  VILLA_REGINA = 235,
  VILLA_MALDIVAS = 243,
  GRAND_VILLA_MALDIVAS_ = 260
}
