<template>
  <div
    v-if="value"
    class="inset-0"
    :class="classes"
    :style="styles"
  ></div>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator'

@Component({
  name: 'PEOverlay'
})
export default class PEOverlay extends Vue {
  @Prop({type: Boolean, default: false}) absolute!: boolean

  @Prop({type: String, default: 'bg-black-pure'}) color!: string

  @Prop({type: [String, Number], default: 0.8}) opacity!: number | string

  @Prop({type: Boolean, default: false}) value!: boolean

  @Prop({type: [String, Number], default: 10}) zIndex!: number | string

  get classes() {
    return {
      absolute: this.absolute,
      fixed: !this.absolute,
      //[this.color]: true
    }
  }

  get styles() {
    return {
      opacity: this.opacity,
      zIndex: this.zIndex,
      background: 'rgb(39,37,39)'
    }
  }
}
</script>
<style scoped>
  .pe-bg-overlay{
    background: rgba(39,37,39,.8);
  }
</style>
