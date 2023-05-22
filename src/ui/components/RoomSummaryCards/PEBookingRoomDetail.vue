<template>
  <section class="mx-auto max-w-[68rem]">
    <!-- Offer expiration -->
    <PETabCounter
      v-if="isOffer"
      v-bind="offerCounterProps"
    />
    <!-- Main Wrapper -->
    <div class="main pe-rounded pe-bg-black-light">
      <!-- Title -->
      <div class="pe-flex pe-items-center pe-justify-between pe-bg-black pe-bg-opacity-50">
        <PEButton
          text
          :class="titleClasses"
          @click="toggleState"
        >
          <div class="pe-flex pe-w-full">
            <div
              v-if="icon"
              class="pe-relative pe-h-8 pe-w-8"
            >
              <PEIcon :class="[iconClasses, upIconClasses]">chevron-up</PEIcon>
              <PEIcon :class="[iconClasses, downIconClasses]">chevron-down</PEIcon>
            </div>
            <h1
              class="pe-ml-3 pe-text-left pe-font-serif pe-text-2xl pe-font-normal pe-uppercase pe-text-white"
            >
              {{ title }}
            </h1>
          </div>
        </PEButton>
        <div v-if="isModifying">
          <PEButton
            text
            class="pe-mx-4 pe-no-underline"
            @click="changeRoomCategory"
          >
            <PEIcon class="pe-mr-2 pe-stroke-blue-light">autorenew</PEIcon>
            <span>{{ changeRoomText }}</span>
          </PEButton>
        </div>
      </div>
      <!-- Content -->
      <div :class="contentClasses">
        <PERoomBadge
          v-if="computedBadge"
          class="pe-absolute pe-left-2.5 pe-top-2.5 pe-z-5 pe-min-w-[120px] md:pe-left-0 md:pe-min-w-[190px]"
          :label="computedBadge"
        >
        </PERoomBadge>
        <div class="pe-flex pe-flex-col lg:pe-flex-row">
          <PERoomSlider
            class="pe-w-max-[100%] lg:pe-max-h-[500px] lg:pe-max-w-[500px] lg:pe-min-h-[500px] lg:pe-min-w-[500px]"
            :images="images"
            :show-tour-icon="showTourIcon"
            @open-modal="toggleTour"
          >
          </PERoomSlider>
          <!-- Rates & Options (Right) -->
          <div class="pe-relative pe-flex pe-w-full pe-flex-col pe-p-3 md:pe-p-6 md:pe-pb-0">
            <!-- Lock content -->
            <div
              v-if="lock"
              :class="lockClasses"
            >
              <PEIcon class="pe-stroke-blue-white pe-m-3">lock</PEIcon>

              <h4
                v-if="roomWithoutAccess"
                class="pe-text-[24px] pe-font-medium pe-uppercase"
              >
                {{ $t('upgradeMembership') }}
              </h4>

              <h4
                v-else-if="hasPresidentialMinPax"
                class="pe-text-[24px] pe-font-medium pe-uppercase"
              >
                {{ $t('minPresidentialAdultPax') }}
              </h4>

              <h4
                v-else
                class="pe-text-[24px] pe-font-medium pe-uppercase"
              >
                {{ lockText }}
              </h4>

              <p
                v-if="roomWithoutAccess"
                class="pe-max-w-[300px]"
              >
                {{ $t('accessNotAvailable') }}
              </p>

              <p
                v-else-if="hasPresidentialMinPax"
                class="pe-max-w-[300px]"
              >
                {{ $t('accessNotAvailable') }}
              </p>

              <p
                v-else
                class="pe-max-w-[300px]"
              >
                {{ lockDescription }}
              </p>
            </div>

            <div
              v-if="!available"
              :class="unavailableClasses"
            >
              <h4 class="pe-font-medium pe-uppercase">
                {{ lockAvailableText }}
              </h4>
              <br />
              <p class="pe-text-[14px]">
                {{ lockAvailableDescription }}
              </p>
              <br />
              <p class="unavailable-phone">
                <PEIcon class="my-1 mr-4 h-6 w-6 stroke-white">phone</PEIcon> 800-462-0792
              </p>
            </div>

            <PESummaryPanel
              class="pe-w-full pe-min-w-[55%] !pe-py-2 !pe-px-0"
              :class="blurClasses"
              v-bind="summaryProps"
              :daily-rates="dailyRates"
              @viewResort="openResortCredit"
            >
            </PESummaryPanel>
            <div
              class="pe-flex pe-flex-col pe-items-center pe-justify-center md:pe-items-start md:pe-justify-start"
              :class="blurClasses"
            >
              <!-- Refundable - Non-Refundable radio -->
              <PERadioGroup
                v-model="selectedRefundRate"
                :items="refundRateOptions"
                :position="radioPosition"
                class="pe-mb-3 md:pe-w-full"
              ></PERadioGroup>
              <!-- Rates options radio -->
              <div
                v-if="skeleton"
                class="pe-flex pe-animate-pulse pe-flex-row pe-items-center pe-h-full pe-justify-center pe-space-x-5"
              >
                <div class="pe-flex pe-flex-col pe-space-y-3">
                  <div class="pe-w-36 pe-bg-gray-400 pe-h-8 pe-rounded-md"> </div>
                  <div class="pe-w-36 pe-bg-gray-400 pe-h-8 pe-rounded-md"> </div>
                </div>
                <div class="pe-flex pe-flex-col pe-space-y-3">
                  <div class="pe-w-36 pe-bg-gray-400 pe-h-8 pe-rounded-md"> </div>
                  <div class="pe-w-36 pe-bg-gray-400 pe-h-8 pe-rounded-md"> </div>
                </div>
                <div class="pe-flex pe-flex-col pe-space-y-3">
                  <div class="pe-w-36 pe-bg-gray-400 pe-h-8 pe-rounded-md"> </div>
                  <div class="pe-w-36 pe-bg-gray-400 pe-h-8 pe-rounded-md"> </div>
                </div>
              </div>
              <div
                v-else
                class="pe-flex pe-w-full pe-justify-center"
              >
                <PERadioButtonRdn
                  v-model="selectedRate"
                  :value="selectedRate"
                  :radio-name="Math.random().toString(36).substring(7)"
                  :options="selectedRates"
                  :rate-bonus="rateBonus"
                  class="pe-flex pe-justify-center md:pe-justify-start"
                  @click="selectedRateOnClick"
                />
              </div>

              <div v-if="showPreferencialRate">
                <slot name="preferential-weeks" />
              </div>

              <div v-if="showReferralWeeks">
                <slot name="referral-weeks" />
              </div>
              <!-- Imperial weeks -->
              <div v-if="showImperialWeeks">
                <slot name="imperial-weeks" />
              </div>
              <!-- Referals - Bonus -->
              <div
                v-if="showBonusReferals"
                :class="provisionesClasses"
              >
                <div>
                  <h4 :class="provisionTitleClasses"> {{ $t('titleReferralsBonus') }}</h4>
                  <div
                    v-for="(reservation, indexReferral) in activeReferrals"
                    :key="indexReferral"
                    :index="indexReferral"
                    :class="provisionContainerClasses"
                  >
                    <div class="pe-mb-3 pe-flex">
                      <PECheckbox
                        :disabled="
                          (selectedReferrals.length === 2 && !reservation.activeRate) ||
                          disabledReferrals
                        "
                        :value="reservation.activeRate"
                        @click.prevent="selectReferral(reservation)"
                      >
                      </PECheckbox>
                      <p class="text-xs text-white md:text-base pe-text-[12px]">
                        Use referral - {{ reservation.PromoDescription }}.
                        {{ getFormatDate(reservation.Depart_dt) }}
                      </p>

                      <div class="ml-3">
                        <div class="has-tooltip w-[10px]">
                          <span
                            class="!pe-w-[400px] tooltip rounded-[4px] p-[15px] bg-black-medium text-white pe-font-sans pe-text-[12px] pe-mt-6 text-sm"
                          >
                            <div class="w-full">
                              <p>
                                {{ $t('useReferral') }} - {{ reservation.PromoDescription }}.
                                {{ getFormatDate(reservation.Depart_dt) }}
                              </p>
                              <p class="pe-text-[12px]">
                                From {{ getFormatDate(reservation.Arv_date) }}.
                                {{ reservation.First_name }} {{ reservation.Last_name }}
                              </p>
                              <br />
                              <p class="pe-text-[10px]">
                                {{ reservation.Hotel }} - {{ reservation.Rm_desc }} ({{
                                  reservation.Nights
                                }}
                                nights)
                              </p>
                            </div>
                          </span>
                          <icon-info class="pe-text-blue-light w-[20px] h-[20px]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="showAnniversary">
                <!-- <slot name="anniversary-weeks" /> -->
                <PEProvisionOption
                  :id="makeId('anniversaryProvitions', String(index))"
                  :title="provitionTitle"
                  :provitions="anniversaryProvisionsAvailable"
                  @input="onSelectedAnniversary($event, code)"
                />
              </div>

              <div v-if="showIncentiveWeeks">
                <!-- <slot name="incentive-weeks" /> -->
                <PEProvisionOption
                  :id="makeId('incentiveProvitions', String(index))"
                  :title="provitionTitle"
                  :provitions="incentiveProvisionsAvailable"
                  @input="onSelectedIncentive($event, code)"
                />
              </div>

              <div
                v-if="!isModifying"
                class="pe-flex pe-w-full pe-justify-end !pe-mt-[15px] pe-mb-[10px]"
              >
                <PEButton
                  v-show="!skeleton"
                  solid
                  flat
                  uppercase
                  :block="isButtonBlock"
                  :loading="loadingButton || loadigRates"
                  :disabled="lock || isDisabled || isLoadingRates"
                  class="pe-my-1 pe-font-medium pe-bg-blue-dark"
                  @click="selectRoom"
                >
                  {{ selectRoomButtonText }}
                </PEButton>
              </div>
            </div>
          </div>
        </div>
        <PETab
          class="!pe-bg-opacity-50 [&>div]:[&>div]:!pe-bg-transparent"
          :items="items"
          :start-closed="true"
        />
        <PETourModal
          v-if="tour"
          :show="showTour"
          :source="tour"
          @close-modal="toggleTour"
        />
      </div>
    </div>
    <PEModal
      class="pe-z-50"
      :slimModal="false"
      v-model="resortCreditModal"
      @onClose="closeResortCredit"
    >
      <template #title>
        <div>
          <h2 class="pe-text-white mb-3">{{ $t('bookingCategory.resortCredit') }}</h2>
        </div>
      </template>
      <template #content>
        <div class="pe-max-w-[480px] pe-text-white">
          <p
            >* For Diamond/Residence memberships, Resort Credit Promotion applies to guests and
            referrals traveling with or without the member.</p
          >
          <p
            >* For VIP/Regular memberships, Resort Credits will apply to referrals only when
            traveling with the member. It will not apply when traveling without the member.</p
          >
          <p
            >* All products and services paid for with Resort Credit will incur a mandatory 16%
            service fee.</p
          >
          <p
            >* Other terms and conditions may apply with the use of Resort Credit. Review with your
            Palace Vacation Planner for more details.</p
          >
        </div>
      </template>
    </PEModal>
  </section>
