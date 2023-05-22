import {AxiosResponse} from 'axios'

export const axiosResponse = (response: any | AxiosResponse) => {
  return response.data
}
