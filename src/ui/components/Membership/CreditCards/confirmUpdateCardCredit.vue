<template>
  <PEModal
    v-model="showModalConfirmationUpdateCardCredit"
    class="h-[150px]"
    style="z-index: 9999"
  >
    <template #title>
      <h1 class="mb-10 text-2xl text-center uppercase text-white truncate w-[100%] sm:w-auto">
        {{ $t('successTitle') }}
      </h1>
    </template>
    <template #content>
      <p class="mb-10 text-center text-white">{{ $t('successText') }}</p>
    </template>
    <template #buttons>
      <PEButton
        flat
        solid
        label="CONFIRM"
        class="text-white"
        @click="confirm"
      />
    </template>
  </PEModal>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import {PaymentStore} from '~/src/ui/store/paymentStore'
import i18n from '~/src/ui/i18n/confirmations/updateCardCredit.lang'

@Component({
  i18n
})
export default class ConfirmUpdateCardCredit extends Vue {
  paymentStore = new PaymentStore()

  get showModalConfirmationUpdateCardCredit(): boolean {
    return this.paymentStore.showModalConfirmationUpdateCardCredit
  }

  set showModalConfirmationUpdateCardCredit(value: boolean) {
    this.paymentStore.showModalConfirmationUpdateCardCredit = value
    if (!value) this.$emit('confirm')
  }

  closeModal(): void {
    this.showModalConfirmationUpdateCardCredit = false
  }

  confirm(): void {
    this.showModalConfirmationUpdateCardCredit = false
    this.$emit('confirm')
  }
}
</script>
