import { LayoutStore } from "../store/layoutStore";

export default function (context: any) {
  const layoutStore = new LayoutStore();

  const localeRoute: string = context.localePath('/')
  layoutStore.currentLocale = localeRoute.substring(1) || 'en'

  context.app.i18n.onBeforeLanguageSwitch = (_oldLocale: any, _newLocale: any, _isInitialSetup: any, _context: any) => {
    //
  }

  // onLanguageSwitched called right after a new locale has been set
  context.app.i18n.onLanguageSwitched = (_oldLocale: any, newLocale: any) => {
    const layoutStore = new LayoutStore();
    layoutStore.currentLocale = newLocale;
  }
}