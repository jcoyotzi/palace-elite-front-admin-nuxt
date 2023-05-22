<template>
  <div
    class="pe-bg-black-medium pe-rounded-b-[10px] pe-w-full pe-h-auto justify-between pe-px-[40px] pe-py-[20px]"
  >
    <ValidationObserver
      v-slot="{invalid}"
      tag="div"
    >
      <div
        v-if="!sendPaymentLinkSuccess"
        class="pe-justify-end pe-flex pe-gap-6"
      >
        <ValidationProvider
          v-slot="{errors}"
          name="nameValidator"
          rules="required"
          tag="div"
          class="pe-w-auto"
        >
          <PETextInput
            name="name"
            :label="$t('recipientName')"
            type="text"
            v-model="formLink.name"
          />
          <div class="pe-w-full pe-pt-2 pe-text-red-600">
            <p>
              {{ errors[0] }}
            </p>
          </div>
        </ValidationProvider>

        <ValidationProvider
          v-slot="{errors}"
          ref="emailValidator"
          rules="required|email"
          tag="div"
          class="!pe-w-[350px]"
        >
          <PETextInput
            name="recipients-email"
            :label="$t('recipientEmail')"
            type="text"
            v-model="formLink.email"
          />
          <div class="w-full pt-2 text-red-600">
            <span v-for="error in errors">
              {{ error }}
            </span>
          </div>
        </ValidationProvider>

        <PEButton
          class="h-[50px]"
          outlinedSecondary
          uppercase
          :disabled="invalid"
          :loading="showLoading"
          @click.prevent="sendPaymentLink"
        >
          {{ $t('send') }}
        </PEButton>
      </div>
      <div
        v-else
        class="pe-justify-end pe-flex pe-text-white"
      >
        {{ $t('paymentLinkSuccess') }}
      </div>
    </ValidationObserver>
  </div>
</template>
<script lang="ts">
import {ValidationObserver, ValidationProvider, extend} from 'vee-validate'
import {required, email} from 'vee-validate/dist/rules'
import {Component, Vue, Prop} from 'vue-property-decorator'
import i18n from '~/src/ui/i18n/bookings.lang'
import ReservationsDto from '~/src/app/bookings/domain/dto/reservationsDto'
import {LayoutStore} from '~/src/ui/store/layoutStore'
import {BookingsStore} from '~/src/ui/store/bookingsStore'
import {UseAuth as AuthStore} from '~/src/ui/store/auth'
import PayloadPaymentLinkReservation from '~/src/app/bookings/domain/entities/payloadPaymentLinkReservation'
import {paymentLinkTemplate} from '~/src/ui/emailTemplates/paymentLinkTemplate'
@Component({
  i18n,
  components: {
    ValidationObserver,
    ValidationProvider
  }
})
export default class BookingsCommonTableFooterLink extends Vue {
  public sendPaymentLinkSuccess: boolean = false

  public showLoading: boolean = false

  public formLink: {name: string; email: string} = {
    name: '',
    email: ''
  }

  @Prop() reservation!: ReservationsDto

  beforeMount(): void {
    this.setFormConfiguration()
  }

  public setFormConfiguration(): void {
    extend('required', {
      ...required,
      message: this.$t('sendPaymentLinkMessageRequired') as string
    })

    extend('email', {
      ...email,
      message: this.$t('sendPaymentLinkMessageEmail') as string
    })
  }

  async sendPaymentLink() {
    this.showLoading = true
    try {
      const {data} = await this.bookingsStore.sendPaymentLink(this.payloadSendPaymentLink)
      if (data.data) {
        this.layoutStore.showSnackbar(
          this.$t('validateReservationTitleSuccess') as string,
          this.$t('sendPaymentLinkMessageSuccess') as string,
          'success'
        )
        this.sendPaymentLinkSuccess = true
      } else {
        throw new Error()
      }
    } catch (error) {
      this.layoutStore.showSnackbar(
        this.$t('validateReservationTitleError') as string,
        this.$t('sendPaymentLinkMessageError') as string
      )
    } finally {
      this.showLoading = false
    }
  }

  get payloadSendPaymentLink(): PayloadPaymentLinkReservation {
    return {
      name: this.formLink.name,
      email: this.formLink.email,
      // TODO
      //@ts-ignore
      cc: this.formLink.email,
      application: Number(this.applicationUserMember!),
      isNational: this.isNational!,
      company: this.company!,
      body: paymentLinkTemplate(this.formLink.name),
      folio: String(this.reservation.folioClub),
      hotel: this.reservation.hotel
    }
  }

  get applicationUserMember() {
    return this.authStore.applicationUserMember
  }

  get isNational() {
    return this.authStore.isNational
  }

  get company() {
    return this.authStore.userCompany
  }

  get authStore(): AuthStore {
    return new AuthStore()
  }

  get layoutStore(): LayoutStore {
    return new LayoutStore()
  }

  get bookingsStore(): BookingsStore {
    return new BookingsStore()
  }
}
</script>
