export default interface InfoAffiliation {
    application: string
    lastContract: string
    name: string
    recnum: number
    sale: number
}

export interface InfoAffiliationData {
    data: InfoAffiliation[]
}

export interface QueryAffiliation {
    application: string
    company: number
    isNational?: number
}