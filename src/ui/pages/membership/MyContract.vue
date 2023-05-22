<template>
  <div>
    <div class="justify-center text-center md:text-left">
      <span class="text-white font-serif md:!font-normal font-medium text-[24px] md:text-[32px]">
        {{ $t('myContract') }}
      </span>
    </div>
    <div
      v-if="!isAvailableContract && !noContract"
      class="flex mt-6"
    >
      <svg
        aria-hidden="true"
        class="text-center mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-light"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <div class="text-white ml-4 mt-1">{{ $t('loadingContract') }}</div>
    </div>
    <div
      v-else-if="!isAvailableContract && noContract"
      class="md:mt-[40px] mt-[60px]"
    >
      <PEButton
        uppercase
        dense
        class="w-full md:w-auto h-[50px] py-5 px-5 lg:py-6 lg:px-12 mb:py-6 mb:px-12"
        outlined-secondary
        :disabled="!noContract || sendingRequest"
        @click.prevent="requestContract"
      >
        {{ $t('requestContract') }}
      </PEButton>
    </div>
    <div v-else>
      <PEViewer
        classes="w-full h-[350px] md:h-[700px] mt-[40px] rounded-[10px]"
        :url="contractUrl"
      />
      <div class="md:mt-[40px] mt-[60px]">
        <PEButton
          uppercase
          dense
          class="w-full md:w-auto h-[50px] py-5 px-5 lg:py-6 lg:px-12 mb:py-6 mb:px-12"
          outlined-secondary
          :disabled="!isAvailableContract"
          @click.prevent="onDownloadPDF"
        >
          {{ $t('downloadMyContract') }}
        </PEButton>
      </div>
    </div>
    <PEModal
      v-model="showModal"
      class="z-50"
    >
      <template #content>
        <p class="pe-font-sans pe-text-[24px] pe-text-white">{{ $t('successRequest') }}</p>
      </template>
      <template #buttons>
        <div class="items-center justify-center sm:flex md:mt-[40px] mt-[60px]">
          <PEButton
            outlined
            flat
            block
            :label="$t('buttonModal')"
            class="mb-2 text-white sm:mr-5 sm:mb-0"
            @click="closeModal"
          />
        </div>
      </template>
    </PEModal>
  </div>
</template>
<script lang="ts">
import {Component, Mixins} from 'vue-property-decorator'
import {PEModal} from '@pr-elite-components-library/lib'
import BasePageStrapiMixin from '../../mixins/BasePageStrapiMixin'
import {ContractStore} from '~/src/ui/store/contractStore'
import {UseAuth as AuthStore} from '~/src/ui/store/auth'
import i18n from '~/src/ui/i18n/membership/myContract.lang'
import { BasePageSlugs } from '~/src/app/Strapi/StrapiConfiguration'

@Component({
  i18n,
  meta: {
    auth: true
  },
  components: {
    PEModal
  }
})
export default class MyContract extends Mixins (BasePageStrapiMixin) {
  contractStore = new ContractStore()

  authStore = new AuthStore()

  sendingRequest = false
  showModal = false

  async beforeMount() {
    await this.loadStrapiPageData(BasePageSlugs.MyContract)
    this.contractStore.getContractDocument({
      application: this.authStore.userAffiliationId,
      company: this.authStore.userCompany
    })
  }

  get applicationMember() {
    return this.authStore.applicationUserMember
  }

  get contractUrl() {
    return this.contractStore.contractUrl
  }

  get isAvailableContract() {
    return this.contractStore.contractUrl !== ''
  }

  get noContract() {
    return this.contractStore.withoutContract
  }

  closeModal() {
    this.showModal = false
  }

  onDownloadPDF() {
    const link = document.createElement('a')
    link.setAttribute('download', `Contract-${this.applicationMember}.pdf`)
    link.href = this.contractUrl
    document.body.appendChild(link)
    link.click()
    link.remove()
  }

  requestContract() {
    this.sendingRequest = true
    this.contractStore
      .requestContractDocument(this.authStore.userAffiliationId ?? 0)
      .then(() => {
        this.showModal = true
      })
      .finally(() => {
        this.sendingRequest = false
      })
  }
}
</script>
