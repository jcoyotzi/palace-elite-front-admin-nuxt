<template>
  <section class="pe-w-full pe-rounded-lg pe-bg-black-light pe-p-5 md:!pe-p-10">
    <div class="pe-w-full">
      <div>
        <h2 :class="titleClasses">Personal Information</h2>
      </div>
      <!-- #region PERSONAL INFORMATION I -->
      <div
        v-if="!isGuest"
        class="md:pe-grid custom-cols pe-gap-1 "
      >
        <div
          v-for="(field, key) in personalInformationOutput"
          :key="key"
        >
          <p class="pe-text-white pe-mb-10 pe-break-words">
            <span class="pe-block pe-text-xs">{{ field?.title }}:</span
            >{{ field?.value ? field.value : '-' }}
          </p>
        </div>
        <div class="md:pe-col-span-full pe-flex pe-flex-col-reverse md:pe-flex-row pe-items-center">
          <PEButton
            v-bind="requestChangeButtonProps"
            @click="requestChange"
          />
        </div>
      </div>
      <!-- #endregion PERSONAL INFORMATION I -->
      <ValidationObserver
        v-slot="{handleSubmit, reset, invalid}"
        tag="div"
        class="pe-w-full pe-mt-10"
      >
        <form
          class="pe-flex pe-w-full pe-flex-col pe-items-center"
          @submit.prevent="handleSubmit(() => onSubmit(reset))"
        >
          <!-- #region PERSONAL INFORMATION -->
          <template v-if="showForm">
            <div class="pe-w-full pe-grid md:pe-grid-cols-1">
              <div class="pe-w-full md:pe-pr-5">
                <ValidationProvider
                  v-slot="{errors}"
                  :rules="{
                    required: true
                  }"
                  tag="div"
                  class="pe-mb-7 pe-w-full"
                >
                  <PEPassword
                    v-model="personalInformationInput.oldPassword"
                    v-bind="inputProps"
                    label="Old password"
                  />
                  <div class="pe-w-full pe-pt-2 pe-text-red-600">
                    <p>
                      {{ errors[0] }}
                    </p>
                  </div>
                </ValidationProvider>
                <ValidationProvider
                  v-slot="{errors, failedRules}"
                  ref="passwordValidator"
                  :rules="{
                    required: true,
                    min: 8,
                    regex: passwordRegex
                  }"
                  tag="div"
                  class="pe-mb-7 pe-w-full"
                  vid="passwordValidator"
                >
                  <PEPassword
                    v-model="personalInformationInput.newPassword"
                    v-bind="inputProps"
                    label="New password"
                  />
                  <div class="pe-w-full pe-pt-2 pe-text-red-600">
                    <p
                      v-if="failedRules.regex"
                      v-html="errors[0]"
                    />
                    <p v-else>
                      {{ errors[0] }}
                    </p>
                  </div>
                </ValidationProvider>
                <ValidationProvider
                  v-slot="{errors}"
                  tag="div"
                  class="pe-mb-7 pe-w-full"
                  :rules="{required: true, confirmed: 'passwordValidator'}"
                >
                  <PEPassword
                    v-model="personalInformationInput.confirmNewPassword"
                    v-bind="inputProps"
                    label="Confirm new password"
                  />
                  <div class="pe-w-full pe-pt-2 pe-text-red-600">
                    <p>
                      {{ errors[0] }}
                    </p>
                  </div>
                </ValidationProvider>
              </div>
              <div
                v-show="formError"
                class="pe-w-full pe-pt-2 pe-text-red-600"
              >
                <p>
                  {{ formError }}
                </p>
              </div>
            </div>
          </template>
          <!-- #endregion PERSONAL INFORMATION -->
          <hr class="pe-border-black pe-my-10 pe-w-full" />
          <div
            v-if="showForm"
            class="pe-w-full pe-flex pe-flex-col-reverse md:pe-flex-row pe-justify-center lg:pe-justify-end pe-items-center"
          >
            <PEButton
              v-bind="buttonSecondaryProps"
              @click="onGoBack"
            />
            <PEButton
              v-bind="buttonProps"
              :disabled="invalid"
            />
          </div>
        </form>
      </ValidationObserver>
    </div>
  </section>
</template>

<script lang="ts">
import {Component, Emit, Prop, Vue, Watch} from 'vue-property-decorator'

// Plugins
import {ValidationObserver, ValidationProvider, extend} from 'vee-validate'
import {required, regex, min, confirmed} from 'vee-validate/dist/rules'
// import dayjs from 'dayjs'

import {MembershipDetailsInputs} from '~/src/app/common/domain/entities/membershipDetailsInputs'
import {TypeOfPhone} from '~/src/app/common/domain/enums/typeOfPhone'
import {LegacyUser} from '~/src/app/user/domain/entities/user'
// #endregion Interfaces

// Interfaces

