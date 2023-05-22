<template>
  <section class="pe-w-full pe-rounded-lg pe-bg-black-light pe-p-5 md:!pe-p-10">
    <div class="pe-w-full">
      <div>
        <h2 :class="titleClasses">Personal Information</h2>
      </div>
      <!-- #region PERSONAL INFORMATION I -->
      <div
        v-if="!isGuest"
        class="md:pe-grid custom-cols pe-gap-1"
      >
        <div
          v-for="(field, key) in personalInformationOutput"
          :key="key"
        >
          <p class="pe-text-white pe-mb-10 pe-break-words">
            <span class="pe-block pe-text-xs">{{ field?.title }}:</span
            >{{ field?.value ? field?.value : '-' }}
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
        class="pe-w-full"
      >
        <form
          class="pe-flex pe-w-full pe-flex-col pe-items-center"
          @submit.prevent="handleSubmit(() => onSubmit(reset))"
        >
          <!-- #region PERSONAL INFORMATION -->
          <template v-if="isGuest">
            <div class="pe-w-full pe-grid md:pe-grid-cols-2">
              <div class="pe-w-full md:pe-pr-5">
                <ValidationProvider
                  v-slot="{errors}"
                  :rules="{
                    required: true
                  }"
                  tag="div"
                  class="pe-mb-7 pe-w-full"
                >
                  <PETextInput
                    v-model="personalInformationInput.firstName"
                    v-bind="inputProps"
                    label="First Name"
                  />
                  <div class="pe-w-full pe-pt-2 pe-text-red-600">
                    <p>
                      {{ errors[0] }}
                    </p>
                  </div>
                </ValidationProvider>
                <ValidationProvider
                  v-slot="{errors}"
                  :rules="{
                    required: true
                  }"
                  tag="div"
                  class="pe-mb-7 pe-w-full"
                >
                  <PETextInput
                    v-model="personalInformationInput.lastName"
                    v-bind="inputProps"
                    label="Last Name"
                  />
                  <div class="pe-w-full pe-pt-2 pe-text-red-600">
                    <p>
                      {{ errors[0] }}
                    </p>
                  </div>
                </ValidationProvider>
                <ValidationProvider
                  v-slot="{errors}"
                  :rules="{required: true}"
                  tag="pe-div"
                  class="pe-mb-7 pe-w-full"
                >
                  <PETextInput
                    v-model="personalInformationInput.email"
                    v-bind="inputProps"
                    label="Email"
                  />
                  <div class="pe-w-full pe-pt-2 pe-text-red-600">
                    <p>
                      {{ errors[0] }}
                    </p>
                  </div>
                </ValidationProvider>
                <ValidationProvider
                  v-if="guestBirthday"
                  v-slot="{errors}"
                  :rules="{
                    regex: /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/
                  }"
                  tag="div"
                  class="pe-mb-7 pe-w-full"
                >
                  <PETextInput
                    v-model="personalInformationInput.dateOfBirth"
                    v-bind="inputProps"
                    label="Date of Birth"
                  />
                  <div class="pe-w-full pe-pt-2 pe-text-red-600">
                    <p>
                      {{ errors[0] }}
                    </p>
                  </div>
                </ValidationProvider>
              </div>
              <div class="pe-w-full pe-order-1 md:!pe--order-none md:pe-pl-5">
                <ValidationProvider
                  v-slot="{errors}"
                  :rules="{
                    required: true
                  }"
                  tag="div"
                  class="pe-mb-7 pe-w-full"
                >
                  <PETextInput
                    v-model="personalInformationInput.zipCode"
                    v-bind="inputProps"
                    label="Zip Code"
                  />
                  <div class="pe-w-full pe-pt-2 pe-text-red-600">
                    <p>
                      {{ errors[0] }}
                    </p>
                  </div>
                </ValidationProvider>
                <ValidationProvider
                  v-slot="{errors}"
                  tag="div"
                  class="pe-mb-7 pe-w-full"
                >
                  <PETextInput
                    v-model="personalInformationInput.country"
                    v-bind="inputProps"
                    label="Country"
                  />
                  <div class="pe-w-full pe-pt-2 pe-text-red-600">
                    <p>
                      {{ errors[0] }}
                    </p>
                  </div>
                </ValidationProvider>
                <ValidationProvider
                  v-slot="{errors}"
                  :rules="{
                    required: true
                  }"
                  tag="div"
                  class="pe-mb-7 pe-w-full"
                >
                  <PETextInput
                    v-model="personalInformationInput.city"
                    v-bind="inputProps"
                    label="City"
                  />
                  <div class="pe-w-full pe-pt-2 pe-text-red-600">
                    <p>
                      {{ errors[0] }}
                    </p>
                  </div>
                </ValidationProvider>
              </div>
            </div>
          </template>
          <!-- #endregion PERSONAL INFORMATION -->
          <hr class="pe-border-black pe-my-10 pe-w-full" />
          <div class="pe-w-full pe-grid md:pe-grid-cols-2">
            <!-- #region CONTACT DETAILS -->
            <div class="pe-w-full md:pe-pr-5">
              <h2 :class="titleClasses">Contact Details</h2>
              <div class="pe-w-full">
                <ValidationProvider
                  v-slot="{errors}"
                  tag="div"
                  class="pe-mb-7 pe-w-full"
                >
                  <PESelect
                    v-model="contactDetailsInput.typeOfPhone"
                    v-bind="inputProps"
                    :disabled="isGuest"
                    label="Type of Phone"
                    :items="typeOfPhoneItems"
                    @input="typeOfPhoneChange($event, 'phone1')"
                  />
                  <div class="pe-w-full pe-pt-2 pe-text-red-600">
                    <p>
                      {{ errors[0] }}
                    </p>
                  </div>
                </ValidationProvider>
                <ValidationProvider
                  v-slot="{errors}"
                  :rules="{
                    required: true,
                    digits: 10
                  }"
                  tag="div"
                  class="pe-mb-7 pe-w-full"
                >
                  <PETextInput
                    v-model="contactDetailsInput.phone"
                    v-bind="inputProps"
                    label="Phone"
                  />
                  <div class="pe-w-full pe-pt-2 pe-text-red-600">
                    <p>
                      {{ errors[0] }}
                    </p>
                  </div>
                </ValidationProvider>
                <template v-if="!isGuest">
                  <ValidationProvider
                    v-slot="{errors}"
                    tag="div"
                    class="pe-mb-7 pe-w-full"
                  >
                    <PESelect
                      v-model="contactDetailsInput.typeofPhone2"
                      v-bind="inputProps"
                      label="Type of Phone"
                      :items="typeOfPhoneItems"
                      @input="typeOfPhoneChange($event, 'phone2')"
                    />
                    <div class="pe-w-full pe-pt-2 pe-text-red-600">
                      <p>
                        {{ errors[0] }}
                      </p>
                    </div>
                  </ValidationProvider>
                  <ValidationProvider
                    v-slot="{errors}"
                    tag="div"
                    :rules="{
                      required: true,
                      digits: 10
                    }"
                    class="pe-mb-7 pe-w-full"
                  >
                    <PETextInput
                      v-model="contactDetailsInput.phone2"
                      v-bind="inputProps"
                      label="Phone"
                    />
                    <div class="pe-w-full pe-pt-2 pe-text-red-600">
                      <p>
                        {{ errors[0] }}
                      </p>
                    </div>
                  </ValidationProvider>
                </template>
                <template v-if="extraPhone && !isGuest">
                  <ValidationProvider
                    v-slot="{errors}"
                    tag="div"
                    class="pe-mb-7 pe-w-full"
                  >
                    <PESelect
                      v-model="contactDetailsInput.typeofPhone3"
                      v-bind="inputProps"
                      label="Type of Phone"
                      :items="typeOfPhoneItems"
                      @input="typeOfPhoneChange($event, 'phone3')"
                    />
                    <div class="pe-w-full pe-pt-2 pe-text-red-600">
                      <p>
                        {{ errors[0] }}
                      </p>
                    </div>
                  </ValidationProvider>
                  <ValidationProvider
                    v-slot="{errors}"
                    tag="div"
                    :rules="{
                      required: true,
                      digits: 10
                    }"
                    class="pe-mb-7 pe-w-full"
                  >
                    <PETextInput
                      v-model="contactDetailsInput.phone3"
                      v-bind="inputProps"
                      label="Phone"
                    />
                    <div class="pe-w-full pe-pt-2 pe-text-red-600">
                      <p>
                        {{ errors[0] }}
                      </p>
                    </div>
                  </ValidationProvider>
                </template>
              </div>
            </div>
            <!-- #endregion CONTACT DETAILS -->
            <!-- #region SOCIAL MEDIA -->
            <div class="pe-w-full pe-order-1 md:!pe--order-none md:pe-pl-5">
              <h2 :class="titleClasses">Social Media</h2>
              <div class="pe-w-full">
                <ValidationProvider
                  v-slot="{errors}"
                  tag="div"
                  class="pe-mb-7 pe-w-full"
                >
                  <PETextInput
                    v-model="socialMediaInput.facebook"
                    v-bind="inputProps"
                    label="Facebook"
                  />
                  <div class="pe-w-full pe-pt-2 pe-text-red-600">
                    <p>
                      {{ errors[0] }}
                    </p>
                  </div>
                </ValidationProvider>
                <ValidationProvider
                  v-slot="{errors}"
                  tag="div"
                  class="pe-mb-7 pe-w-full"
                >
                  <PETextInput
                    v-model="socialMediaInput.twitter"
                    v-bind="inputProps"
                    label="Twitter"
                  />
                  <div class="pe-w-full pe-pt-2 pe-text-red-600">
                    <p>
                      {{ errors[0] }}
                    </p>
                  </div>
                </ValidationProvider>
                <ValidationProvider
                  v-slot="{errors}"
                  tag="div"
                  class="pe-mb-7 pe-w-full"
                >
                  <PETextInput
                    v-model="socialMediaInput.instagram"
                    v-bind="inputProps"
                    label="Instagram"
                  />
                  <div class="pe-w-full pe-pt-2 pe-text-red-600">
                    <p>
                      {{ errors[0] }}
                    </p>
                  </div>
                </ValidationProvider>
                <ValidationProvider
                  v-slot="{errors}"
                  tag="div"
                  class="pe-mb-7 pe-w-full"
                >
                  <PETextInput
                    v-model="socialMediaInput.youtube"
                    v-bind="inputProps"
                    label="Youtube"
                  />
                  <div class="pe-w-full pe-pt-2 pe-text-red-600">
                    <p>
                      {{ errors[0] }}
                    </p>
                  </div>
                </ValidationProvider>
              </div>
            </div>
            <!-- #endregion SOCIAL MEDIA -->

            <div
              v-if="!extraPhone && !isGuest"
              class="pe-flex pe-items-center pe-cursor-pointer pe-mb-14 md:pe-mb-10"
              @click="addPhoneClick"
            >
              <PEIcon
                class="pe-text-blue-light pe-border pe-border-solid pe-border-blue-light pe-rounded-full pe-mr-5"
                >plus</PEIcon
              >
              <PEButton
                label="Add another phone"
                text
                class="pe-py-0 pe-no-underline"
              />
            </div>
          </div>
          <div
            class="pe-w-full pe-flex pe-flex-col-reverse md:pe-flex-row pe-justify-center lg:pe-justify-end pe-items-center"
          >
            <PEButton
              v-bind="buttonSecondaryProps"
              @click="onGoBack"
            />
            <PEButton v-bind="buttonProps" />
          </div>
        </form>
      </ValidationObserver>
    </div>
  </section>
