export interface HeroMedia {
  mime: string
  url: string
  alt: string
  title: string
}

export default interface HeroDto {
  title?: string
  key?: string
  size: string
  media: HeroMedia
  description?: string
}
