export interface IHeader {
    title: string
    name: string
    width: string
    align: string
}

export interface TableAccess {
    component: any
    headers: IHeader[]
    items: any[]
}