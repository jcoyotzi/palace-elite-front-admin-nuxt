<template>
  <div class="pe-flex pe-h-full lg:pe-mt-0 lg:pe-min-w-[300px]">
    <PESelect
      v-model="orderInput"
      class="pe-z-10 pe-w-full pe-min-w-[120px]"
      :label="label"
      :color="color"
      :items="items"
      :disabled="disabled"
    />
  </div>
</template>

<script lang="ts">
import {Component, Vue, Emit, Watch, Prop} from 'vue-property-decorator'

interface ISortItems {
  value: string
  text: string
}

interface ISort {
  label?: string
  items?: ISortItems[]
  color?: string
  value?: string
}

@Component
class Sort extends Vue implements ISort {
  @Prop({
    type: String,
    default: 'Sort By'
  })
  label!: string

  @Prop({
    type: Boolean,
    default: false
  })
  disabled!: boolean

  @Prop({
    type: Array,
    default: () => [
      {
        value: 'asc',
        text: 'Ascending'
      },
      {
        value: 'desc',
        text: 'Descendant'
      }
    ]
  })
  items!: ISortItems[]

  @Prop({
    type: String,

    default: 'medium'
  })
  color!: string

  @Prop({type: String, default: ''})
  readonly value!: string

  public orderInput: ISortItems = this.items[0]

  @Watch('value', {immediate: true})
  onChangeValue(value: ISortItems) {
    this.orderInput = value
  }

  @Watch('orderInput')
  onChange(value: ISortItems) {
    this.$emit('change', value)
  }
}
export default Sort
</script>
