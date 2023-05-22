<template>
  <div class="pe-bg-black">
    <CommonHeroWidget
      v-if="components"
      :calendar-data="calendarData"
      :hero-attrs="heroAttrs"
      :booking-attrs="bookingAttrs"
    />
    <Component
      :is="component.clientOnly ? 'div' : 'ClientOnly'"
      v-for="component in components"
      :key="component.props?.id"
    >
      <Component
        :is="component.component"
        v-bind="component.props"
      />
    </Component>

    <PEImageStrapi
      v-if="hasStrapiContent"
      :image="calculatorContent.image"
      class="lg:pe-hidden pe-h-[320px]"
      fit
    />
    <div
      class="pe-relative pe-container pe-px-4 pe-mx-auto md:pe-pb-20 md:pe-mt-24 pe-bg-black-light lg:pe-bg-black"
    >
      <div class="lg:pe-flex pe-gap-12">
        <div class="lg:pe-w-[65%]">
          <PEImageStrapi
            v-if="hasStrapiContent"
            :image="calculatorContent.image"
            class="pe-hidden lg:block lg:flex lg:pe-flex-1 pe-h-full pe-w-full pe-mb-40px pe-box-border pe-rounded-[10px] pe-overflow-hidden"
            fit
          />
        </div>
        <div class="lg:!pe-w-[30%] pe-text-white">
          <div class="pe-rounded-[10px] pe-px-[30px] pe-py-[30px] lg:pe-bg-black-light">
            <h3
              v-if="hasStrapiContent"
              class="pe-text-[24px] lg:pe-text-[32px] pe-uppercase pe-text-white pe-font-serif pe-font-medium mb-8 lg:pe-text-blue-light"
            >
              {{ calculatorContent.title }}
            </h3>
            <div
              v-if="hasStrapiContent"
              v-html="calculatorContent.content"
            ></div>

            <PESelect
              v-model="selectedProperty"
              :items="properties"
              label="Resort"
              class="my-10"
              color="dark"
            />
            <PESelect
              v-model="selectedNights"
              :items="credits"
              :label="$t('selectNumberOfNightsLabel')"
              class="my-10"
            />
            <div class="pe-flex md:pe-justify-end">
              <PEButton
                outlined-secondary
                uppercase
                flat
                :class="'!pe-text-blue-light pe-w-full md:pe-w-auto !lg:pe-inline-block'"
                :disabled="!isAllowedToCalc"
                @click="calculateCredits"
              >
                {{ $t('buttonCalculateLabel') }}
              </PEButton>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      ref="activitiesSection"
      class="pe-relative pe-container pe-px-4 pe-mx-auto md:pe-pb-5 lg:pe-flex pe-gap-12 pe-mb-10 pe-mt-[120px] lg:pe-mt-[100px]"
    >
      <div
        class="lg:!pe-w-[65%]"
        :class="activitiesContainerClasses"
      >
        <section class="">
          <CommonSimpleCategory
            v-if="!isActivitiesEmpty"
            :categories="categoriesStrapi"
            class="pe-mb-5"
            @selectedCategory="handleCategory"
          />
          <PEImageStrapi
            v-if="hasStrapiContent"
            :image="imageActivities"
            class="pe-hidden lg:pe-block mb-5 pe-rounded-[10px] pe-h-[450px] pe-overflow-hidden"
            fit
          />
          <div
            v-if="isLoading"
            class="my-5 pe-flex pe-justify-center pe-items-center pe-text-white"
          >
            <PESpinner />
            <span>Loading content...</span>
          </div>
          <p
            v-if="isActivitiesEmpty"
            class="pe-text-white"
            >{{ $t('noSelectedActivitiesLabel') }}</p
          >
          <ul
            v-else
            class="lg:pe-grid lg:pe-grid-cols-2 pe-gap-5"
          >
            <li
              v-for="(item, index) in activitiesByPage"
              :key="index"
            >
              <ProgramsResortCreditServiceItem :service="item">
                <template #control="{minPax, maxPax, paxLabel}">
                  <PECounter
                    v-model="item.quantity"
                    :start="item.quantity"
                    :min="minPax"
                    :max="maxPax"
                    :step="1"
                    @increment="increase(item)"
                    @decrement="decrease(item)"
                  />
                  <span>{{ paxLabel }}</span>
                </template>
              </ProgramsResortCreditServiceItem>
            </li>
          </ul>
        </section>
        <div class="pe-flex pe-justify-center">
          <MembershipCommonPaginator
            v-if="!isActivitiesEmpty"
            v-bind="paginatorProps"
            :class="'my-10 !pe-inline-flex'"
            @changedPage="handlePages"
          />
        </div>
      </div>
      <div class="lg:!pe-w-[30%] pe-text-white pe-bg-black-light pe-rounded-[10px]">
        <div class="pe-rounded-t-[10px] pe-bg-black pe-bg-opacity-50 pe-px-[30px] pe-py-[30px]">
          <div
            class="pe-flex pe-flex-col md:pe-flex-row pe-gap-5 md:pe-items-center md:pe-justify-between"
          >
            <div class="grow-0 shrink-0 basis-auto">
              <p class="pe-text-[32px]"
                >{{ amount | currency_no_decimals }}
                <span class="uppercase pe-text-base">usd</span></p
              >
              <p>{{ $t('resortCreditAvailableLabel') }}</p>
            </div>
            <div>
              <PEButton
                block
                outlined-secondary
                flat
                uppercase
                class="!pe-px-4 !pe-w-full lg:pe-w-auto"
                @click="toggleChangeAmount"
                >{{ $t('buttonChangeAmountLabel') }}</PEButton
              >
            </div>
          </div>
          <PEInput
            v-if="useCustomAmount"
            v-model="customAmount"
            :label="$t('inputCustomAmountLabel')"
            class="pe-mt-5"
            input-max-lenght="5"
          />
        </div>
        <div class="pe-w-full pe-bg-black-light pe-px-[30px] pe-py-[30px]">
          <div>
            <p>{{ emptyServicesLabel }}</p>
          </div>
          <ul>
            <li
              v-for="(parent, index) in servicesByCategory"
              :key="index"
            >
              <p class="uppercase my-3 pe-font-semibold">
                {{ index }}
              </p>
              <div
                v-for="(item, indexChild) in parent"
                :key="indexChild"
                class="pe-flex pe-gap-1 pe-justify-between mb-5"
              >
                <div class="flex pe-gap-3">
                  <div
                    class="pe-cursor-pointer"
                    @click="removeService(item)"
                  >
                    <PEIcon
                      class="pe-text-blue-light"
                      fill="pe-fill-blue"
                      >close-circle-filled</PEIcon
                    >
                  </div>
                  <div>
                    {{ item.quantity }}
                  </div>
                  <div class="pe-max-w-[150px]">
                    {{ item.title }}
                  </div>
                </div>
                <div> {{ (item.price * item.quantity) | currency_no_decimals }} USD </div>
              </div>
            </li>
          </ul>
        </div>
        <div
          class="pe-w-full pe-bg-black-light pe-px-[30px] pe-py-[25px] pe-mt-[1px] pe-border-t-[1px] pe-border-black pe-rounded-b"
        >
          <div class="pe-flex pe-justify-between my-1">
            <p class="pe-text-[24px]">Total</p>
            <p class="pe-text-[24px]"
              >{{ totalOfServices | currency_no_decimals }} <span class="pe-text-base">USD</span></p
            >
          </div>
          <div class="pe-flex pe-justify-between mt-1">
            <p>{{ $t('resortCreditRemainingLabel') }}</p>
            <p :class="excededCreditsClasses"
              >{{ remainigCredits | currency_no_decimals }} <span>USD</span></p
            >
          </div>
          <div class="mb-10">
            <p
              v-if="excededCreditsLabel"
              :class="excededCreditsClasses"
              >{{ excededCreditsLabel }}</p
            >
          </div>
          <PEButton
            v-bind="actionButtonProps"
            :loading="isLoadingPdf"
            @click="setLoadingPdf(true)"
            >{{ $t('buttonDownloadActivitiesLabel') }}</PEButton
          >
          <PEButton
            v-bind="actionButtonProps"
            :loading="isSendingEmail"
            @click="sendActivitiesToMail"
            >{{ $t('buttonSentoToEmailLabel') }}</PEButton
          >
        </div>
      </div>
    </div>

    <div class="pe-relative pe-container pe-px-4 pe-mx-auto md:pe-pb-20 my-10">
      <p class="pe-text-white">{{ $t('simulationText') }}</p>
      <PEExpansionPanel
        justify-header-class="justify-start"
        use-full-activator
        icon-classes="pe-text-blue-light"
      >
        <template #headerText>
          <p class="pe-text-blue-light pe-underline cursor-pointer">{{
            resortCreditTerms.title
          }}</p>
        </template>
        <template #content>
          <div v-html="resortCreditTerms.content"></div>
        </template>
      </PEExpansionPanel>
      <div> </div>
    </div>
    <ProgramsResumePdfTemplate
      v-bind="pdfContent"
      @finished-pdf="setLoadingPdf"
    />
    <PEModal
      v-model="showEmailModal"
      class="pe-z-60"
    >
      <template #content>
        <p class="pe-text-white">{{ emailResponseLabel }}</p>
      </template>
      <template #buttons>
        <div class="pe-flex pe-flex-col pe-items-center lg:pe-flex-row pe-gap-12 pe-mt-6">
          <PEButton
            v-bind="bindButtonClose"
            @click.prevent="closeEmailModal"
          >
            {{ $t('close') }}
          </PEButton>
        </div>
      </template>
    </PEModal>
  </div>
