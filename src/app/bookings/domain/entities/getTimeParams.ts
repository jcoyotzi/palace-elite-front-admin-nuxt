export interface CurrentTime {
  hours: string
  minutes: string
  seconds: string
  days: string
}

export enum TypeGetTime {
  HOURS = 'hours',
  MINUTES = 'minutes',
  SECONDS = 'seconds',
  DAYS = 'days',
}

export interface GetTimeParams {
  type: TypeGetTime
  time: Date ,
  currentDate: Date,
}

