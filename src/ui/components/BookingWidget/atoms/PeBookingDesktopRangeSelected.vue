<template>
  <div class="pe-flex pe-items-center pe-gap-x-[16px]">
    <div class="pe-flex pe-gap-x-[8px] pe-items-center">
      <PE-icon class="pe-mx-3 pe-h-[39px] pe-w-[31px] pe-text-white">calendar</PE-icon>
      <span class="font-sans pe-text-sm pe-text-white pe-text-[16px]">{{ checkIn }}</span>
    </div>

    <div
      class="pe-w-[1px] pe-h-[28px]"
      :style="dividerStyle"
    />

    <div class="font-sans pe-text-sm pe-text-white pe-text-[16px]">
      {{ checkOut }}
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Mixins} from 'vue-property-decorator'
import {DividerLine} from '~/src/ui/mixins/dividerLine'

@Component({
  name: 'PeBookingDesktopRangeSelected'
})
export default class PeBookingDesktopRangeSelected extends Mixins(DividerLine) {
  @Prop()
  checkIn!: string

  @Prop()
  checkOut!: string
}
</script>
