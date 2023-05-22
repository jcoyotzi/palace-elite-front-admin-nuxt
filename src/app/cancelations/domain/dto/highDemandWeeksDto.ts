export interface ItemWeek {
  id: number,
  attributes: {
      type: string,
      year: number,
      start: string,
      end: string,
      createdAt: string,
      updatedAt: string,
      publishedAt: string,
  }
}

export interface HighDemandWeeksDto {
  data: ItemWeek[]
}
