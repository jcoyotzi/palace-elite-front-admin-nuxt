import { Plugin } from '@nuxt/types'
import { AuthStore } from '../store/authStore'

const isAuthenticated = async () => {
  const authStore = new AuthStore()

  if (!authStore.isAuthenticated) {
    await authStore.init()
  }

  return authStore.isAuthenticated
}

const plugin: Plugin = function plugin({app, route}) {
  app.router?.beforeEach(async (to, _from, next) => {
    const needAuth = route.meta?.reduce((auth: boolean, meta: any) => meta.auth || auth, false) || false

    if (needAuth) {
      const isAuth = await isAuthenticated()

      if (!isAuth) {
        route = {
          ...route,
          meta: [{auth: false}]
        }

        return next({path: app.localePath('/login')})
      }
    }

    if (to.name?.startsWith('login__')) {
      const isAuth = await isAuthenticated()

      if (isAuth) {
        return next({path: app.localePath('/')})
      }
    }

    await isAuthenticated()
    next()
  })
}

export default plugin