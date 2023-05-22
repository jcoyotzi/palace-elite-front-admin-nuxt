import {LayoutStore} from './layoutStore'
import {BookingsStore} from './bookingsStore'

export const actions = {
  async nuxtServerInit() {
    const layoutStore = new LayoutStore()
    const bookingsStore = new BookingsStore()

    await bookingsStore.getTermsAndConditions()
    await layoutStore.fetchFooterStrapi()
    await layoutStore.fetchNavbarStrapi()
    await layoutStore.fetchMenuStrapi()
    await layoutStore.fetchDestinationsStrapi()
  }
}
