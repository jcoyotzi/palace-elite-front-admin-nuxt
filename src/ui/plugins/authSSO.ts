import { LoginCognito } from '@auth/sso-flows'

// inyectar clase a vue
declare module 'vue/types/vue' {
  interface Vue {
    $LoginCognito: LoginCognito
  }
}

// inyectar clase a store
declare module 'vuex/types/index' {
  interface Store<S> {
    $LoginCognito: LoginCognito
  }
}

// inyectar clase a context
declare module '@nuxt/types' {
  interface Context {
    $LoginCognito: LoginCognito
  }
}

export default (ctx: any, inject: any) => {
  const loginCognito = new LoginCognito({
    baseURL: ctx.$config.awsAmplifyConfig.baseURL,
    cognitoConfig: ctx.$config.awsAmplifyConfig,
    cors: ''
  })

  inject('LoginCognito', loginCognito)
}