</template>

<script lang="ts">
import {Component, Emit, Prop, Vue} from 'vue-property-decorator'
import dayjs from 'dayjs'
// Interfaces
import {Image} from 'node_modules/@pr-elite-components-library/lib/src/types/GenericTypes/Image.interface'
import {ExpansibleItem} from 'node_modules/@pr-elite-components-library/lib/src/types/PERoomSummaryCard/ExpansibleItem.interface'
import {IPERadioGroup} from 'node_modules/@pr-elite-components-library/lib/src/types/PERadioGroup/IPERadioGroup'
import {ProvisionStore} from '../../store/provisionStore'
import PESummaryPanel from '~/src/ui/components/RoomSummaryCards/PESummaryPanel.vue'
import {ToastDuration} from '~/src/ui/utils/toastHelpers'
import {
  AccessibleCategories,
  RefundableButton,
  SelectedCategory
} from '~/interfaces/Booking/Category.interface'
import {
  CustomBreakpoints,
  Rates,
  RefundableOptions,
  IRates,
  PromotionID
} from '~/interfaces/Booking/BookingRoomDetailData'
import {RatesCleverStore} from '~/src/ui/store/ratesCleverStore'
import PERadioButtonRdn from '~/src/ui/components/RoomSummaryCards/PERadioButtonRdn.vue'
import {usdFormatter} from 'app/common/mapper/moneyFormatters'
import {dateToMonthDay} from 'app/ratesClever/domain/mappers/RoomRatesCleverMapper'
import {selectedNights} from 'app/calendar/domain/generator/CalendarDataGenerator'
import {BookingStore} from '~/src/ui/store/bookingStore'
import {BookingCategoryStatus} from '~/src/app/bookings/domain/enums/bookingCategoryStatus'
import {UseAuth as AuthStore} from '~/src/ui/store/auth'
import {ValidateWeek52} from 'app/filldatareservation/legacyBin/ValidateWeek52'
import {ReservationReferral} from '~/src/app/booking/domain/entities/reservationReferral'
import i18n from '~/src/ui/i18n/booking/roomDetail'
import {RmfolioRC} from 'app/contractByPromotion/domain/entities/ContractByPromotion'
import {ReservationTypes} from '~/src/app/filldatareservation/domain/reservationTypes'
import PEProvisionOption from '~/src/ui/components/Booking/PEProvisionOption/PEProvisionOption.vue'
import {
  LockOffRoomAccessCode,
  PresidentialSecondRoomCodes,
  getNextRoomAccessCode
} from 'app/roomAccess/domain/data/lockOffRoomAccessCode'
import {baglioniCodes} from '~/src/app/property/domain/data/baglioniCodes'
import { BaglioniHotelsEnum } from '~/src/app/rules/domain/entities/enum/baglioniEnum'
import { HotelBrands} from '~/src/app/property/domain/entities/property'

