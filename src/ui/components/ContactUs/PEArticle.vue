<template>
  <article class="md:pe-w-[46%] pe-max-w-[726px] pe-flex pe-flex-col pe-items-center">
    <PEImageStrapi
      :image="image"
      class="pe-mb-12 pe-w-screen md:pe-w-full"
    />
    <section class="flex justify-center pe-w-[80%] sm:pe-w-full pe-flex-col pe-items-center">
      <p class="pe-text-3xl pe-font-serif sm:pe-uppercase pe-text-blue-light pe-mb-5 pe-text-[32px] pe-font-normal">{{ title }}</p>
      <p class="pe-text-base pe-text-white pe-mb-12 pe-text-center">{{ content }}</p>
      <PEButton
        :secondary="true"
        :label="buttonLabel"
        :uppercase="true"
        class="sm:pe-w-60 pe-w-full"
        @click="articleClick"
      />
    </section>
  </article>
</template>
<script lang="ts">
import {Component, Vue, Prop, Emit} from 'vue-property-decorator'

@Component({
  name: 'PEArticle'
})
export default class PEArticle extends Vue {
  @Prop()
    image!: any

  @Prop({
    type: String,
    default: ''
  })
    title!: string

  @Prop({
    type: String,
    default: ''
  })
    content!: string

  @Prop({
    type: String,
    default: ''
  })
    buttonLabel!: string

  @Emit()
  articleClick(e: any) {
    return e
  }
}
</script>
<style lang="scss" scoped></style>
