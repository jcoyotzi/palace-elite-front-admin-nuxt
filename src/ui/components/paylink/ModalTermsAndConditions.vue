<template>
  <PEModal
    :value="showModal"
    style="z-index: 99999"
    class="pe-z-[100] pe-text-white"
    @input="closeModal"
  >
    <template #title>
      <h2 class="pe-text-2xl pe-uppercase pe-font-medium pe-mb-10">
        {{ information?.title }}
      </h2>
    </template>
    <template #content>
      <div
        class="pe-px-5 xl:pe-px-10"
        v-html="information?.content"
      />
    </template>
  </PEModal>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import {PayLinkStore} from '../../store/payLinkStore'

@Component({})
export default class ModalTermsAndConditions extends Vue {
  public closeModal() {
    this.paylinkStore.showModalTermsAndConditions = false
  }

  get paylinkStore(): PayLinkStore {
    return new PayLinkStore()
  }

  get information() {
    //@ts-ignore
    return this.paylinkStore?.collectionTypeTerms?.find(
      attr => attr.attributes.code === 'paylink-terms-and-conditions'
    )?.attributes
  }

  get showModal(): boolean {
    return this.paylinkStore.showModalTermsAndConditions
  }
}
</script>
