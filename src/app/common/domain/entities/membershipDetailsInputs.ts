import {TypeOfPhone} from '../enums/typeOfPhone'

export interface PersonalInformationInput {
  firstName: string
  lastName: string
  email: string
  dateOfBirth: string
  zipCode: string
  city: string
  country: string
}

export interface SocialMediaInput {
  facebook: string
  twitter: string
  instagram: string
  youtube: string
}

export interface ContactDetailsInput {
  typeOfPhone: TypeOfPhone
  phone: string
  typeofPhone2: TypeOfPhone
  phone2: string
  typeofPhone3: TypeOfPhone
  phone3: string
}

export interface MembershipDetailsInputs
  extends Partial<PersonalInformationInput>,
    Partial<ContactDetailsInput>,
    Partial<SocialMediaInput> {
  InReferral?: number
}
