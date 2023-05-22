<template>
  <div class="flex w-full bg-black-50 px-5 pt-[9px] pb-[7px]">
    <p class="mr-2 uppercase">{{ text }}</p>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'

@Component({})
export default class PEADivider2 extends Vue {
  @Prop({type: String, default: ''})
  readonly text!: string
}
</script>

<style scoped></style>
