<template>
  <figure
    class="pe-overflow-hidden md:pe-min-w-[270px] lg:pe-min-w-[270px] 2xl:pe-min-w-[420px] lg:pe-rounded-l-lg"
  >
    <img
      width="420"
      height="232"
      :src="image"
      alt=""
    />
  </figure>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'

@Component({
  name: 'PECBImage'
})
export default class PECBImage extends Vue {
  @Prop({type: String, required: true})
  readonly image!: string
}
</script>

<style scoped></style>
