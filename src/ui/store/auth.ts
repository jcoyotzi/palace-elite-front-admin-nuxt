import {Store, Pinia} from 'pinia-class-component'
import {Auth, Hub} from 'aws-amplify'
import {HubCapsule} from '@aws-amplify/core'
import {defaults} from '../../../src/app/common/clients/app.client'
import {PreLoginStatus} from '../../../src/app/auth/domain/enum/PreLogin'
import {preLogin} from '../../../src/app/common/auth.service'
import {JwtTokenMapper} from '../../../src/app/auth/domain/mapper/jwtTokenMapper'
import {lazyInject} from '../../container'
import GetUserMemberByAffiliationNumberUseCase from '../../app/user/application/getUserMemberByAffiliationNumberUseCase'
import userTypes from '../../app/common/types/userTypes'
import {LegacyUser} from '~/src/app/user/domain/entities/user'
import {Owner} from '~/src/app/owners/domain/dto/getOwnersResponseDto'
import GetIsIHRUseCase from 'app/user/application/getIsIHR'
import {IsIHRPayload} from '~/src/app/user/domain/entities/isIHR'
import {evaluateMemberLevel, MemberLevel} from '../utils/evaluate/memberLevel'
@Store({
  name: 'authStore'
})
export class UseAuth extends Pinia {
  @lazyInject(userTypes.getUserMemberUseCase)
  private readonly getUserMemberUseCase!: GetUserMemberByAffiliationNumberUseCase

  @lazyInject(userTypes.getIsIHR)
  private readonly getIsIHR!: GetIsIHRUseCase

  public user: LegacyUser | null = null

  private loggedUser: Owner | null = null

  customRouteToLogin: any = '/dashboard'

  userFixed = false

  get getLoggedUser() {
    return this.loggedUser || null
  }

  get currentUser() {
    return this.user || null
  }

  get isAuthenticated() {
    return !!this.user
  }

  get userFullname() {
    if (!this.loggedUser) return ''
    return `${this.loggedUser.MemberProfilesRelateds.firstname} ${this.loggedUser.MemberProfilesRelateds.lastname}`
  }

  get email() {
    if (!this.user) return null
    const email = this.user._UserMember._email

    return email
  }

  get applicationUserMember() {
    return this.user?._UserMember._application
  }

  get userAffiliationId() {
    return this.user ? this.user._UserMember._application : null
  }

  get userCompany() {
    return this.user ? this.user._UserMember._company : null
  }

  get memberLevel() {
    return evaluateMemberLevel({
      memberLevel: String(this.user?._UserMember?._membershiplevel)
    })
  }

  get isNational() {
    return this.user ? this.user._UserMember._isnational : null
  }

  get userMarket() {
    return this.user ? this.user._Market : null
  }

  get isUserFixed() {
    return this.userFixed
  }

  setLoggedUser(loggedUser: Owner) {
    this.loggedUser = loggedUser
  }

  async clearSession() {
    await Auth.signOut()
    localStorage.clear()
    this.user = null
  }

  async isIHR({hotel, folio, agencyCode, contract}: IsIHRPayload) {
    try {
      const response = await this.getIsIHR.run({
        hotel,
        folio,
        agencyCode,
        contract
      })

      // @ts-ignore
      const isIHR = response.data?.IsDoMemberPaymentByPanamanian

      this.user!._UserMember._isIHR = isIHR

      return response
    } catch (error) {
      // console.log(error)
    }
  }

  async setAuthTokens(isFirstLogin: boolean = false) {
    // console.log('Entro a setAuthTokens')

    const session = await Auth.currentSession()
    const token = session.getIdToken().getJwtToken()

    let userInfo = localStorage.getItem('userInfo')
    if (!userInfo) {
      localStorage.setItem('ACCESS_TOKEN', token)
      const info = await this.getUserMemberInfo(token)
      // @ts-ignore
      const user = JSON.stringify(info.data)
      localStorage.setItem('userInfo', user)

      const idToken = session.getIdToken().payload
      localStorage.setItem('ID_TOKEN', JSON.stringify(idToken))
      // @ts-ignore
      __insp?.push([
        'tagSession',
        // @ts-ignore
        {email: info.data._UserMember._email, affiliation: info.data._UserMember._application}
      ])

      userInfo = user
    }

    if (!isFirstLogin) this.user = JSON.parse(userInfo)

    defaults.headers.common.Authorization = `Bearer ${token}`
  }