@Component({
  i18n,
  name: 'PEBookingRoomDetail',
  components: {
    PERadioButtonRdn,
    PESummaryPanel,
    PEProvisionOption
  }
})
export default class PEBookingRoomDetail extends Vue {
  @Prop({type: Boolean, default: false})
  readonly icon!: boolean

  @Prop({type: String, required: true})
  readonly title!: string

  @Prop({type: Array, required: true})
  readonly images!: Image[]

  @Prop({type: Number, required: true})
  readonly max!: number

  @Prop({type: String, required: true})
  readonly area!: string

  @Prop({type: String, required: true})
  readonly creditLimit!: string

  @Prop({type: String, default: 'Daily Rates'})
  readonly ratesTitle!: string

  @Prop({type: String, default: 'Up to'})
  readonly upToText!: string

  @Prop({type: String, default: 'Resort Credit'})
  readonly resortCreditText!: string

  @Prop({type: String, default: 'Max'})
  readonly maxRoomText!: string

  @Prop({type: String, default: 'Public Rate'})
  readonly publicRateText!: string

  @Prop({type: String, default: '--'})
  readonly publicRate!: string

  @Prop({type: String, required: false})
  readonly totalRate!: string

  @Prop({type: Array, required: true})
  readonly items!: ExpansibleItem[]

  @Prop({type: String})
  readonly tour!: string

  @Prop({type: Number, default: null})
  readonly lastRooms!: number | null

  @Prop({type: Boolean, default: false})
  readonly useToggle!: boolean

  @Prop({type: String, default: 'Last'})
  readonly lastRoomsTextLeft!: string

  @Prop({type: String, default: 'rooms'})
  readonly lastRoomsTextRight!: string

  @Prop({type: String, default: 'Exclusive non-refundable'})
  readonly lockText!: string

  @Prop({
    type: String,
    default: ' Exclusive Non-Refundable Upgrade your Membership to unlock this room'
  })
  readonly lockDescription!: string

  @Prop({type: String, default: 'Change room category'})
  readonly changeRoomText!: string

  @Prop({required: true}) refundRateOptions!: IPERadioGroup

  @Prop({default: false, type: Boolean, required: false})
  readonly isModifying!: boolean

  @Prop({default: false, type: Boolean, required: false})
  readonly lock!: boolean

  @Prop({default: false, type: Boolean, required: false})
  readonly available!: boolean

  @Prop({default: false, type: Boolean}) readonly isOffer!: boolean

  @Prop({type: String, default: false}) readonly textOffer!: string

  @Prop({type: String, default: 'USD'}) readonly currency!: string

  @Prop({type: [Date, Number, String], default: false})
  readonly endTimeOffer!: Date | number | string

  @Prop({type: String, default: 'Select Room #1'})
  readonly selectRoomButtonText!: string

  @Prop({type: Object, default: () => ({})})
  readonly selectedCategory!: AccessibleCategories

  @Prop()
  readonly priceTitle!: string

  @Prop()
  readonly skeletonClass!: string

  @Prop()
  readonly code!: string

  @Prop({type: Boolean, default: false})
  readonly isLockOff!: boolean

  @Prop({type: Boolean, default: false})
  readonly loadingButton!: boolean

  @Prop({type: Boolean, default: false})
  readonly lockByImperialsNotFound!: boolean

  @Prop({type: Array, default: []})
  readonly promotions!: any

  @Prop({type: Number, default: []})
  readonly index!: number

  bookingStore = new BookingStore()

  cleverStore = new RatesCleverStore()

  authStore = new AuthStore()

  provisionStore = new ProvisionStore()

  // Data
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  public showTour: boolean = false

  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  public isOpen: boolean = true

  public amountUpgrade: number = 0

  public resortCreditModal: boolean = false

  selectedRefundRate = ''

  selectedImperial = []

  selectedRate = 'PREFERENCIAL'

  activeReferrals: ReservationReferral[] = []
  selectedReferrals: ReservationReferral[] = []
  bonusRatesDaily: RmfolioRC[] = []
  disabledReferrals: boolean = false
  rateBonus = 0
  incentiveRatesDaily: RmfolioRC[] = []
  rateIncentive = 0
  annyversaryRatesDaily: RmfolioRC[] = []
  rateAnniversary = 0

  incentiveSelected: any = {}
  anniversarySelected: any = {}

  get roomWithoutAccess() {
    if (PresidentialSecondRoomCodes.includes(this.selectedCategory.RealCode)) {
      return false
    }

    return !this.selectedCategory.haveAccess
  }

  get hasPresidentialMinPax() {
    const isPresidentialFirstPart =
      LockOffRoomAccessCode.includes(this.selectedCategory.RealCode) &&
      !this.selectedCategory.isLockOff
    const hasMinAdultPax =
      this.bookingStore.reservationInfo[this.bookingStore.roomIndex].roomsPax.adults >= 2
    return isPresidentialFirstPart ? !hasMinAdultPax : false
  }

  windowWidth = 0

  lockAvailableText = "We're sorry the room you're looking for its not available right now"
  lockAvailableDescription =
    'No rooms available for the selected period, try other dates or call us'

