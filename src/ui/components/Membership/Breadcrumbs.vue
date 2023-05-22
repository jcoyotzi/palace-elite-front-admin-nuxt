<template>
  <div class="pe-flex pe-flex-wrap pe-bg-black">
    <div
      v-for="({page, title}, index) of items"
      :key="index"
      class="pe-flex pe-items-center"
      @click="!isLastPosition(index) ? navigateTo(page, title, index) : null"
    >
      <span class="pe-cursor-pointer pe-text-white pe-mr-5 md:pe-mr-7">{{ title }}</span>
      <PEIcon
        v-if="!isLastPosition(index)"
        class="pe-text-blue-light pe-w-6 pe-h-6 pe-mr-5 md:pe-mr-7"
        >chevron-right</PEIcon
      >
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Emit} from 'vue-property-decorator'

// Interfaces
import {BreadcrumbItem} from '~/interfaces/Membership/Membership.interface'

@Component
export default class Breadcrumbs extends Vue {
  @Prop({type: Array, required: true})
  items!: BreadcrumbItem[]

  // Methods

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
        page: this.localePath('/membership/SummaryAndPayments'),
        title: this.$t('membership.summaryAndPayments'),
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
