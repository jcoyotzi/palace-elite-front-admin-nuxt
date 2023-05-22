import axios from 'axios'

const token =
  '226cd86291a67bba219a4dfd33ab09b8b9e1b928079768cf7baab63da091a93001d8718ba1d4d1ce8a0481b13b2971a5282431e58484cbe8de108b6573219be7a3d51718b2cfd59ccbd805947fa42f91e14567ce44b01ae9f0bb77eb4353836bd1b0ae13d143443c95573419d1afb3b1737d555f22b1b2619f2cbbd461e874e8'

const strapiClient = axios.create({
  baseURL: 'http://localhost:9000/api',
  headers: {
    Authorization: `Bearer ${token}`
  }
})

export const defaults = strapiClient.defaults

export default strapiClient
