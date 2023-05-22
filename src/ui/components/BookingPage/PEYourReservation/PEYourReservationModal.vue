<template>
  <PEModal
    v-model="showModal"
    class="pe-z-[100] md:[&>div>div]:!pe-px-14 pe-your-reservation-modal pe-absolute"
  >
    <template #title>
      <h1
        class="pe-mr-auto pe-text-2xl pe-leading-[23px] pe-text-white pe-text-start pe-uppercase pe-font-serif"
      >
        {{ $t('placeOnHoldConfirm') }}
      </h1>
    </template>
    <template #content>
      <p class="pe-my-10 pe-text-start pe-text-[16px] pe-leading-7 pe-text-white pe-font-sans">
        {{ $t('placeOnHoldDescrip') }}
      </p>
    </template>
    <template #buttons>
      <div class="pe-ml-auto pe-items-center !pe-justify-end pe-flex">
        <PEButton
          text
          flat
          class="pe-uppercase !pe-font-serif"
          label="Cancel"
          @click="onCancel"
        />
        <PEButton
          flat
          outlinedSecondary
          label="Accept"
          class="pe-ml-7 md:pe-ml-14 pe-uppercase !pe-font-serif"
          @click="onAccept"
        />
      </div>
    </template>
  </PEModal>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator'
import i18n from '../../../i18n/reservation/yourReservation.lang'
@Component({
  i18n,
  name: 'PEYourReservationModal'
})
export default class PEYourReservationModal extends Vue {
  @Prop({type: Boolean, default: false}) showModal!: boolean

  onCancel() {
    this.$emit('onCancel')
  }

  onAccept() {
    this.$emit('onAccept')
  }
}
</script>
