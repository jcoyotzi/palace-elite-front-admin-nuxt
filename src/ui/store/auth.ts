import {Store, Pinia} from 'pinia-class-component'
import { Auth } from 'aws-amplify'
import {User} from '~/src/app/auth/domain/entities/user'
import { SessionStorageKeys } from '~/src/app/common/infrastructure/persistence/domain/enums/SessionStorageKeys'
import { lazyInject } from '~/src/container'
import persistenceTypes from '~/src/app/common/infrastructure/persistence/types'
import { Persistence } from '~/src/app/common/infrastructure/persistence/domain/entities/Persistence'
import { StorageKeys } from '~/src/app/common/infrastructure/persistence/domain/enums/StorageKeys'

export enum Locale {
  'es-MX' = "es-MX",
  'en-US' = "en-US"
}

@Store({
  name: 'authStore'
})
export class AuthStore extends Pinia {

  @lazyInject(persistenceTypes.localStorage)
  private readonly localStorage!: Persistence

  public isAuthenticated: boolean = false
  public user: User | null = null
  public profile: any = null
  public error: boolean = false
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

  logout() {
    this.isAuthenticated = false
    this.user = null
    this.profile = null

    this.localStorage.clear()
  }

  async signIn({ username, password }: { username: string, password: string }) {
    this.error = false
    this.message = ''

    try {
      await this.$nuxt.$LoginCognito.signIn({
        signInCredentials: {
          username: username.trim().toLowerCase(),
          password,
          authType: 'ldap'
        },
        locale: Locale['es-MX']
      }).then(async (_session: any) => {
        await this.setAuthTokens();
      })
    } catch (error: any) {
      this.error = true
      this.message = error.message
      throw error
    }
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