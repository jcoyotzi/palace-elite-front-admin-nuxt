<template>
  <div class="pe-flex pe-justify-between pe-items-center">
    <div class="pe-flex pe-items-center pe-gap-x-[10px]">
      <PE-icon class="pe-mx-3 pe-h-[39px] pe-w-[31px] pe-text-white">bed-icon</PE-icon>
      <span class="font-sans pe-text-sm pe-text-white pe-text-[16px]">{{ roomsLength }}</span>
    </div>

    <div
      :style="dividerStyle"
      class="pe-w-[1px] pe-h-[28px] pe-ml-[28px] pe-mr-[18px]"
    />

    <div class="pe-flex pe-items-center pe-gap-x-[10px]">
      <PE-icon class="pe-mx-3 pe-h-[39px] pe-w-[31px] pe-text-white">guest-icon</PE-icon>
      <span class="font-sans pe-text-sm pe-text-white pe-text-[16px]">
        {{ totalGuests }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Mixins, Prop} from 'vue-property-decorator'
import {DividerLine} from '~/src/ui/mixins/dividerLine'

@Component({
  name: 'PeBookingDesktopRoomSelector'
})
export default class PeBookingDesktopRoomSelector extends Mixins(DividerLine) {
  @Prop()
  roomsLength!: number | string

  @Prop()
  totalGuests!: number | string
}
</script>