interface InfoOutput {
  title?: string
  value: unknown
}

interface AccountInformationOutPut {
  fullName: InfoOutput
  email: InfoOutput
  affiliation?: InfoOutput
}

interface AccountInformationInput {
  oldPassword: string
  newPassword: string
  confirmNewPassword: string
}

@Component({
  components: {
    ValidationObserver,
    ValidationProvider
  }
})
class Details extends Vue {
  // Props
  @Prop({type: Object, default: null})
    user!: LegacyUser

  @Prop({type: Boolean, default: false})
    isLoading!: boolean

  @Prop({type: Boolean, default: false})
    isGuest!: boolean

  @Prop({type: Boolean, default: false})
    isBeneficiary!: boolean

  @Prop({type: String, default: ''})
    error!: string

  @Prop({type: String, default: ''})
    success!: string

  // Computed
  public get titleClasses() {
    return ['pe-text-white pe-mb-10 pe-text-2xl']
  }

  public passwordRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/

  // Data

  public typeOfPhoneItems: TypeOfPhone[] = [
    TypeOfPhone.mobile,
    TypeOfPhone.office,
    TypeOfPhone.home
  ]

  public output!: AccountInformationOutPut

  public personalInformationOutput: AccountInformationOutPut = {
    fullName: {
      title: '',
      value: ''
    },
    email: {
      title: '',
      value: ''
    },
    affiliation: {
      title: '',
      value: ''
    }
  }

  public personalInformationInput: AccountInformationInput = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  }

  public showForm: boolean = false

  // Hooks
  mounted() {
    this.mapPersonalInformation()

    this.setFormConfiguration()
  }

  // Computed

  public get inputProps() {
    return {
      class: ['pe-w-full', 'pe-block', 'pe-text-white', '!pe-min-h-[56px]'],
      autocomplete: 'off',
      disabled: this.isLoading,
      showLabel: 'Show',
      hideLabel: 'Hide',
      type: 'password'
    }
  }

  public get buttonSecondaryProps() {
    return {
      label: 'Cancel',
      type: 'button',
      uppercase: true,
      disabled: this.isLoading,
      text: true,
      class: [
        'pe-py-0',
        ' pe-mb-10 md:pe-mb-0 md:pe-mr-14 pe-font-serif',
        {'pe-pointer-events-none': this.isLoading}
      ]
    }
  }

  public get requestChangeButtonProps() {
    return {
      label: 'Change Password',
      type: 'button',
      uppercase: true,
      flat: true,
      outlinedSecondary: true,
      block: true,
      class: ['md:!pe-inline-flex pe-w-auto !pe-min-w-min'],
      disabled: false
    }
  }

  public get buttonProps() {
    return {
      label: 'Save Changes',
      type: 'submit',
      solid: true,
      uppercase: true,
      flat: true,
      loading: this.isLoading,
      class: ['pe-mb-10 md:pe-mb-0']
    }
  }

  public get inputs(): any {
    return {
      ...this.personalInformationInput
    }
  }

  // Methods
  /* eslint-disable */
  public mapPersonalInformation(): void {
    if (this.user._UserMember) {
      const {
        _first_name,
        _last_name,
        _application,
        _email
        // City,
        // Country,
        // Zip,
        // BIRTHDAY,
        // SocialSecurityNumber,
      } = this.user._UserMember

      this.personalInformationOutput = {
        fullName: {title: 'Full Name', value: _first_name + ' ' + _last_name},
        email: {title: 'Email', value: _email},
        affiliation: {title: 'Affiliation', value: _application}
      }
    }
  }
  /* eslint-enable */

  public onSubmit(reset: () => void) {
    this.submit()
    reset()
  }

  public setFormConfiguration(): void {
    extend('min', {
      ...min,
      message: 'Must be at least 8 characters.'
    })

    extend('required', {
      ...required,
      message: 'This field is required'
    })

    extend('confirmed', {
      ...confirmed,
      message: 'Password confirmation does not match'
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

  public get formError() {
    return this.error
  }

  public get formSuccess() {
    return this.success
  }

  // Emits
  @Emit()
  requestChange() {
    this.showForm = true
    // console.log('emits: RequestChange')
  }

  @Emit()
  submit(): MembershipDetailsInputs {
    return this.inputs
  }

  @Emit()
  onAddGuest(): MembershipDetailsInputs {
    return this.inputs
  }

  @Emit()
  onGoBack() {
    this.showForm = false
    this.personalInformationInput = {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    }
  }

  @Watch('formSuccess')
  onFormSuccess() {
    this.onGoBack()
  }
}

export default Details
</script>
<style lang="scss" scoped>
.custom-cols {
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 1280px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 1920px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>
<style lang="scss" scoped>
.font-serif {
  font-family: Gotham, ui-serif, Georgia, Cambria, Times New Roman, Times, serif !important;
}
</style>
