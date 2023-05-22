import { Plugin } from '@nuxt/types'
import { ContentStore } from '../store/contentStore'
import { getRoutesWithSlug } from '../i18n/pagesFromStrapi'

const plugin: Plugin = async function plugin(_context) {
  const contentStore = new ContentStore();
  contentStore.routesWithSlug = await getRoutesWithSlug();
}

export default plugin
