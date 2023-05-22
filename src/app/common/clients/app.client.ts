import axios from 'axios'

const authClient = axios.create({
  baseURL: process.env.apiUrl
})

export const defaults = authClient.defaults

export default authClient
