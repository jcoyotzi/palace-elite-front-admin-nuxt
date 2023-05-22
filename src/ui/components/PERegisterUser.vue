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
      <!-- Affiliation -->
      <ValidationProvider
        v-slot="{errors}"
        rules="required"
        tag="div"
        class="mb-7 w-full"
      >
        <PETextInput
          v-model="output.affiliationId"
          v-bind="affiliationIDProps"
        />
        <div class="w-full pt-2 text-red-600">
          <p>
            {{ errors[0] }}
          </p>
        </div>
      </ValidationProvider>

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
import {required, email} from 'vee-validate/dist/rules'
import i18n from '~/src/ui/i18n/login/loginForm'

// Interfaces
interface FormInputs {
  affiliationId: string
  email: string
}

@Component({
  name: 'PERegisterUser',
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  i18n,
})
export default class PERegisterUser extends Vue {
  // Props
  @Prop({type: Boolean, default: false})
  readonly isLoading!: boolean

  // Data

  public output: FormInputs = {
    affiliationId: '',
    email: ''
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
      label: this.$t('affiliationLabel'),
      type: 'text'
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
      label: this.$t('sendLbl'),
      type: 'submit',
      solid: true,
      uppercase: true,
      flat: true,
      loading: this.showLoading
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
      message: this.$t('fieldRequired') as string,
    })

    extend('email', {
      ...email,
      message: this.$t('invalidEmail') as string
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
