<template>
  <div class="pe-flex pe-items-center">
    <span class="pe-mr-5 pe-text-white">{{ label }}</span>
    <PESelect
      v-model="perPage"
      class="pe-w-[120px]"
      :items="items"
      list-dense
      color="medium"
      :disabled="disabled"
    />
  </div>
</template>

<script lang="ts">
import {Component, Vue, Watch, Prop} from 'vue-property-decorator'

interface IPerpage {
  label?: string
  items?: string[]
  color?: string
  value?: string
}

@Component
class PerPage extends Vue implements IPerpage {
  // #region Props
  @Prop({
    type: String,
    default: 'Rows per page:'
  })
  label!: string

  @Prop({
    type: Boolean,
    default: false
  })
  disabled!: boolean

  @Prop({
    type: String,
    default: 'medium'
  })
  color!: string

  @Prop({
    type: Array,
    default: () => ['5', '10', '25', '50', '100']
  })
  items!: string[]

  @Prop({type: String, default: '5'})
  readonly value!: string
  // #endregionProps

  public perPage: string = '5'

  // #region Watchers
  @Watch('value', {immediate: true})
  onChangeValue(value: string) {
    this.perPage = value
  }

  @Watch('perPage')
  onChange(value: number) {
    this.$emit('change', value)
  }
  // #endregion Watchers
}

export default PerPage
</script>
