import { Store, Pinia } from 'pinia-class-component'
import { Auth } from 'aws-amplify'
import { User } from '~/src/app/auth/domain/entities/user'
import { SessionStorageKeys } from '~/src/app/common/infrastructure/persistence/domain/enums/SessionStorageKeys'
import { lazyInject } from '~/src/container'
import persistenceTypes from '~/src/app/common/infrastructure/persistence/types'
import { Persistence } from '~/src/app/common/infrastructure/persistence/domain/entities/Persistence'
import { StorageKeys } from '~/src/app/common/infrastructure/persistence/domain/enums/StorageKeys'
import { LoginForm } from '~/src/app/auth/domain/entities/loginForm'

export enum Locale {
  'es-MX' = "es-MX",
  'en-US' = "en-US"
}

@Store({
  name: 'AuthStore'
})
export class AuthStore extends Pinia {

  @lazyInject(persistenceTypes.localStorage)
  private readonly localStorage!: Persistence

  public isAuthenticated: boolean = false
  public user: User | null = null
  public profile: any = null
  public hasError: boolean = false
  public errorCode: string = ''
  public message: string = ''
  
  async init() {
    try {
      const userStored = this.localStorage.getItem(StorageKeys.USER_IFORMATION, null)
      const profile = this.localStorage.getItem(StorageKeys.PROFILE, null)

      if (userStored) {
        this.user = userStored
        this.profile = profile
        this.isAuthenticated = true
      }
    } catch (error) {
      await Auth.signOut()
      this.localStorage.clear()
      this.user = null
    }
  }

  async logout() {
    await Auth.signOut()
    this.isAuthenticated = false
    this.user = null
    this.profile = null
    this.localStorage.clear()
  }

  async signIn(form: LoginForm) {
    this.hasError = false
    this.errorCode = ''
    this.message = ''

    await this.$nuxt.$LoginCognito.signIn({
      signInCredentials: {
        username: form.username.trim().toLowerCase(),
        password: form.password.trim(),
        authType: 'ldap'
      },
      clientMetadata: {
        //
      },
      locale: Locale['es-MX']
    }).then(async (session: any) => {
      if (session) {
        await this.setAuthTokens();
      }
    }).catch((error: any) => {
      this.hasError = true
      this.errorCode = error._code
      this.message = error.message
    })
  }

  async setAuthTokens() {
    const session = await Auth.currentSession()
    const token = session.getIdToken().getJwtToken()
    const user = await Auth.currentAuthenticatedUser()
    const profile = await this.$nuxt.$LoginCognito.getProfile(token)

    this.localStorage.setItem(SessionStorageKeys.TOKEN, token)
    this.localStorage.setItem(SessionStorageKeys.USER_IFORMATION, user)
    this.localStorage.setItem(SessionStorageKeys.PROFILE, profile.data)

    this.user = user.attributes
    this.profile = profile.data
    this.isAuthenticated = true
  }
}