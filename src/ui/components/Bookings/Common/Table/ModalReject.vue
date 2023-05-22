<template>
  <PEModal
    class="modal-reject"
    v-model="showModal"
  >
    <template #title>
      <div
        v-if="!rejectReservationError"
        class="pe-mb-10 pe-text-[24px] pe-text-center pe-uppercase pe-text-white pe-w-[100%] sm:pe-w-auto"
      >
        {{ getTitle }}
      </div>
      <div
        v-else
        class="pe-mb-10 pe-text-[24px] pe-text-center pe-uppercase pe-text-red-700 pe-w-[100%] sm:pe-w-auto"
      >
        {{ $t('titleRejectError') }}
      </div>
    </template>
    <template #content>
      <p
        v-html="getMessage"
        class="pe-text-center pe-text-white pe-mt-6 pe-mb-10"
      />
    </template>
    <template #buttons>
      <div class="pe-flex pe-flex-col pe-items-center lg:pe-flex-row pe-gap-12 pe-mt-6">
        <PEButton
          v-bind="bindButtonClose"
          :disabled="showLoadingRejectReservation"
          @click.prevent="closeModal"
        >
          {{ $t('close') }}
        </PEButton>
        <PEButton
          flat
          solid
          uppercase
          :loading="showLoadingRejectReservation"
          class="pe-w-[240px]"
          @click.prevent="rejectReservation"
          v-if="!rejectReservationSuccessful"
        >
          {{ $t('reject') }}
        </PEButton>
      </div>
    </template>
  </PEModal>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import {BookingsStore} from '~/src/ui/store/bookingsStore'
import i18n from '~/src/ui/i18n/bookings.lang'
import {UseAuth} from '~/src/ui/store/auth'

@Component({
  i18n
})
export default class ModalRejectReservation extends Vue {
  get bookingsStore(): BookingsStore {
    return new BookingsStore()
  }

  get showModal() {
    return this.bookingsStore.showModalRejectReservation
  }

  get rejectReservationSuccessful(): boolean {
    return this.bookingsStore.rejectReservationSuccessful
  }

  get bindButtonClose() {
    return {
      text: !this.rejectReservationSuccessful,
      outlinedSecondary: this.rejectReservationSuccessful,
      class: this.rejectReservationSuccessful ? 'pe-w-[240px]' : '',
      flat: true,
      uppercase: true
    }
  }

  set showModal(value: boolean) {
    this.bookingsStore.showModalRejectReservation = value
  }

  get rejectReservationError(): boolean {
    return this.bookingsStore.rejectReservationError
  }

  set rejectReservationError(value: boolean) {
    this.bookingsStore.rejectReservationError = value
  }

  get getTitle(): string {
    if (this.rejectReservationSuccessful) return this.$t('titleRejectSuccess') as string
    return this.$t('titleRejectConfirm') as string
  }

  get reservation() {
    return this.bookingsStore.detailSelected
  }

  get getMessage(): string {
    if (this.rejectReservationSuccessful)
      return this.$t('messageRejectSuccess', {
        number: this.reservation.folioClub
      }) as string

    if (this.rejectReservationError) return this.$t('messageRejectError') as string

    return this.$t('messageRejectConfirm') as string
  }

  async closeModal() {
    this.showModal = false
    setTimeout(() => {
      this.rejectReservationError = false
    }, 300)
  }

  get authStore(): UseAuth {
    return new UseAuth()
  }

  get isNational() {
    return this.authStore.isNational
  }

  get applicationUserMember() {
    return this.authStore.applicationUserMember
  }

  get userCompany() {
    return this.authStore.userCompany
  }

  get payloadRejectReservation() {
    return {
      application: this.applicationUserMember!,
      company: this.userCompany!,
      isNational: this.isNational!,
      hotel: this.reservation.hotel,
      folio: this.reservation.folioClub,
      reason: 'Reject Reservation'
    }
  }

  get showLoadingRejectReservation() {
    return this.bookingsStore.showLoadingRejectReservation
  }

  rejectReservation(): void {
    this.bookingsStore.showLoadingRejectReservation = true
    this.bookingsStore.rejectReservation(this.payloadRejectReservation)
  }
}
</script>
<style scoped>
::v-deep div.fixed > div > div.flex {
  height: 250px !important;
}
.modal-reject {
  z-index: 999999;
}
</style>
