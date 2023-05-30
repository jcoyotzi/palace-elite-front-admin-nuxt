<template>
  <div class="ms-px-4 ms-mx-auto ms-pb-20 md:ms-mt-24">
    <div
      class="ms-my-20 ms-text-blue-dark ms-font-semibold ms-text-[40px] ms-flex ms-justify-center ms-uppercase"
    >
      {{ contentPage?.title }}
    </div>

    <div>
      <div
        class="ms-text-white-light ms-font-sans ms-font-normal"
        v-html="contentPage?.content"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Mixins} from 'vue-property-decorator'
// import BookingWidgetMixin from '../mixins/Common/BookingWidgetMixin'
// import {StrapiComponent} from '~/strapi/strapi-blocks.service'
// import HeroDto from '~/src/app/layout/domain/dto/heroDto'
// import {ContentStore} from '../store/contentStore'
import i18n from '~/src/ui/i18n/messages/bpg.lang'
import {ContentDataPageMapper} from '~/src/app/bpg/domain/mapper/contentDataPageMapper'
// import ConstructSlugProvitional from '../mixins/constructSlugProvitional'
import BasePageStrapiMixin from '~/src/ui/mixins/BasePageStrapiMixin'
import {BasePageSlugs} from '~/src/app/Strapi/StrapiConfiguration'
// import {UseAuth} from '../store/auth'

@Component({
  name: 'BPGPrivacyPolicy',
  layout: 'authenticated',
  meta: {
    auth: true,
    breadcrumb: ['home', 'affiliateSearch', 'bpg', 'bpg.privacyPolicy']
  },
  i18n,
})
export default class BPGPrivacyPolicy extends Mixins(
  // BookingWidgetMixin,
  BasePageStrapiMixin,
  // ConstructSlugProvitional
) {
  // public components: StrapiComponent[] = []

  public contentPage: any = {}

  // public get heroAttrs(): HeroDto {
  //   return this.contentStore.heroDefault
  // }

  // get authStore(): UseAuth {
  //   return new UseAuth()
  // }

  // get userIsAuthenticated() {
  //   return this.authStore.isAuthenticated
  // }

  // async mounted() {
  //   if (this.userIsAuthenticated) this.$nuxt.setLayout('default')
  //   else this.$nuxt.setLayout('auth')
  // }

  async beforeMount() {
    const strapi = await this.loadStrapiPageData(BasePageSlugs.BPGPrivacyPolicy)

    this.contentPage = await ContentDataPageMapper.privacy(strapi)
  }
}
</script>
