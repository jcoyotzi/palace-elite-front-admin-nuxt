import {Plugin} from '@nuxt/types'
import {UseAuth} from '../store/auth'
import {REDIRECT_ROUTES} from './redirectsRoutes'

const plugin: Plugin = function plugin({app, route, redirect}) {
  const store = new UseAuth()

  // @ts-ignore
  app.router.beforeEach(async (to, from, next) => {
    // @ts-ignore
    const needAuth = route.meta.reduce((auth, meta) => meta.auth || auth, false)

    const requiredRedirect = REDIRECT_ROUTES.find((item: any) => item.path === to.fullPath)

    if (requiredRedirect) next(requiredRedirect.redirect)

    if (needAuth) {
      const userInfo = localStorage.getItem('userInfo')

      if (!userInfo) {
        // console.log('limpiando sesión 🐸')
        await store.clearSession()
        if(to.path !== '/login') return next({ path:'/login', query: { redirectTo: to.fullPath }})
      }

      const isAuth = store.isAuthenticated

      if (!isAuth) {
        await store.init()
        return next()
      } else {
        return next()
      }
    }

    await store.init()

    return next()
  })
}
export default plugin
