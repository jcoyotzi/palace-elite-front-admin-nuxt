<template>
<div class="pe-max-w-[645px]">
  <PEOfferText
  :title="$t('contact.form.titleDesktop')"
  class="pe-w-full pe-mx-auto !pe-hidden md:!pe-flex"
  />
  <PEOfferText
  :title="$t('contact.form.titleMobile')"
  class="pe-w-full pe-h-60 pe-mx-auto md:!pe-hidden"
  />
  <div id="hubspotForm"></div>
  <PELoadingData v-if="loadingForm" />
</div>
</template>
<script lang="ts">
import {Component, Emit, Prop, Vue, Watch} from 'vue-property-decorator'
import {ValidationObserver, ValidationProvider, extend} from 'vee-validate'
import {required, email, numeric} from 'vee-validate/dist/rules'

import {ContactStore} from '../../store/contactUs/contacUsStore'
import PETextArea from './PETextArea.vue'
import ContactFormDto from '~/src/app/contact/domain/dto/contactFromDto'

@Component({
  name: 'PEContactForm',
  components: {
    PETextArea,
    ValidationObserver,
    ValidationProvider
  }
})
export default class PEContactForm extends Vue {
  private contactStore = new ContactStore()

  public contactForm: ContactFormDto = {
    affilliateId: null,
    name: '',
    email: '',
    country: '',
    department: null,
    resort: null,
    message: ''
  }

  public isMember = 'not-member'

  public radioItems = [
    {
      id: 'not-member',
      name: 'not-member',
      labelText: this.$t('contact.form.notMember')
    },
    {
      id: 'member',
      name: 'member',
      labelText: this.$t('contact.form.member')
    }
  ]

  public loadingForm = true

  get itemsMember() {
    if (!this.contactStore.contactReasons.member) return []
    return this.contactStore.contactReasons.member?.map(reason => ({
      value: reason.id,
      text: reason.name,
      disable: false
    }))
  }

  get itemsNotMember() {
    if (!this.contactStore.contactReasons.notMember) return []
    return this.contactStore.contactReasons.notMember?.map(reason => ({
      value: reason.id,
      text: reason.name,
      disable: false
    }))
  }

  get itemstoSelect() {
    return this.fieldsRequiredCLient ? this.itemsMember : this.itemsNotMember
  }

  get fieldsRequiredCLient() {
    return this.isMember === 'member' || this.isAuthenticated
  }

  get resorts() {
    const reason = this.contactStore.contactReasons.member?.find(
      dept => dept.id === this.contactForm.department?.value
    )
    return (
      reason?.resorts.map(resort => ({value: resort.id, text: resort.title, disable: false})) ?? []
    )
  }

  get titleForm() {
    return screen.width < 769
      ? 'GET IN TOUCH WE WILL BE GLAD TO ASSIST YOU'
      : 'HOW CAN WE HELP YOU?'
  }

  @Prop({
    type: Boolean,
    default: false
  })
    isAuthenticated!: boolean

  @Prop({
    type: String
  })
    userId!: string | null

  @Prop({
    type: Boolean,
    default: false
  })
    disableForm!: boolean

  @Emit('form-data')
  onSubmit(reset: () => void) {
    const deptSelected = this.contactStore.contactReasons.allReasons.find(
      reason => reason.id === this.contactForm.department?.value
    )

    reset()
    return {
      ...this.contactForm,
      department: deptSelected,
      resort: deptSelected?.resorts.find(resort => resort.id === this.contactForm.resort?.value)
    }
  }

  @Watch('isMember')
  changeMemberOptions() {
    this.contactForm.affilliateId = ''
    this.contactForm.resort = null
    this.contactForm.department = null
  }

  mounted() {
    this.setFormConfiguration()

    if (this.userId) {
      this.contactForm.affilliateId = this.userId
    }

    const script = document.createElement("script");
    script.src="//js.hsforms.net/forms/embed/v2.js";
    document.body.appendChild(script);
    script.addEventListener("load", () => {
      // @ts-ignore
      if (window.hbspt) {
        // @ts-ignore
        window.hbspt.forms.create({
          region: 'na1',
          portalId: "2284186",
          formId: "c7133c59-21ca-4621-8bb0-81f35e7587da",
          target: "#hubspotForm",
        })
      }
      this.loadingForm = false
    })
  }

