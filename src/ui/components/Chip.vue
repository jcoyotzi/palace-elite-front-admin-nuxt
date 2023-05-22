<template>
  <span
    class="pe-inline-flex pe-h-[20px] pe-w-auto md:pe-h-[30px] pe-font-sans pe-max-w-full pe-text-black pe-uppercase pe-bg-blue-light pe-items-center pe-rounded-[5px] pe-px-3 md:pe-px-6 pe-py-1 pe-text-[12px] pe-font-normal"
  >
    <slot></slot>
  </span>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'

@Component({
  name: 'PEChip'
})
export default class Chip extends Vue {}
</script>

<style scoped></style>
