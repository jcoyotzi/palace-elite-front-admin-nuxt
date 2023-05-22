<!-- eslint-disable vue/no-v-html -->
<template>
  <section class="pe-flex pe-flex-col pe-item xl:pe-grid xl:pe-grid-cols-3">
    <div
      class="pe-bg-black-light xl:pe-rounded-[10px] xl:pe-mr-[30px] pe-flex pe-flex-col pe-justify-center pe-p-[40px] xl:pe-py-[60px] pe-relative"
    >
      <PEButton
        flat
        text
        class="!pe-py-0 pe-w-[37px] !pe-absolute pe-right-10 pe-top-10 xl:pe-top-5"
        @click="onClose"
      >
        <PEIcon
          class="pe-text-white"
          :size="37"
          >close-circle</PEIcon
        >
      </PEButton>
      <h2
        class="pe-font-serif pe-leading-[60px] xl:pe-leading-10 pe-text-[40px] pe-uppercase pe-text-white xl:pe-text-blue-light xl:pe-text-[32px]"
      >
        {{ title }}
      </h2>
      <div
        class="pe-mt-[20px] pe-text-white pe-leading-5 pe-text-[16px]"
        v-html="content"
      >
      </div>

      <div
        v-if="firstButton && secondButton"
        class="pe-mt-[30px] xl:pe-flex pe-justify-center"
      >
        <PEButton
          v-if="firstButton"
          v-bind="firstButton"
          secondary
          uppercase
          class="w-full pe-mb-10 xl:pe-mb-0 xl:pe-max-w-[200px] xl:pe-mr-[30px] !pe-px-2"
        />
        <PEButton
          v-if="secondButton"
          v-bind="secondButton"
          outlined-secondary
          uppercase
          class="w-full xl:pe-max-w-[200px] !pe-px-2"
        />
      </div>
    </div>
    <div class="pe-col-span-2 pe-h-full pe-relative">
      <PE-image-strapi
        :image="image"
        class="[&>img]:xl:pe-rounded-[10px] [&>img]:pe-object-cover pe-h-full"
      />
      <DashboardCountdown
        class="pe-absolute pe-right-0 pe-bottom-10 xl:pe-bottom-auto xl:pe-top-10"
        :end-time="endDate"
        :day-label="days"
        :hour-label="hours"
        :minute-label="minutes"
        :second-label="seconds"
      >
        <template #title>{{ hurryLabel }} </template>
      </DashboardCountdown>
    </div>
  </section>
</template>

<script lang="ts">
import {Component, Emit, Vue, Prop} from 'vue-property-decorator'
import {Button} from '~/interfaces/GenericTypes/Button.interface'

interface StrapiImage {
  mime: string
  url: string
  alt: string
  title: string
}

@Component
export default class Offer extends Vue {
  @Prop({type: String, required: true})
    title!: string

  @Prop({type: String, required: true})
    content!: string

  @Prop({type: Object, required: true})
    image!: StrapiImage

  @Prop({type: String, required: true})
    days!: string

  @Prop({type: String, required: true})
    hours!: string

  @Prop({type: String, required: true})
    minutes!: string

  @Prop({type: String, required: true})
    seconds!: string

  @Prop({type: String, required: true})
    hurryLabel!: string

  @Prop({type: Date, required: true})
    endDate!: Date

  @Prop({type: Object, default: null})
    firstButton!: Button | null

  @Prop({type: Object, default: null})
    secondButton!: Button | null

  @Emit()
  onClose() {}
}
</script>
