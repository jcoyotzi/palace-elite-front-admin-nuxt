<template>
  <div class="pe-w-full pe-max-w-[440px]">
    <div>
      <h2 :class="titleClasses">Change PIN</h2>
    </div>
    <ValidationObserver
      v-slot="{handleSubmit, reset, invalid}"
      tag="div"
      class="pe-w-full"
    >
      <form
        class="pe-flex pe-w-full pe-flex-col pe-items-center"
        @submit.prevent="handleSubmit(() => onSubmit(reset))"
      >
        <!-- Old Pin -->
        <ValidationProvider
          v-slot="{errors}"
          :rules="{
            required: true
          }"
          tag="div"
          class="pe-mb-7 pe-w-full"
        >
          <PETextInput
            v-model="output.oldNip"
            v-bind="oldPasswordProps"
          />
          <div class="pe-w-full pe-pt-2 pe-text-red-600">
            <p>
              {{ errors[0] }}
            </p>
          </div>
        </ValidationProvider>

        <!-- New Pin -->
        <ValidationProvider
          v-slot="{errors}"
          :rules="{
            required: true,
            digits: 4
          }"
          vid="pinValidator"
          tag="div"
          class="pe-mb-7 pe-w-full"
        >
          <PETextInput
            v-model="output.nip"
            v-bind="passwordProps"
          />
          <div class="pe-w-full pe-pt-2 pe-text-red-600">
            <p>
              {{ errors[0] }}
            </p>
          </div>
        </ValidationProvider>

        <!-- Confirm Pin -->
        <ValidationProvider
          v-slot="{errors}"
          :rules="{required: true, confirmed: 'pinValidator'}"
          tag="div"
          class="pe-mb-7 pe-w-full"
        >
          <PETextInput
            v-model="output.nip2"
            v-bind="confirmPasswordProps"
          />
          <div class="pe-w-full pe-pt-2 pe-text-red-600">
            <p>
              {{ errors[0] }}
            </p>
          </div>
        </ValidationProvider>

        <!-- Buttons -->
        <div class="pe-flex pe-flex-col-reverse md:pe-flex-row pe-items-center">
          <PEButton
            v-bind="buttonSecondaryProps"
            @click="closeModal"
          />
          <PEButton
            v-bind="buttonProps"
            :disabled="invalid"
          />
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Prop, Emit, Watch} from 'vue-property-decorator'

// Plugins
import {ValidationObserver, ValidationProvider, extend} from 'vee-validate'
import {required, digits, confirmed} from 'vee-validate/dist/rules'

// Interfaces
interface ChangePinInputs {
  nip: number | null
  nip2: number | null
  oldNip: number | null
}

@Component({
  components: {
    ValidationObserver,
    ValidationProvider
  }
})
export default class AddPinModal extends Vue {
  // Props
  @Prop({type: Array, required: true})
  readonly titleClasses!: string[]

  @Prop({type: Boolean, default: false})
  readonly isLoading!: boolean

  // Data

  public output: ChangePinInputs = {
    nip: null,
    nip2: null,
    oldNip: null
  }

  // Hooks
  mounted() {
    this.setFormConfiguration()
  }

  // Computed

  public get inputProps() {
    return {
      class: ['pe-w-full', 'pe-block'],
      autocomplete: 'off',
      disabled: this.isLoading
    }
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

  public get passwordProps() {
    return {
      ...this.inputProps,
      name: 'pin',
      label: 'New PIN',
      type: 'password',
      class: [...this.inputProps.class, 'pe-mb-0'],
      inputMaxLenght: '4'
    }
  }

  public get oldPasswordProps() {
    return {
      ...this.passwordProps,
      name: 'oldPin',
      label: 'Old PIN'
    }
  }

  public get confirmPasswordProps() {
    return {
      ...this.passwordProps,
      name: 'confirmPin',
      label: 'Confirm New PIN'
    }
  }

  // Methods

  public onSubmit(reset: () => void) {
    this.submit()
    reset()
  }

  public setFormConfiguration(): void {
    extend('required', {
      ...required,
      message: 'This field is required'
    })

    extend('digits', {
      ...digits,
      message: 'Should be 4 digits'
    })

    extend('confirmed', {
      ...confirmed,
      message: 'Password confirmation does not match'
    })
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
