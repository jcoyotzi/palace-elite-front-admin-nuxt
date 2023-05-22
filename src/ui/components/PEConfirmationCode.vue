<template>
  <ValidationObserver
    v-slot="{handleSubmit, reset, invalid}"
    tag="div"
    class="w-full"
  >
    <form
      class="flex w-full flex-col items-center"
      @submit.prevent="handleSubmit(() => onSubmit(reset))"
    >
      <p :class="textClasses">{{ $t('confirmationCodeSentLabel') }} {{ emailStored }}</p>

      <!-- Confirmation Code -->
      <ValidationProvider
        v-slot="{errors}"
        rules="required"
        tag="div"
        class="mb-7 w-full"
      >
        <PETextInput
          v-model="output.confirmationCode"
          v-bind="confirmCodeProps"
        />
        <div class="w-full pt-2 text-red-600">
          <p>
            {{ errors[0] }}
          </p>
        </div>
      </ValidationProvider>

      <PEButton
        v-bind="buttonProps"
        :disabled="invalid"
      />
    </form>
  </ValidationObserver>
</template>

<script lang="ts">
import {Component, Vue, Prop, Emit, Watch} from 'vue-property-decorator'

// Plugins
import {ValidationObserver, ValidationProvider, extend} from 'vee-validate'
import {required} from 'vee-validate/dist/rules'
import i18n from '~/src/ui/i18n/login/loginForm'

// Interfaces
interface FormInputs {
  confirmationCode: string
}

@Component({
  name: 'PEConfirmationCode',
  components: {
    ValidationObserver,
    ValidationProvider
  },
  i18n,
})
export default class PEConfirmationCode extends Vue {
  // Props
  @Prop({type: Boolean, default: false})
  readonly isLoading!: boolean

  @Prop({type: String, default: ''})
  readonly emailStored!: string

  // Data

  public output: FormInputs = {
    confirmationCode: ''
  }

  public showLoading: boolean = false

  // Watchers

  @Watch('isLoading')
  onLoadingChange(value: boolean) {
    this.showLoading = value
  }

  // Hooks
  mounted() {
    this.setFormConfiguration()
  }

  // Computed

  public get inputProps() {
    return {
      class: ['w-full', 'block'],
      autocomplete: 'off',
      disabled: this.showLoading
    }
  }

  public get confirmCodeProps() {
    return {
      ...this.inputProps,
      name: 'code',
      label: 'Confirmation Code',
      type: 'text'
    }
  }

  public get emailProps() {
    return {
      ...this.inputProps,
      name: 'email',
      label: 'email',
      type: 'email',
      class: [...this.inputProps.class, 'bg-none']
    }
  }

  public get buttonProps() {
    return {
      label: 'Send',
      type: 'submit',
      solid: true,
      uppercase: true,
      flat: true,
      loading: this.showLoading
    }
  }

  public get textClasses() {
    return ['text-center mb-4 text-white']
  }

  // Methods

  public onSubmit(reset: () => void) {
    this.showLoading = true
    this.submit()
    reset()
  }

  public setFormConfiguration(): void {
    extend('required', {
      ...required,
      message: 'This field is required'
    })
  }

  // Emits
  @Emit()
  submit() {
    return this.output
  }
}
</script>
