<template>
  <PECBCardImage :image="photo">
    <template #content>
      <PECBTitle
        :title="title"
        :chip="chipText"
        :capacityText="capacityText"
      ></PECBTitle>
      <PECBTwoCols>
        <template #left>
          <p
            class="pe-my-5 pe-font-sans pe-text-base pe-font-normal pe-leading-[24px] pe-tracking-[-0.015em] md:pe-mb-[1rem] md:pe-text-[14px] md:pe-leading-[20px] lg:pe-mb-8 lg:pe-text-base lg:pe-leading-[24px]"
          >
            {{ description }}
          </p>
          <PEExpansionPanel
            icon-classes="pe-align-start pe-text-blue-light md:!pe-h-[20px] md:!pe-w-[20px]  lg:!pe-w-[20px]"
            justify-header-class="pe-justify-start "
            reverse
          >
            <template #headerText>
              <p class="pe-ml-[5px] pe-text-base md:pe-text-xs lg:pe-text-base">
                {{ moreDetailsTitle }}
              </p>
            </template>
            <template #content>
              <div
                class="[&>ul]:pe-list-disc"
                v-html="moreDetails"
              ></div>
            </template>
          </PEExpansionPanel>
        </template>
        <template #right>
          <PECBPrice
            :currency="price.currency"
            :description="price.description"
            :price="price.price"
            :free-text="price.freeText"
            class="pe-mb-10 md:pe-mb-[42px] lg:pe-mb-[32px] xl:pe-mb-[42px] pe-text-center"
          ></PECBPrice>
          <PETooltip
            class="pe-w-full"
            :position="tooltipPosition"
          >
            <template #activator>
              <div
                @click="onClick"
                class="pe-w-full pe-h-full overlay pe-fixed pe-top-0 pe-left-0 pe-bg-black pe-bg-opacity-40 pe-z-[40]"
                v-if="showOverlay"
              ></div>
              <div class="flex cursor-pointer items-center justify-end">
                <PEButton
                  outlined
                  secondary
                  block
                  flat
                  :class="buttonClasses"
                  :disabled="!isButtonEnabled"
                  @click="onClick"
                >
                  {{ buttonLabel }}
                  <PE-icon
                    :key="selectIndex"
                    class="pe-text-blue-light !pe-min-w-[24px]"
                    >{{ buttonIcon }}</PE-icon
                  >
                </PEButton>
              </div>
            </template>
            <template #content>
              <div
                class="mt-2"
                v-if="showOverlay"
              >
                <slot name="interaction"></slot>
              </div>
            </template>
          </PETooltip>
        </template>
      </PECBTwoCols>
    </template>
  </PECBCardImage>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator'
import PECBTitle from './atoms/PECBTitle.vue'
import PECBPrice from './atoms/PECBPrice.vue'
import PECBCardImage from './layout/PECBCardImage.vue'
import PECBTwoCols from './layout/PECBTwoCols.vue'
import {NotRequired} from '../../../../app/bookingBenefits/domain/entities/TypeValidationsUtils'
import {Price} from '~/src/app/bookingBenefits/domain/entities/bookingBenefit'
import i18n from '~/src/ui/i18n/booking/bookingBenefits/bookingBenefits.lang'

@Component({
  name: 'PECBTemplate',
  i18n,
  components: {
    PECBTitle,
    PECBPrice,
    PECBCardImage,
    PECBTwoCols
  }
})
export default class PECBTemplate extends Vue {
  @Prop({type: String, required: false})
  readonly chipText!: NotRequired<string>

  @Prop({type: String, required: false})
  readonly capacityText!: NotRequired<string>

  @Prop({type: String, required: false})
  readonly description!: NotRequired<string>

  @Prop({type: String, required: true})
  readonly moreDetails!: string

  @Prop({type: String, default: 'https://via.placeholder.com/420x232.jpeg'})
  readonly photo!: string

  @Prop({type: String, required: true})
  readonly title!: string

  @Prop({type: Boolean, default: true})
  readonly isButtonEnabled!: boolean

  moreDetailsTitle: string = this.$t('moreDetails') as string

  @Prop({
    type: Object,
    default: (): Price => {
      return {
        currency: 'USD',
        description: 'Price per unit',
        price: 0,
        freeText: 'Free'
      }
    }
  })
  readonly price!: Price

  @Prop({type: Number, default: 0})
  readonly units!: number

  showOverlay = false

  selectIndex = false

  windowWidth = 0

  lastWindowWidth = 0

  tooltipPosition = 'bottom'

  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize)
      this.onResize()
    })
  }

  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  }

  onResize() {
    this.windowWidth = window.innerWidth

    if (this.windowWidth < 1024 && this.lastWindowWidth >= 1024) {
      this.tooltipPosition = 'bottom'
      this.lastWindowWidth = this.windowWidth
    } else if (this.windowWidth >= 1024 && this.lastWindowWidth < 1024) {
      this.tooltipPosition = 'bottom-start'
      this.lastWindowWidth = this.windowWidth
    }
  }

  onClick() {
    this.showOverlay = !this.showOverlay
  }

  @Watch('buttonIcon')
  onButtonIconChange() {
    this.selectIndex = !this.selectIndex
  }

  get buttonClasses() {
    return {
      'pe-z-[40]': this.showOverlay,
      'pe-text-base pe-font-serif !pe-font-normal lg:!pe-font-medium uppercase !pe-text-blue-light ':
        true,
      'pe-flex pe-items-center !pe-w-full xl:!pe-max-w-[185px] 2xl:!pe-max-w-[160px]': true
    }
  }

  get buttonIcon() {
    return this.showOverlay ? 'chevron-up' : 'chevron-down'
  }

  get buttonLabel() {
    return this.units > 0 ? this.$t('selected') : this.$t('add')
  }
}
</script>