</template>

<script lang="ts">
import {Component, Mixins, Ref, Watch} from 'vue-property-decorator'
// @ts-ignore
// import VueHtml2pdf from 'vue-html2pdf'
import {ContentStore} from '../../../store/contentStore'
import BookingWidgetMixin from '../../../mixins/Common/BookingWidgetMixin'
import {PropertiesStore} from '~/src/ui/store/propertiesStore'
import {ResortCreditPropertiesMapper} from '~/src/app/benefits/domain/mapper/resortCreditMapper'
import rcPropertieEntity from '~/src/app/benefits/domain/entities/rcPropertyEntity'
import CreditsEntity from '~/src/app/benefits/domain/entities/creditsEntity'
import ActivityEntity from '~/src/app/benefits/domain/entities/activityEntity'
import {ResortCreditStore} from '~/src/ui/store/benefits/resortCreditStore'
import {UseAuth} from '~/src/ui/store/auth'
import {Emailentity} from '~/src/app/email/domain/entities/emailEntity'
import {resortCreditTemplate} from '~/src/ui/emailTemplates/resort_credit_template'
import {TermsAndConditions} from '~/src/app/bookings/domain/dto/getTermsAndConditionsDto'
import {ResortCreditOptions} from '~/src/app/benefits/domain/enum/resortCreditOptions'
import i18n from '~/src/ui/i18n/programs/resortCredit.lang'
import BasePageStrapiMixin from '~/src/ui/mixins/BasePageStrapiMixin'
import { BasePageSlugs } from '~/src/app/Strapi/StrapiConfiguration'

