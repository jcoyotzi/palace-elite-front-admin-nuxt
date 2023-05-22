export interface CardProvitionConfirmationMember {
  name: string
}

export interface CardProvitionConfirmation {
  number: string
  resort: string
  resort_name: string
  status: string
  startDate: string
  endDate: string
  from?: string
  memberFullName: string
}

export default interface CardProvitionDto {
  category?: string
  confirmation?: CardProvitionConfirmation
  expirationDate: string
  expantion?: boolean
  invoice: string
  textTooltip?: string
  titleTooltip?: string
  status: string
  title: string
  type?: string
  number?: number
  buttonUse?: boolean
  bottomText?: string
}
