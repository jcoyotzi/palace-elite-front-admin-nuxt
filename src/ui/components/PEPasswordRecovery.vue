<template>
  <div p-10>
    <h3 :class="titleClasses">
      {{ title }}
    </h3>
    <p
      v-if="externalErrorMessage"
      :class="errorClasses"
      class="text-center !mb-5"
    >
      {{ externalErrorMessage }}
    </p>

    <!-- Step 0: validate and send email -->
    <ValidationObserver
      v-slot="{handleSubmit}"
      class="w-full"
    >
      <form
        v-show="isFirstStep"
        ref="form"
        :class="containerClasess"
        class="w-full"
        @submit.prevent="handleSubmit(onEmailSubmit)"
      >
        <p :class="descriptionClasses">
          {{ description }}
        </p>
        <ValidationProvider
          v-slot="{errors}"
          name="Email"
          :rules="emailRules"
          class="w-full flex flex-col justify-center items-center"
        >
          <PETextInput
            v-model="email"
            :class="inputClasses"
            class="w-full mb-4"
            v-bind="emailInputProps"
          />
          <div :class="errorClasses">
            <span>
              {{ errors[0] }}
            </span>
          </div>
          <PEButton
            v-bind="buttonProps"
            :disabled="errors.length > 0"
          />
        </ValidationProvider>
      </form>
    </ValidationObserver>
    <!-- Step 1: Capture Code confirmation and new password -->
    <ValidationObserver
      v-slot="{handleSubmit, invalid}"
      class="w-full"
    >
      <form
        v-show="isSecondStep"
        :class="containerClasess"
        @submit.prevent="handleSubmit(onResetSubmit)"
      >
        <p :class="textClasses">{{ $t('confirmationCodeSentLabel') }}: {{ email }}</p>
        <!-- Confirmation Code -->
        <ValidationProvider
          v-slot="{errors}"
          name="Code"
          :rules="confirmationRules"
          class="w-full"
        >
          <PEInput
            v-model="confirmationCode"
            v-bind="confirmationInputProps"
            :class="inputClasses"
            autocomplete="off"
          />
          <div :class="errorClasses">
            <span>
              {{ errors[0] }}
            </span>
          </div>
        </ValidationProvider>
        <!-- Password -->
        <ValidationProvider
          v-slot="{errors, failedRules}"
          name="Password"
          :rules="{
            required: true,
            min: 8,
            regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/
          }"
          class="w-full"
          vid="passwordConfirm"
        >
          <PEPassword
            v-model="password"
            v-bind="passwordProps"
            :label="passwordLabel"
            :class="inputClasses"
            class="w-full !mb-2"
            :disabled="showLoading"
            autocomplete="off"
          />
          <div :class="errorClasses">
            <span
              v-if="failedRules.regex"
              class=""
              v-html="errors[0]"
            />
            <span v-else>
              {{ errors[0] }}
            </span>
          </div>
        </ValidationProvider>
        <!-- Pass -->
        <ValidationProvider
          v-slot="{errors, failedRules}"
          name="Password2"
          :rules="{
            confirmed: 'passwordConfirm',
            required: true
          }"
          class="w-full flex flex-col justify-center items-center"
        >
          <PEPassword
            v-model="password2"
            :class="inputClasses"
            :label="repeatPasswordLabel"
            v-bind="passwordProps"
            :disabled="showLoading"
            class="w-full"
            autocomplete="off"
          />
          <div :class="errorClasses">
            <span
              v-if="failedRules.regex"
              class=""
              v-html="errors[0]"
            />
            <span v-else>
              {{ errors[0] }}
            </span>
          </div>

        </ValidationProvider>
        <PEButton
          solid
          uppercase
          flat
          type="submit"
          :loading="loading"
          :disabled="invalid"
        >
          {{ $t('updatePassword') }}
        </PEButton>
      </form>
    </ValidationObserver>

    <div v-show="isLastStep">
      <p :class="textClasses">Your password has succesufully updated.</p>
    </div>
  </div>
</template>
<script lang="ts">
import {Component, Vue, Prop, Emit, Watch} from 'vue-property-decorator'
import {ValidationObserver, ValidationProvider, extend} from 'vee-validate'
import {required, email, min, confirmed, regex} from 'vee-validate/dist/rules'
import i18n from '~/src/ui/i18n/login/loginForm'

