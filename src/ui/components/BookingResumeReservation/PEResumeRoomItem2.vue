<template>
  <div
    :class="containerBackgroundStyle"
    class="pe-border-b pe-border-black"
  >
    <div class="pe-flex pe-justify-between pe-px-5 pe-py-4">
      <div
        class="pe-flex pe-cursor-pointer pe-gap-4"
        @click="collapse"
      >
        <PEIcon
          :class="chevronUpClasses"
          >chevron-up</PEIcon
        >
        <PEIcon
          :class="chevronDownClasses"
          >chevron-down</PEIcon
        >

        <div class="pe-flex pe-flex-col pe-gap-y-2">
          <div class="pe-flex pe-justify-between pe-gap-x-2">
            <span
              class="pe-items-baseline pe-font-sans pe-font-semibold pe-uppercase pe-text-white pe-text-[16px]"
            >
              <slot name="title" />
            </span>
            <PEChip class="pe-text-white">
              <slot name="chip-content" />
            </PEChip>
          </div>

          <div class="pe-text-xs pe-text-white">
            <slot name="subtitle" />
          </div>
        </div>
      </div>

      <div class="pe-flex pe-gap-3">
        <slot name="content-quick-actions" />
      </div>
    </div>

    <transition name="dropdown">
      <div
        v-if="isOpen"
        class="pe-px-5 pe-pb-4"
      >
        <div class="pe-ml-8 pe-text-xs pe-text-white">
          <div class="pe-col-start-2 pe-col-end-13 pe-gap-2 pe-text-white">
            <slot name="content-text" />
          </div>

          <div class="pe-col-start-2 pe-col-end-13 pe-gap-2 pe-text-white">
            <slot name="content-actions" />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator'

@Component({
  name: 'PEResumeRoomItem2',
  components: {}
})
export default class PEResumeRoomItem2 extends Vue {
  @Prop()
  disabled?: boolean

  @Prop({default: true})
  private allowOpen!: boolean

  private showChip = true

  private isOpen = false

  get slotsData() {
    return this.$slots
  }

  mounted() {
    this.inspectSlots()
  }

  @Watch('slotsData', {deep: true})
  onSlotDataChange(_newVal: any) {
    this.inspectSlots()
  }

  @Watch('allowOpen')
  onAllowOpenChange(_newVal: boolean) {
    if (_newVal === false) {
      this.isOpen = false
    }
  }

  private inspectSlots() {
    this.showChip = !(
      this.$slots['chip-content'] === undefined ||
      this.$slots['chip-content'][0].text?.trim().length === 0
    )
  }

  private collapse() {
    if (this.allowOpen) {
      this.isOpen = !this.isOpen
    }
  }

  get iconClasses() {
    return [
      'fill-transparent',
      'text-blue-light',
    ]
  }

  get chevronUpClasses() {
    return [this.isOpen ? 'h-[25px] w-[25px] mr-2' : 'h-0 w-0 absolute', ...this.iconClasses]
  }

  get chevronDownClasses() {
    return [!this.isOpen ? 'h-[25px] w-[25px] mr-2' : 'h-0 w-0 absolute', ...this.iconClasses]
  }

  get isQuickActionsAvailable() {
    return this.$slots['content-quick-actions'] !== undefined
  }

  get isChipAvailable() {
    return this.$slots['chip-content'] !== undefined
  }

  get isDisabled() {
    return this.disabled !== undefined && this.disabled
  }

  get containerBackgroundStyle() {
    return {
      'pointer-events-none opacity-50': this.isDisabled,
      'bg-black bg-opacity-50 border-l-4 border-l-blue-light': this.isOpen,
      'bg-black-light': !this.isOpen
    }
  }

  @Watch('disabled', {immediate: true})
  onDisabledChanges() {
    // this.isOpen = !this.isDisabled
  }
}
</script>

<style scoped>
.dropdown-enter,
.dropdown-leave-to {
  transform: scaleY(0.7);
  opacity: 0;
}

.dropdown-enter-to,
.dropdown-leave {
  opacity: 1;
  transform: scaleY(1);
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.1s ease-out;
  transform-origin: top center;
}
</style>
