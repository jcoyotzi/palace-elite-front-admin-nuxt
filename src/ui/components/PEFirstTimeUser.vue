<template>
  <div :class="WrapperClasses">
    <h3 :class="titleClasses">
      {{ title }}
    </h3>

    <div
      v-if="externalErrorMessage"
      class="mb-5 text-center text-red-600"
    >
      {{ externalErrorMessage }}
    </div>

    <PERegisterUser
      v-if="step === 0"
      :is-loading="loading"
      @submit="onSend"
    ></PERegisterUser>

    <PEConfirmPassword
      v-if="step === 1"
      :is-loading="loading"
      @submit="onSend"
    ></PEConfirmPassword>

    <PEConfirmationCode
      v-if="step === 2"
      :is-loading="loading"
      :email-stored="email"
      @submit="onSend"
    ></PEConfirmationCode>

    <PESuccessfulRegister
      v-if="step === 3"
      :is-loading="loading"
      :email-stored="email"
      @submit="onSuccessfull"
    ></PESuccessfulRegister>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Prop, Emit} from 'vue-property-decorator'

// Components
import PERegisterUser from './PERegisterUser.vue'
import PEConfirmPassword from './PEConfirmPassword.vue'
import PEConfirmationCode from './PEConfirmationCode.vue'
import PESuccessfulRegister from './PESuccessfulRegister.vue'
import i18n from '~/src/ui/i18n/login/loginForm'

// Interfaces
import {FirstTimeUser, Steps} from '~/interfaces/PEFirstTimeUser/PEFirstTimeUser.interface'

@Component({
  name: 'PEFirstTimeUser',
  components: {
    PERegisterUser,
    PEConfirmPassword,
    PEConfirmationCode,
    PESuccessfulRegister,
  },
  i18n,
})
export default class PEFirstTimeUser extends Vue implements FirstTimeUser {
  @Prop({type: String, default: 'First time users'})
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

  @Emit('submitFirstime')
  onSend(output: any) {
    if (output.email) this.email = output.email
    return output
  }

  @Emit('sucessfullRegister')
  onSuccessfull() {}
}
</script>
