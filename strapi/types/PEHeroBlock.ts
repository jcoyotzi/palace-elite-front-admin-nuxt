export interface PEHeroBlock {
  id: number
  __component: 'blocks.hero'
  title: string
  size: string
  media: {
    id: number
    title: string
    altText: string
    media: {
      data: {
        id: number
        attributes: {
          name: string
          alternativeText: string
          caption: string
          width: number
          height: number
          // formats: {};
          hash: string
          ext: string
          mime: string
          size: number
          url: string
          previewUrl: null
          provider: string
          provider_metadata: null
          createdAt: string
          updatedAt: string
        }
      }
    }
  }
}
