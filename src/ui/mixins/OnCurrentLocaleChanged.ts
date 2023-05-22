import { Vue, Component, Watch } from 'vue-property-decorator'
import { LayoutStore } from '../store/layoutStore';
import { ContentStore } from '../store/contentStore';

@Component
export default class OnCurrentLocaleChanged extends Vue {
  public layoutStore = new LayoutStore();
  public contentStore = new ContentStore();

  get currentLocale(): string {
    return this.layoutStore.currentLocale
  }

  @Watch('currentLocale')
  methodOnCurrentLocaleChanged(oldLocale: string, newLocale: string): void {
    this.onCurrentLocaleChanged(oldLocale, newLocale)
  }

  onCurrentLocaleChanged(_oldLocale: string, _newLocale: string): void {
    //
  }

  fetchStrapiPageFixed(callback: Function, slug: string, locale: string) {
    slug = this.contentStore.getValidateSlug(slug, locale)
    return callback(slug, locale);
  }
}