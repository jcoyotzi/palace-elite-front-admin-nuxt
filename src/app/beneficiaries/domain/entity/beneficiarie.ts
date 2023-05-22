interface colData {
  title: string
  value?: any
}

interface tableData {
  data: colData[]
}

interface MemberUtils {
  firstname: string
  lastname: string
  password: string
  email: string
  City: string | number
  Country: string | number
  Zip: string
  SocialSecurityNumber: string
  idprofileopera: string
  relationship: number | string
  idrelacionclub: number | string
  Language: string
  company: number
  BIRTHDAY: string
  MemberProfileSocialNetwork?: {
    title: string
    value: string
  }[]
}

export default interface Beneficiarie {
  name: string
  tableData: tableData[]
  hasPin: boolean
  memberUtils: MemberUtils
}
