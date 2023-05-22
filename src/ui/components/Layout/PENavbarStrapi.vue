<template>
  <section>
    <NavNavbar
      v-bind="navbarDataStrapi"
      :is-authenticated="isAuthenticated"
      :user-data="{name: username}"
      @click-menu="onMenuClicked"
      @logout="authStore.signOut()"
      @openMenu="handleToogleMenu"
    >
      <template #login-form="{show}">
        <PEAuthHandler
          v-if="show"
          :external-error-message="externalErrorMessage"
          @sing-up:identifiers="signUpIdentifiers"
          @sign-up:password="signUp"
          @sign-up:confirmation="confirmSignUp"
          @sign-in="signIn"
          @forgot-password:email="forgotPassword"
          @forgot-password:reset-password="forgotPasswordSubmit"
          @verify-account:email="resendEmailCode"
          @verify-account:code="verifyAccount"
        />
      </template>
      <template #destinations>
        <NavSubmenusDestinations
          v-if="destinationsPalace.properties.length"
          :destinations="destinationsPalace"
          :destination-title="$t('listTitlePalace')"
        />
        <NavSubmenusDestinations
          v-if="destinationsBaglioni.properties.length"
          :destinations="destinationsBaglioni"
          :destination-title="$t('listTitleEuropean')"
        />
        <PEBannerDestinations :destinations="destinations"/>
      </template>
      <template #benefits>
        <NavSubmenusBenefits
          v-if="navbarDataStrapi.benefits"
          :benefits="navbarDataStrapi.benefits"
        />
      </template>
      <template #membership>
        <NavSubmenusMembership
          v-if="navbarDataStrapi.membership"
          :membership="navbarDataStrapi.membership"
        />
      </template>
    </NavNavbar>
    <!-- Componente Navigation Menu -->
    <PENavigationMenuStrapi
      v-bind="navigationMenuProps"
      class="!pe-z-[40]"
      v-on="$props"
      @input="handleToogleMenu"
    ></PENavigationMenuStrapi>
    <PEModal
    v-model="openRedirectModal"
    class="pe-z-30"
    close-icon=""
  >
    <template #title>
      <div
        class="pe-mb-10 pe-text-[24px] pe-text-center pe-uppercase pe-text-white pe-w-[100%] sm:pe-w-auto"
      >
        {{ $t('login.redirectModal.title') }}
      </div>
    </template>
    <template #content>
      <p
        class="pe-text-center pe-text-white pe-mt-6 pe-mb-10"
      >
        {{ $t('login.redirectModal.content') }}
      </p>
    </template>
    <template #buttons>
      <div class="pe-flex pe-flex-col pe-items-center lg:pe-flex-row pe-gap-12 pe-mt-6">
        <PEButton
          outlined-secondary
          uppercase
          @click="redirectUserFixed"
        >
          {{ $t('login.redirectModal.cta') }}
        </PEButton>
      </div>
    </template>
  </PEModal>
  </section>
</template>

<script lang="ts">
import {Component, Mixins} from 'vue-property-decorator'
import {LayoutStore} from '../../store/layoutStore'
import {UseAuth} from '../../../ui/store/auth'
import PENavigationMenuStrapi from '../../components/Layout/PENavigationMenuStrapi.vue'
import {
  AuthHandlerSubmitEvent,
  SingInForm,
  SignUpConfirmationForm,
  SignUpPasswordForm,
  SignUpIdentifiersForm,
  ForgotPasswordEmailForm,
  ForgotPasswordResetPasswordForm
} from '../../../ui/components/PEAuthHandler.vue'
import OnCurrentLocaleChanged from '../../mixins/OnCurrentLocaleChanged'
import PEBannerDestinations from './PEBannerDestinations.vue'
import i18n from '~/src/ui/i18n/booking/bookingWidget'

@Component({
  i18n,
  name: 'PENavbarStrapi',
  components: {
    PENavigationMenuStrapi,
    PEBannerDestinations
  }
})
export default class PENavbarStrapi extends Mixins (OnCurrentLocaleChanged) {
  public layoutStore = new LayoutStore();

  openMenu = false

  get navigationMenuProps() {
    return {
      value: this.openMenu,
      primaryLinks: this.desktop
        ? this.menuDataStrapi.desktop.primaryLinks
        : this.menuDataStrapi.mobile.primaryLinks,
      secondaryLinks: this.desktop
        ? this.menuDataStrapi.desktop.secondaryLinks
        : this.menuDataStrapi.mobile.secondaryLinks,
      phone: this.menuDataStrapi.desktop.telephone,
      isAuthenticated: this.isAuthenticated,
      loginLabel: this.menuDataStrapi.desktop.loginLabel,
      logoutLabel: this.menuDataStrapi.desktop.logoutLabel
    }
  }

  desktopMatcher: MediaQueryList | null = null

  desktop = false

  onCurrentLocaleChanged(): void {
    this.layoutStore.fetchNavbarStrapi()
    this.layoutStore.fetchMenuStrapi()
    this.layoutStore.fetchDestinationsStrapi()
  }

  get navbarDataStrapi() {
    return this.layoutStore.navbarData
  }

  get destinationsPalace() {
    return this.layoutStore.propertiesPalace
  }

  get destinationsBaglioni() {
    return this.layoutStore.propertiesBaglioni
  }

