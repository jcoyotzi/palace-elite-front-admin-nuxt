<template>
  <component
    :is="linkType"
    v-bind="linkProps"
  >
    <slot />
  </component>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator'
import {LinkTypes} from '~/interfaces/Links'
import {LinkEntity} from '~/src/app/layout/domain/entities/linkEntity'

@Component({
  name: 'Link'
})
export default class Link extends Vue {
  @Prop({type: Object}) link!: LinkEntity | null

  @Prop({type: String, default: null}) customPath!: String

  get linkType() {
    return this.link ? this.link.tag : 'div'
  }

  get linkProps() {
    if (!this.link) return {}
    return this.link.tag === LinkTypes.NUXT
      ? {to: this.link.to}
      : {href: this.link.href, target: this.link.tag}
  }
}
</script>
