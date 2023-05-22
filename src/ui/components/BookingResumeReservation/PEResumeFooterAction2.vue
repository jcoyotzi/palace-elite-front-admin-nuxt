<template>
  <div class="pe-border-b pe-border-black pe-bg-black pe-bg-opacity-50">
    <div
      class="pe-flex pe-items-center pe-justify-center pe-gap-x-4 pe-font-sans pe-text-white pe-text-[16px]"
      :class="containerStyles"
      @click="handleClick"
    >
      <slot name="title" />
    </div>

    <transition name="dropdown">
      <div
        v-if="isOpen"
        class="pe-bg-black-light pe-text-white"
      >
        <slot name="content" />
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'

@Component({
  name: 'PEResumeFooterAction2'
})
export default class PEResumeFooterAction2 extends Vue {
  @Prop()
  private colapsable?: boolean

  private isOpen = false

  private handleClick() {
    if (this.isColapsable) {
      this.isOpen = !this.isOpen
    } else {
      this.$emit('click')
    }
  }

  get isColapsable() {
    return this.colapsable !== undefined && this.colapsable
  }

  get containerStyles() {
    return {
      'pe-cursor-pointer': this.isColapsable
    }
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
