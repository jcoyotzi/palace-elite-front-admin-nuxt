<template>
  <div
    class="pe-flex pe-cursor-pointer pe-gap-3"
    @click.prevent="goBack"
  >
    <PEIcon
      class="pe-text-blue-light"
      size="25"
      >chevron-left</PEIcon
    >
    <p class="pe-text-white">{{ buttonLabel }}</p>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'

@Component({
  name: 'button-back'
})
export default class ButtonBack extends Vue {
  @Prop({
    type: String,
    default: 'Back to list'
  })
  buttonLabel!: string

  @Prop({
    type: String,
    default: 'chevron-left'
  })
  iconName!: string

  goBack() {
    this.$emit('back')
  }
}
</script>
