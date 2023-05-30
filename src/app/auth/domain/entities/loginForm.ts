import VueI18n from 'vue-i18n';
import { Locale } from "./locale";

export interface LoginForm {
  username: string;
  password: string;
}

export interface FormLoginMicroSite {
  locale?: Locale;
  labels: {
    login: string | VueI18n.TranslateResult;
    welcome: string | VueI18n.TranslateResult;
    usernamePlaceholder: string | VueI18n.TranslateResult;
    passwordPlaceholder: string | VueI18n.TranslateResult;
    loginButton: string | VueI18n.TranslateResult;
    forgotYourPassword: string | VueI18n.TranslateResult;
    newUser: string | VueI18n.TranslateResult;
    createAnAccount: string | VueI18n.TranslateResult;
  },
  loadingButtonLogin: boolean;
  usernameErrors?: string[] | VueI18n.TranslateResult[];
  passwordErrors?: string[] | VueI18n.TranslateResult[];
}

export default LoginForm;