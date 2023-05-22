export interface IDepartment {
  id: number
  name: string
  emails: string
  resorts: {
    id: number
    emails: string
    title: string
    externalId: string
    comingSoon: boolean
    comingSoonLabel: string
  }[]
}

export interface Resort {
  id: number
  attributes: {
    title: string
    comingSoon: boolean
    comingSoonLabel: string
    externalId: string
    locale: string
  }
}

export interface Departament {
  id: number
  name: string
  emails: string
  resorts: {
    id: number
    emails: string
    resort: {
      data: Resort
    }
  }[]
}

export interface ContactReasonDto {
  data: {
    id: number
    attributes: {
      iAmNotAMember: Departament[]
      iAmAMember: Departament[]
      localizations: {
        data: any[]
      }
    }
  }
}

export interface IContactForm {
  affilliateId: string | null
  country: string
  email: string
  message: string
  name: string
  department: Departament | null
  resort: {
    comingSoon: boolean
    comingSoonLabel: string
    emails: string
    externalId: string
    id: number
    title: string
  } | null
}

export default interface ContactFormDto {
  affilliateId: string | null
  country: string
  email: string
  message: string
  name: string
  department: {
    value: number
    text: string
    disable: boolean
  } | null
  resort: {
    value: number
    text: string
    disable: boolean
  } | null
}
