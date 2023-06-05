<template>
  <div class="ms-min-h-screen ms-flex">
    <div class="ms-hidden lg:ms-block xl:ms-w-3/4 login-bg">
    </div>
    <div class="ms-flex ms-justify-center ms-w-full xl:ms-w-1/4">
      <form action="#">
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
          <template #image>
            <figure class="ms-flex ms-justify-center">
              <img src="../assets/img/intelligence.svg" alt="Intelligence Logo">
            </figure>
          </template>
        </FormLoginMicroSite>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { AuthStore } from '../store/authStore';
import i18n from '~/src/ui/i18n/messages/login.lang'
import { FormLoginMicroSite, LoginForm } from '~/src/app/auth/domain/entities/loginForm';
import { Locale } from '~/src/app/auth/domain/entities/locale';

@Component({
  name: 'LoginPage',
  layout: 'guest',
  meta: {
    auth: false,
  },
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
    usernameErrors: [],
    passwordErrors: [],
  }

  get locales(): Locale[] {
    return this.$i18n.locales.map((locale: any) => ({
      code: locale.code,
      label: locale.name,
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

    const isValidForm = this.isValidForm(form);

    if (!isValidForm) {
      return;
    }

    this.formLoginMicroSiteProps.loadingButtonLogin = true;

    await this.authStore.signIn(form);

    if (this.authStore.isAuthenticated)
      return this.$router.push(this.localePath('/affiliate-search'));

    window.alert(this.authStore.message)

    this.formLoginMicroSiteProps.loadingButtonLogin = false;
  }

  public isValidForm(form: LoginForm): boolean {
    this.formLoginMicroSiteProps.usernameErrors = [];
    this.formLoginMicroSiteProps.passwordErrors = [];

    if (!form.username.trim().length) {
      this.formLoginMicroSiteProps.usernameErrors = [this.$t('usernameRequired')];
      return false;
    }
    
    if (!form.password.trim().length) {
      this.formLoginMicroSiteProps.passwordErrors = [this.$t('passwordRequired')];
      return false;
    }
  
    return true;
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