  public setFormConfiguration(): void {
    extend('required', {
      ...required,
      message: 'This field is required'
    })
    extend('email', {
      ...email,
      message: 'This should be an email address'
    })
    extend('numeric', {
      ...numeric,
      message: 'This should be an number'
    })
  }
}
</script>

<style lang="scss" scoped>
:deep(#hubspotForm) {
  .hs-error-msg,
  .hs-main-font-element {
    color: #dc2626;
  }
  .hs-form-required {
    display: none;
  }
  .hs-form-radio {
    margin-bottom: 20px;
    width: 100%;
  
    & .hs-form-radio-display {
      display: flex;
      align-items: center;
      height: 30px;
      position: relative;
      font-family: "Open Sans", serif !important;
      color: white;
    
      & span {
        margin-left: 2.5rem;
      }
      
      & .hs-input[type="radio"] {
        visibility: hidden;
      
        &::before {
          content: '';
          display: flex;
          visibility: visible;
          position: absolute;
          top: 0;
          left: 0;
          min-height: 30px;
          min-width: 30px;
          background-color: #363636;
          border-radius: 9999px
        }
      
        &:checked::before {
          content: '';
          justify-content: center;
          align-items: center;
          text-align: center;
          margin: 0px auto;
          background-color: #90afc5;
          border: 1px solid #90afc5;
          box-shadow: 0px 0px 0px 3px inset #272527;
        }
      }
    }
  }
  .hs-fieldtype-text,
  .hs-fieldtype-select,
  .hs-fieldtype-textarea {
    width: 100%;
    height: 100%;
    background-color: #363636;
    padding-left: 1.25rem;
    position: relative;
    border-radius: 0.25rem;
    margin-bottom: 1.25rem;
    
    &:has(input:valid) > label,
    &:has(select:valid) > label, 
    &:has(textarea:valid) > label {
      top: .25rem;
      font-size: 0.875rem;
    }
  
    &:has(input:focus) > label,
    &:has(select:focus) > label, 
    &:has(textarea:focus) > label {
      top: .25rem;
      font-size: 0.875rem;
    }
  
    & label {
      position: absolute;
      color: white;
      top: 0.875rem;
      transition: all .3s ease;
  
      & .hs-form-required {
        display: none;
      }
    }
  
    & .input {
      width: 100%;
      height: 52px;
      background-color: transparent;
      padding: 1.5rem 1.25rem 0.25rem 0rem;
      
      & input,
      select,
      textarea {
        width: 100%;
        height: 100%;
        background-color: transparent;
        outline: 2px solid transparent;
        outline-offset: 2px;
        color: white;
  
      }
      
      & select {
        &:invalid {
          color: transparent;
        }
  
        &:focus {
          color: white;
        }
        & option {
          background-color: #363636;
          
          &:first-child {
            content: 'Otra frase';
            color: transparent;
          }
        }
      }
    }
  
    & .hs-error-msg {
      position: absolute;
      top: 90%;
      color: #dc2626;
    }
  }
  .hs-fieldtype-textarea {
    height: 13rem;
  
    & .input {
      height: 13rem;
    }
  
    & .hs-error-msg {
      position: absolute;
      top: 100%;
    }
  }
  .hs-fieldtype-booleancheckbox {
    color: white;
    margin-bottom: 1.25rem;
  
    & label {
      display: flex;
      align-items: center;
    }
  
    & input[type="checkbox"] {
      position: relative;
      width: 30px;
      height: 30px;
      margin-right: 1.25rem;
      flex-shrink: 0;
      cursor: pointer;
      appearance: none;
      border-radius: .25rem;
      background-color: #363636;
      transition: all 150ms ease-in-out;
      
      &:checked {
        background-color: #90afc5;
      }
    }
  
    & .hs-error-msg {
      color: #dc2626;
    }
  }
  .actions {
    display: flex;
    justify-content: flex-end;
  
    .hs-button {
      width: 200px;
      height: 66px;
      color: #90afc5;
      border: 1px solid #90afc5;
      border-radius: .375rem;
      margin: 1.25rem 0;
    }
  }
  
  .submitted-message {
    font-size: 32px;
    color: white;
    text-align: center;
  }
}
</style>
