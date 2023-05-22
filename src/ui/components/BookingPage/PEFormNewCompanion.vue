<template>
  <!--  reset-->
  <ValidationObserver
    v-slot="{handleSubmit, invalid}"
    ref="observer"
    tag="div"
    vid="newCompanionForm"
  >
    <form @submit.prevent="handleSubmit(saveNewCompanion)" autocomplete="off">
      <div class="pe-rounded-md pe-bg-black-light pe-text-white">
        <hr class="pe-border-black" />
        <div class="pe-p-10">
          <div class="pe-pb-4 pe-text-2xl">New Companion</div>
          <div class="pe-mb-6 pe-text-xs"
            >*The name must be the same as the one on your passport.</div
          >
          <div class="pe-grid md:pe-grid-cols-2 md:pe-gap-x-10">
            <div class="pe-mb-6">
              <div class="text-white mb-3">What type?</div>
              <p-e-radio-group
                v-model="typeAge"
                color="bg-black"
                :items="radioItems"
              />
            </div>
            <div></div>
            <div class="pe-mb-6 md:pe-mb-10">
              <validation-provider
                v-slot="{errors}"
                rules="required|alpha_spaces"
                vid="firstName"
              >
                <PETextInput
                  v-model="firstName"
                  label="First Name"
                />
                <div class="pe-w-full pe-pt-2 pe-text-red-600">
                  <p>
                    {{ errors[0] }}
                  </p>
                </div>
              </validation-provider>
            </div>
            <div class="pe-mb-6 md:pe-mb-10">
              <validation-provider
                v-slot="{errors}"
                rules="required|alpha_spaces"
                vid="lastName"
              >
                <PETextInput
                  v-model="lastName"
                  label="Last Name"
                />
                <div class="pe-w-full pe-pt-2 pe-text-red-600">
                  <p>
                    {{ errors[0] }}
                  </p>
                </div>
              </validation-provider>
            </div>
            <div class="pe-mb-6 md:pe-mb-10">
              <validation-provider
                v-slot="{errors}"
                rules="required|numeric"
                vid="zipCode"
              >
                <PETextInput
                  v-model="zipCode"
                  label="Zip Code"
                />
                <div class="pe-w-full pe-pt-2 pe-text-red-600">
                  <p>
                    {{ errors[0] }}
                  </p>
                </div>
              </validation-provider>
            </div>
            <div class="pe-mb-6 md:pe-mb-10">
              <validation-provider
                v-slot="{errors}"
                rules="required"
                vid="country"
              >
                <PEAutocomplete2
                  v-model="country"
                  :display-input-template="countryAutocompleteTemplate"
                  :list-option-template="countryAutocompleteTemplate"
                  input-label="Country"
                  :items="countriesList"
                />
                <div class="pe-w-full pe-pt-2 pe-text-red-600">
                  <p>
                    {{ errors[0] }}
                  </p>
                </div>
              </validation-provider>
            </div>
            <div class="pe-mb-6 md:pe-mb-10">
              <validation-provider
                v-slot="{errors}"
                rules="email"
                vid="email"
              >
                <PETextInput
                  v-model="email"
                  label="Email Address"
                  type="email"
                />
                <div class="pe-w-full pe-pt-2 pe-text-red-600">
                  <p>
                    {{ errors[0] }}
                  </p>
                </div>
              </validation-provider>
            </div>
            <div class="pe-mb-6 md:pe-mb-10 pe-flex items-center">
              <validation-provider
                v-slot="{errors}"
                rules="required"
                vid="areaCode"
              >
                <PEAutocomplete2
                  v-model="phoneCode"
                  class="pe-max-w-[130px] phoneInputCode"
                  :display-input-template="phoneInputTemplate"
                  :list-option-template="phoneOptionTemplate"
                  input-label="Area code"
                  :items="phoneList"
                />
                <div class="pe-w-full pe-pt-2 pe-text-red-600">
                  <p>
                    {{ errors[0] }}
                  </p>
                </div>
              </validation-provider>
              <validation-provider
                v-slot="{errors}"
                rules="required"
                vid="phoneNumber"
              >
                <PETextInput
                  v-model="phoneNumber"
                  class="phoneInput pe-flex-grow"
                  label="Phone number"
                  :mask="'### ### ####'"
                />
                <div class="pe-w-full pe-pt-2 pe-text-red-600">
                  <p>
                    {{ errors[0] }}
                  </p>
                </div>
              </validation-provider>
            </div>
          </div>
          <div class="pe-my-12">
            <PECheckbox v-model="saveGuest">Save as a Recurrent Guest</PECheckbox>
          </div>
          <div class="pe-flex pe-flex-col pe-items-center pe-justify-end sm:pe-flex-row">
            <div class="pe-mb-5 sm:pe-mb-0 sm:pe-mr-[60px]">
              <PEButton
                text
                @click="cancelNewCompanion"
                >Cancel</PEButton
              >
            </div>
            <div>
              <PEButton
                outlined
                uppercase
                class="pe-py-4 pe-px-10 !pe-text-blue-light"
                outlined-secondary
                :disabled="invalid"
                type="submit"
                :loading="loadingForm"
                >Save information</PEButton
              >
            </div>
          </div>
        </div>
      </div>
    </form>
  </ValidationObserver>