@Component({
  i18n,
  name: 'ResortCreditPage',
  meta: {
    auth: true
  }
})
export default class ResortCreditPage extends Mixins(BookingWidgetMixin, BasePageStrapiMixin) {
  
  @Ref('html2pdf') pdfResume!: any

  @Ref('activitiesSection') activitiesSection!: InstanceType<typeof HTMLDivElement>

  contentStore = new ContentStore()

  resortCreditStore = new ResortCreditStore()

  propertiesStore = new PropertiesStore()

  authStore = new UseAuth()

  selectedProperty: rcPropertieEntity | null = null

  selectedNights: CreditsEntity | null = null

  selectedCategory: string | null = null

  customAmount: string = ''

  useCustomAmount: boolean = false

  itemsPerPage: number = 6

  currentPage: number = 1

  isGeneratingfPdf = false

  showEmailModal = false

  amountPerNights = 0

  get paginatorProps() {
    return {
      length: this.pages,
      totalVisible: 4
    }
  }

  get hasSelectedActivities(): boolean {
    return this.activitiesResume.length > 0
  }

  get isActionButtonsDisabled(): boolean {
    return (
      this.isAmountCreditsExceded === true ||
      this.hasSelectedActivities === false ||
      this.totalOfServices === 0
    )
  }

  // TO-DO - Move credits to an architecture use case

