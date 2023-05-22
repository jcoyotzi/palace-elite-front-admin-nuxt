<template>
  <PEModal
    class="z-50"
    :value="modalData.show"
    v-if="canShowModal"
    @input="closeModal"
    @onClose="closeModal"
  >
    <template #content>
      <div class="text-center">
        <h2 :class="titleClasses">{{ modalData.title }}</h2>
      </div>
      <!-- Message -->
      <p class="text-center text-white mb-10">{{ modalData.message }}</p>
      <!-- Buttons -->
      <PEButton
        :key="cta"
        v-if="hasCta"
        v-bind="buttonCloseProps"
        @click="closeModal"
      />
    </template>
  </PEModal>
</template>

<script lang="ts">
import {Component, Emit, Prop, Vue} from 'vue-property-decorator'

@Component
class Modal extends Vue {
  @Prop({type: Boolean, default: false})
  show!: boolean

  @Prop({type: String, default: ''})
  title!: string

  @Prop({type: String, default: ''})
  message!: string

  @Prop({type: String, default: ''})
  cta!: string
  // Computed
  public get titleClasses() {
    return ['text-white uppercase font-serif font-medium mb-10 text-2xl']
  }

  public get buttonCloseProps() {
    return {
      label: this.cta,
      type: 'button',
      uppercase: true,
      flat: true,
      outlinedSecondary: true
    }
  }

  get modalData() {
    return {
      show: this.show,
      title: this.title,
      message: this.message
    }
  }

  get canShowModal() {
    return this.title.length > 0 && this.message.length > 0
  }

  get hasCta() {
    return this.cta.length > 0
  }

  // Emits

  @Emit()
  closeModal() {
    return false
  }
}

export default Modal
</script>
