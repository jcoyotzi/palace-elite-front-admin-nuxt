<template>
  <PEModal
    class="pe-z-50"
    :value="value"
    @input="input"
  >
    <template #content>
      <MembershipOwnersAddPinModal
        v-if="action === 0"
        :title-classes="titleClasses"
        :is-loading="isLoading"
        @submit="onSubmit"
        @close-modal="closeModal"
      />
      <MembershipOwnersChangePinModal
        v-if="action === 2"
        :is-loading="isLoading"
        :title-classes="titleClasses"
        @submit="onSubmit"
        @close-modal="closeModal"
      />
      <MembershipOwnersResetPinModal
        v-if="action === 1"
        :title-classes="titleClasses"
        :is-reseted="isReseted"
        @submit="onSubmit"
        @close-modal="closeModal"
      />
    </template>
  </PEModal>
</template>

<script lang="ts">
import {Component, Emit, Prop, Vue} from 'vue-property-decorator'

// #region Interfaces
import {PinInputs} from '~/src/app/owners/domain/entities/pinInputs'
import {PinActions} from '~/src/app/owners/domain/enum/pinActions'
// #endregion Interfaces

@Component
class Modal extends Vue {
  // Props
  @Prop({type: Number, required: true})
  action!: PinActions

  @Prop({type: Boolean, default: false})
  value!: boolean

  @Prop({type: Boolean, default: false})
  isLoading!: boolean

  @Prop({type: Boolean, default: false})
  isReseted!: boolean

  // Computed
  public get titleClasses() {
    return ['pe-text-white pe-uppercase pe-font-serif pe-font-medium pe-mb-10 pe-text-2xl']
  }

  // Methods
  public closeModal() {
    this.input(false)
  }

  // Emits

  @Emit()
  input(input: boolean) {
    return input
  }

  @Emit()
  onSubmit(data: PinInputs) {
    return data
  }
}

export default Modal
</script>
