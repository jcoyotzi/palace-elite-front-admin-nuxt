<template>
  <section>
    <div
      class="pe-flex pe-max-w-[374px] pe-flex-col pe-overflow-hidden pe-rounded-md pe-bg-black-light lg:pe-w-full lg:pe-max-w-[1164px] lg:pe-flex-row"
    >
      <PECBImage :image="image"></PECBImage>

      <div
        class="pe-mt-0 pe-flex pe-w-full pe-flex-col pe-px-5 pe-py-10 lg:pe-py-2 md:pe-my-5 lg:pe-mx-5 2xl:pe-mx-7 2xl:pe-my-[27px]"
      >
        <slot name="content"></slot>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import PECBImage from '../atoms/PECBImage.vue'

@Component({
  name: 'PECBCardImage',
  components: {
    PECBImage
  }
})
export default class PECBCardImage extends Vue {
  @Prop({type: String, required: true})
  readonly image!: string
}
</script>

<style scoped></style>