extend('email', email)


enum Steps {
  FIRST_STEP,
  SECOND_STEP,
  LAST_STEP
}

@Component({
  name: 'PERecoveryPassword',
  components: {
    ValidationObserver,
    ValidationProvider
  },
  i18n,
})
export default class PERecoveryPassword extends Vue {
  @Prop({type: String, default: 'Reset your password'})
  title!: string

  @Prop({
    type: String,
    default:
      "Enter your email and we'll send a recovery code to your email where you can reset your password"
  })
  description!: string

  @Prop({type: Boolean, default: false})
  loading!: boolean

  @Prop({type: Number, default: Steps.FIRST_STEP}) step!: number

  @Prop({
    type: String,
    default: ''
  })
  readonly externalErrorMessage!: string

  public email = ''

  public confirmationCode = ''

  public password = ''

  public password2 = ''

  public isDisabled = false

  public showLoading = false

  onEmailSubmit() {
    this.showLoading = true
    const data = {
      email: this.email.toLowerCase()
    }
    this.$emit('submitEmail', data)
    return data
  }

  onResetSubmit() {
    this.showLoading = true
    const data = {
      email: this.email.toLowerCase(),
      password: this.password,
      confirmationCode: this.confirmationCode
    }
    this.$emit('submitResetPassword', data)
  }

  @Watch('loading')
  updateShowLoading(value: boolean) {
    this.showLoading = value
  }

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

  public get descriptionClasses(): string[] {
    return ['text-white', 'text-center', 'mb-8', 'font-sans']
  }

  public get buttonProps() {
    return {
      type: 'submit',
      solid: true,
      uppercase: true,
      flat: true,
      loading: this.showLoading,
      label: this.$t('sendLbl')
    }
  }

  public get inputClasses() {
    return ['mb-2']
  }

  public get containerClasess() {
    return ['flex flex-col justify-center text-white items-center']
  }

  public get subtitleClasses() {
    return ['uppercase text-center mb-4']
  }

  public get textClasses() {
    return ['text-center mb-4 text-white']
  }

  public get isFirstStep() {
    return this.step === Steps.FIRST_STEP
  }

  public get isSecondStep() {
    return this.step === Steps.SECOND_STEP
  }

  public get isLastStep() {
    return this.step === Steps.LAST_STEP
  }

  public get emailInputProps() {
    return {
      type: 'email',
      label: this.$t('yourEmailLbl'),
      disabled: this.showLoading,
      name: 'email'
    }
  }

  public get confirmationRules() {
    return 'required'
  }

  public get confirmationInputProps() {
    return {
      label: this.$t('enterConfirmationCode'),
      type: 'text',
      disabled: this.showLoading,
      inputMaxLenght: '10'
    }
  }

  public get emailRules() {
    return 'required|email'
  }

  public get passwordLabel() {
    return this.$t('enterPassword')
  }

  public get repeatPasswordLabel() {
    return this.$t('repeatPassword')
  }

  public get passwordRules() {
    // return 'required|min:8required|min:8|confirmed:passwordConfirm';
    return {
      required: true,
      min: 8,
      regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/
    }
  }

  public get password2Rules() {
    return {
      confirmed: 'passwordConfirm',
      required: true
    }
  }

  public get passwordProps() {
    return {
      showLabel: this.$t('showPassword'),
      hideLabel: this.$t('hidePassword'),
      // label: this.$t('password'),
      name: 'password'
      // value: this.password,
    }
  }

  public get errorClasses() {
    return ['text-left text-red-600 pr-1 text-sm mb-8 w-full']
  }

  public setFormConfiguration(): void {
    extend('required', {
      ...required,
      message: this.$t('fieldRequired') as string
    })

    extend('min', {
      ...min,
      message: this.$t('minimum8CharactersLabel') as string
    })

    extend('confirmed', {
      ...confirmed,
      message: this.$t('passwordNotMatchLabel') as string
    })

    extend('regex', {
      ...regex,
      message: this.$t('regexLabel') as string
    })
  }

  @Watch('step')
  reset() {
    this.showLoading = false
    if (this.step === Steps.LAST_STEP) {
      this.email = ''
      this.confirmationCode = ''
      this.password = ''
      this.password2 = ''
    }
  }

  mounted() {
    this.setFormConfiguration()
  }
}
</script>
