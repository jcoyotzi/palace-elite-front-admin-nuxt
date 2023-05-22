<template>
  <div :class="wrapperClasses">
    <PEButton
      v-if="flow !== AuthFlow.signIn"
      class="mb-7 !flex w-full !text-white !justify-start"
      v-bind="linkProps"
      @click.prevent="setFlow(0)"
    >
      <span class="text-blue-light mr-2">
        <svg
          width="9"
          height="16"
          viewBox="0 0 9 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 1L0.999999 8L8 15"
            stroke="#90AFC5"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
      {{ backLabel }}
    </PEButton>

    <component
      :is="currentFlow.component"
      :external-error-message="errorMessage"
      :loading="loading"
      :step="flowStep"
      class="mb-10"
      v-bind="props"
      @submitEmail="submitStep"
      @submitFirstime="submitStep"
      @submitLogin="submitStep"
      @submitResetPassword="submitStep"
      @submitVerifyAccount="submitStep"
      @sucessfullRegister="setFlow(AuthFlow.signIn)"
      @sucessVerifyAccount="setFlow(AuthFlow.signIn)"
    />

    <!-- Other -->

    <div class="pe-flex grid grid-cols-1 lg:grid-cols-2">
      <PEButton
        v-if="flow !== AuthFlow.passwordRecovery"
        v-bind="linkProps"
        :label="$t('forgotPassword')"
        @click.prevent="setFlow(AuthFlow.passwordRecovery)"
      />

      <PEButton
        v-if="flow !== AuthFlow.signUp"
        v-bind="[linkProps]"
        :label="$t('firstTimeUser')"
        @click.prevent="setFlow(AuthFlow.signUp)"
      />

      <PEButton
        v-if="flow !== AuthFlow.verifyAccount"
        v-bind="[linkProps]"
        :label="$t('verifyAccount')"
        @click.prevent="setFlow(AuthFlow.verifyAccount)"
      />
    </div>

    <!--<PEButton v-bind="[becomeMemberLinkProps]" label="Tempted to become a member?" @click.prevent="" />-->

    <p
      v-if="flow === AuthFlow.signUp"
      class="text-left leading-5 text-white font-sans"
    >
      {{ privacyDescription }}
      <PEButton
        class="py-0 text-blue-light no-underline"
        v-bind="privacyLink"
      />.
    </p>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Prop, Watch} from 'vue-property-decorator'
import i18n from '~/src/ui/i18n/login/loginForm'

export enum AuthFlow {
  signIn,
  signUp,
  passwordRecovery,
  verifyAccount
}

export interface ForgotPasswordEmailForm {
  email: string
}

export interface ForgotPasswordResetPasswordForm {
  confirmationCode: string
  password: string
  email: string
}

export interface verifyAccount {
  confirmationCode: string
  password: string
  password2: string
  email: string
}

export interface SingInForm {
  email: string
  password: string
  rememberMe: boolean
}

export interface SignUpIdentifiersForm {
  affiliationId: string
  email: string
}

export interface SignUpPasswordForm {
  password: string
  password2: string
}

export interface SignUpConfirmationForm {
  confirmationCode: string
}

export interface AuthHandlerSubmitEvent<T> {
  backStep: () => void
  nextStep: () => void
  submitEnd: () => void

  /**
   * Establece el valor del loading.
   */
  setLoading: (value: boolean) => void

  /**
   * Establece el mensaje de error.
   */
  setErrorMessage: (message: string) => void
  flowStep: AuthFlow
  flowSteps: number
  isLastFlowStep: boolean
  form: T
}

@Component({
  name: 'PEAuthHandler',
  i18n,
})
export default class PEAuthHandler extends Vue {
  @Prop({type: String, default: ''})
  externalErrorMessage!: string

  loading = false

  flow: AuthFlow = AuthFlow.signIn

  flowStep = 0

  AuthFlow = AuthFlow

  isSignin = false

  errorMessage = ''

  // Getters

  get currentFlow() {
    return this.flows[this.flow]
  }

  get currentFlowSteps() {
    return this.currentFlow.steps.length
  }

  get isCurrentFlowLastStep() {
    return this.flowStep >= this.currentFlowSteps - 1
  }

