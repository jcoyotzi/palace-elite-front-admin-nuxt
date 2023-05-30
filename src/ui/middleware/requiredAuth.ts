import { Middleware } from '@nuxt/types'
import { AuthStore } from '../store/authStore'

const isAuthenticated = async () => {
  const authStore = new AuthStore()

  if (!authStore.isAuthenticated) {
    await authStore.init()
  }

  return authStore.isAuthenticated
}

export const requiredAuth: Middleware = async ({app, redirect, route}) => {
  if (process.server) // Page on first time load
    return;

  let isAuth = false
  const needAuth = route.meta?.reduce((auth: boolean, meta: any) => meta.auth || auth, false) || false

  if (needAuth) {
    isAuth = await isAuthenticated()

    if (!isAuth) {
      return redirect({path: app.localePath('/login')})
    }
  }

  if (route.name?.startsWith('login__') && isAuth) {
    return redirect({path: app.localePath('/home')})
  }
}

export default requiredAuth