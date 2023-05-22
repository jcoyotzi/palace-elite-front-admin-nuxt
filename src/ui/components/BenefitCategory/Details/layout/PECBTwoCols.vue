<template>
  <div
    class="pe-card-benefit-detail__main pe-flex pe-flex-grow pe-flex-col pe-text-white lg:pe-flex-row"
  >
    <div
      class="pe-card-benefit-detail__left pe-mt-5 pe-flex pe-flex-grow pe-flex-col pe-justify-start pe-pr-0 lg:pe-mt-0 xl:pe-pr-5"
    >
      <slot name="left"></slot>
    </div>
    <div
      class="pe-card-benefit-detail__right pe-mt-5 pe-flex pe-flex-col pe-items-center pe-px-0 lg:pe-mt-0 lg:pe-w-fit lg:pe-items-end"
    >
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'

@Component({
  name: 'PECBTwoCols'
})
export default class PECBTwoCols extends Vue {}
</script>

<style scoped></style>
