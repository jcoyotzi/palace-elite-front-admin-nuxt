export interface DestinationDto {
    id: number,
    attributes: {
        name: string
        createdAt: string
        updatedAt: string
        publishedAt: string
        locale: string
    }
}

export interface Destination {
    id: number,
    name: string
    locale: string
}

export interface DestinationDataDto {
    data: DestinationDto[],
    meta?: any,
}