  get username() {
    return this.authStore.userFullname
  }

  get menuDataStrapi() {
    return this.layoutStore.menuData
  }

  navigationMenu = false

  externalErrorMessage = ''
  auth = {
    affiliationNumber: '',
    email: ''
  }

  get authStore() {
    return new UseAuth()
  }

  get isAuthenticated() {
    return this.authStore.isAuthenticated
  }

  get openRedirectModal() {
    if(this.authStore.isUserFixed) this.startTimeOut()
    return this.authStore.isUserFixed
  }

  get destinations() {
    return this.layoutStore.destinationsData
  }

  onShowLoginForm() {
    this.externalErrorMessage = ''
  }

  startTimeOut() {
    setTimeout(() => {
      this.redirectUserFixed()
    }, 10000) 
  }

  redirectUserFixed() {
    this.$nextTick(() => {
      window.location.replace('https://fixed.palaceelite.com/home')
    })
  }

  async signIn({form, setLoading}: AuthHandlerSubmitEvent<SingInForm>) {
    try {
      setLoading(true)
      this.externalErrorMessage = ''
      await this.authStore.signIn(form.email, form.password)
    } catch (error: any) {
      this.externalErrorMessage = (error.message + '') as string
    } finally {
      setLoading(false)
    }
  }

  async signUpIdentifiers({
    setLoading,
    nextStep,
    form
  }: AuthHandlerSubmitEvent<SignUpIdentifiersForm>) {
    try {
      setLoading(true)
      this.externalErrorMessage = ''

      await new Promise(resolve => resolve(2))
      this.auth.email = form.email
      this.auth.affiliationNumber = form.affiliationId
      await this.authStore.isSignUPossible(form.email, form.affiliationId)
      nextStep()
    } catch (error: any) {
      this.externalErrorMessage = this.$t('login.' + error.message) as string
    } finally {
      setLoading(false)
    }
  }

  async signUp({submitEnd, nextStep, form}: AuthHandlerSubmitEvent<SignUpPasswordForm>) {
    try {
      await this.authStore.signUp(this.auth.email, form.password, this.auth.affiliationNumber)
      nextStep()
    } catch (error: any) {
      this.externalErrorMessage = (error.message + '') as string
    } finally {
      submitEnd()
    }
  }

  async confirmSignUp({submitEnd, nextStep, form}: AuthHandlerSubmitEvent<SignUpConfirmationForm>) {
    try {
      await this.authStore.confirmSignUp(this.auth.email, form.confirmationCode)

      submitEnd()
      nextStep()
    } catch (error: any) {
      this.externalErrorMessage = (error.message + '') as string
    } finally {
      submitEnd()
    }
  }

  async forgotPassword({
    setLoading,
    nextStep,
    form
  }: AuthHandlerSubmitEvent<ForgotPasswordEmailForm>) {
    try {
      setLoading(true)
      this.externalErrorMessage = ''

      await new Promise(resolve => resolve(2))
      await this.authStore.forgotPassword(form.email)
      nextStep()
    } catch (error: any) {
      this.externalErrorMessage = (error.message + '') as string
    } finally {
      setLoading(false)
    }
  }

  async forgotPasswordSubmit({
    submitEnd,
    nextStep,
    form
  }: AuthHandlerSubmitEvent<ForgotPasswordResetPasswordForm>) {
    try {
      await new Promise(resolve => resolve(2))
      await this.authStore.forgotPasswordSubmit(
        form.email,
        form.confirmationCode,
        form.password
      )
      submitEnd()
      nextStep()
    } catch (error: any) {
      this.externalErrorMessage = (error.message + '') as string
    } finally {
      submitEnd()
    }
  }

  async resendEmailCode({
    setLoading,
    nextStep,
    form
  }: AuthHandlerSubmitEvent<ForgotPasswordResetPasswordForm>) {
    try {
      setLoading(true)
      this.externalErrorMessage = ''
      await this.authStore.resendSignUp(form.email)
      nextStep()
    } catch (error: any) {
      nextStep()
      this.externalErrorMessage = (error.message + '') as string
    } finally {
      setLoading(false)
    }
  }

  async verifyAccount({
    setLoading,
    nextStep,
    form
  }: AuthHandlerSubmitEvent<ForgotPasswordResetPasswordForm>) {
    try {
      setLoading(true)
      this.externalErrorMessage = ''

      await this.authStore.confirmSignUp(form.email, form.confirmationCode)
      nextStep()
    } catch (error: any) {
      nextStep()
      this.externalErrorMessage = (error.message + '') as string
    } finally {
      setLoading(false)
    }
  }

  onMenuClicked() {
    this.navigationMenu = !this.navigationMenu
  }

  handleToogleMenu(open: boolean) {
    this.openMenu = open
  }

  onModileQueryChange({matches}: MediaQueryListEvent) {
    this.desktop = matches
  }

  beforeMount() {
    this.desktopMatcher = window.matchMedia('(min-width: 1024px)')

    this.desktop = this.desktopMatcher.matches

    this.desktopMatcher.addEventListener('change', this.onModileQueryChange)
  }

  destroyed() {
    this.desktopMatcher?.removeEventListener(
      'change',

      this.onModileQueryChange
    )
  }
}
</script>
