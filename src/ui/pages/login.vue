<template>
  <div>
    <CommonHeroWidget
      v-if="components"
      :booking-attrs="bookingAttrs"
      :calendar-data="calendarData"
      :hero-attrs="heroAttrs"
      :is-authenticated="userIsAuthenticated"
    />
    <ContentBlockManager :blocks="components" />
    <div class="pe-w-11/12 pe-m-auto lg:pe-w-2/4 pe-mb-10">
        <PELoginForm :external-error-message="externalErrorMessage" :loading="loading" is-login-page @submitLogin="signIn"/>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Mixins} from 'vue-property-decorator'
import BookingWidgetMixin from '../mixins/Common/BookingWidgetMixin'
import {UseAuth} from '../store/auth'
import BasePageStrapiMixin from '../mixins/BasePageStrapiMixin'
import { BasePageSlugs } from '~/src/app/Strapi/StrapiConfiguration'

@Component({
  name: 'LoginPage',
  layout: 'default'
})
export default class LoginPage extends Mixins(BookingWidgetMixin, BasePageStrapiMixin) {

  public authStore = new UseAuth()

  externalErrorMessage = ''
  loading: boolean = false
  redirectTo: any = null

  get userIsAuthenticated() {
    return this.authStore.isAuthenticated
  }

  get userId() {
    return this.authStore.userAffiliationId
  }

  async beforeMount() {
    await this.loadStrapiPageData(BasePageSlugs.Login);
  }

  mounted() {
    if (this.$route.query.redirectTo) 
      this.authStore.customRouteToLogin = this.$route.query.redirectTo
  }

  async signIn(form: any) {
    try {
      this.loading = true
      this.externalErrorMessage = ''
      await this.authStore.signIn(form.email, form.password)
    } catch (error: any) {
      this.externalErrorMessage = (error.message + '') as string
    } finally {
      this.loading = false
    }
  }
}
</script>
