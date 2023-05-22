<template>
  <PEDrawer v-model="showDrawerDetails">
    <BookingsDrawerDetail v-if="step === DrawerSteps.DETAIL" />
    <BookingsDrawerCancelReservation v-else-if="step === DrawerSteps.CANCEL_RESERVATION" :is-national="isNational" @submitCancel="cancelReservation" />
    <BookingsDrawerSendConfirmation v-else-if="step === DrawerSteps.SEND_CONFIRMATION" />
  </PEDrawer>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import BookingsDrawerSendConfirmation from './DrawerSendConfirmation.vue'
import BookingsDrawerDetail from './DrawerDetail.vue'
import BookingsDrawerCancelReservation from './DrawerCancelReservation.vue'
import i18n from '~/src/ui/i18n/common/drawer.lang'
import {BookingsStore} from '~/src/ui/store/bookingsStore'
import {DrawerSteps} from '~/src/app/bookings/domain/enums/drawerStep'
import { UseAuth } from '~/src/ui/store/auth'

@Component({
  i18n,
  name: 'BookingsDrawer',
  components: {
    BookingsDrawerDetail,
    BookingsDrawerCancelReservation,
    BookingsDrawerSendConfirmation
  }
})
export default class BookingsDrawer extends Vue {
  DrawerSteps = DrawerSteps

  userAuth = new UseAuth()

  get bookingsStore(): BookingsStore {
    return new BookingsStore()
  }

  get step(): DrawerSteps {
    return this.bookingsStore.drawerStepNow
  }

  get showDrawerDetails(): boolean {
    return this.bookingsStore.showDrawerDetails
  }

  set showDrawerDetails(show: boolean) {
    this.bookingsStore.showDrawerDetails = show

    if (!show) {
      this.bookingsStore.detailSelected = {}
      this.bookingsStore.drawerStepNow = DrawerSteps.DETAIL
    }
  }

  get isNational() {
    return this.userAuth.isNational
  }

  cancelReservation() {
    this.$emit('reloadTable')
    this.bookingsStore.detailSelected = {}
    this.bookingsStore.drawerStepNow = DrawerSteps.DETAIL
  }
}
</script>
