<template>
  <div class="pe-w-full pe-min-h-[863px] pe-bg-black-light pe-relative pe-left-0 pe-py-24">
    <PEOfferText
      :title="title"
      class="pe-max-w-[550px] pe-mx-auto pe-mb-14 pe-max-h-[150px]"
    />
    <div class="pe-w-11/12 pe-mx-auto info-section pe-max-w-[1547px]">
      <section
        v-for="(section, index) of sections"
        :key="index"
        class="pe-mb-16 pe-w-[323px]"
        :class="{'!pe-w-auto': sections.length < 4}"
      >
        <span class="pe-w-16 pe-h-px pe-bg-blue-light pe-block pe-mb-6" />
        <p class="pe-text-blue-light">{{ section.title }}</p>
        <ul class="pe-text-white">
          <li
            v-for="(item, i) of section.content"
            :key="i"
          >
            <p>{{ item }}</p>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>
<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import {BannerInfoSection} from './types/PEBannerInfoTypes'

@Component({
  name: 'PEBannerLinks',
  components: {}
})
export default class PEBannerLinks extends Vue {
  @Prop({
    type: String,
    default: ''
  })
  title!: string

  @Prop({
    default: []
  })
  sections!: BannerInfoSection[]
}
</script>
<style lang="scss" scoped>
.info-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));
  max-width: 1590px;
  justify-items: center;
}
</style>
