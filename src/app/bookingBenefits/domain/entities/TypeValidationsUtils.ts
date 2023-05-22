export type NotRequired<T> = T | null | undefined

export const isNotEmptyText = (v: NotRequired<string>): boolean =>
  v !== '' && v !== undefined && v !== null

export const enum TransportationUnits {
  Empty = 0,
  Minimal = 1
}

export enum CounterVariants {
  RoundedSquare = 'rounded',
  Circle = 'circle'
}


export enum TrasportationType {
  privateTransportation = "1",
  privateVanTransportation = "2",
  PrivateVanXLTransportation = "3",
}