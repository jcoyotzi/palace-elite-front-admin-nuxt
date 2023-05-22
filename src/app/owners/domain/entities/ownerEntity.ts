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
  City: string
  Country: string
  Zip: string
  SocialSecurityNumber: string
  idprofileopera: string
  relationship: number
  idrelacionclub: number
  Language: string
  company: number
}

export interface OwnerEntity {
  name: string
  tableData: tableData[]
  hasPin: boolean
  memberUtils: MemberUtils
}