</template>

<script lang="ts">
import {Component, Emit, Prop, Vue} from 'vue-property-decorator'

// Plugins
import {ValidationObserver, ValidationProvider, extend} from 'vee-validate'
import {required, regex, digits} from 'vee-validate/dist/rules'
import dayjs from 'dayjs'

// #region Interfaces
import {MembershipTable} from '~/src/app/common/domain/entities/membershipTable'
import {
  MembershipDetailsInputs,
  PersonalInformationInput,
  ContactDetailsInput,
  SocialMediaInput
} from '~/src/app/common/domain/entities/membershipDetailsInputs'
import {TypeOfPhone} from '~/src/app/common/domain/enums/typeOfPhone'
// #endregion Interfaces

// Interfaces

interface InfoOutput {
  title: string
  value: unknown
}
interface PersonalInformationOutPut {
  fullName: InfoOutput
  email: InfoOutput
  dateOfBirth: InfoOutput
  cityCountry: InfoOutput
  zipCode: InfoOutput
  ssn?: InfoOutput
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
    membership!: MembershipTable

  @Prop({type: Boolean, default: false})
    isLoading!: boolean

  @Prop({type: Boolean, default: false})
    isGuest!: boolean

  @Prop({type: Boolean, default: false})
    isBeneficiary!: boolean

