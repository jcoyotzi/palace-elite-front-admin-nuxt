<template>
  <div class="ms-flex ms-flex-col ms-flex-justify-center lg:ms-mx-auto lg:ms-w-[90%] lg:ms-mt-11">
    <div class="ms-text-center">
      <p class="ms-text-blue ms-uppercase ms-text-2xl lg:ms-text-[40px] lg:ms-leading-[48px]">
        {{ $t('affiliateSearch') }}
      </p>
      <p class="ms-text-gray-500 ms-text-sm lg:ms-text-xl ms-mt-6 lg:ms-mt-8">
        {{ $t('affiliateSearchDescription') }}
      </p>
    </div>
    <div class="ms-mt-6 lg:ms-mt-8 ms-border ms-border-gray-300 ms-rounded-[10px] ms-p-4 lg:ms-p-8">
      <p class="ms-text-gray-600 ms-text-xl lg:ms-text-2xl">
        {{ $t('affiliatesSearch') }}
      </p>
      <div class="ms-flex ms-justify-between ms-mt-6 lg:ms-mt-8">
        <div>
          <PEInput
            v-model="form.affiliationNumber"
            color="microsite"
            class="border border-gray-light rounded-[5px] !text-gray-light"
            :label="$t('affiliationNumber')"
          />
          <p
            v-if="form.affiliationNumberError"
            class="ms-text-red-500 ms-text-sm ms-mt-2"
          >{{ form.affiliationNumberError }}</p>
        </div>
        <PEButton
          class="w-[200px] lg:w-[300px] lg:ms-max-h-[60px] ms-uppercase"
          solid
          :loading="form.loading"
          @click="searchAffiliate"
        >
          {{ $t('search') }}
        </PEButton>
      </div>
    </div>
    <div v-if="showAffiliateCard" class="mt-[30px] justify-center">
      <CardAffiliationMicroSite
        v-bind="cardAffiliationProps"
        class="card-affiliation-micro-site"
        @open="clickedCardAffiliateOpenButton"
      />
    </div>
    <div v-else class="ms-mt-6 lg:ms-mt-8 ms-border ms-border-gray-300 ms-rounded-[10px] ms-p-4 lg:ms-p-8">
      <p class="ms-text-gray-600 ms-text-base ms-text-center">
        {{ $t('noSearchesHaveBeenPerformed') }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import i18n from '../i18n/messages/affiliate-search.lang';
import { BPGStore } from '../store/bpgStore';

@Component({
  name: 'AffiliateSearchPage',
  layout: 'authenticated',
  meta: {
    auth: true,
    breadcrumb: ['home', 'affiliateSearch']
  },
  i18n,
})
export default class AffiliateSearchPage extends Vue {
  public bpgStore = new BPGStore();

  public form: any = {
    affiliationNumber: '',
    affiliationNumberError: '',
    loading: false,
  }

  get searchedAffiliate(): any {
    return this.bpgStore.affiliateInfo
  }

  get showAffiliateCard(): boolean {
    return !!this.searchedAffiliate && !!this.searchedAffiliate.application;
  }

  get cardAffiliationProps() {
    const language = this.$t('languageCode' + this.searchedAffiliate.lang)

    return {
      name: this.searchedAffiliate.name,
      number: `${this.$t('affiliationNumber')}: ${this.searchedAffiliate.application}`,
      status: this.$t('pendingSignature'),
      email: `Email: ${this.searchedAffiliate.email}`,
      role: this.$t('owner'),
      language: `${this.$t('language')}: ${language}`,
      textMoreDetails: this.$t('moreDetails'),
    }
  }

  async searchAffiliate() {
    try {
      this.form.affiliationNumberError = '';

      if (!this.form.affiliationNumber.trim()) {
        this.form.affiliationNumberError = this.$t('affiliateNumberIsRequired');
        return
      }

      this.form.loading = true;

      await this.bpgStore.getAffiliateInfo(this.form.affiliationNumber);

      if (this.showAffiliateCard) {
        this.form.affiliationNumber = '';
      } else {
        this.form.affiliationNumberError = this.$t('affiliateNumberNotFound');
      }
    } catch (error: any) {
      console.log(error)
    }

    this.form.loading = false;
  }

  clickedCardAffiliateOpenButton() {
    this.$router.push(this.localePath({ path: '/affiliate/bpg' }));
  }
}
</script>

<style scoped>
.card-affiliation-micro-site::v-deep button {
  outline-width: 1px !important;
  border-color: rgb(51 107 135 / var(--tw-border-opacity)) !important; 
}

.card-affiliation-micro-site::v-deep .text-blue-aqua {
  display: none !important;
}
</style>