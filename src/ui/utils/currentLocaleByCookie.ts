import { getCookie } from "./cookieHelper";

export const currentLocaleByCookie = () => getCookie('i18n_redirected')

export const currentLocale = currentLocaleByCookie;

export default currentLocaleByCookie;
