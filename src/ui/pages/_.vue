<template>
  <div>
    <CommonHeroWidget
      :booking-attrs="bookingAttrs"
      :calendar-data="calendarData"
      :hero-attrs="heroAttrs"
      :is-authenticated="userIsAuthenticated"
    />

    <div
      v-if="!components"
      class="pe-flex pe-flex-col pe-justify-center pe-items-center pe-bottom-0 pe-right-0 pe-w-full pe-h-[100vh] z-[100] pe-bg-black"
    >
      <PELoadingData />
    </div>

    <ContentBlockManager :blocks="components" />
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import { UseAuth } from '../store/auth'
import BookingWidgetMixin from '../mixins/Common/BookingWidgetMixin'
import BasePageStrapiMixin from '../mixins/BasePageStrapiMixin'

@Component({
  name: 'SlugBasePage',
  layout: 'default',
  meta: {
    auth: false,
  }
})
export default class SlugBasePage extends Mixins(BasePageStrapiMixin, BookingWidgetMixin) {
  public authStore = new UseAuth();

  get userIsAuthenticated() {
    return this.authStore.isAuthenticated
  }

  get userId() {
    return this.authStore.userAffiliationId
  }

  async beforeMount() {
    if (!this.slugPage.length) {
      const route = this.contentStore.getRouteWithSlugByPath(this.$route.path);
      this.slugPage = route?.slug || ''
    }

    await this.loadStrapiPageData();
  }

  mounted() {
    if (this.userIsAuthenticated)
      this.$nuxt.setLayout('default')
    else
      this.$nuxt.setLayout('auth')
  }
}
</script>
