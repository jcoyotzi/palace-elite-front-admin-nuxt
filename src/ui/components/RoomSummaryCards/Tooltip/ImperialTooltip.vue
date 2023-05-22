<template>
  <PETooltip>
    <template #activator>
      <PEIcon class="pe-text-blue-light">info-circle</PEIcon>
    </template>
    <template #content>
      <div class="rounded bg-black p-4">
        <p class="pe-text-[16px] pe-leading-[24px]"> {{ title }}</p>
        <p class="pe-text-[12px] pe-leading-[16.34px]">{{ text }}</p>
      </div>
    </template>
  </PETooltip>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'

@Component({
  name: 'ImperialTooltip'
})
// @ts-ignore
export default class ImperialTooltip extends Vue {
  // @ts-ignore
  @Prop({type: String, required: true}) readonly title!: string
  // @ts-ignore
  @Prop({type: String, required: true}) readonly text!: string
}
</script>
