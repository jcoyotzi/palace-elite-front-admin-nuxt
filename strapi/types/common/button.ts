export interface Button {
  id: number
  type: string
  openNewTab: boolean
  label: string
  url: string
  page?: {
    data: {
      id: 1,
      attributes: any
    }
  }
}