<template>
    <div :class="divClass">
        <nuxt-link
            v-for="locale in locales"
            :key="locale.code"
            :class="linkClass"
            :to="getPathToSwitchLocale(locale.code)"
            tabindex="-1"
        >{{ locale[display] }}</nuxt-link>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { LocaleObject } from '@nuxtjs/i18n';
import { ContentStore } from '../../store/contentStore';
import { currentLocale } from '../../utils/currentLocaleByCookie';

@Component({
  name: 'LangSwitcher'
})
export default class LangSwitcher extends Vue {
  @Prop({required: false, type: String, default: 'code' }) display!: string;

  @Prop({required: false, type: String, default: '' }) divClass!: string;

  @Prop({required: false, type: String, default: '' }) linkClass!: string;

  public contentStore = new ContentStore();

  get locales(): string[] | LocaleObject[] {
    return this.$i18n.locales
  }

  getPathToSwitchLocale(locale: string): string {
    const currentPath = this.$route.path;

    if (locale === currentLocale())
      return currentPath;

    const nextRoute = this.contentStore.getNextRouteByPath(currentPath, locale);

    if (nextRoute) {
      return nextRoute.path;
    }

    return this.localePath(currentPath, locale);
  }
}
</script>