<template>
  <PEModal
    v-model="bindingValue"
    class="z-index"
  >
    <template #content>
      <div class="!pe-text-center pe-px-8">
        <h1 class="pe-text-2xl pe-leading-[23px] pe-text-white pe-uppercase">
          {{ termsAndConditions?.attributes?.title }}
        </h1>
      </div>
      <div
        class="pe-px-8 pe-my-10 pe-text-justify pe-text-[16px] pe-leading-7 pe-text-white pe-font-sans"
        v-html="termsAndConditions?.attributes?.content"
      />
    </template>
  </PEModal>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import {Data as TermsAndConditionsData} from '~/src/app/bookings/domain/dto/getTermsAndConditionsDto'
import {TermsAndConditionsStore} from '~/src/ui/store/termAndConditionsStore'

@Component({})
export default class ModalTermsAndConditions extends Vue {
  @Prop({default: false, type: Boolean}) value!: boolean

  public termsAndConditions: TermsAndConditionsData = {
    id: 0,
    attributes: {
      code: '',
      title: '',
      content: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      publishedAt: new Date(),
      locale: ''
    }
  }

  get bindingValue(): boolean {
    return this.value
  }

  set bindingValue(value: boolean) {
    this.$emit('input', value)
  }

  get tycStore(): TermsAndConditionsStore {
    return new TermsAndConditionsStore()
  }

  async beforeMount() {
    this.termsAndConditions = await this.tycStore.fetchTermsStrapi('membership-creditcard-details')
  }
}
</script>
<style scoped>
.z-index {
  z-index: 99999;
}
</style>
