<template>
  <section>
    <div class="pe-p-[24px] pe-bg-black pe-text-white">
      <div class="flex justify-between">
        <div class="pe-mt-[12px]">
          <span class="pe-flex">
            <span
              class="pe-uppercase pe-font-serif pe-font-medium pe-text-[24px] pe-text-blue-light"
              >RESERVATION</span
            >
            <PEIcon
              class="pe-text-blue-light"
              size="42"
              >chevron-right</PEIcon
            >
          </span>
          <span class="pe-uppercase pe-font-serif pe-font-medium pe-text-[24px] pe-text-white"
            >SEND CONFIRMATION LETTER</span
          >
        </div>
      </div>
    </div>

    <!-- BACK TO RESERVATION -->
    <div class="pe-bg-black pe-text-white pe-pb-4">
      <div class="flex justify-between">
        <span
          class="pe-text-blue-light pe-flex pe-cursor-pointer"
          @click.prevent="bookingsStore.drawerStepNow = DrawerSteps.DETAIL"
        >
          <PEIcon
            class="pe-text-blue-light"
            size="25"
            >chevron-left</PEIcon
          >
          Back to reservation
        </span>
      </div>
    </div>

    <!-- FORM -->
    <section v-if="stepSendConfirmation === DrawerStepsInSendConfirmation.FORM">
      <div class="pe-p-[24px] pe-bg-black-light pe-text-white">
        <div class="flex justify-between">
          <div class="pe-mt-[12px] pe-pb-8">
            <label class="pe-font-sans pe-font-normal pe-text-[16px] pe-text-white" v-html="confirmationLetter"
              ></label
            >
          </div>
        </div>
        <div class="flex justify-between">
          <ValidationObserver
            v-slot="{handleSubmit, invalid}"
            class="w-full"
          >
            <form
              ref="form"
              :class="containerClasess"
              class="w-full"
              @submit.prevent="handleSubmit(onEmailSubmit)"
            >
              <ValidationProvider
                v-slot="{errors}"
                name="Email"
                :rules="emailRules"
                class="w-full flex flex-col justify-center items-center"
              >
                <PETextInput
                  name="Email"
                  v-model="email"
                  :class="inputClasses"
                  class="w-full mb-4"
                  v-bind="emailInputProps"
                />
                <div :class="errorClasses">
                  <span>
                    {{ errors[0] }}
                  </span>
                </div>
                <PEButton
                  v-bind="buttonSend"
                  class="mb-6 pe-bg-blue-light"
                  :disabled="invalid"
                />
              </ValidationProvider>
            </form>
          </ValidationObserver>
        </div>
      </div>
    </section>

    <section v-else-if="stepSendConfirmation === DrawerStepsInSendConfirmation.SUCCESS_MESSAGE">
      <div class="pe-p-[48px] pe-bg-black-light pe-text-white">
        <div class="flex justify-center">
          <label class="pe-uppercase pe-font-serif pe-font-medium pe-text-[24px] pe-text-blue-light"
            >{{ $t('confirmationLetterSuccess') }}</label
          >
        </div>
        <!-- <div class="flex justify-center">
          <div class="pe-mt-[8px] pe-pb-4">
            <label class="pe-font-sans pe-font-normal pe-text-[16px] pe-text-white"
              >Lorem ipsum dolor sit amet</label
            >
          </div>
        </div> -->
      </div>
    </section>
  </section>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import {
  DrawerSteps,
  DrawerStepsInSendConfirmation
} from '~/src/app/bookings/domain/enums/drawerStep'
import i18n from '~/src/ui/i18n/common/drawer.lang'
import {BookingsStore} from '~/src/ui/store/bookingsStore'
import {ValidationObserver, ValidationProvider, extend} from 'vee-validate'
import {email, required} from 'vee-validate/dist/rules'
import {BookingStore} from '~/src/ui/store/bookingStore'
import { ModalAndContentStore } from '~/src/ui/store/modalsStore'
extend('email', email)
extend('required', required)

@Component({
  i18n,
  name: 'BookingsDrawerSendConfirmation',
  components: {
    ValidationObserver,
    ValidationProvider
  }
})
export default class BookingsDrawerSendConfirmation extends Vue {
  DrawerSteps = DrawerSteps

  DrawerStepsInSendConfirmation = DrawerStepsInSendConfirmation

  email = ''

  confirmationLetter = ""

  modalsStore = new ModalAndContentStore()

  async mounted() {
    const content = await this.modalsStore.fetchModalContent('bookings-reservation-send-confirmation-letter')
    this.confirmationLetter = content?.content || ""
  }

  async onEmailSubmit() {
    this.bookingsStore.showLoading = true
    const info = this.bookingsStore.detailSelected
    const isNational = this.$nuxt.$pinia.state.value.authStore.user._UserMember._isnational
    /*// console.log(
      '🚀 ~ file: DrawerSendConfirmation.vue ~ line 139 ~ BookingsDrawerSendConfirmation ~ onEmailSubmit ~ info',
      info
    )*/

    const data = {
      application: info.application,
      company: info.company,
      reservations: [
        this.bookingStore.reservationByPay
        /*
        {
          Hotel: info.hotel,
          Folio: info.folioClub,
          Arv_date: info.arv_date,
          Depart_dt: info.depart_dt,
          Status: info.status,
          Guest_cd: `${info.first_name} ${info.last_name}`, // name +last name
          Rm_type: info.rm_type,
          Extension: {
            Refundable: info.Refundable === '0' ? false : true
          }
        }
        */
      ],
      isNational: isNational,
      requeridHTML: 0,
      emailToConfirmation: this.email
    }

    // this.$emit('submitEmail', data)

    const response = await this.bookingsStore.sendConfirmationLetter(data)

    if (!response.errors) {
      this.bookingsStore.drawerStepSendConfirmartionNow =
        DrawerStepsInSendConfirmation.SUCCESS_MESSAGE
      this.bookingsStore.showLoading = false
    }

    return response.data
  }

  get bookingsStore(): BookingsStore {
    return new BookingsStore()
  }

  get bookingStore(): BookingStore {
    return new BookingStore()
  }

  get step(): DrawerSteps {
    return this.bookingsStore.drawerStepNow
  }

  get stepSendConfirmation(): DrawerStepsInSendConfirmation {
    return this.bookingsStore.drawerStepSendConfirmartionNow
  }

  get buttonSend() {
    return {
      type: 'submit',
      solid: true,
      uppercase: true,
      flat: true,
      loading: this.bookingsStore.showLoading,
      label: 'Send'
    }
  }

  get containerClasess() {
    return ['flex flex-col justify-center text-white items-center']
  }

  public get emailRules() {
    return 'required|email'
  }

  get inputClasses() {
    return ['mb-2']
  }

  get emailInputProps() {
    return {
      type: 'email',
      label: 'Email',
      disabled: this.bookingsStore.showLoading,
      name: 'Email'
    }
  }

  get errorClasses() {
    return ['text-left text-red-600 pr-1 text-sm mb-8 w-full']
  }
}
</script>