  async getUserMemberInfo(token: string) {
    const tokenDecoded = JwtTokenMapper.parseJwt(token)
    const affiliationNumber = tokenDecoded['custom:affiliation_number']
    return await this.getUserMemberUseCase.run(affiliationNumber)
  }

  async init() {
    // console.log('Entre a init de auth.ts')

    try {
      const amplifyEvents = new Map<string, Function>()

      amplifyEvents.set('auth', this.setAuthTokens)
      amplifyEvents.set('tokenRefresh', this.setAuthTokens)
      amplifyEvents.set('signOut', this.clearSession)

      Hub.listen('auth', ({payload}: HubCapsule) => {
        amplifyEvents.get(payload.event)
      })

      await this.setAuthTokens()
      // const user = await Auth.currentAuthenticatedUser()
      // this.user = await getCurrentUser()
      const userStored = localStorage.getItem('userInfo')
      if (userStored) {
        this.user = JSON.parse(userStored)
      }
    } catch (error) {
      await Auth.signOut()
      this.user = null
    }
  }

  async signIn(email: string, password: string) {
    try {
      await Auth.signIn(email.trim().toLowerCase(), password)
      await this.setAuthTokens(true)
      window.location.href = this.customRouteToLogin
    } catch (error) {
      await this.clearSession()
      throw error
    }
  }

  async signOut() {
    await this.clearSession()
    window.location.href = '/'
  }

  async isSignUPossible(email: string, affiliationNumber: string) {
    const response = await preLogin(
      Number.parseFloat(affiliationNumber.trim()),
      email.trim().toLowerCase()
    )
    const {preLoginStatus} = response.data
    if (preLoginStatus === PreLoginStatus.REGISTERED) {
      throw new Error('userAlredayRegisteredLabel')
    } else if (preLoginStatus === PreLoginStatus.LEGACY_SYSTEM) {
      this.userFixed = true
      throw new Error('redirectUserLabel')
    } else if (preLoginStatus === PreLoginStatus.NOT_FOUND) {
      throw new Error('userDoesntExistLabel')
    } else if (preLoginStatus === PreLoginStatus.MEMBERSHIP_PERMANENTLY_CANCELED) {
      throw new Error('canceledMembership')
    }
    return preLoginStatus
  }

  async signUp(email: string, password: string, affiliationNumber: string) {
    return await Auth.signUp({
      username: email.trim().toLowerCase(),
      password,
      attributes: {
        'custom:affiliation_number': affiliationNumber.trim()
      }
    })
  }

  async confirmSignUp(email: string, code: string) {
    await Auth.confirmSignUp(email.trim().toLowerCase(), code.trim())
  }

  async forgotPassword(email: string) {
    return await Auth.forgotPassword(email.trim().toLowerCase())
  }

  async forgotPasswordSubmit(email: string, confirmationCode: string, newPassword: string) {
    return await Auth.forgotPasswordSubmit(
      email.trim().toLowerCase(),
      confirmationCode.trim(),
      newPassword
    )
  }

  async changePassword(data: any) {
    const {oldPassword, newPassword} = data

    return await Auth.currentAuthenticatedUser()
      .then(user => {
        return Auth.changePassword(user, oldPassword, newPassword)
      })
      .then(data => {
        return {success: true, data, error: ''}
      })
      .catch(err => {
        return {success: false, error: err.message}
      })
  }

  async resendSignUp(email: string) {
    await Auth.resendSignUp(email.trim().toLowerCase())
    // console.log('code resent successfully')
  }
}
