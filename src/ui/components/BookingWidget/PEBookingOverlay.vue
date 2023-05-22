<template>
  <div
    :class="dropdownClasses"
    @click="click"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, Emit} from 'vue-property-decorator'

@Component({
  name: 'PEBookinOverlay',
  components: {}
})
export default class PEBookinOverlay extends Vue {
  @Prop({type: Boolean, default: false})
  readonly value!: boolean

  @Prop({type: String, default: 'pe-z-[31]'})
  readonly zIndex!: string

  @Prop({type: String, default: 'pe-bg-black-light'})
  readonly overlayColor!: string

  defaultClasses = 'pe-fixed pe-top-0 pe-left-0 pe-right-0 pe-bottom-0 pe-w-full pe-h-full  '

  get dropdownClasses() {
    return {
      [this.defaultClasses]: true,
      [this.overlayColor]: true,
      [this.zIndex]: true,
      hidden: !this.value
    }
  }

  click(val: any) {
    this.$emit('click', val)
  }
}
</script>
