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
        :has-forgot-your-password-functionality="false"
        :has-create-an-account-functionality="false"
        @clicked-login-button="clickedLoginButton"
        @changed-locale="changedLocale"
      >
        <template #image>
          <figure class="ms-flex ms-justify-center">
            <img src="../assets/img/intelligence.svg" alt="Intelligence Logo">
          </figure>
        </template>
      </FormLoginMicroSite>
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
    errorMessages: [],
    usernameError: '',
    passwordError: '',
    loadingButtonLogin: false,
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
    if (this.authStore.isAuthenticated)
      return this.$router.push(this.localePath('/affiliate-search'));
  }

  async clickedLoginButton(form: LoginForm) {

    const isValidForm = this.isValidForm(form);

    if (!isValidForm) {
      return;
    }

    this.formLoginMicroSiteProps.loadingButtonLogin = true;

    const result = await this.authStore.signIn(form);

    if (result.isAuthenticated) {
      window.location.href = this.localePath('/affiliate-search');
    } else {
      const message = result.message || this.$t('incorrectUsernameOrPassword');
      this.formLoginMicroSiteProps.errorMessages = [message];
    }

    this.formLoginMicroSiteProps.loadingButtonLogin = false;
  }

  public isValidForm(form: LoginForm): boolean {
    this.formLoginMicroSiteProps.usernameError = '';
    this.formLoginMicroSiteProps.passwordError = '';

    if (!form.username.trim().length) {
      this.formLoginMicroSiteProps.usernameError = this.$t('usernameRequired');
    }
    
    if (!form.password.trim().length) {
      this.formLoginMicroSiteProps.passwordError = this.$t('passwordRequired');
    }

    if (
      this.formLoginMicroSiteProps.usernameError
      || this.formLoginMicroSiteProps.passwordError
    ) {
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
  --tw-text-opacity: 1;
  -webkit-text-fill-color: rgb(102 102 102 / var(--tw-text-opacity)) !important;
  -moz-text-fill-color: rgb(102 102 102 / var(--tw-text-opacity)) !important;
  -ms-text-fill-color: rgb(102 102 102 / var(--tw-text-opacity)) !important;
  -o-text-fill-color: rgb(102 102 102 / var(--tw-text-opacity)) !important;
}
</style>