  credits = [
    {text: '3', value: ResortCreditOptions.CREDITS_3_NIGHTS},
    {text: '4', value: ResortCreditOptions.CREDITS_4_NIGHTS},
    {text: '5 - 8', value: ResortCreditOptions.CREDITS_5_8_NIGHTS},
    {text: '9 - 11', value: ResortCreditOptions.CREDITS_9_11_NIGHTS},
    {text: '12 +', value: ResortCreditOptions.CREDITS_12_NIGHTS}
  ]

  activitiesResume: ActivityEntity[] | [] = []

  get filteredActivities(): ActivityEntity[] {
    if (!this.selectedCategory || this.selectedCategory === 'All') return this.activitiesStrapi
    return this.activitiesStrapi.filter(service => {
      return service.category === this.selectedCategory
    })
  }

  get activitiesByPage() {
    return this.filteredActivities.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      this.itemsPerPage * this.currentPage
    )
  }

  get pages(): number {
    return Math.ceil(this.filteredActivities.length / this.itemsPerPage)
  }

  get properties(): any {
    if (this.propertiesStore.properties) {
      return ResortCreditPropertiesMapper.transform(this.propertiesStore.properties)
    } else {
      return []
    }
  }

  get amount(): number {
    return this.useCustomAmount ? this.stringToNumber(this.customAmount) : this.amountPerNights
  }

  get servicesByCategory(): any {
    // @ts-ignore
    return this.activitiesResume.reduce((acc: any, current: ActivityEntity) => {
      acc[current.category] = acc[current.category] || []
      acc[current.category].push(current)
      return acc
    }, {})
  }

  get isAllowedToCalc(): boolean {
    return !!this.selectedProperty && !!this.selectedNights
  }

  get emptyServicesLabel(): string {
    return this.activitiesResume.length === 0
      ? (this.$t('noSelectedActivitiesLabel') as string)
      : ''
  }

  get totalOfServices(): number {
    if (this.activitiesResume.length === 0) return 0
    // @ts-ignore
    return this.activitiesResume.reduce(
      (prev: number, current: ActivityEntity): number =>
        (prev = prev + current.quantity * current.price),
      0
    )
  }

  get remainigCredits(): number {
    return this.amount - this.totalOfServices
  }

  get isAmountCreditsExceded(): boolean {
    return this.totalOfServices > this.amount
  }

  get excededCreditsLabel() {
    return this.totalOfServices > this.amount ? this.$t('excededAmountLabel') : ''
  }

  get excededCreditsClasses() {
    return this.totalOfServices > this.amount ? ['pe-text-red-700'] : []
  }

  get isLoading(): boolean {
    return this.resortCreditStore.isLoading
  }

  get activitiesStrapi(): ActivityEntity[] {
    return this.resortCreditStore.activities || []
  }

  get categoriesStrapi(): string[] {
    return this.resortCreditStore.categories || []
  }

  get isActivitiesEmpty(): boolean {
    return this.activitiesStrapi.length === 0
  }

  get calculatorContent() {
    return this.resortCreditStore.pageContent?.calculatorContent
  }

  get imageActivities() {
    return this.resortCreditStore.pageContent?.activitiesImage
  }

  get hasStrapiContent(): boolean {
    return this.resortCreditStore.pageContent !== null
  }

  get pdfContent() {
    return {
      name: this.authStore.userFullname,
      affiliation: this.authStore.userAffiliationId,
      servicesByCategory: this.servicesByCategory,
      total: this.totalOfServices,
      remainCredits: this.remainigCredits,
      download: this.isGeneratingfPdf
    }
  }

  get isLoadingPdf(): boolean {
    return this.isGeneratingfPdf
  }

  get isSendingEmail(): boolean {
    return this.resortCreditStore.isSendingEmail
  }

  get isSuccessfullEmail(): boolean {
    return this.resortCreditStore.isSuccessfullEmail
  }

  get emailResponseLabel() {
    return this.isSuccessfullEmail ? this.$t('successEmailLabel') : this.$t('errorLabel')
  }

  get actionButtonProps(): any {
    return {
      block: true,
      uppercase: true,
      outlinedSecondary: true,
      flat: true,
      class: 'my-2',
      disabled: this.isActionButtonsDisabled
    }
  }

  get emailMessage() {
    return {
      name: this.authStore.userFullname,
      affiliationId: this.authStore.userAffiliationId,
      activitiesByCategory: this.servicesByCategory,
      total: this.totalOfServices
    }
  }

  get bindButtonClose() {
    return {
      flat: true,
      outlinedSecondary: true
    }
  }

  get activitiesContainerClasses() {
    return this.isActivitiesEmpty ? '' : 'pe-min-h-[1180px] pe-flex pe-flex-col pe-justify-between'
  }

  get resortCreditTerms(): TermsAndConditions {
    return this.resortCreditStore.resortCreditTerms
  }

  closeEmailModal() {
    this.showEmailModal = false
  }

  handlePages(value: number): void {
    this.currentPage = value
  }

  handleCategory(value: string) {
    this.selectedCategory = value
    this.currentPage = 1
  }

  calculateCredits() {
    this.amountPerNights = this.selectedNights !== null ? this.selectedNights?.value : 0
    this.activitiesSection.scrollIntoView({behavior: 'smooth'})
    if (this.selectedProperty?.value) {
      this.getActivities(this.selectedProperty?.value)
    }
  }

  toggleChangeAmount() {
    this.useCustomAmount = !this.useCustomAmount
  }

  stringToNumber(str: string): number {
    if (!str) return 0
    return parseInt(str)
  }

  addService(payload: ActivityEntity): void {
    // @ts-ignore
    this.activitiesResume.push({
      ...payload,
      quantity: 1
    })
  }

  removeService(payload: ActivityEntity) {
    this.activitiesResume = [...this.activitiesResume.filter(item => item.id !== payload.id)]
    this.resetServiceqQuantity(payload)
  }

  increase(payload: ActivityEntity) {
    const index = this.activitiesResume.findIndex(item => item.id === payload.id)
    if (index !== -1) {
      this.activitiesResume[index].quantity++
    } else {
      this.addService(payload)
    }
  }

  decrease(payload: ActivityEntity) {
    const index = this.activitiesResume.findIndex(item => item.id === payload.id)
    this.activitiesResume[this.activitiesResume.findIndex(item => item.id === payload.id)]
      .quantity--

    if (this.activitiesResume[index].quantity === 0) {
      this.removeService(payload)
    }
  }

  resetServiceqQuantity(payload: ActivityEntity): void {
    this.resortCreditStore.resetActivitieItem(payload)
  }

  setLoadingPdf(val: boolean) {
    this.isGeneratingfPdf = val
  }

  async getActivities(resort: string) {
    await this.resortCreditStore.getActivities(resort)
  }

  async getPageContent() {
    await this.resortCreditStore.getPageContent()
  }

  async sendActivitiesToMail() {
    await this.resortCreditStore.sendActivitiesEmail({
      recipientsMail: this.authStore.currentUser?._UserMember._email,
      subject: 'Your Resort Credit resume is here.',
      // @ts-ignore
      message: resortCreditTemplate(this.emailMessage)
    } as Emailentity)

    this.showEmailModal = true
  }

  async getResortCreditTerms() {
    await this.resortCreditStore.getResortCreditTerms()
  }

  @Watch('selectedProperty')
  handleSelectedProperty() {
    this.selectedCategory = null
    this.currentPage = 1
    this.activitiesResume = []
    // this.getActivities(newVal.value)
  }

  @Watch('selectedNights')
  handleCustomAmount() {
    this.useCustomAmount = false
    this.customAmount = ''
  }

  @Watch('customAmount')
  validateCustomAmount(newVal: string) {
    if (+newVal > ResortCreditOptions.MAX_CREDITS)
      this.customAmount = ResortCreditOptions.MAX_CREDITS.toString()
  }

  beforeMount() {
    this.$nuxt.setLayout('auth')
  }

  async init() {
    await this.loadStrapiPageData(BasePageSlugs.ResortCredit);

    const index = this.properties.findIndex((item: rcPropertieEntity) => item.value === 'MPG')
    this.selectedProperty = this.properties[index]
    this.getActivities('MPG')
    this.getPageContent()
    this.getResortCreditTerms()
  }

  mounted() {
    this.init()
  }
}
</script>
<style>
html {
  scroll-behavior: smooth;
}
</style>
