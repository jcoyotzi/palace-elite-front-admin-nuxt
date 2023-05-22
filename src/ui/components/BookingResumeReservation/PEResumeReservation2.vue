<template>
  <div class="pe-rounded pe-bg-black-light pe-w-auto xl:pe-min-w-[300px] 2xl:pe-min-w-[400px]">
    <div
      v-if="!isMobile"
      class="pe-bg-black pe-bg-opacity-50 pe-py-6 pe-text-center pe-font-serif pe-text-[24px] pe-font-normal pe-uppercase pe-text-white"
    >
      {{ title }}
    </div>
    <slot name="aboveDate" />
    <div class="pe-border-b pe-border-black pe-bg-black-light pe-py-6 pe-text-center">
      <h2 class="pe-font-sans pe-font-semibold pe-uppercase pe-text-white pe-text-[16px]">
        {{ subtitle }}
      </h2>
      <p class="pe-font-sans pe-font-normal pe-text-white pe-text-[16px]">
        {{ date }}
      </p>
    </div>

    <slot name="default" />
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'

@Component({
  name: 'PEResumeReservation2'
})
export default class PEResumeReservation2 extends Vue {
  @Prop({required: true})
  title!: string

  @Prop({required: true})
  subtitle!: string

  @Prop({required: true})
  date!: string

  @Prop({default: false})
  isMobile!: boolean
}
</script>
<style lang="css" scoped>
.custom-scroll {
  max-height: calc(100vh - 8rem);
}
</style>