  // Computed
  public get titleClasses() {
    return ['text-white mb-10 text-2xl']
  }

  // Data

  public typeOfPhoneItems: TypeOfPhone[] = [
    TypeOfPhone.mobile,
    TypeOfPhone.office,
    TypeOfPhone.home
  ]

  public output!: PersonalInformationOutPut

  public personalInformationOutput: PersonalInformationOutPut = {
    fullName: {
      title: '',
      value: ''
    },
    email: {
      title: '',
      value: ''
    },
    dateOfBirth: {
      title: '',
      value: ''
    },
    cityCountry: {
      title: '',
      value: ''
    },
    zipCode: {
      title: '',
      value: ''
    },
    ssn: {
      title: '',
      value: ''
    }
  }

  public personalInformationInput: PersonalInformationInput = {
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    zipCode: '',
    city: '',
    country: ''
  }

  public contactDetailsInput: ContactDetailsInput = {
    typeOfPhone: TypeOfPhone.mobile,
    phone: '',
    typeofPhone2: TypeOfPhone.office,
    phone2: '',
    typeofPhone3: TypeOfPhone.home,
    phone3: ''
  }

  public socialMediaInput: SocialMediaInput = {
    facebook: '',
    twitter: '',
    instagram: '',
    youtube: ''
  }