  makeId(base: string, index: string) {
    return `${base}_${index}`
  }

  async selectReferral(reservation: any) {
    reservation.activeRate = !reservation.activeRate

    if (this.selectedReferrals.length === 2 && reservation.activeRate) {
      reservation.activeRate = false
      return false
    } else if (this.selectedReferrals.length === 1 && reservation.activeRate) {
      const {checkOut} = this.bookingStore.getBooking
      const firstDate = this.selectedReferrals[0].Depart_dt
      const firstYear = this.selectedReferrals[0].activeYear
      const secondDate = reservation.Depart_dt
      const secondYear = reservation.activeYear
      let maxDate = ''
      if (dayjs(firstDate) > dayjs(secondDate)) maxDate = firstDate
      else maxDate = secondDate

      // Reservas deben ser de la misma promocion
      if (this.selectedReferrals[0].PromotionId !== reservation.PromotionId) {
        reservation.activeRate = false
        this.$toasted.info(this.$t('referredReservesMustbefromTheSamePromotion') as string, {
          action: [
            {
              icon: 'close',
              text: '',
              onClick: (_e, toastObject) => {
                toastObject.goAway(0)
              }
            }
          ],
          theme: 'pe_toast',
          duration: ToastDuration.FIVE_SECONDS
        })
        return false
      }

      // Checkout de segunda reserva no debe ser mayor a 12 meses
      const diffMonth = Math.abs(this.datesMonthDiff(maxDate, checkOut))

      if (diffMonth > 12) {
        reservation.activeRate = false
        this.$toasted.info(this.$t('checkoutHasBeenLessThan12Months') as string, {
          action: [
            {
              icon: 'close',
              text: '',
              onClick: (_e, toastObject) => {
                toastObject.goAway(0)
              }
            }
          ],
          theme: 'pe_toast',
          duration: ToastDuration.FIVE_SECONDS
        })
        return false
      }

      // 2x1 regular mismo año aniversario
      if (
        firstYear !== secondYear &&
        this.selectedReferrals[0].PromotionId === PromotionID.REGULAR2X1
      ) {
        reservation.activeRate = false
        this.$toasted.info('The referred reserves must be from the same year', {
          action: [
            {
              icon: 'close',
              text: '',
              onClick: (_e, toastObject) => {
                toastObject.goAway(0)
              }
            }
          ],
          theme: 'pe_toast',
          duration: ToastDuration.FIVE_SECONDS
        })
        return false
      }

      this.disabledReferrals = true

      try {
        const ratesPromotionResponse = await this.bookingStore.getReservationRate(this.code)
        if (ratesPromotionResponse) {
          this.bonusRatesDaily = ratesPromotionResponse.data?.RCDetail[0]?.RmfolioRc

          if (this.bonusRatesDaily) {
            this.rateBonus = ratesPromotionResponse.data?.RCDetail[0]?.RmfolioRc.reduce(
              (accum: number, rate: any) => accum + (rate.Rate + rate.AmountChargeUpgrade),
              0
            )

            this.amountUpgrade = ratesPromotionResponse.data?.RCDetail[0]?.RmfolioRc.reduce(
              (accum: number, rate: any) => accum + rate.AmountChargeUpgrade,
              0
            )
          } else {
            this.$toasted.info('Rates not available', {
              action: [
                {
                  icon: 'close',
                  text: '',
                  onClick: (_e, toastObject) => {
                    toastObject.goAway(0)
                  }
                }
              ],
              theme: 'pe_toast',
              duration: ToastDuration.FIVE_SECONDS
            })

            this.cleanReferrals()
          }
        } else this.cleanReferrals()
      } catch (error) {
        this.cleanReferrals()
        this.disabledReferrals = false
        return
      }
    }
    if (reservation.activeRate) {
      if (this.selectedReferrals.length < 2) this.addReferral(reservation)
      else reservation.isActive = false
    } else this.removeReferral(reservation)
    this.disabledReferrals = false
  }

  openResortCredit() {
    this.resortCreditModal = true
  }
  closeResortCredit() {
    this.resortCreditModal = false
  }

  cleanReferrals() {
    this.selectedReferrals = []
    this.activeReferrals = this.activeReferrals.map((ref: any) => {
      return {
        ...ref,
        activeRate: false
      }
    })
  }

  getRatesByCode(code: string) {
    return this.cleverStore.getRatesByCode(code)
  }

  getRefundableRatesByCode(code: string): any[] {
    const rates = this.getRatesByCode(code)

    if (rates) {
      return rates.refundable as any
    }
    return []
  }

  getNonRefundableRatesByCode(code: string): any[] {
    const rates = this.getRatesByCode(code)

    if (rates) {
      return rates.nonRefundable as any
    }

    return []
  }

  get rates() {
    // console.log("DETAIL RATES: ", this.cleverStore.roomsData)
    return this.cleverStore.getRatesByCode(this.code, this.isLockOff)
  }

  get refundableRates(): any[] {
    if (this.rates) {
      const preferetialRate = (this.rates.refundable as any).find(
        (rate: any) => rate.code === 'PREFERENCIAL'
      )
      return (this.rates.refundable as any).map((rate: any) => ({
        ...rate,
        regularRate: rate.regularRate > 0 ? rate.regularRate : preferetialRate.regularRate
      }))
    }
    return []
  }

  get nonRefundableRates(): any[] {
    if (this.rates) {
      const preferetialRate = (this.rates.nonRefundable as any).find(
        (rate: any) => rate.code === 'PREFERENCIAL'
      )
      return (this.rates.nonRefundable as any).map((rate: any) => ({
        ...rate,
        regularRate: rate.regularRate > 0 ? rate.regularRate : preferetialRate.regularRate
      }))
    }

    return []
  }

  get publicImperialPrice() {
    return this.publicRate
  }

  get publicPrice() {
    // set preferential rate as default on imperial
    if (this.isImperialOption || this.isBonusWeekOption) {
      const item = this.refundableRates.find(item => item.code === 'PREFERENCIAL')
      return usdFormatter.format(item.regularRate)
    }

    if (this.rates) {
      if (this.selectedRefundRate === RefundableOptions.REFUNDABLE) {
        const item = this.refundableRates.find(item => item.code === this.selectedRate)

        if (!item) {
          return '$0'
        }

        return usdFormatter.format(item.regularRate)
      }

      const item = this.nonRefundableRates.find(item => item.code === this.selectedRate)
      return usdFormatter.format(item.regularRate)
    }

    return '$0'
  }

