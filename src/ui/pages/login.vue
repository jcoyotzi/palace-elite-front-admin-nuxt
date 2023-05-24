<template>
  <div class="ms-min-h-screen ms-flex">
    <div class="ms-hidden lg:ms-block xl:ms-w-3/4 login-bg">
    </div>
    <div class="ms-flex ms-justify-center ms-w-full xl:ms-w-1/4">
      <FormLoginMicroSite
        v-bind="formLoginMicroSiteProps"
        :locales="locales"
        :locale="locale"
        url-image="../assets/img/intelligence.svg"
        class="custom-form-login md:!ms-w-3/4 lg:!ms-w-1/2 xl:!ms-w-full"
        @clicked-forgot-your-password="clickedForgotYourPassword"
        @clicked-create-an-account="clickedCreateAnAccount"
        @clicked-login-button="clickedLoginButton"
        @changed-locale="changedLocale"
      >
      </FormLoginMicroSite>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { AuthStore } from '../store/auth';
import i18n from '~/src/ui/i18n/messages/login'
import { FormLoginMicroSite, LoginForm } from '~/src/app/auth/domain/entities/loginForm';
import { Locale } from '~/src/app/auth/domain/entities/locale';

@Component({
  name: 'LoginPage',
  i18n,
})
export default class LoginPage extends Vue {

  public authStore = new AuthStore();

  public formLoginMicroSiteProps: FormLoginMicroSite = {
    labels: {
      login: this.$t('login'),
      welcome: this.$t('welcome'),
      usernamePlaceholder: this.$t('usernamePlaceholder'),
      passwordPlaceholder: this.$t('passwordPlaceholder'),
      loginButton: this.$t('loginButton'),
      forgotYourPassword: this.$t('forgotYourPassword'),
      newUser: this.$t('newUser?'),
      createAnAccount: this.$t('createAnAccount'),
    },
    loadingButtonLogin: false,
  }

  get locales(): Locale[] {
    return this.$i18n.locales.map((locale: any) => ({
      code: locale.code,
      label: locale.short,
    }))
  }

  get locale() {
    return this.locales.find((locale: Locale) => locale.code === this.$i18n.locale)
  }

  mounted() {
    //
  }

  clickedForgotYourPassword() {
    console.log('Forgot your password was clicked');
  }

  clickedCreateAnAccount() {
    console.log('Create an account was clicked');
  }

  async clickedLoginButton(form: LoginForm) {

    if (!form.username.trim().length || !form.password.trim().length) {
      return;
    }

    this.formLoginMicroSiteProps.loadingButtonLogin = true;

    await this.authStore.signIn(form);

    console.log('this.authStore.isAuthenticated', this.authStore.isAuthenticated)

    if (this.authStore.isAuthenticated)
      return this.$router.push(this.localePath('/dashboard'));

    window.alert(this.authStore.message)

    this.formLoginMicroSiteProps.loadingButtonLogin = false;
  }

  changedLocale(locale: Locale) {
    this.$router.push(this.$nuxt.switchLocalePath(locale.code));
  }
}
</script>

<style scoped>
.login-bg {
  background-image: url('../assets/img/login.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: left top;
}

.custom-form-login::v-deep input:-webkit-autofill {
  -webkit-text-fill-color: gray !important;
}
</style>