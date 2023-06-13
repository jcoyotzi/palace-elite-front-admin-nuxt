<template>
  <div>
    <div
      :class="backgroundClasses"
      class="md:hidden max-w-[280px] rounded-[12px]"
    >
      <img
        :src="image"
        class="h-[180px] w-full rounded-t-[12px] object-cover"
      />
      <div class="ms-p-[24px] ms-content-between ms-items-center">
        <div>
          <div class="font-sans text-[20px] font-normal text-blue-light">
            {{ name }}
          </div>
          <div
            @click.prevent="showTitle"
            :class="getClassTitle()"
            class="cursor-pointer mt-4 font-sans text-[24px] font-semibold text-blue-light"
          >
            {{ title }}
          </div>
          <div class="my-4">
            <slot name="button" />
          </div>
          <div class="wrapper-tabs mt-8">
            <div
              :style="getStyleDescriptionText()"
              class="text-justify truncate-promotion-description"
              :class="textClasses"
              v-html="descriptionText"
            />
            <ul
              v-if="showMapperImpWks"
              class="mt-6"
            >
              <li
                v-for="(impwk, index) in mapperList"
                :key="index"
                class="mb-2"
                :class="textClasses"
                v-html="impwk.ltrName"
              />
            </ul>
            <div
              v-if="!shortContent"
              class="mt-6 text-justify"
              :class="textClasses"
              v-html="textNewOldSchema"
            />
          </div>
        </div>

        <div
          class="ms-text-right mt-6 md:flex text-blue-light"
          :class="getClassButtonsFooter"
        >
          <div
            @click.prevent="openModalTerms()"
            v-if="showTermsAndConditions"
            class="md:!ms-hidden ms-z-1 cursor-pointer ms-text-blue-light ms-h-6 ms-py-0 ms-no-underline"
          >
            {{ texts?.termsAndConditions }}
          </div>
          <div
            class="md:!ms-hidden ms-z-1 flex mt-4 ms-justify-end cursor-pointer ms-text-blue-light ms-h-6 ms-py-0 ms-no-underline"
            @click.prevent="showMore()"
          >
            <PEIcon
              v-show="shortContent"
              class="ms-z-1 float-left mr-2"
              size="24"
              >eye-outlined</PEIcon
            >
            <PEIcon
              v-show="!shortContent"
              class="ms-z-1 float-left mr-2"
              size="24"
              >eye-strike-outlined</PEIcon
            >
            {{ textSee }}
          </div>
        </div>
      </div>
    </div>
    <div
      class="hidden md:flow-root !max-w-[520px] rounded-[12px]"
      :class="backgroundClasses"
    >
      <img
        :src="image"
        class="h-[180px] w-full rounded-t-[12px] object-cover"
      />
      <div class="p-[24px]">
        <div class="font-sans text-[20px] font-normal text-blue-light">
          {{ name }}
        </div>
        <div class="mt-4 font-sans text-[24px] font-semibold text-blue-light">
          {{ title }}
        </div>
        <div class="my-4">
          <slot name="button" />
        </div>
        <div class="wrapper-tabs mt-8">
          <div
            class="text-justify"
            :class="textClasses"
            v-html="descriptionText"
          />
          <ul
            v-if="showMapperImpWks"
            class="mt-6"
          >
            <li
              v-for="(impwk, index) in mapperList"
              :key="index"
              class="mb-2"
              :class="textClasses"
              v-html="impwk.ltrName"
            />
          </ul>
          <div
            v-if="!shortContent"
            class="mt-6 text-justify"
            :class="textClasses"
            v-html="textNewOldSchema"
          />
        </div>
        <div
          class="mt-6 flex text-blue-light"
          :class="getClassButtonsFooter"
        >
          <div
            @click.prevent="openModalTerms()"
            v-if="showTermsAndConditions"
            class="ms-z-1 cursor-pointer ms-text-blue-light ms-h-6 ms-py-0 ms-no-underline"
          >
            {{ texts?.termsAndConditions }}
          </div>
          <div
            class="ms-z-1 flex ms-justify-end cursor-pointer ms-text-blue-light ms-h-6 ms-py-0 ms-no-underline"
            @click.prevent="showMore()"
          >
            <PEIcon
              v-show="shortContent"
              class="ms-z-1 float-left mr-2"
              size="24"
              >eye-outlined</PEIcon
            >
            <PEIcon
              v-show="!shortContent"
              class="ms-z-1 float-left mr-2"
              size="24"
              >eye-strike-outlined</PEIcon
            >
            {{ textSee }}
          </div>
        </div>
      </div>

      <PEModal
        v-model="showModal"
        :dark="dark"
        class="ms-z-70"
      >
        <template #title>
          <h2 class="ms-text-white ms-text-[24px] ms-font-sans ms-mb-5 ms-uppercase">
            {{ texts?.termsAndConditions }}
          </h2>
        </template>

        <template #content>
          <div
            v-for="(term, index) in termsAndConditions"
            :key="index"
            class="ms-text-white ms-mb-6 ms-font-sans"
            v-html="term.htmlBody"
          />
        </template>
      </PEModal>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Prop, Emit} from 'vue-property-decorator'
