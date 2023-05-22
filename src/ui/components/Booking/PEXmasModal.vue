<template>
  <PEModal
    class="z-50"
    :slimModal="false"
    v-model="modalOpened"
    @onClose="closeModal"
  >
    <template #title>
      <!-- Title -->
      <div>
        <h2 :class="titleClasses">{{ $t('title') }}</h2>
      </div>
    </template>
    <template #content>
      <!-- Question -->
      <!--<div>
        <h1 :class="questionClasses">{{ $t('question') }}</h1>
      </div>-->
      <!-- Description -->
      <div class="pe-max-w-[480px]">
        <p :class="descriptionClasses">{{ $t('description') }}</p>
      </div>
      <!-- Provition Detail -->
      <div class="pe-mb-10">
        <span>
          <span :class="provitionClasses">{{ provisionDetail }}</span>
          <span
            v-if="provitionAmount"
            :class="provitionAmountClasses"
            >{{ amount }}</span
          >
          <span
            v-if="provitionAmount"
            :class="provitionClasses"
            >{{ provitionAmountCurrency }}</span
          >
        </span>
      </div>
    </template>
    <template #buttons>
      <!-- Action buttons -->
      <div class="pe-flex pe-flex-col pe-items-center md:pe-flex-row pe-gap-12 pe-mt-6">
        <PEButton
          :loading="loading"
          class="pe-uppercase !pe-font-serif"
          v-bind="buttonNotUseProvitionProps"
          @click="noUseProvition"
        />
        <PEButton
          class="pe-uppercase !pe-font-serif"
          v-bind="buttonUseProvitionProps"
          @click="useProvition"
        />
      </div>
    </template>
  </PEModal>
</template>

<script lang="ts">
import {Component, Emit, Prop, Vue} from 'vue-property-decorator'
import {BookingStore} from '../../store/bookingStore'
import {usdFormatter} from '~/src/app/common/mapper/moneyFormatters'
import i18n from '~/src/ui/i18n/booking/xmas.lang'

@Component({
  i18n,
  name: 'PEXmasModal'
})
export default class PEXmasModal extends Vue {
  // Props
  @Prop({type: String, default: ''})
  provisionDetail!: string

  @Prop()
  loading!: boolean

  @Prop({type: String, default: ''})
  provitionAmount!: String

  @Prop({type: String, default: 'USD'})
  provitionAmountCurrency!: String

  // Data
  bookingStore = new BookingStore()

  // Methods
  toggleModal() {
    this.bookingStore.toggleXmasModal()
  }

  @Emit('noUseProvition')
  noUseProvition() {
    this.toggleModal()
  }

  @Emit('useProvition')
  useProvition() {
    this.toggleModal()
  }

  @Emit('closeModal')
  closeModal() {
    this.toggleModal()
  }

  // Computed Data
  get modalOpened() {
    return this.bookingStore.showXmasModal
  }

  set modalOpened(value) {
    this.bookingStore.showXmasModal = value
  }

  get buttonUseProvitionProps() {
    return {
      label: this.$t('use') as string,
      type: 'button',
      uppercase: true,
      flat: true,
      outlinedSecondary: true
    }
  }

  get buttonNotUseProvitionProps() {
    return {
      label: this.$t('notUse') as string,
      type: 'button',
      uppercase: true,
      flat: true,
      outlinedSecondary: true
    }
  }

  get amount() {
    return usdFormatter.format(Number(this.provitionAmount))
  }

  // Computed styles
  get titleClasses() {
    return {
      'pe-text-white pe-uppercase pe-font-serif pe-mb-4 pe-text-[24px] pe-font-normal': true
    }
  }

  get questionClasses() {
    return {
      'pe-text-white pe-uppercase pe-font-sans pe-mb-8 pe-text-[18px] pe-font-semibold': true
    }
  }

  get descriptionClasses() {
    return {
      'pe-text-white pe-font-sans pe-mb-10 pe-text-[16px] pe-font-normal': true
    }
  }

  get provitionClasses() {
    return {
      'text-center text-white': true
    }
  }

  get provitionAmountClasses() {
    return {
      'text-center text-white pe-line-through pe-text-[24px] pe-font-normal': true
    }
  }
}
</script>
