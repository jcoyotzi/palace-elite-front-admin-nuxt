import {Middleware} from '@nuxt/types'
import {UseAuth} from '../store/auth'

const guestMiddleware: Middleware = context => {
  const auth = new UseAuth()
  if (auth.isAuthenticated) return context.redirect('/membership')
}

export default guestMiddleware
