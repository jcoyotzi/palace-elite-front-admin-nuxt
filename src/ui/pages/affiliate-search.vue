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
            id="search-affiliate-input"
            v-model="form.affiliationNumber"
            color="microsite"
            class="webkit-text-fill-gray border border-gray-light ms-rounded-[5px] !ms-text-gray-light"
            :label="$t('affiliationNumber')"
            @onEnter="searchAffiliate"
          />
          <p
            v-if="form.affiliationNumberError"
            class="ms-text-red-500 ms-text-sm ms-mt-2"
          >{{ form.affiliationNumberError }}</p>
        </div>
        <PEButton
          class="ms-w-[200px] lg:ms-w-[300px] lg:ms-max-h-[60px] ms-uppercase"
          solid
          :loading="form.loading"
          @click="searchAffiliate"
        >
          {{ $t('search') }}
        </PEButton>
      </div>
    </div>
    <div v-if="showAffiliateCard" class="ms-mt-[30px] ms-justify-center">
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
import { TranslateResult } from 'vue-i18n';
import i18n from '../i18n/messages/affiliate-search.lang';
import { BPGStore } from '../store/bpgStore';
import { getAffiliationLangToLocale } from '../utils/affiliationLangToLocale';

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

  mounted() {
    document.getElementById("search-affiliate-input")?.focus()
  }

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
    const language = this.getAffiliateLanguage();

    return {
      name: this.searchedAffiliate.name,
      number: `${this.$t('affiliationNumber')}: ${this.searchedAffiliate.application}`,
      status: this.$t('pendingSignature'),
      email: `Email: ${this.searchedAffiliate.email}`,
      role: this.$t('owner'),
      language: `${this.$t('language')}: ${language}`,
      textMoreDetails: this.$t('moreDetails'),
      openButtonLabel: this.$t('open'),
    }
  }

  getAffiliateLanguage(): string | TranslateResult {
    if (this.isAvailableLanguage(this.searchedAffiliate.lang)) {
      return this.$t('languageCode' + this.searchedAffiliate.lang);
    }

    return this.$t('notAvailable');
  }

  isAvailableLanguage(languageCode: string): boolean {
    return ['E', 'P', 'S',''].includes(languageCode);
  }

  async searchAffiliate() {
    try {
      this.form.affiliationNumberError = '';

      if (!this.form.affiliationNumber.trim()) {
        this.form.affiliationNumberError = this.$t('affiliateNumberIsRequired');
        return
      }

      this.form.loading = true;

      this.bpgStore.affiliateInfo = {}

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
    this.$router.push(
      this.localePath(
        {
          path: '/affiliate/bpg',
          query: { application: this.searchedAffiliate.application }
        },
        getAffiliationLangToLocale(this.searchedAffiliate.lang, this.$i18n.locale)
      )
    );
  }
}
</script>

<style scoped>

.webkit-text-fill-gray::v-deep input:-webkit-autofill {
  --tw-text-opacity: 1;
  -webkit-text-fill-color: rgb(102 102 102 / var(--tw-text-opacity)) !important;
  -moz-text-fill-color: rgb(102 102 102 / var(--tw-text-opacity)) !important;
  -ms-text-fill-color: rgb(102 102 102 / var(--tw-text-opacity)) !important;
  -o-text-fill-color: rgb(102 102 102 / var(--tw-text-opacity)) !important;
}
</style>