  get memberPrice() {
    const findRateP2 = LockOffRoomAccessCode.includes(this.code) && !this.isLockOff
    const findRateP1 = PresidentialSecondRoomCodes.includes(this.code)

    if (this.rates || this.isImperialOption) {
      if (this.isImperialOption) {
        return '$0'
      }

      if (this.selectedRate === BookingCategoryStatus.BONO) {
        if (this.rateBonus > 0) return usdFormatter.format(this.rateBonus)
        else return '$0'
      }

      if (this.selectedRefundRate === RefundableOptions.REFUNDABLE) {
        const refundRate = this.refundableMemberRate({rates: this.rates})

        if (findRateP2 || findRateP1) {
          const itemPS = this.getRefundableRatesByCode(getNextRoomAccessCode(this.code)).find(
            item => {
              return item.code === this.selectedRate
            }
          )
          return usdFormatter.format(refundRate + (itemPS?.rate || 0))
        }

        if (this.selectedRate === BookingCategoryStatus.REFERIDO) {
          if (this.bookingStore.referralProgram !== null) {
            return usdFormatter.format(refundRate + this.bookingStore.referralProgram!.fee)
          }
        }
        return usdFormatter.format(refundRate)
      }

      const nonRefundRate = this.nonRefundableMemberRate({rates: this.rates})

      if (findRateP2 || findRateP1) {
        const itemPS2 = this.getNonRefundableRatesByCode(getNextRoomAccessCode(this.code)).find(
          item => item.code === this.selectedRate
        )
        return usdFormatter.format(nonRefundRate + (itemPS2?.rate || 0))
      }

      if (this.selectedRate === BookingCategoryStatus.REFERIDO) {
        if (this.bookingStore.referralProgram !== null) {
          return usdFormatter.format(nonRefundRate + this.bookingStore.referralProgram!.fee)
        }
      }
      return usdFormatter.format(nonRefundRate)
    }

    return '$0'
  }

  refundableMemberRate({rates = this.rates}) {
    if (!rates) return 0
    const item = this.refundableRates.find(item => item.code === this.selectedRate)
    if (!item || item.rate == -1) {
      return 0
    }
    return item.rate
  }

  nonRefundableMemberRate({rates = this.rates}) {
    if (!rates) return 0
    const item = this.nonRefundableRates.find(item => item.code === this.selectedRate)
    if (!item || item.rate == -1) {
      return 0
    }
    return item.rate
  }

  get rateCodeDetails() {
    return this.selectedRates.find(item => item.code === this.selectedRate)
  }

  get isDisabled() {

    if(this.selectedRates.length === 0) return true

    const isFreeReservation = [
      BookingCategoryStatus.BONO,
      BookingCategoryStatus.IMP_WEEKS
    ].includes(this.selectedRate as any)

    if (isFreeReservation) {
      if (this.selectedRate === BookingCategoryStatus.BONO) {
        return !(this.selectedReferrals.length >= 2)
      }

      if (this.selectedRate === BookingCategoryStatus.IMP_WEEKS) {
        return this.loadingButton || this.lockByImperialsNotFound
      }

      return false
    }
    if (!this.rateCodeDetails || this.rateCodeDetails.rate < 0) {
      return false
    }

    if (this.showReferralWeeks && this.promotions.length <= 0) return true

    if (this.selectedRate === BookingCategoryStatus.PREFERENCIAL)
      return this.publicPrice === '-$1' || this.memberPrice === '-$1'
    else return false
  }

  get isLoadingRates() {
    if (this.selectedRate === BookingCategoryStatus.INCENTIVA) {
      return this.incentiveRatesDaily?.length === 0
    }

    if (this.selectedRate === BookingCategoryStatus.ANIVERSARIO) {
      return this.annyversaryRatesDaily?.length === 0
    }
    return false
  }

  get isImperialOption() {
    let selectedOption
    if (this.selectedRefundRate === 'refundable') {
      selectedOption = this.refundableRates.find(
        item => item.code === this.selectedRate
      ) as RefundableButton
    }
    if (this.selectedRefundRate === 'nonRefundable') {
      selectedOption = this.nonRefundableRates.find(
        item => item.code === this.selectedRate
      ) as RefundableButton
    }

    return selectedOption?.code === BookingCategoryStatus.IMP_WEEKS
  }

  get isBonusWeekOption() {
    let selectedOption
    if (this.selectedRefundRate === 'refundable') {
      selectedOption = this.refundableRates.find(
        item => item.code === this.selectedRate
      ) as RefundableButton
    }
    if (this.selectedRefundRate === 'nonRefundable') {
      selectedOption = this.nonRefundableRates.find(
        item => item.code === this.selectedRate
      ) as RefundableButton
    }

    return selectedOption?.code === BookingCategoryStatus.BONO
  }

  get isIncentiveOption() {
    let selectedOption
    if (this.selectedRefundRate === 'refundable') {
      selectedOption = this.refundableRates.find(
        item => item.code === this.selectedRate
      ) as RefundableButton
    }
    if (this.selectedRefundRate === 'nonRefundable') {
      selectedOption = this.nonRefundableRates.find(
        item => item.code === this.selectedRate
      ) as RefundableButton
    }

    return selectedOption?.code === BookingCategoryStatus.INCENTIVA
  }

  get isAnnyversaryOption() {
    let selectedOption
    if (this.selectedRefundRate === 'refundable') {
      selectedOption = this.refundableRates.find(
        item => item.code === this.selectedRate
      ) as RefundableButton
    }
    if (this.selectedRefundRate === 'nonRefundable') {
      selectedOption = this.nonRefundableRates.find(
        item => item.code === this.selectedRate
      ) as RefundableButton
    }

    return selectedOption?.code === BookingCategoryStatus.ANIVERSARIO
  }

