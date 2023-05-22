<template>
  <div class="pe-card-benefit-detail__title pe-flex pe-flex-col pe-text-white">
    <div
      class="pecb-title__top pe-flex pe-flex-col pe-items-start md:pe-flex-row lg:pe-items-center"
    >
      <h3
        class="md:pe-mr-5 pe-font-sans pe-text-2xl pe-font-normal pe-capitalize pe-leading-[24px] md:pe-text-[20px] lg:pe-text-2xl lg:pe-leading-[18px]"
      >
        {{ title }}
      </h3>
      <PEChip
        v-if="showChip"
        class="pe-mb-1.5 pe-mt-1 pe-bg-blue-light pe-text-black md:pe-text-[10px] lg:pe-mt-0 lg:pe-mb-0 lg:pe-text-xs"
      >
        {{ chip }}
      </PEChip>
    </div>

    <small
      v-if="showCapacity"
      class="pe-text-xs pe-font-normal pe-leading-[18px]"
    >
      {{ capacityText }}</small
    >
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import {isNotEmptyText} from '~/src/app/bookingBenefits/domain/entities/bookingBenefitCard'

@Component({
  name: 'PECBTitle'
})
export default class PECBTitle extends Vue {
  @Prop({type: String, required: true})
  readonly title!: string

  @Prop({type: String, required: false})
  readonly chip!: string

  @Prop({type: String, required: false})
  readonly capacityText!: string

  get showChip(): boolean {
    return isNotEmptyText(this.chip)
  }

  get showCapacity(): boolean {
    return isNotEmptyText(this.capacityText)
  }
}
</script>

<style scoped></style>
