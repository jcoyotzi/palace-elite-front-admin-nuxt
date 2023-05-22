import {Middleware} from '@nuxt/types'
import {UseAuth} from '../store/auth'

const authMiddleware: Middleware = context => {
  const auth = new UseAuth()
  console.log("authMiddleware: ", auth.isAuthenticated)
  if (!auth.isAuthenticated) return context.redirect('/')
}

export default authMiddleware