  public extraPhone: boolean = false

  public guestBirthday: boolean = false

  public addingGuest: boolean = false

  // Hooks
  mounted() {
    if (this.membership) {
      this.mapPersonalInformation()
      this.setSocialNetwoks()
      this.mapContactDetails()
    } else {
      this.addingGuest = true
    }
    this.setFormConfiguration()
  }

  // Computed

  public get inputProps() {
    return {
      class: ['pe-w-full', 'pe-block', 'pe-text-white', '!pe-min-h-[56px]'],
      autocomplete: 'off',
      disabled: this.isLoading
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
      label: 'Request Change',
      type: 'button',
      uppercase: true,
      flat: true,
      outlinedSecondary: true,
      block: true,
      class: ['md:!pe-inline-flex pe-w-auto !pe-min-w-min'],
      disabled: true
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
      class: ['pe-mb-10 md:pe-mb-0 pe-bg-blue-dark']
    }
  }

  public get inputs(): MembershipDetailsInputs {
    return {
      ...this.personalInformationInput,
      ...this.contactDetailsInput,
      ...this.socialMediaInput
    }
  }

  // Methods

  public mapPersonalInformation(): void {
    if (this.membership.memberUtils) {
      const {firstname, lastname, email, City, Country, Zip, BIRTHDAY, SocialSecurityNumber} =
        this.membership.memberUtils
      if (!this.isGuest) {
        this.personalInformationOutput = {
          fullName: {title: 'Full Name', value: firstname + ' ' + lastname},
          email: {title: 'Email', value: email},
          dateOfBirth: {
            title: 'Date of Birth',
            value: BIRTHDAY ? dayjs(BIRTHDAY).format('MMM DD,YYYY') : '-'
          },
          cityCountry: {title: 'City, Country', value: City + ', ' + Country},
          zipCode: {title: 'Zip Code', value: Zip}
        }
        // if (!this.isBeneficiary && !this.isGuest)
        //   this.personalInformationOutput.ssn = {
        //     title: 'SSN',
        //     value: SocialSecurityNumber
        //   }
      } else {
        this.personalInformationInput = {
          firstName: firstname,
          lastName: lastname,
          email,
          dateOfBirth: BIRTHDAY ? dayjs(BIRTHDAY).format('MMM/DD/YYYY') : '',
          zipCode: Zip,
          country: Country,
          city: City
        }
      }
    }
  }

