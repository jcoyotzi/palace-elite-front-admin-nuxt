<template>
  <div
    class="pe-expansion-head pe-flex pe-items-center pe-text-white"
    @click.prevent="openSectionPaymentLink()"
  >
    <PEIcon
      class="pe-text-blue-light md:pe-h-[20px] md:pe-w-[20px] lg:pe-h-[32px] lg:pe-w-[32px]"
      :class="getClassIconExpand"
      width="32"
      height="32"
      >chevron-up</PEIcon
    >
    <p
      class="pe-ml-[5px] pe-text-base pe-leading-[22px] md:pe-text-xs lg:pe-pr-[17px] lg:pe-text-base"
    >
      {{ text }}
    </p>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import {BookingsStore} from '~/src/ui/store/bookingsStore'

@Component
export default class PETExpansionHeader extends Vue {
  @Prop({type: String, default: 'Expand'})
  readonly text!: string

  @Prop() readonly index!: number

  get bookingsStore(): BookingsStore {
    return new BookingsStore()
  }

  get reservation() {
    return this.bookingsStore.paginationReservations.items[this.index]
  }

  get getClassIconExpand() {
    return {
      '!pe-rotate-180': !this.reservation.sendPaymentLink
    }
  }

  openSectionPaymentLink() {
    this.bookingsStore.paginationReservations.items[this.index].sendPaymentLink =
      !this.reservation.sendPaymentLink
  }
}
</script>

<style scoped></style>