  get dailyRates() {
    if (this.rates) {
      if (this.isBonusWeekOption && this.bonusRatesDaily) {
        // @ts-ignore
        return this.rates.pricesPerNight.map((night: any) => {
          const rateDaily: any[] = this.bonusRatesDaily.filter((rate: any) => {
            return new Date(rate.Arv_date).getTime() === new Date(night.date).getTime()
          })

          const price = rateDaily.reduce(
            (accum: number, rate: any) => accum + (rate.Rate + rate.AmountChargeUpgrade),
            0
          )
          return {
            date: dateToMonthDay(night.date),
            price,
            dashedPrice: night.regularPrice
          }
        })
      } else if (
        this.isIncentiveOption &&
        this.incentiveRatesDaily !== null &&
        this.incentiveRatesDaily?.length > 0
      ) {
        // @ts-ignore
        return this.rates.pricesPerNight.map((night: any) => {
          const rateDaily: any[] = this.incentiveRatesDaily.filter((rate: any) => {
            return new Date(rate.Arv_date).getTime() === new Date(night.date).getTime()
          })

          const price = rateDaily.reduce(
            (accum: number, rate: any) => accum + (rate.Rate + rate.AmountChargeUpgrade),
            0
          )
          const newDaily = {
            date: dateToMonthDay(night.date),
            price,
            dashedPrice: night.regularPrice
          }

          return newDaily
        })
      } else if (
        this.isAnnyversaryOption &&
        this.annyversaryRatesDaily !== null &&
        this.annyversaryRatesDaily?.length > 0
      ) {
        // @ts-ignore
        return this.rates.pricesPerNight.map((night: any) => {
          const rateDaily: any[] = this.annyversaryRatesDaily.filter((rate: any) => {
            return new Date(rate.Arv_date).getTime() === new Date(night.date).getTime()
          })

          const price = rateDaily.reduce(
            (accum: number, rate: any) => accum + (rate.Rate + rate.AmountChargeUpgrade),
            0
          )
          const newDaily = {
            date: dateToMonthDay(night.date),
            price,
            dashedPrice: night.regularPrice
          }

          return newDaily
        })
      } else if (
        this.selectedRefundRate === RefundableOptions.REFUNDABLE ||
        this.isImperialOption
      ) {
        // @ts-ignore
        return this.rates.pricesPerNight.map(({date, price, regularPrice}) => ({
          date: dateToMonthDay(date),
          price,
          dashedPrice: regularPrice
        }))
      }

      // @ts-ignore
      return this.rates.pricesNonRefundablePerNight.map(({date, price, regularPrice}) => ({
        date: dateToMonthDay(date),
        price,
        dashedPrice: regularPrice
      }))
    }

    return []
  }

  get showTourIcon() {
    return !!this.tour
  }

  get radioPosition() {
    return this.windowWidth > CustomBreakpoints.DESKTOP ? 'horizontal' : 'vertical'
  }

  private grandProperties = ['MPG']
  private leBlancProperties = ['LBC', 'ZPLB']
  private regularProperties = ['MPC', 'MPPC', 'CZ', 'PL', 'ZCJG', 'MPS', 'SP', 'BP']
  private propertiesLevel = [
    {code: 'MPG', level: 'GRAND'},
    {code: 'LBC', level: 'LB'},
    {code: 'ZPLB', level: 'LB'}
  ]

  private marketMaxBonus: any = [
    {market: 'UK', nights: 10, uc: 750},
    {market: 'MEXICO', nights: 7, uc: 500},
    {market: 'USA', nights: 7, uc: 500},
    {market: 'CANADA', nights: 7, uc: 500},
    {market: 'LATAM', nights: 7, uc: 500}
  ]

  getFormatDate(date: string, format: string = 'MMM DD, YYYY') {
    return dayjs(date).format(format)
  }

  datesMonthDiff(date1: any, date2: any) {
    return Math.abs(dayjs(date1).diff(dayjs(date2), 'month', true))
  }

  getNigthsReservation(checkIn: any, checkOut: any) {
    return Math.abs(dayjs(checkOut).diff(dayjs(checkIn), 'day', true))
  }

  get selectedRates() {
    const memberProperty = localStorage.getItem('MemberPropertyAccess')
    let wholesalerMember = null

    if (memberProperty) {
      wholesalerMember = JSON.parse(memberProperty)
    }

    let rates =
      this.selectedRefundRate === RefundableOptions.REFUNDABLE
        ? this.refundableRates
        : this.nonRefundableRates

    if (this.isBaglioniBooking) {
      const baglioniReleasedOptions = [
        BookingCategoryStatus.BONO,
        BookingCategoryStatus.PREFERENCIAL,
        BookingCategoryStatus.REFERIDO
      ]

      rates = rates.filter(rate => baglioniReleasedOptions.includes(rate.code))
    }

    let applicableReferrals: any[] = []
    const {propertyCode, checkIn, checkOut} = this.bookingStore.getBooking
    const nightsReservation = this.getNigthsReservation(checkOut, checkIn)
    const wholesaler = wholesalerMember ? wholesalerMember.memberExtension._Wholesaler : false
    const isWeek52 = ValidateWeek52(new Date(checkIn), new Date(checkOut), nightsReservation)

    // Solo si es reserva refundable y no es semana 52
    if (this.selectedRefundRate === RefundableOptions.REFUNDABLE && !isWeek52) {
      const reservations = this.bookingStore.reservationsReferrals

      const anniversaryDate = this.authStore.currentUser?._SaleDate || null

      const maxBonus =
        this.marketMaxBonus.find((m: any) => m.market === this.authStore.userMarket) || 7

      if (nightsReservation > maxBonus.nights) {
        applicableReferrals = []
      } else {
        const levelItem = this.propertiesLevel.find(p => p.code === propertyCode)
        const level = levelItem?.level || 'PR'
        if (level === 'LB') {
          applicableReferrals = reservations.filter((reservation: any) =>
            this.leBlancProperties.includes(reservation.Hotel)
          )
        } else if (level === 'GRAND') {
          applicableReferrals = reservations.filter(
            (reservation: any) =>
              this.grandProperties.includes(reservation.Hotel) ||
              this.leBlancProperties.includes(reservation.Hotel)
          )
        } else {
          applicableReferrals = reservations
        }

        applicableReferrals = applicableReferrals.filter(
          (item: any) => dayjs(item.Arv_date) <= dayjs(checkIn)
        )

        const referralsMinNights = Math.min(
          ...applicableReferrals.map((r: ReservationReferral) => r.Nights)
        )

        if (nightsReservation < referralsMinNights) {
          applicableReferrals = []
        }

        applicableReferrals = applicableReferrals.filter(
          (item: any) => item.Nights >= nightsReservation
        )

        if (applicableReferrals.length === 2) {
          const maxDateReferral = applicableReferrals.sort((a: any, b: any) => {
            return dayjs(b.Depart_dt) > dayjs(a.Depart_dt) ? 1 : -1
          })[0]

          if (this.datesMonthDiff(maxDateReferral.Depart_dt, checkIn) > 12) {
            applicableReferrals = []
          }
        }

        const maxYear = new Date(checkOut).getFullYear()
        const usedReferrals = this.bookingStore.allUsedReferrals
          ? this.bookingStore.allUsedReferrals.map((r: any) => r.Folio)
          : []
        applicableReferrals = applicableReferrals
          .filter((r: any) => !usedReferrals.includes(r.Folio))
          .map((reservation: any) => {
            let activeYear = maxYear
            if (anniversaryDate != null) {
              const anniversaryFrom = new Date(
                maxYear - 1 + anniversaryDate.toString().substring(4)
              )
              const anniversaryTo = new Date(maxYear + anniversaryDate.toString().substring(4))
              const checkoutReferral = new Date(reservation.Depart_dt)
              if (checkoutReferral >= anniversaryFrom && checkoutReferral < anniversaryTo)
                activeYear = maxYear
              else if (checkoutReferral < anniversaryFrom) activeYear = maxYear - 1
              else activeYear = maxYear + 1
            }

            return {
              ...reservation,
              activeRate: false,
              activeYear
            }
          })
      }
    }

    applicableReferrals = applicableReferrals.sort(
      (beforeReservation: any, afterReservation: any) => {
        const before = new Date(beforeReservation.Depart_dt).getTime()
        const after = new Date(afterReservation.Depart_dt).getTime()
        return before > after ? 1 : -1
      }
    )

    if (this.isBaglioniBooking) {
      applicableReferrals = applicableReferrals.filter((r: any) => r.MainBrand === HotelBrands.Baglioni)
      if (propertyCode === BaglioniHotelsEnum.BAMA) {
        applicableReferrals = applicableReferrals.filter((r: any) => r.Hotel === BaglioniHotelsEnum.BAMA)
      } else {
        applicableReferrals = applicableReferrals.filter((r: any) => r.Hotel !== BaglioniHotelsEnum.BAMA)
      }
    } else {
      applicableReferrals = applicableReferrals.filter((r: any) => r.MainBrand !== HotelBrands.Baglioni)
    }
    this.bookingStore.setActiveReferrals(applicableReferrals)

    if (
      applicableReferrals.length < 2 ||
      this.selectedRefundRate === RefundableOptions.NO_REFUNDABLE ||
      wholesaler ||
      isWeek52
    )
      return rates.filter(rate => rate.code !== 'BONO')
    else return rates
  }
  // Incentive

