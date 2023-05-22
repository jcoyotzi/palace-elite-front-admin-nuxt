<template>
  <PEModal
    v-model="showModalDeleteCardCredit"
    class="h-[250px]"
    style="z-index: 9999"
  >
    <template #title>
      <h1 class="mb-10 text-2xl text-white">DELETE CREDIT CARD</h1>
    </template>
    <template #content>
      <p class="mb-10 text-center text-white">Are you sure you want to delete this credit card?</p>
    </template>
    <template #buttons>
      <div class="items-center justify-center sm:flex">
        <PEButton
          outlined-secondary
          flat
          text
          label="CANCEL"
          class="text-white bg-black mr-[80px]"
          @click="closeModal"
        />
        <PEButton
          flat
          solid
          label="CONFIRM"
          class="text-white"
          @click="confirm"
        />
      </div>
    </template>
  </PEModal>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import {PaymentStore} from '../../../store/paymentStore'

@Component
export default class ConfirmDeleteCard extends Vue {
  paymentStore = new PaymentStore()

  get showModalDeleteCardCredit(): boolean {
    return this.paymentStore.showModalDeleteCardCredit
  }

  set showModalDeleteCardCredit(value: boolean) {
    this.paymentStore.showModalDeleteCardCredit = value
  }

  closeModal(): void {
    this.showModalDeleteCardCredit = false
  }

  confirm(): void {
    this.paymentStore.removeCardCredit()
  }
}
</script>
