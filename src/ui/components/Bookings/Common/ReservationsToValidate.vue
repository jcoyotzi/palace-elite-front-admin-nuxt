<template>
  <div>
    <div
      v-if="showReservationsToValidate"
      class="pe-mb-[50px] pe-bg-black-light pe-p-[30px] pe-px-[20px] md:pe-px-[40px] pe-rounded-[10px] pe-text-white pe-justify-between md:pe-flex pe-items-center"
    >
      <div class="pe-justify-start">
        <div class="pe-font-serif pe-text-[24px] pe-uppercase">
          {{ $t('reservationsToValidate') }}
        </div>
        <div class="pe-mt-[30px] md:pe-mt-[10px] pe-font-sans pe-text-[16px]">
          {{ $t('youHave') }}
          <span
            class="pe-mx-1 pe-text-blue-light pe-underline cursor-pointer"
            @click.prevent="filterToValidate"
          >
            {{ totalReservationsToValidate }}
          </span>
          {{ $t('toValidate') }}
        </div>
      </div>
      <div class="pe-justify-end pe-mt-[40px] md:pe-mt-[0px]">
        <PEButton
          solid
          class="pe-uppercase pe-h-[50px] pe-w-full md:pe-w-auto"
          @click.prevent="filterToValidate"
        >
          {{ $t('validateNow') }}
        </PEButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import i18n from '~/src/ui/i18n/bookings.lang'
import {BookingsStore} from '~/src/ui/store/bookingsStore'
import ReservationsDto from '~/src/app/bookings/domain/dto/reservationsDto'

@Component({
  i18n
})
export default class ReservationToValidate extends Vue {
  public filterToValidate(): void {
    this.bookingsStore.getFilterSelected(['All', 'To Validate'], [1, 2])
  }

  get showReservationsToValidate() {
    return this.bookingsStore.showReservationsToValidate
  }

  get totalReservationsToValidate() {
    const totalToValidate = this.bookingsStore.paginationReservations.totalToValidate
    if (totalToValidate > 1) return this.$t('reservations', {number: totalToValidate})
    return this.$t('reservation', {number: totalToValidate})
  }

  get bookingsStore(): BookingsStore {
    return new BookingsStore()
  }

  get reservationsToValidate(): ReservationsDto[] {
    return this.bookingsStore.reservationsToValidate
  }
}
</script>
