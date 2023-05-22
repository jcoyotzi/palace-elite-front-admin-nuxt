<template>
  <div
    class="p-[20px] md:p-[30px] flex-col md:flex-row rounded-[10px] bg-black-light flex justify-between w-full"
  >
    <section>
      <div class="pe-flex pe-gap-x-[10px] pe-items-center">
        <span
          class="pe-inline-flex pe-h-[20px] pe-w-auto md:pe-h-[30px] pe-font-sans pe-max-w-full pe-text-black pe-uppercase pe-bg-blue-light pe-items-center pe-rounded-[5px] pe-px-3 md:pe-px-6 pe-py-1 pe-text-[12px] pe-font-normal"
        >
          {{ chipText }}
        </span>
        <span class="pe-font-sans pe-text-white pe-font-normal">{{ helperText }} </span>
      </div>
      <div class="pe-flex pe-items-center pe-gap-x-[20px]">
        <h2 class="pe-font-sans pe-font-normal pe-text-[24px] pe-text-white pe-mt-[6px]">
          {{ title }}
        </h2>

        <div class="mt-3 pe-hidden md:pe-flow-root">
          <div class="has-tooltip w-[10px]">
            <span
              class="!pe-w-[500px] tooltip rounded-[4px] p-[15px] bg-black-medium text-white pe-font-sans pe-text-[12px] pe-mt-6 text-sm"
            >
              <div class="w-full">
                <div class="uppercase font-semibold text-[16px]">{{ titleTooltip }}</div>
                {{ textTooltip }}
              </div>
            </span>
            <icon-info class="w-[20px] h-[20px] pe-text-blue-light" />
          </div>

          <div class="mt-3 md:pe-hidden">
            <div class="has-tooltip w-[10px]">
              <span
                class="pe-absolute pe-mx-auto pe-left-0 pe-ml-[5%] !pe-w-[90%] tooltip rounded-[4px] p-[15px] bg-black-medium text-white pe-font-sans pe-text-[12px] pe-mt-6 text-sm"
              >
                <div class="w-full">
                  <div class="uppercase font-semibold text-[16px]">{{ titleTooltip }}</div>
                  {{ textTooltip }}
                </div>
              </span>
              <icon-info class="w-[20px] h-[20px] pe-text-blue-light" />
            </div>
          </div>
        </div>
      </div>
      <div>
        <p class="text-white mt-[20px]">{{ bottomText }}</p>
      </div>
    </section>
    <div class="flex md:justify-end justify-center md:mt-[0px] mt-[40px] items-center">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'

@Component
export default class PECardProvision extends Vue {
  @Prop()
  chipText!: string

  @Prop()
  title!: string

  @Prop({default: '', type: String})
  textTooltip!: string

  @Prop({default: '', type: String})
  titleTooltip!: string

  @Prop()
  helperText!: string

  @Prop()
  bottomText!: string
}
</script>
<style scoped>
.background-rgba {
  background-color: rgba(39, 37, 39) !important;
}
.tooltip {
  visibility: hidden;
  position: absolute;
}
.has-tooltip:hover .tooltip {
  visibility: visible;
  z-index: 100;
}
</style>
