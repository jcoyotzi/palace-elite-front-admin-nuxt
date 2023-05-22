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
      <p :class="textClasses">{{ $t('enterEmailAndConfirmation') }}</p>

      <!-- Email -->
      <ValidationProvider
        v-slot="{errors}"
        rules="required|email"
        tag="div"
        class="mb-7 w-full"
      >
        <PETextInput
          v-model="output.email"
          v-bind="emailProps"
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
import {required, min, confirmed, email, regex} from 'vee-validate/dist/rules'
import i18n from '~/src/ui/i18n/login/loginForm'

// Interfaces
interface FormInputs {
  confirmationCode: string
  email: string
}

@Component({
  name: 'PEVerifyAccountForm',
  components: {
    ValidationObserver,
    ValidationProvider
  },
  i18n,
})
export default class PEVerifyAccountForm extends Vue {
  // Props
  @Prop({type: Boolean, default: false})
  readonly isLoading!: boolean

  @Prop({type: String, default: ''})
  readonly emailStored!: string

  // Data

  public showLoading: boolean = false

  readonly externalErrorMessage!: string
  readonly title: string = 'Verify Your Account'

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

  // Computed
  public get titleClasses(): string[] {
    return [
      'text-white',
      'text-center',
      'text-2xl',
      'font-serif',
      'uppercase',
      this.externalErrorMessage ? 'mb-5' : 'mb-10'
    ]
  }

  public get WrapperClasses(): string[] {
    return ['flex', 'flex-col', 'items-center']
  }

  public get confirmCodeProps() {
    return {
      ...this.inputProps,
      name: 'code',
      label: this.$t('confirmationCode'),
      type: 'text'
    }
  }

  public get emailProps() {
    return {
      ...this.inputProps,
      name: 'email',
      label: 'Email',
      type: 'email',
      class: [...this.inputProps.class, 'bg-none']
    }
  }

  public get buttonProps() {
    return {
      label: this.$t('sendLbl'),
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

  // Data

  public passwordRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/

  public output: FormInputs = {
    confirmationCode: '',
    email: ''
  }

  public get passwordProps() {
    return {
      ...this.inputProps,
      name: 'password',
      label: 'Password',
      type: 'password',
      showLabel: 'Show',
      hideLabel: 'Hide',
      class: [...this.inputProps.class, 'mb-0']
    }
  }

  public get confirmPasswordProps() {
    return {
      ...this.passwordProps,
      name: 'confirmPassword',
      label: 'Confirm password'
    }
  }

  public setFormConfiguration(): void {
    extend('required', {
      ...required,
      message: 'This field is required'
    })

    extend('min', {
      ...min,
      message: 'Must be at least 8 characters.'
    })

    extend('confirmed', {
      ...confirmed,
      message: 'Password confirmation does not match'
    })

    extend('email', {
      ...email,
      message: 'This should be an email address'
    })

    extend('regex', {
      ...regex,
      message: `
          <p>Must contain at least:</p>
          <ul>
            <li>1 uppercase letter</li>
            <li>1 lowercase letter</li>
            <li>1 number</li>
            <li>1 special character from: @$!%*?&</li>
          </ul>
          `
    })
  }

  // Methods

  public onSubmit(reset: () => void) {
    this.showLoading = true
    this.submit()
    reset()
  }

  // Emits
  @Emit()
  submit() {
    // console.log({output: this.output})
    return this.output
  }
}
</script>
