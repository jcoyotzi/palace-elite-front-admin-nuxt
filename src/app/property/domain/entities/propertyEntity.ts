/* Interfaz Property de dominio */

export interface PropertyLogo {
  altText: string
  ext: string
  url: string
}

export interface Image {
  name: string
  alternativeText: string
  caption: string
  width: number
  height: number
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: string | null
  provider: string
  provider_metadata: string | null
}

export interface PropertyEntity {
  id: string
  externalId: string
  comingSoon: boolean
  comingSoonLabel: string
  text: string
  image?: Image
  logo: PropertyLogo
}


export const leBlancPropertyCodes = ['ZHLB', 'LBC', 'ZHLB']