  loadigRates = false

  isAvailableIncentiveProv(): boolean {
    return !this.incentiveProvisionsAvailable || this.incentiveProvisionsAvailable.length <= 0
  }

  get anniversaryProvisionsAvailable() {
    if (!this.hasValidProvisionsRates()) return null
    return this.provisionStore.anniversaryItems
  }

  hasValidProvisionsRates(): boolean {
    return !(
      (this.selectedRefundRate === RefundableOptions.REFUNDABLE &&
        this.refundableMemberRate({rates: this.rates}) === 0) ||
      (this.selectedRefundRate === RefundableOptions.NO_REFUNDABLE &&
        this.nonRefundableMemberRate({rates: this.rates}) === 0)
    )
  }

  get incentiveProvisionsAvailable() {
    if (!this.hasValidProvisionsRates()) return null
    return this.provisionStore.incentiveItems
  }

  async onSelectedIncentive(evt: any, code: any) {
    this.incentiveSelected = evt
    if (this.incentiveRatesDaily?.length > 0 || !evt) {
      this.loadigRates = false
      return
    }
    try {
      this.loadigRates = true
      const ratesPromotionResponse = await this.bookingStore.getReservationRateGeneric(
        code,
        ReservationTypes.INCENTIVA,
        evt
      )
      if (ratesPromotionResponse) {
        this.incentiveRatesDaily = ratesPromotionResponse.data?.RCDetail[0]?.RmfolioRc
        this.rateIncentive = ratesPromotionResponse.data?.RCDetail[0]?.RmfolioRc.reduce(
          (accum: number, rate: any) => accum + (rate.Rate + rate.AmountChargeUpgrade),
          0
        )
      }
    } catch (error) {
    } finally {
      this.loadigRates = false
    }
  }

  async onSelectedAnniversary(evt: any, code: any) {
    this.anniversarySelected = evt
    if (this.annyversaryRatesDaily?.length > 0 || !evt) {
      this.loadigRates = false
      return
    }
    try {
      this.loadigRates = true
      const ratesPromotionResponse = await this.bookingStore.getReservationRateGeneric(
        code,
        ReservationTypes.ANIVERSARIO,
        evt
      )

      if (ratesPromotionResponse) {
        this.annyversaryRatesDaily = ratesPromotionResponse.data?.RCDetail[0]?.RmfolioRc
        this.rateAnniversary = ratesPromotionResponse.data?.RCDetail[0]?.RmfolioRc.reduce(
          (accum: number, rate: any) => accum + (rate.Rate + rate.AmountChargeUpgrade),
          0
        )
      }
    } catch (error) {
    } finally {
      this.loadigRates = false
    }
  }

  public get contentClasses() {
    return [this.isOpen ? 'pe-h-auto' : 'pe-h-0', 'pe-overflow-hidden', 'pe-relative']
  }

  public get summaryProps() {
    const {checkIn, checkOut} = this.bookingStore.getBooking

    return {
      totalNights: selectedNights(dayjs(checkIn).toDate(), dayjs(checkOut).toDate()),
      selectedRate: this.selectedRate,
      priceTitle: this.priceTitle,
      roomCapacity: this.max,
      roomArea: this.area ?? '',
      creditLimit: this.creditLimit,
      publicRate: this.publicPrice,
      totalRate: this.memberPrice,
      ratesTitle: this.ratesTitle,
      upToText: this.upToText,
      resortCreditText: this.resortCreditText,
      maxRoomText: this.maxRoomText,
      publicRateText: this.publicRateText,
      currency: this.currency,
      button: {},
      skeletonClass: this.skeletonClass,
      isImperial: this.isImperialOption,
      isRatesLoading: this.skeleton
    }
  }

  public get offerCounterProps() {
    return {
      text: this.textOffer,
      endTime: this.endTimeOffer,
      uppercase: true
    }
  }

