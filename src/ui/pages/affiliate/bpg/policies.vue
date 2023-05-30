<template>
  <div class="ms-mt-4 lg:ms-mt-12">
    <div
      class="ms-my-4 lg:ms-my-12 ms-text-blue-dark ms-font-semibold lg:ms-text-[40px] ms-flex ms-justify-center ms-uppercase"
    >
      {{ contentPage?.title }}
    </div>

    <div>
      <PETabsMicroSite
        :tabs="contentPage?.tabs"
        v-model="indexTabs"
      />
    </div>

    <div class="ms-my-[100px] ms-text-gray-500 wrapper-tabs">
      <div
        class="ms-text-gray-500 ms-font-sans ms-font-normal ms-text-[16px]"
        v-if="showContentCollection"
        v-html="contentTab?.content"
      />
      <ExpansionPanelMicroSite
        v-else
        :showConsiderationsList="showConsiderationsList"
        class="ms-mb-6"
        :key="index"
        v-for="(policie, index) in contentTab?.content"
        v-bind="getContent(policie)"
      />
    </div>

    <div class="ms-text-gray-500">
      {{ contentPage?.description }}
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Mixins} from 'vue-property-decorator'
import i18n from '~/src/ui/i18n/messages/bpg.lang'
// import BookingWidgetMixin from '../mixins/Common/BookingWidgetMixin'
// import {StrapiComponent} from '~/strapi/strapi-blocks.service'
// import HeroDto from '~/src/app/layout/domain/dto/heroDto'
import {ContentDataPageMapper} from '~/src/app/bpg/domain/mapper/contentDataPageMapper'
// import ConstructSlugProvitional from '../mixins/constructSlugProvitional'
import {BasePageSlugs} from '~/src/app/Strapi/StrapiConfiguration'
import BasePageStrapiMixin from '~/src/ui/mixins/BasePageStrapiMixin'
// import {UseAuth} from '../store/auth'
import {TypeTabPolicies} from '~/src/app/bpg/domain/entities/strapiBpg'

@Component({
  name: 'BPGPolicies',
  layout: 'authenticated',
  meta: {
    auth: true,
    breadcrumb: ['home', 'affiliateSearch', 'bpg', 'bpg.policies']
  },
  i18n,
})
export default class BPGPolicies extends Mixins(
  // BookingWidgetMixin,
  BasePageStrapiMixin,
  // ConstructSlugProvitional
) {
  // public components: StrapiComponent[] = []

  public indexTabs: number = 0

  public contentPage: any = {
    content: []
  }

  public get showConsiderationsList(): boolean {
    return this.contentTab?.content.length > 0
  }

  // public get heroAttrs(): HeroDto {
  //   return this.contentStore.heroDefault
  // }

  public get contentTab() {
    if (this.showContentCollection)
      return this.contentPage?.tabs?.find((tab: any) => tab.code === TypeTabPolicies.COLLECTION)
    return this.contentPage?.tabs?.find((tab: any) => tab.code === TypeTabPolicies.RESERVATIONS)
  }

  public get showContentCollection() {
    return this.indexTabs === TypeTabPolicies.COLLECTION
  }

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

  getContent(policie: any) {
    return {
      ...policie,
      description: policie?.content
    }
  }

  async beforeMount() {
    const strapi = await this.loadStrapiPageData(BasePageSlugs.BPGPolicies)
    this.contentPage = await ContentDataPageMapper.policys(strapi)
    if (this.contentPage?.tabs.length > 0) this.indexTabs = 0
  }
}
</script>
<style scoped>
::v-deep .wrapper-tabs ul {
  margin-left: 10px !important;
  list-style-type: disc !important;
  list-style-position: inside;
}
::v-deep .wrapper-tabs ul li {
  margin-left: 15px !important;
}
</style>