</template>

<script lang="ts">
import {Component, Emit, Vue} from 'vue-property-decorator'
import {ValidationObserver, ValidationProvider, extend} from 'vee-validate'
import {required, email, alpha_spaces, numeric} from 'vee-validate/dist/rules'
import {CountryStore} from '~/src/ui/store/countryStore'
import {
  PhoneEntity,
  selectPhoneCodeAdapter
} from 'app/companion/domain/adapter/selectPhoneCodeAdapter'
import {UseAuth} from '~/src/ui/store/auth'
import {CompanionStore} from '~/src/ui/store/companionStore'
import {CompanionAdapter} from 'app/companion/domain/adapter/companionAdapter'
import PEAutocomplete2 from '~/src/ui/components/PEAutocomplete/PEAutocomplete.vue'
import {CountryEntity} from 'app/country/domain/entities/countryEntity'
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const countryCodes = require('country-codes-list')

@Component({
  name: 'PEFormNewCompanion',
  components: {
    ValidationProvider,
    ValidationObserver,
    PEAutocomplete2
  }
})
export default class PEFormNewCompanion extends Vue {
  countryStore = new CountryStore()

  authStore = new UseAuth()

  companionsStore = new CompanionStore()

  input = null as Vue | null

  country: CountryEntity | null = null

  firstName = ''

  lastName = ''

  zipCode = ''

  email = ''

  phoneCode: PhoneEntity | null = null

  phoneNumber = ''

  saveGuest = false

  typeAge: 'adults' | 'children' = 'adults'

  radioItems = [
    {
      id: 'adults',
      name: 'Adult'
    },
    {
      id: 'children',
      name: 'Children'
    }
  ]

  countryAutocompleteTemplate = '{{name}}'

  phoneOptionTemplate = '{{name}} (+{{code}})'

  phoneInputTemplate = '+{{code}}'

  loadingForm = false

  mounted() {
    this.input = this.$refs.input as Vue
    this.setFormConfiguration()
  }

  get countriesList() {
    return this.countryStore.countryList
  }

  get phoneList() {
    return selectPhoneCodeAdapter(
      countryCodes.customList('countryCode', '{countryNameEn},{countryCallingCode}')
    )
  }

  @Emit('saveNewCompanion')
  async saveNewCompanion() {
    this.loadingForm = true

    // dar formato de payload
    const payload = {
      application: this.authStore.userAffiliationId!,
      allowSimilarProfile: false,
      company: this.authStore.userCompany!,
      isNational: false,
      name: `${this.firstName.trim()} ${this.lastName.trim()}`,
      firstName: this.firstName.trim(),
      lastName: this.lastName.trim(),
      zip: this.zipCode,
      city: '',
      country: this.country!.code,
      language: '',
      tel: this.phoneNumber.trim(), //`${this.phoneCode?.code} ${this.phoneNumber}`,
      email: this.email.trim(),
      socialSecurityNumber: ''
    }

    // Si es requerido, guardar
    const isAdult = this.typeAge === 'adults'
    // if (this.saveGuest) {
    try {
      //@ts-ignore
      await this.companionsStore.saveCompanion(payload)
      // Si se guardo, la respuesta dar formato
      // TODO Dar respuesta a la respuesta, No al payload. Si recibo array, debo cambiarlo a objeto
      this.loadingForm = false
      return CompanionAdapter.map(payload, isAdult)
    } catch (e) {
      //@ts-ignore
      this.$toast.error(this.$t('dataCouldNotBeSaved') as string, {
        duration: 5000
      })
      console.error('Could not save companion to server', e)
      this.loadingForm = false
      return null
    }
    // } else {
    //   // Si no se debe guardar, dar formato
    //   return CompanionAdapter.map(payload, isAdult)
    // }
    // Limpiar formulario+
  }

  @Emit('cancelNewCompanion')
  cancelNewCompanion() {
    this.country = null
    this.firstName = ''
    this.lastName = ''
    this.zipCode = ''
    this.email = ''
    this.phoneCode = null
    this.phoneNumber = ''
    this.saveGuest = false
  }

  setFormConfiguration(): void {
    extend('required', {...required, message: 'This field is required.'})
    extend('email', {...email, message: 'Invalid email.'})
    extend('alpha_spaces', {...alpha_spaces, message: 'Invalid field.'})
    extend('numeric', {...numeric, message: 'Invalid field.'})
  }

  onSubmit() {
    // console.log('test')
  }
}
</script>

<style lang="scss" scoped>
::v-deep .phoneInputCode .pe-input--container {
  border-top-right-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
}

::v-deep .phoneInputCode {
  border-right: 1px solid rgba(white, 0.2);
}

::v-deep .phoneInput .pe-input--container {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

::v-deep .phoneInputCode .pe-input--label {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
