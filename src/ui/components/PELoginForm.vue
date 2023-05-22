<template>
  <div :class="WrapperClasses">
    <h3 v-if="!isLoginPage" :class="titleClasses">
      {{ title }}
    </h3>

    <div
      v-if="externalErrorMessage"
      class="mb-5 text-center text-red-600"
    >
      {{ externalErrorMessage }}
    </div>

    <PELoginUser
      :is-login-page="isLoginPage"
      :is-loading="loading"
      @submit="onSend"
    ></PELoginUser>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Prop, Emit} from 'vue-property-decorator'

// Components
import PELoginUser from './PELoginUser.vue'

@Component({
  name: 'PELoginForm',
  components: {PELoginUser}
})
export default class PELoginForm extends Vue {
  @Prop({type: String, default: 'Unlock Your Exclusive Benefits'})
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
    type: Boolean,
    default: false
  })
  readonly isLoginPage!: boolean

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

  @Emit('submitLogin')
  onSend(data: object) {
    return data
  }
}
</script>
