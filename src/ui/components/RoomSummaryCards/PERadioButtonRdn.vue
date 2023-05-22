<template>
  <section class="grid w-full grid-cols-3 gap-x-[16px] gap-y-[16px]">
    <div
      v-for="(item, index) in options"
      :key="index"
      class="inline-flex w-full"
    >
      <input
        :id="inputId(item)"
        v-model="model"
        type="radio"
        :name="item.name"
        class="peer m-0 hidden h-0 w-0 border-2 p-0"
        :value="item.code"
        :checked="item.checked"
        :disabled="isDisabled(item)"
      />

      <label
        class="w-full inline-block cursor-pointer overflow-hidden rounded border-[1px] border-blue bg-transparent text-white transition-all hover:border-blue-light peer-checked:border-blue peer-checked:bg-blue-light peer-checked:text-black"
        :for="inputId(item)"
      >
        <div class="pe-py-2 text-center">
          <span class="block text-[12px]"> {{ $t(item.code) }}</span>
          <span
            v-if="!isReferral(item.code)"
            class="block"
          >
            {{ usdReferral(item, false) }}
          </span>
          <span
            v-else
            class="block"
            >{{ usdReferral(item) }}</span
          >
        </div>
      </label>
    </div>
  </section>
</template>
<script lang="ts">
import {usdFormatter} from 'app/common/mapper/moneyFormatters'
import {Component, Prop, Mixins} from 'vue-property-decorator'
import GenerateIdMixin from '../../mixins/generateIdMixin'
import i18n from './PERadioButtonRdn.lang'
import {BookingStore} from '~/src/ui/store/bookingStore'
import {BookingCategoryStatus} from '~/src/app/bookings/domain/enums/bookingCategoryStatus'

@Component({
  i18n,
  name: 'PERadioButtonsRdn',
  filters: {
    usd(val: any) {
      return val === -1 ? this.$t('notAvailable') : usdFormatter.format(val)
    }
  }
})
export default class PERadioButtons extends Mixins(GenerateIdMixin) {
  @Prop({type: Array}) options!: any[]

  @Prop({type: String}) radioName!: string

  @Prop({type: Number}) rateBonus!: number

  @Prop({
    required: false,
    type: String,
    default: ''
  })
  value!: string

  isDisabled(option: any) {
    return this.isImperial(option.code) ? false : false
  }

  isImperial(option: string) {
    return option === BookingCategoryStatus.IMP_WEEKS
  }

  isBono(option: string) {
    return option === BookingCategoryStatus.BONO
  }

  bookingStore = new BookingStore()

  isReferral(code: string) {
    return code === BookingCategoryStatus.REFERIDO
  }

  usdReferral(val: any, addFee = true): string {
    let fee = 0
    const hasRateBonus = this.rateBonus != undefined && this.rateBonus > 0
    if (this.bookingStore.referralProgram !== null && addFee) {
      fee = this.bookingStore.referralProgram!.fee
    }

    if (this.isImperial(val.code)) return usdFormatter.format(0)

    if (this.isBono(val.code))
      return hasRateBonus ? usdFormatter.format(this.rateBonus) : (this.$t('redeem') as string)

    return val.rate === -1
      ? (this.$t('notAvailable') as string)
      : usdFormatter.format(val.rate + fee)
  }

  get name() {
    return this.radioName ? this.radioName : this.generateId('radio')
  }

  get model(): any {
    return this.value
  }

  set model(value: any) {
    this.$emit('input', value)
    this.$emit('click', value)
  }

  mounted() {
    const defaultValue = this.options.find(item => item.checked) || this.options[0]
    !this.value ? this.$emit('input', defaultValue?.value ?? null) : null
  }

  inputId(item: any) {
    return `input-${item.code}-${this.radioName}`
  }
}
</script>
