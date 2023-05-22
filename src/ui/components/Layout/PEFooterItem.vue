<template>
  <div class="flex flex-col text-white">
    <div class="">
      <p class="my-4 font-semibold">{{ title }}</p>
      <PEButton
        v-for="(link, index) in links"
        :key="index"
        v-bind="link"
        text
        class="!pe-text-white !pe-w-full !pe-py-0 !pe-h-[40px] !pe-no-underline"
      >
      </PEButton>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator'

@Component({
  name: 'PEFooterItem'
})
export default class PEFooterItem extends Vue {
  @Prop({
    type: String,
    default: ''
  })
  title!: string

  @Prop({
    type: Array,
    default: () => ({}),
    required: true
  })
  links!: {
    page: object
    label: string
  }[]

  public returnLink(link: any) {
    if (link.type === 'external' || link.type === 'url') {
      return link.url
    }

    if (link.type === 'page') {
      return `/${link.page.data.attributes.slug}`
    }

    return link
  }
}
</script>
<style lang="scss"></style>
