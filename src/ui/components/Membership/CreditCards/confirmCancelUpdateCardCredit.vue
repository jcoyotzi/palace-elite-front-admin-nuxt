<template>
  <PEModal
    v-model="showModalCancelUpdateCardCredit"
    style="z-index: 9999"
  >
    <template #title>
      <h1 class="pe-mb-10 pe-text-2xl pe-text-white pe-truncate pe-w-[100%] sm:pe-w-auto">
        {{$t('titleCancelModal')}}
      </h1>
    </template>
    <template #content>
      <p class="pe-mb-10 pe-text-center pe-text-white">
        {{$t('messageCancelModal')}}
      </p>
    </template>
    <template #buttons>
      <div class="pe-grid pe-grid-cols-1 sm:pe-grid-cols-2">
        <PEButton
          outlined-secondary
          flat
          text
          :label="$t('cancel')"
          class="pe-uppercase pe-text-white pe-w-full sm:pe-w-auto pe-bg-black sm:pe-mr-[80px] sm:pe-mt-[0px] pe-mt-[20px]"
          @click="closeModal"
        />
        <PEButton
          flat
          solid
          :label="$t('confirm')"
          class="pe-uppercase pe-text-white pe-w-full sm:pe-w-auto sm:pe-mt-[0px] pe-mt-[20px]"
          @click="confirm"
        />
      </div>
    </template>
  </PEModal>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import {PaymentStore} from '../../../store/paymentStore'
import i18n from '~/src/ui/i18n/membership/creditCards.lang'

@Component({
  i18n
})
export default class ConfirmCancelUpdateCardCredit extends Vue {
  paymentStore = new PaymentStore()

  get showModalCancelUpdateCardCredit(): boolean {
    return this.paymentStore.showModalCancelUpdateCardCredit
  }

  set showModalCancelUpdateCardCredit(value: boolean) {
    this.paymentStore.showModalCancelUpdateCardCredit = value
  }

  closeModal(): void {
    this.showModalCancelUpdateCardCredit = false
  }

  confirm(): void {
    this.showModalCancelUpdateCardCredit = false
    this.$emit('back')
  }
}
</script>