  public get titleResetClasses(): string[] {
    return ['mb-5']
  }

  public get descriptionClasses(): string[] {
    return ['text-white', 'text-center', 'mb-8']
  }

  get backProps() {
    return {
      ...this.linkProps,
      class: [...this.linkProps.class]
    }
  }

  get linkProps() {
    return {
      text: true,
      class: [
        'mb-7',
        'py-0',
        'text-left',
        'mr-auto',
        'text-blue-light',
        'no-underline',
        'cursor-pointer',
        'font-sans',
        'justify-start'
      ]
    }
  }

  get becomeMemberLinkProps() {
    return {
      ...this.linkProps,
      class: [...this.linkProps.class, {'mb-7': this.isSignin}]
    }
  }

  public get wrapperClasses(): string[] {
    return [
      'flex',
      'flex-col',
      'items-stretch',
      'bg-black-light',
      'max-w-[400px]',
      'sm:min-w-[310px]',
      'md:min-w-[400px]',
      'rounded-md',
      'pe-p-3',
      'sm:pe-p-10',
      'pe-pb-2',
      'sm:pe-pb-8'
    ]
  }

  public get backLabel() {
    return this.$t('back')
  }

  public get privacyLink() {
    return {
      label: this.$t('privacyNotice'),
      text: true
    }
  }

  public get forgotPasswordLink() {
    return {
      label: this.$t('forgotPassword')
    }
  }

  public get privacyDescription() {
    return this.$t('privacyDescription')
  }

  flows = [
    {component: 'PELoginForm', steps: ['sign-in']},
    {
      component: 'PEFirstTimeUser',
      steps: [
        'sing-up:identifiers',
        'sign-up:password',
        'sign-up:confirmation',
        'sign-up:successful'
      ]
    },
    {
      component: 'PEPasswordRecovery',
      steps: [
        'forgot-password:email',
        'forgot-password:reset-password',
        'forgot-password:successful'
      ]
    },
    {
      component: 'PEVerifyAccount',
      steps: ['verify-account:email', 'verify-account:code', 'verify-account:success']
    }
  ]

  get props() {
    if (this.currentFlow === this.flows[0]) {
      return {
        title: this.$t('unlock')
      }
    }
    if (this.currentFlow === this.flows[1]) {
      return {
        title: this.$t('firstTimeUser')
      }
    }
    if (this.currentFlow === this.flows[2]) {
      return {
        title: this.$t('resetPassTitle'),
        description: this.$t('recoveryPassDescription')
      }
    }
    if (this.currentFlow === this.flows[3]) {
      return {
        title: this.$t('verifyAccount'),

      }
    }
  }

  mounted() {
    this.externalErrorMessage = ''
    this.setErrorMessage(this.externalErrorMessage)
  }

  @Watch('externalErrorMessage')
  setExternalErrorMessage() {
    this.setErrorMessage(this.externalErrorMessage)
  }

  setFlow(flowType: AuthFlow) {
    this.setErrorMessage('')
    this.flow = flowType
    this.flowStep = 0
    this.loading = false
  }

  submitStep(form: object) {
    this.loading = true
    this.setErrorMessage('')
    
    this.$emit(this.currentFlow.steps[this.flowStep], {
      form,
      backStep: this.backStep,
      nextStep: this.nextStep,
      submitEnd: this.submitEnd,
      setLoading: this.setLoading,
      setErrorMessage: this.setErrorMessage,
      flowStep: this.flowStep,
      flowSteps: this.currentFlowSteps,
      isLastFlowStep: this.isCurrentFlowLastStep
    })
  }

  submitEnd() {
    this.loading = false
    this.setErrorMessage('')
  }

  nextStep() {
    if (this.isCurrentFlowLastStep) return
    this.flowStep += 1
    this.setErrorMessage('')
  }

  backStep() {
    if (this.flowStep === 0) return
    this.flowStep -= 1
    this.setErrorMessage('')
  }

  /**
   * Establece el valor del loading.
   * @param value Valor: `true` or `false`.
   */
  setLoading(value: boolean) {
    this.loading = value
  }

  /**
   * Establece el mensaje de error.
   * @param message Mensaje de error.
   */
  setErrorMessage(message: string) {
    this.errorMessage = message
  }
}
</script>
