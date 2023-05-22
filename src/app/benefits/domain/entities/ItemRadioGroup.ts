export interface ItemRadioGroup {
  id: string
  name: string
  prependIcon?: string
  labelText?: string
}

export interface ImperialItemRadioGroup extends ItemRadioGroup {
  price: number
  currency: string
  selectedProvisionRecnum: number | undefined
  provitionExpiration : string
  disabled: boolean
}
