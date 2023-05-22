<template>
  <ValidationObserver
    v-slot="{handleSubmit, reset, invalid}"
    tag="div"
    class="w-full"
  >
    <form
      class="pe-flex pe-flex-col pe-items-center pe-w-full"
      @submit.prevent="handleSubmit(() => onSubmit(reset))"
    >
      <!-- Email -->
      <ValidationProvider
        v-slot="{errors}"
        rules="required|email"
        tag="div"
        class="pe-mb-7 w-full"
      >
        <PETextInput
          v-model="output.email"
          v-bind="emailProps"
        />
        <div class="pe-w-full pe-pt-2 pe-text-red-600">
          <p>
            {{ errors[0] }}
          </p>
        </div>
      </ValidationProvider>

      <!-- Password -->
      <ValidationProvider
        v-slot="{errors}"
        rules="required"
        tag="div"
        class="pe-mb-7 pe-w-full"
      >
        <PEPassword
          v-model="output.password"
          v-bind="passwordProps"
        />
        <div class="pe-w-full pe-pt-2 pe-text-red-600">
          <p>
            {{ errors[0] }}
          </p>
        </div>
      </ValidationProvider>

      <PECheckbox
        v-if="!isLoginPage"
        v-bind="rememberMeProps"
        @click="onCheckBoxClick"
        >{{ rememberMeProps.label }}</PECheckbox
      >

      <PEButton
        class="pe-bg-blue-dark"
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
import {required, regex, min, email} from 'vee-validate/dist/rules'
import i18n from '~/src/ui/i18n/login/loginForm'

// Interfaces
interface FormInputs {
  email: string
  password: string
  rememberMe: boolean
}
@Component({
  i18n,
  name: 'PEConfirmPassword',
  components: {
    ValidationObserver,
    ValidationProvider,
  }
})
export default class PELoginUser extends Vue {
  // Props
  @Prop({type: Boolean, default: false})
  readonly isLoading!: boolean

  @Prop({
    type: Boolean,
    default: false
  })
  readonly isLoginPage!: boolean

  // Data
  public output: FormInputs = {
    email: '',
    password: '',
    rememberMe: false
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
  public get rememberMeProps() {
    return {
      label: this.$t('rememberMe'),
      class: ['mb-8', 'justify-center', 'font-sans'],
      inputValue: this.output.rememberMe,
      value: undefined
    }
  }

  public get inputProps() {
    return {
      class: ['w-full', 'block'],
      color: this.isLoginPage ? 'medium' : 'dark',
      autocomplete: 'off',
      disabled: this.showLoading
    }
  }

  public get emailProps() {
    return {
      ...this.inputProps,
      name: 'email',
      label: this.$t('email'),
      type: 'email',
      class: [...this.inputProps.class, 'bg-none']
    }
  }

  public get buttonProps() {
    return {
      label: this.$t('loginBtn'),
      type: 'submit',
      solid: true,
      uppercase: true,
      flat: true,
      loading: this.showLoading
    }
  }

  public get passwordProps() {
    return {
      ...this.inputProps,
      name: 'password',
      label: this.$t('password'),
      type: 'password',
      showLabel: this.$t('showPassword'),
      hideLabel: this.$t('hidePassword'),
      class: [...this.inputProps.class, 'mb-0']
    }
  }

  // Methods
  onCheckBoxClick() {
    this.output.rememberMe = !this.output.rememberMe
  }

  public onSubmit(reset: () => void) {
    this.showLoading = true
    this.submit()
    reset()
  }

  public setFormConfiguration(): void {
    extend('required', {
      ...required,
      message: this.$t('fieldRequired') as string,
    })
    extend('email', {
      ...email,
      message: this.$t('invalidEmail') as string,
    })
  }

  // Emits
  @Emit()
  submit() {
    return {
      ...this.output,
      email: this.output.email.toLowerCase()
    }
  }
}
</script>
