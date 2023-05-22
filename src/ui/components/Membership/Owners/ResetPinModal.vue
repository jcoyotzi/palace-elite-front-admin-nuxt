<template>
  <div class="pe-w-full pe-max-w-[580px]">
    <div class="pe-text-center">
      <h2 :class="titleClasses">Reset PIN</h2>
    </div>

    <form
      class="pe-flex pe-w-full pe-flex-col pe-items-center"
      @submit.prevent="onSubmit"
    >
      <!-- Message -->
      <p class="pe-text-center pe-text-white pe-mb-10">{{ message }}</p>
      <!-- Buttons -->
      <div
        v-if="!isReseted"
        class="pe-flex pe-flex-col-reverse md:pe-flex-row pe-items-center"
      >
        <PEButton
          v-bind="buttonSecondaryProps"
          @click="closeModal"
        />
        <PEButton v-bind="buttonProps" />
      </div>
      <PEButton
        v-else
        v-bind="buttonCloseProps"
        @click="closeModal"
      />
    </form>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Prop, Emit, Watch} from 'vue-property-decorator'

interface ResetPinInputs {
  confirmed: boolean
}

@Component
export default class AddPinModal extends Vue {
  // Props
  @Prop({type: Array, required: true})
  readonly titleClasses!: string[]

  @Prop({type: Boolean, default: false})
  readonly isLoading!: boolean

  @Prop({type: Boolean, default: false})
  readonly isReseted!: boolean

  // Data

  public output: ResetPinInputs = {
    confirmed: false
  }

  // Computed

  public get message(): string {
    return this.isReseted
      ? 'A new pin has been sent to your mail, please follow the instructions.'
      : 'Are you sure you want to apply the requested change to the selected account?'
  }

  public get buttonProps() {
    return {
      label: 'Confirm',
      type: 'submit',
      solid: true,
      uppercase: true,
      flat: true,
      loading: this.isLoading,
      class: ['pe-mb-10 md:pe-mb-0']
    }
  }

  public get buttonSecondaryProps() {
    return {
      disabled: this.isLoading,
      label: 'Cancel',
      type: 'button',
      uppercase: true,
      text: true,
      class: ['pe-py-0', 'md:pe-mr-14', 'pe-font-serif']
    }
  }

  public get buttonCloseProps() {
    return {
      label: 'Close',
      type: 'button',
      uppercase: true,
      flat: true,
      outlinedSecondary: true
    }
  }

  // Methods

  public onSubmit() {
    this.output.confirmed = true
    this.submit()
  }

  // Emits
  @Emit()
  submit() {
    return this.output
  }

  @Emit()
  closeModal() {}
}
</script>
<style lang="scss" scoped>
.font-serif {
  font-family: Gotham, ui-serif, Georgia, Cambria, Times New Roman, Times, serif !important;
}
</style>
