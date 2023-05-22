// TODO - Improve interfaces
export interface Page {
  data: {
    id: number
    attributes: {
      slug: string
      title: string
    }
  }
}

export interface Link {
  id: number
  type: string
  label: string
  url: string
  page: Page
}