  public mapContactDetails(): void {
    if (this.membership.memberUtils) {
      const {officePhone, mobilePhone, homePhone} = this.membership.memberUtils

      if (officePhone && mobilePhone && homePhone) this.extraPhone = true

      this.contactDetailsInput = {
        typeOfPhone: TypeOfPhone.mobile,
        phone: mobilePhone,
        typeofPhone2: TypeOfPhone.office,
        phone2: officePhone,
        typeofPhone3: TypeOfPhone.home,
        phone3: homePhone
      }
    }
  }

  public onSubmit(reset: () => void) {
    if (this.addingGuest) this.onAddGuest()
    else this.submit()
    reset()
  }

  public setFormConfiguration(): void {
    extend('required', {
      ...required,
      message: 'This field is required'
    })
    extend('regex', {
      ...regex,
      message: 'Should be a valid date MM/DD/YYYY'
    })
    extend('digits', {
      ...digits,
      message: 'Should be a valid number'
    })
  }

  public addPhoneClick() {
    this.extraPhone = true
  }

  public setSocialNetwoks(): void {
    if (this.membership.memberUtils?.MemberProfileSocialNetwork)
      this.membership.memberUtils?.MemberProfileSocialNetwork.map(socialNetwork => {
        if (socialNetwork.title === 'FACE') {
          // @ts-ignore
          this.socialMediaInput.facebook = socialNetwork.value
        }

        if (socialNetwork.title === 'INST') {
          // @ts-ignore
          this.socialMediaInput.instagram = socialNetwork.value
        }

        if (socialNetwork.title === 'TWIT') {
          // @ts-ignore
          this.socialMediaInput.twitter = socialNetwork.value
        }

        if (socialNetwork.title === 'YOUT') {
          // @ts-ignore
          this.socialMediaInput.youtube = socialNetwork.value
        }
        return true
      })
  }

  public typeOfPhoneChange(value: string, item: string) {
    switch (item) {
    case 'phone1':
      if (value === TypeOfPhone.mobile)
        this.contactDetailsInput.phone = this.membership.memberUtils.mobilePhone
      if (value === TypeOfPhone.office)
        this.contactDetailsInput.phone = this.membership.memberUtils.officePhone
      if (value === TypeOfPhone.home)
        this.contactDetailsInput.phone = this.membership.memberUtils.homePhone
      break
    case 'phone2':
      if (value === TypeOfPhone.mobile)
        this.contactDetailsInput.phone2 = this.membership.memberUtils.mobilePhone
      if (value === TypeOfPhone.office)
        this.contactDetailsInput.phone2 = this.membership.memberUtils.officePhone
      if (value === TypeOfPhone.home)
        this.contactDetailsInput.phone2 = this.membership.memberUtils.homePhone
      break
    case 'phone3':
      if (value === TypeOfPhone.mobile)
        this.contactDetailsInput.phone3 = this.membership.memberUtils.mobilePhone
      if (value === TypeOfPhone.office)
        this.contactDetailsInput.phone3 = this.membership.memberUtils.officePhone
      if (value === TypeOfPhone.home)
        this.contactDetailsInput.phone3 = this.membership.memberUtils.homePhone
      break

    default:
      break
    }
  }

  // Emits
  @Emit()
  requestChange() {
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
  onGoBack() {}
}

export default Details
</script>
<style lang="scss" scoped>
.custom-cols {
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (min-width: 1280px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  @media (min-width: 1920px) {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
}
</style>
<style lang="scss" scoped>
.font-serif {
  font-family: Gotham, ui-serif, Georgia, Cambria, Times New Roman, Times, serif !important;
}
</style>
