<template>
  <div :class="WrapperClasses">
    <h3 :class="titleClasses"> {{ title }} </h3>
    <div
      v-if="externalErrorMessage"
      class="mb-5 text-center text-red-600"
    >
      {{ externalErrorMessage }}
    </div>

    <PEVerificationAccountForm
      v-if="step === 0"
      :is-loading="loading"
      :email-stored="email"
      @submit="onSend"
    ></PEVerificationAccountForm>
    <PEConfirmationCode
      v-if="step === 1"
      :is-loading="loading"
      :email-stored="email"
      @submit="onSend"
    ></PEConfirmationCode>
    <PESuccessfulRegister
      v-if="step === 2"
      :is-loading="loading"
      :email-stored="email"
      @submit="onSuccessfull"
    ></PESuccessfulRegister>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Prop, Emit, Watch} from 'vue-property-decorator'
import PEVerificationAccountForm from './PEVerificationAccountForm.vue'
import {Steps} from '~/interfaces/PEFirstTimeUser/PEFirstTimeUser.interface'
import i18n from '~/src/ui/i18n/login/loginForm'

// Plugins

// Interfaces
interface FormInputs {
  confirmationCode: string
  email: string
}

@Component({
  name: 'PEVerifyAccount',
  components: {
    PEVerificationAccountForm
  },
  i18n
})
export default class PEVerifyAccount extends Vue {
  // Props
  @Prop({type: String, default: 'Verify Account'})
  readonly title!: string

  @Prop({
    type: String,
    default: ''
  })
  readonly externalErrorMessage!: string

  @Prop({
    type: Boolean,
    default: false
  })
  readonly loading!: boolean

  @Prop({
    type: Number,
    required: true
  })
  readonly step!: Steps

  // Data
  public email: string = ''

  @Prop({type: Boolean, default: false})
  readonly isLoading!: boolean

  @Prop({type: String, default: ''})
  readonly emailStored!: string

  // Data

  public output: FormInputs = {
    confirmationCode: '',
    email: ''
  }

  public showLoading: boolean = false

  // Watchers

  @Watch('isLoading')
  onLoadingChange(value: boolean) {
    this.showLoading = value
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
      label: this.$t('confirmationCode'),
      type: 'text'
    }
  }

  public get emailProps() {
    return {
      ...this.inputProps,
      name: 'Email',
      label: this.$t('email'),
      type: 'email',
      class: [...this.inputProps.class, 'bg-none']
    }
  }

  public get buttonProps() {
    return {
      label: this.$t('verifyAccount'),
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

  @Emit('submitVerifyAccount')
  onSend(output: any) {
    if(output.email && output.email !== '') {
      this.email = output.email
    }
    
    return {
      email: this.email,
      confirmationCode: output.confirmationCode?? ''
    }
  }

  // Emits
  @Emit()
  submit() {
    return this.output
  }

  @Emit('sucessVerifyAccount')
  onSuccessfull() {}
}
</script>
