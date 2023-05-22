<template>
  <div class="pe-flex pe-gap-x-[15px] md:pe-gap-x-[30px] pe-bg-black">
    <div
      v-for="({page, title}, index) of items"
      :key="index"
      class="pe-flex pe-items-center pe-gap-x-[15px] md:pe-gap-x-[30px]"
      @click="!isLastPosition(index) ? navigateTo(page, title, index) : null"
    >
      <span class="pe-text-[12px] md:pe-text-[16px] pe-font-sans pe-cursor-pointer pe-text-white">
        {{ title }}
      </span>
      <PEIcon
        v-if="!isLastPosition(index)"
        class="pe-text-blue-light pe-w-6 pe-h-6"
        >chevron-right</PEIcon
      >
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Emit} from 'vue-property-decorator'
import i18n from '~/src/ui/i18n/wallet/breadcrumb.lang'
// Interfaces
import {BreadcrumbItem} from '~/interfaces/Membership/Membership.interface'

@Component({
  i18n
})
export default class Breadcrumbs extends Vue {
  @Prop({type: Array, required: true})
  items!: BreadcrumbItem[]

  public isLastPosition(position: number) {
    const sizeByPosition = position + 1
    return this.items.length === sizeByPosition
  }

  public navigateTo(page: string, title: string, index: number) {
    this.onBreadcrumbItem(page, title, index)
    if (index === 0) this.onBreadcrumbIndex(index)

    this.$nuxt.$router.push(page)
  }

  // Emits

  @Emit()
  onBreadcrumbItem(page: string, title: string, index: number) {
    const items = []
    items.push(this.items[0])

    if (index === 0)
      items.push({
        page: '/wallet/summary',
        title: this.$t('summary') as string
      })
    else
      items.push({
        page,
        title
      })

    return items
  }

  @Emit()
  onBreadcrumbIndex(index: number) {
    return index
  }
}
</script>
