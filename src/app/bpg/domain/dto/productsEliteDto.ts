export interface PreferentialsDto {
    recnum: number
    company: number
    productId: string
    available: number
    type: string
    description: string
    status: string
    spanishCertName: string
    engCertName: string
    portCertName: string
    doesCost: boolean
    includesULG: boolean
    provisionUnit: string
}

export interface BenefitsDto {
    recnum: number
    folio: number
    ulgAdditionalPayment: boolean
    type: string
    status: string
    name: string
    ltrName: string
    certName: string
    category: string
}

export interface TabsProductsElite {
    title: string
    code: string
}