  public get titleClasses() {
    // 'cursor-auto' !this.useToggle
    return [
      'pe-py-5 md:pe-py-4',
      'pe-px-3 md:pe-px-3',
      'pe-rounded-t-md',
      'pe-rounded-b-none',
      'pe-bg-black',
      '!pe-no-underline',
      'pe-z-5'
    ]
  }

  public get iconClasses() {
    return [
      'pe-absolute',
      'pe-right-0',
      'pe-pe-bottom-0',
      'pe-h-0',
      'pe-w-8',
      'pe-fill-transparent',
      'pe-stroke-blue-light',
      'transition-[height]',
      'duration-300'
    ]
  }

  get provisionesClasses() {
    return ['pe-text-left']
  }

  get provisionTitleClasses() {
    return [
      'pe-my-8',
      'pe-font-semibold',
      'pe-uppercase',
      'pe-text-white',
      'pe-text-center md:pe-text-left'
    ]
  }

  get lockClasses() {
    return {
      'pe-absolute pe-z-[9] pe-top-0 pe-bottom-0 pe-right-0 pe-left-0 pe-flex pe-flex-col pe-justify-center pe-items-center pe-text-white pe-text-center pe-p-5 pe-box-border':
        this.lock
    }
  }

  get unavailableClasses() {
    return {
      'pe-absolute bg-unavailable pe-z-[9] pe-top-0 pe-bottom-0 pe-right-0 pe-left-0 pe-flex pe-flex-col pe-justify-center pe-items-center pe-text-white pe-p-5 pe-box-border':
        !this.available
    }
  }

  get blurClasses() {
    return {
      'giga-blur pe-pointer-events-none': this.lock || this.hasPresidentialMinPax
    }
  }

  get provisionContainerClasses() {
    return ['pe-my-4', 'pe-max-h-[250px]', 'pe-overflow-y-scroll']
  }

  public get upIconClasses() {
    return [{'pe-h-8': this.isOpen}]
  }

  public get downIconClasses() {
    return [{'pe-h-8': !this.isOpen}]
  }

  public get computedBadge() {
    return this.lastRooms
      ? `${this.lastRoomsTextLeft} ${this.lastRooms} ${this.lastRoomsTextRight}`
      : null
  }

  get isButtonBlock() {
    return this.windowWidth <= CustomBreakpoints.MOBILE
  }

  get showReferralWeeks() {
    return this.selectedRate === Rates.REFERAL
  }

  get showAnniversary() {
    return this.selectedRate === Rates.ANIVERSARY
  }

  get showIncentiveWeeks() {
    return this.selectedRate === Rates.INCENTIVE
  }

  get showPreferencialRate() {
    return this.selectedRate === Rates.PREFERENIAL
  }

  get showImperialWeeks() {
    return this.selectedRate === BookingCategoryStatus.IMP_WEEKS
  }

  get showBonusReferals() {
    return this.selectedRate === BookingCategoryStatus.BONO
  }

  get provitionTitle() {
    if (this.showAnniversary && !this.isLoadingRates) {
      return this.$t('aniversaryTitle') as string
    }

    if (this.showIncentiveWeeks && !this.isLoadingRates) {
      return this.$t('incentiveTitle') as string
    }

    if (this.loadingButton || this.loadigRates) {
      return this.$t('loadingRates') as string
    }

    return this.$t('unavailableOptions') as string
  }

  // Methods
  public toggleTour() {
    this.showTour = !this.showTour
  }

  public toggleState() {
    if (!this.useToggle) return
    if (this.icon) this.isOpen = !this.isOpen
  }

  get skeleton() {
    /**
    if (this.bookingStore.skeletonList.length === 0) {
      return false
    }
    const skeletonActive = this.bookingStore.skeletonList.filter((item: string) => {
      return item === this.skeletonClass
    })
     */
    //return skeletonActive.length || this.publicPrice === '$0'
    return this.refundableRates.length === 0
    // return this.bookingStore.isSkeleton
  }

  get isBaglioniBooking() {
    return baglioniCodes.includes(this.bookingStore.getBooking.propertyCode)
    // return this.bookingStore.getBooking.propertyCode
  }

  // Bonus week
  addReferral(reservation: any) {
    this.selectedReferrals.push(reservation)
  }

  // Bonus week
  removeReferral(reservation: any) {
    const index = this.selectedReferrals.findIndex(r => r.Folio === reservation.Folio)
    if (index != null) {
      this.selectedReferrals.splice(index, 1)
    }
  }

  @Emit()
  changeRoomCategory() {}

  @Emit()
  selectedRateOnClick(optionCode: string) {
    if (this.selectedRate === BookingCategoryStatus.BONO) {
      this.activeReferrals = this.activeReferrals = JSON.parse(
        JSON.stringify(this.bookingStore.activeReferrals)
      )
      this.selectedReferrals = []
    }
    return optionCode
  }

  @Emit()
  selectRoom(): SelectedCategory {
    let selectedOption
    // findSelectedImperial based on selectedRate
    if (this.selectedRefundRate === 'refundable') {
      selectedOption = this.refundableRates.find(
        item => item.code === this.selectedRate
      ) as RefundableButton
    }
    if (this.selectedRefundRate === 'nonRefundable') {
      selectedOption = this.nonRefundableRates.find(
        item => item.code === this.selectedRate
      ) as RefundableButton
    }

    this.bookingStore.setSelectedReferrals(this.selectedReferrals)
    const summary: SelectedCategory = {
      dailyRates: this.dailyRates,
      selectedCategory: this.selectedCategory,
      selectedOption,
      selectedRefundRate: this.selectedRefundRate,
      totalRate: this.totalRate,
      creditLimit: this.creditLimit,
      isImperial: this.isImperialOption,
      imperialPublicRatesData: {
        publicRate: this.publicPrice,
        totalRate: this.memberPrice
      },
      bonusWeekPublicRatesData: {
        publicRate: this.publicPrice,
        totalRate: this.memberPrice
      },
      bonusRate: this.rateBonus,
      amountUpgrade: this.amountUpgrade,
      provisions: {
        anniversary: this.anniversarySelected,
        incentive: this.incentiveSelected
      }
    }
    return summary
  }

  @Emit()
  saveRoom() {}

  mounted() {
    this.$nextTick(() => {
      this.windowWidth = window.innerWidth
      window.addEventListener('resize', this.onResize)
    })
  }

  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  }

  onResize() {
    this.windowWidth = window.innerWidth
  }
}
</script>

<style lang="scss" src="./PEBookingRoomDetail.scss" scoped />
