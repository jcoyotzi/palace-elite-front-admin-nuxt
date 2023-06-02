import VueI18n from 'vue-i18n';

export interface BreadcrumItem {
  key: string;
  name: string | VueI18n.TranslateResult;
  path: string;
}