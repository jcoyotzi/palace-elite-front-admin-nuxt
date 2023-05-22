<template>
  <div class="pe-relative pe-w-full">
    <PEHero v-bind="heroAttrsComputed" />
  </div>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator'

@Component({
  name: 'HeroWidgetPayLink'
})
export default class HeroWidgetPayLink extends Vue {
  @Prop({type: Object, default: {}}) heroAttrs!: any

  @Prop({type: Boolean, default: false}) showTitle!: boolean

  get heroAttrsComputed() {
    return {
      ...this.heroAttrs,
      gradientTop: false,
      title: !this.showTitle ? this.heroAttrs.title : ''
    }
  }
}
</script>
