<template>
  <div class="ms-flex ms-items-center ms-min-h-[56px] ms-bg-white">
    <div v-for="(item, index) in items" :key="index">
      <nuxt-link
        class="ms-text-gray-500 xl:ms-text-xs"
        :class="{'ms-text-blue-dark ms-font-semibold': isLastItem(index)}"
        :to="localePath(item.path)"
      >{{ item.name }}</nuxt-link>
      <PEIcon
        v-if="!isLastItem(index)"
        class="ms-float-right ms-mt-[3px]"
      >chevron-right</PEIcon>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import BreadcrumStore from '../store/breadcrumStore';
import { BreadcrumItem } from '~/src/app/breadcrumb/domain/entities/BreadcrumItem';
import i18n from "~/src/ui/i18n/messages/breadcrumb.lang";

@Component({
  name: 'Breadcrum',
  i18n,
})
export default class Breadcrum extends Vue {
  public breadcrumStore = new BreadcrumStore();

  get items(): BreadcrumItem[] {
    return this.breadcrumStore.breadcrumb.reduce((items: BreadcrumItem[], key: string) => {
      const item = this.breadcrumStore.items.find((item: BreadcrumItem) => item.key === key)
      if (item) items.push(item)
      return items
    }, [])
  }

  isLastItem(index: number) {
    return index === this.items.length - 1
  }

  mounted() {
    this.breadcrumStore.setItems([
      {
        key: 'home',
        name: this.$t('home'),
        path: '/',
      },
      {
        key: 'affiliateSearch',
        name: this.$t('affiliateSearch'),
        path: '/affiliate-search',
      },
      {
        key: 'bpg',
        name: this.$t('bpg'),
        path: '/affiliate/bpg',
      },
      {
        key: 'bpg.policies',
        name: this.$t('policies'),
        path: '/affiliate/bpg/policies',
      },
      {
        key: 'bpg.privacyPolicy',
        name: this.$t('privacyPolicy'),
        path: '/affiliate/bpg/privacy-policy',
      },
    ])
  }
}
</script>