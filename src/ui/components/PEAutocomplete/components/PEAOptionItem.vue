<template>
  <div
    :id="getId('pe_option', id)"
    class="flex w-full px-5 pt-[9px] pb-[7px] hover:bg-black-light"
    :class="dynamicStyle"
  >
    <p class="mr-2">{{ text }}</p>
    <PEChip
      v-show="showChip"
      class="pe-capitalize"
      :class="chipStyle(chipText)"
      >{{ chipText }}</PEChip
    >
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import {PEChip} from '@pr-elite-components-library/lib'

@Component({
  name: 'PEAOptionItem2',
  components: {
    PEChip
  }
})
export default class PEAOptionItem2 extends Vue {
  @Prop({type: Object, required: true})
  readonly item!: any

  @Prop({type: String, default: ''})
  readonly id!: string

  @Prop({type: String, default: '-'})
  readonly text!: string

  @Prop({type: String, default: ''})
  readonly chipText!: string

  @Prop({type: Boolean, default: false})
  readonly isSelected!: boolean

  @Prop({type: Boolean, default: false})
  readonly isHovered!: boolean

  @Prop({type: Boolean, default: false})
  readonly isDisabled!: boolean

  @Prop({type: Object, default: () => ({})})
  readonly chipColors!: {[index: string]: string}

  get showChip(): boolean {
    if (this.chipText === '' || this.chipText === undefined || this.chipText === null) {
      return false
    }
    return true
  }

  get dynamicStyle(): string {
    if (this.isDisabled) {
      return `pe-pointer-events-none pe-opacity-50`
    }

    if (this.isSelected) {
      return `bg-blue hover:bg-blue-light hover:text-black cursor-pointer`
    }

    if (this.isHovered) {
      const element = document.getElementById(this.getId('pe_option', this.id))
      element?.scrollIntoView()
      return `bg-black-light cursor-pointer`
    }
    return 'cursor-pointer'
  }

  getId(base: string, val: string) {
    return `pe_autocomplete_${base}_${val}`
  }

  chipStyle(content: string): string {
    let result = ''
    if (content.toLowerCase() in this.chipColors) {
      result = this.chipColors[content.toLowerCase()]
    } else {
      result = 'bg-blue-light text-black'
    }
    return result
  }
}
</script>

<style scoped></style>
