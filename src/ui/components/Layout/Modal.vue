<template>
  <PEModal
    class="z-50"
    :value="modalData.show"
  >
    <template #content>
      <div class="text-center">
        <h2 :class="titleClasses">{{ modalData.title }}</h2>
      </div>
      <!-- Message -->
      <p class="text-center text-white mb-10">{{ modalData.message }}</p>
      <!-- Buttons -->
      <PEButton
        v-bind="buttonCloseProps"
        @click="closeModal"
      />
    </template>
  </PEModal>
</template>

<script lang="ts">
import {Component, Emit, Prop, Vue} from 'vue-property-decorator'
import {LayoutStore} from '../../store/layoutStore'

@Component
class Modal extends Vue {
  layoutStore = new LayoutStore()

  @Prop({type: Boolean, default: false})
  isLoading!: boolean

  // Computed
  public get titleClasses() {
    return ['text-white uppercase font-serif font-medium mb-10 text-2xl']
  }

  public get buttonCloseProps() {
    return {
      label: 'Close',
      type: 'button',
      uppercase: true,
      flat: true,
      outlinedSecondary: true
    }
  }

  get modalData() {
    return this.layoutStore.modalData
  }

  // Methods
  public closeModal() {
    this.layoutStore.toggleModal()
  }

  // Emits

  @Emit()
  input(input: boolean) {
    return input
  }
}

export default Modal
</script>
