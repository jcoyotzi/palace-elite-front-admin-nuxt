export interface ResponseWithCollection<T> {
  status: string
  code: number
  message: string
  data: T[]
  error: boolean
  tag?: string
}
