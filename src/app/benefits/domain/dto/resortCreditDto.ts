export interface MediaDTO {
  data: {
    id: number
    attributes: {
      name: string
      alternativeText: string
      caption: string
      width: number
      height: number
      formats: {
        thumbnail: {
          ext: string
          url: string
          hash: string
          mime: string
          name: string
          path: null
          size: number
          width: number
          height: number
        }
      }
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
  // id: number
  // title: string
  // altText: boolean
  // media: {
  // }
}

export interface ResortCreditBenefitDTO {
  id: 1
  attributes: {
    title: string
    seeDetailsLabel: string
    details: string
    price: string
    priceLabel: string
    minPax: number
    maxPax: number
    paxLabel: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    locale: string
    media: {
      id: number
      title: string
      altText: string
      media: MediaDTO
    }
  }
}

export interface ResortCreditCategoryDTO {
  id: number
  attributes: {
    title: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    locale: string
    resortCreditBenefits: {
      data: ResortCreditBenefitDTO[]
    }
  }
}

export interface ResortCreditDTO {
  data: ResortCreditCategoryDTO[]
}
