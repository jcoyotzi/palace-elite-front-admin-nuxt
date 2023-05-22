/*
 * Copyright (c) 2022.
 * Author: Enrique Nieto Martínez
 * Company: Palace Resorts
 * Created:  2022 / 9 / 22 10:45:15
 *
 */
export const isValidAxiosResponse = (data: any) => {
  return (
    data.hasOwnProperty('data') && data.hasOwnProperty('errors') && data.hasOwnProperty('warnings')
  )
}
