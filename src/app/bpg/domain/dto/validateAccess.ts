export default interface ValidityAccessDTO {
  order: number
  idTypeRoom: number
  roomTypeId: string
  roomTypeDescription: string
  hotel: string
  hotelDescription: string
  roomTypeGroupId: string
  roomTypeGroupDescription: string
  roomTypeCategory: string
  roomTypeCategoryId: string
  groupId: string
  group: string
  discountRate: number
  validity: number
  periodType: string
  quantity: number
  accessYear: number
  totalAccess: number
  dateFrom: string
  dateTo: string
  affiliationSource: string
  importReason: boolean
  scheme: string
  minOccupancy: number
  maxOccupancy: number
  force: string
}
