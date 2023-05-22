<template>
  <transition
    enter-class="pe-opacity-0"
    enter-active-class="pe-ease-out pe-transition-medium"
    enter-to-class="pe-opacity-100"
    leave-class="pe-opacity-100"
    leave-active-class="pe-ease-out pe-transition-medium"
    leave-to-class="pe-opacity-0"
  >
    <section>
      <!-- Background -->
      <div
        v-show="isOpen"
        class="pe-fixed pe-inset-0 pe-transition-opacity pe-z-[30]"
      >
        <div class="pe-absolute pe-justify-between pe-inset-0 pe-bg-black pe-opacity-75"> </div>
      </div>

      <div
        v-show="isOpen"
        class="pe-fixed pe-right-[5%] pe-inset-y-0 md:pe-inset-0 pe-transition-opacity pe-z-[70] md:pe-z-[70]"
      >
        <div
          class="pe-absolute pe-top-[10px] pe-right-[5%] md:pe-right-[51%] lg:pe-right-[34%] pe-z-[70] md:pe-z-[30]"
        >
          <PEButton
            class="!pe-h-[40px] pe-w-auto pe-p-0 pe-top-0"
            text
            @click.prevent="closeDrawer"
          >
            <PEIcon
              size="40"
              class="pe-text-white"
              >close-circle-modal</PEIcon
            >
          </PEButton>
        </div>
      </div>

      <!-- Aside Body -->
      <aside class="pe-relative pe-h-[100vh]">
        <div
          class="pe-fixed pe-top-0 pe-right-0 pe-z-70 pe-h-full pe-w-[100%] md:pe-w-[50%] lg:pe-w-[33%] pe-transform pe-bg-black pe-transition-all pe-duration-300 pe-ease-in-out pe-overflow-auto"
          :class="isActivateDrawer"
        >
          <slot />
        </div>
      </aside>

      <div
        v-show="isOpen"
        class="pe-fixed md:hidden pe-right-[5%] pe-inset-y-0 md:pe-inset-0 pe-transition-opacity pe-z-[70] md:pe-z-[70]"
      >
        <div
          class="pe-absolute pe-top-[10px] pe-right-[5%] md:pe-right-[51%] lg:pe-right-[34%] pe-z-[70] md:pe-z-[30]"
        >
          <PEButton
            class="!pe-h-[40px] pe-w-auto pe-p-0 pe-top-0"
            text
            @click.prevent="closeDrawer"
          >
            <PEIcon
              size="40"
              class="pe-text-white"
              >close-circle-modal</PEIcon
            >
          </PEButton>
        </div>
      </div>
    </section>
  </transition>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator'
import i18n from '~/src/ui/i18n/common/drawer.lang'

@Component({
  i18n,
  name: 'BookingsDrawer'
})
export default class Drawer extends Vue {
  @Prop({default: false, type: Boolean})
  value!: boolean

  desktopMatcher: MediaQueryList | null = null

  desktop = false

  closeDrawer(): void {
    this.isOpen = false
  }

  get isOpen(): boolean {
    return this.value
  }

  set isOpen(value) {
    // console.log(value)
    this.$emit('input', value)
  }

  get isActivateDrawer(): string {
    return this.isOpen ? 'pe-translate-x-0' : 'pe-hidden'
  }
}
</script>