//import PEButton from '../PEButton/PEButton.vue';
//import PEIcon from '../PEIcon/PEIcon.vue';
//import PEModal from '../PEModal/PEModal.vue';

enum CatalogImperials {
  IMPWKS = 'IMPWKS',
  IMPNIG = 'IMPNIG'
}

enum CatalogAnniversary {
  ANVWKS = 'ANVWKS',
  ANVNIG = 'ANVNIG'
}

enum CatalogIncentivo {
  INCWKS = 'INCWKS'
}

@Component({
  name: 'BPGCardPromotions',
  components: {
    //  PEButton,
    //  PEIcon,
    //  PEModal,
  }
})
export default class BPGCardPromotions extends Vue {
  @Prop({default: '', type: String}) name!: string

  @Prop({default: '', type: String}) title!: string

  @Prop({default: '', type: String}) image!: string

  @Prop({default: '', type: String}) description!: string

  @Prop({default: () => [], type: Array}) mapper!: any[]

  @Prop({}) texts!: any

  @Prop({default: '', type: String}) textNewOldSchema!: string

  @Prop({default: 'See More', type: String}) seeMore!: string

  @Prop({default: 'See Less', type: String}) seeLess!: string

  @Prop({default: true, type: Boolean}) shortContent!: boolean

  @Prop({default: false, type: Boolean}) isMobile!: boolean

  @Prop({}) termsAndConditionsProvisions!: any

  @Prop({default: true, type: Boolean}) dark!: boolean

  public showModal = false

  public showMoreTitle: boolean = false

  public termsAndConditions: any = []

  public get showTermsAndConditions(): boolean {
    return this.mapperList.length > 0
  }

  public get descriptionText(): string {
    const textLength = this.isMobile ? 120 : 245

    if (this.description !== '') {
      if (this.shortContent && this.description.length > textLength)
        return `${this.description.substr(0, textLength)}...`
      return this.description
    }
    return this.texts?.withoutDescription
  }

  public get textSee() {
    if (this.shortContent) return this.seeMore
    return this.seeLess
  }

  public get showMapperImpWks() {
    return this.mapper.length > 0 && !this.shortContent
  }

  public get mapperList() {
    return this.mapper.sort((a, b) => {
      if (a.certName < b.certName) return 1
      if (a.certName > b.certName) return -1
      return 0
    })
  }

  public get getClassButtonsFooter() {
    return {
      'md:justify-between': this.showTermsAndConditions,
      'md:justify-end': !this.showTermsAndConditions,
      'justify-end': true
    }
  }

  get backgroundClasses() {
    return {
      'bg-black-light': this.dark,
      'bg-[#F0F0F0]': !this.dark
    }
  }

  get textClasses() {
    return {
      'text-white': this.dark,
      'text-gray-500': !this.dark
    }
  }

  @Emit('show-more')
  showMore() {}

  getStyleDescriptionText() {
    return this.shortContent ? 'height: 100px;' : ''
  }

  getClassTitle() {
    return {
      'truncate-promotion-title': !this.showMoreTitle
    }
  }

  showTitle() {
    this.showMoreTitle = !this.showMoreTitle
  }

  openModalTerms() {
    const categorys = [...new Set(this.mapperList.map(provision => provision.category))]

    let strCategory = ''

    categorys.map(category => {
      if (category === CatalogImperials.IMPWKS || category === CatalogImperials.IMPNIG)
        strCategory = 'Imperial'

      if (category === CatalogIncentivo.INCWKS) strCategory = 'Incentive'

      if (category === CatalogAnniversary.ANVWKS || category === CatalogAnniversary.ANVNIG)
        strCategory = 'Anniversary'
    })

    const termsAndConditions = this.termsAndConditionsProvisions
      .filter((provision: any) =>
        strCategory === 'Imperial'
          ? provision.textId.search(strCategory) > -1 || provision.textId === 'ChristmasBonus'
          : provision.textId.search(strCategory) > -1
      )
      .sort((a: any, b: any) => {
        if (b.order < a.order) return 1
        if (b.order > a.order) return -1
        return 0
      })
      .map((provision: any) => ({
        ...provision,
        htmlBody: provision.htmlBody.replace('Verdana', '"Open sans"')
      }))

    this.termsAndConditions = termsAndConditions

    this.showModal = true
  }
}
</script>
<style scoped>
::v-deep .wrapper-tabs ul {
  list-style-type: disc !important;
  list-style-position: inside;
}
.truncate-promotion-description,
.truncate-promotion-title {
  display: -webkit-box;
  max-width: 100%;
  /* -webkit-line-clamp: 4; */
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.truncate-promotion-title {
  height: 70px;
  -webkit-line-clamp: 2 !important;
}
</style>