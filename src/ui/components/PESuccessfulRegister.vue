<template>
  <form
    class="flex w-full flex-col items-center"
    @submit.prevent="onSubmit"
  >
    <p :class="textClasses">
      {{ emailStored }}
    </p>

    <div v-if="!showLoading">
      <p :class="textClasses">{{$t('successfullregistrationLabel')}}</p>
    </div>

    <PEButton v-bind="buttonProps" />
  </form>
</template>

<script lang="ts">
import {Component, Vue, Prop, Emit, Watch} from 'vue-property-decorator'
import i18n from '~/src/ui/i18n/login/loginForm'

@Component({
  name: 'PESuccessfulRegister',
  i18n
})
export default class PESuccessfulRegister extends Vue {
  // Props
  @Prop({type: Boolean, default: false})
  readonly isLoading!: boolean

  @Prop({type: String, default: ''})
  readonly emailStored!: string

  // Data

  public showLoading: boolean = false

  // Watchers

  @Watch('isLoading')
  onLoadingChange(value: boolean) {
    this.showLoading = value
  }

  // Computed

  public get buttonProps() {
    return {
      label: this.$t('goToLoginLabel'),
      type: 'submit',
      solid: true,
      uppercase: true,
      flat: true,
      loading: this.showLoading
    }
  }

  public get textClasses() {
    return ['text-center mb-4 text-white']
  }

  // Methods

  public onSubmit() {
    this.showLoading = true
    this.submit()
  }

  // Emits
  @Emit()
  submit() {}
}
</script>
