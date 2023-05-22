export default interface PayloadGetReservations {
  pageNumber: number
  size: number
  sort: string //asc o desc
  status?: string //["ON HOLD", "CANCELLED"]
  provision?: string //id's
  resort?: string //hotels, Ex. ["BP", "ZPLB"]
  searchItem?: string //Nizuc
  startDate?: string //2021-01-01
  endDate?: string //2021-01-01

  isNational: boolean
  application?: string
  company?: number
}
