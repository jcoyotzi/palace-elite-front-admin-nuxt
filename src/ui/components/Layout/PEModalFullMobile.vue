<template>
  <aside
    class="fixed px-6 py-6 top-0 right-0 h-full pe-w-[100%] transform overflow-auto bg-black-light transition-all duration-300 ease-in-out justify-between xl:hidden"
    :class="isActivateDrawer"
    style="z-index: 99999"
  >
    <slot />
  </aside>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator'

@Component({
  name: 'PEModalFullMobile'
})
export default class PEModalFullMobile extends Vue {
  @Prop({default: false, type: Boolean}) value!: boolean

  get bindingValue() {
    return this.value
  }

  set bindingValue(value: boolean) {
    this.$emit('input', value)
  }

  get isActivateDrawer() {
    return {
      'translate-x-0': this.bindingValue,
      hidden: !this.bindingValue
    }
  }

  closeDrawer(): void {
    this.bindingValue = false
  }
}
</script>
