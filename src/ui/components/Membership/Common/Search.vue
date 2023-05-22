<template>
  <PEInput
    :value="value"
    :label="label"
    :color="color"
    type="text"
    @input="input"
  >
    <template #append-inner>
      <PEIcon
        class="pe-mr-3 pe-fill-transparent pe-text-white"
        color="medium"
        >search</PEIcon
      >
    </template>
  </PEInput>
</template>

<script lang="ts">
import {Component, Vue, Emit, Prop} from 'vue-property-decorator'

// Interfaces
interface IPESearch {
  color?: string
  label?: string
  value: string
}

@Component
class Search extends Vue implements IPESearch {
  // #region Props
  @Prop({
    type: String,
    default: 'medium'
  })
  readonly color?: string

  @Prop({type: String, default: 'Search'})
  readonly label?: string

  @Prop({type: String, default: ''})
  readonly value!: string
  // #endregion Props

  // #region Emits
  @Emit()
  input(input: string) {
    return input
  }
  // #endregion Emits
}
export default Search
</script>
