<template>
  <div>
    <slot
      name="activator"
      :on="activatorEvent"
    />

    <PEModal
      :slim-modal="true"
      class="pe-z-70"
      :value="isActive"
      @input="toggle"
    >
      <template #content>
        <slot />
      </template>
    </PEModal>

    <!--
    <Portal
      :disabled="isActive"
      prepend
      selector="body"
    >
      <transition
        enter-class="!opacity-0"
        leave-to-class="!opacity-0"
        leave-active-class="transition-opacity duration-200 z-20"
        enter-active-class="transition-opacity duration-200 z-20"
      >
        <PEOverlay :value="isActive" />
      </transition>
    </Portal>

    <Portal selector="body">
      <div
        id="exampleModalCenter"
        class="fade show fixed top-0 left-0 z-40 hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
        tabindex="-1"
        aria-labelledby="exampleModalCenterTitle"
        aria-modal="true"
        role="dialog"
        :style="activeStyles"
        @click.self="toggle"
      >
        <div class="modal-dialog modal-dialog-centered pointer-events-none relative w-auto">
          <transition
            enter-class="!opacity-0"
            leave-to-class="!opacity-0"
            leave-active-class="transition-opacity duration-200 z-20"
            enter-active-class="transition-opacity duration-200 z-20"
          >
            <div
              v-if="isActive"
              class="modal-content pointer-events-auto relative flex w-auto flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none"
            >
              <slot />
            </div>
          </transition>
        </div>
      </div>
    </Portal>
    -->
  </div>
</template>

<script lang="ts">
import {Component, Vue, Prop, Watch} from 'vue-property-decorator'
// @ts-ignore
// import { Portal } from '@linusborg/vue-simple-portal'
import PEOverlay from './PEOverlay.vue'

@Component({
  name: 'PEDialog',
  components: {
    PEOverlay
    // Portal
  }
})
export default class PEDialog extends Vue {
  @Prop({type: Boolean, default: false}) value!: boolean

  isActive = false

  @Watch('value', {immediate: true})
  onManualActivation() {
    if (this.value) this.open()
    else this.close()
  }

  open() {
    this.isActive = true
    this.$emit('open')
    this.$emit('input', true)
  }

  close() {
    this.isActive = false
    this.$emit('close')
    this.$emit('input', false)
  }

  toggle() {
    if (this.isActive) this.close()
    else this.open()
  }

  get activeStyles() {
    return {
      display: this.isActive ? 'block' : null
    }
  }

  get activatorEvent() {
    return {
      click: this.toggle
    }
  }
}
</script>
