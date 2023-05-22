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
      <!-- Password -->
      <ValidationProvider
        v-slot="{errors, failedRules}"
        :rules="{
          required: true,
          min: 8,
          regex: passwordRegex
        }"
        vid="passwordValidator"
        tag="div"
        class="mb-7 w-full"
      >
        <PEPassword
          v-model="output.password"
          v-bind="passwordProps"
        />
        <div class="w-full pt-2 text-red-600">
          <p
            v-if="failedRules.regex"
            v-html="errors[0]"
          />
          <p v-else>
            {{ errors[0] }}
          </p>
        </div>
      </ValidationProvider>

      <!-- ConfirmPassword -->
      <ValidationProvider
        v-slot="{errors}"
        :rules="{required: true, confirmed: 'passwordValidator'}"
        tag="div"
        class="mb-7 w-full"
      >
        <PEPassword
          v-model="output.password2"
          v-bind="confirmPasswordProps"
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
import {required, regex, min, confirmed} from 'vee-validate/dist/rules'
import i18n from '~/src/ui/i18n/login/loginForm'

// Interfaces
interface FormInputs {
  password: string
  password2: string
}

@Component({
  name: 'PEConfirmPassword',
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  i18n,
})
export default class PEConfirmPassword extends Vue {
  // Props
  @Prop({type: Boolean, default: false})
  readonly isLoading!: boolean

  // Data

  public passwordRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/

  public output: FormInputs = {
    password: '',
    password2: ''
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

  public get affiliationIDProps() {
    return {
      ...this.inputProps,
      name: 'user',
      label: 'Affiliation Id',
      type: 'text'
    }
  }

  public get emailProps() {
    return {
      ...this.inputProps,
      name: 'email',
      label: 'E-mail',
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

  public get passwordProps() {
    return {
      ...this.inputProps,
      name: 'password',
      label: this.$t('password'),
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
      label: this.$t('confirmPassword'),
    }
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

  // Emits
  @Emit()
  submit() {
    return this.output
  }
}
</script>
