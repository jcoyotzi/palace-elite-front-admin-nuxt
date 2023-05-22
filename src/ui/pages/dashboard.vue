<template>
  <div class="pe-bg-black">
    <div v-if="strapiObject">
      <CommonHeroWidget
        :booking-attrs="bookingAttrs"
        :calendar-data="calendarData"
        :hero-attrs="strapiObject.hero"
      />
      <div class="xl:pe-container">
        <div class="container-paddings"> 
          <DashboardOffer
            v-if="showOffer && strapiObject.offer"
            v-bind="strapiObject.offer"
            class="pe-pt-16 xl:pe-pt-28"
            @on-close="closeOffer"
          />
        </div>
        <div class="xl:pe-grid xl:pe-grid-cols-3 container-paddings">
          <div class="pe-py-16 xl:pe-py-28 xl:pe-col-span-2 xl:pe-pr-10">
            <h2
              class="pe-text-white pe-font-serif pe-uppercase pe-text-2xl pe-text-center xl:pe-text-left pe-text-[32px] pe-mb-10"
            >
              {{ $t('myRecentBookings') }}
            </h2>
            <div v-if="bookings.length > 0">
              <div
                v-for="(reservation, index) in bookings"
                :key="index"
              >
                <BookingsCommonTableItems
                  class="pe-mb-[40px] md:pe-mb-[30px]"
                  :reservation="reservation"
                >
                  <div class="pe-w-full pe-grid pe-place-items-center pe-mt-[10px]">
                    <BookingsCommonTableExpansionHeader
                      :index="index"
                      :reservation="reservation"
                      class="cursor-pointer"
                      :text="$t('sendPaymentLink')"
                    />
                  </div>
                </BookingsCommonTableItems>
              </div>
            </div>
            <div
              v-if="showNoRecentBookingsText"
              class="pe-my-5"
            >
              <p class="pe-text-white">{{ $t('noRecentBookings') }}</p>
            </div>
            <div v-if="isLoadingRecentBookings">
              <PELoadingData />
            </div>

            <div class="pe-text-center md:pe-text-left">
              <PEButton
                :label="bookings.length > 0 ? 'View More Bookings' : 'View my Bookings'"
                :to="localePath('/bookings')"
                tag="NuxtLink"
                class="!pe-text-blue-light"
                flat
                uppercase
                outlined-secondary
              />
            </div>
          </div>
          <aside class="pe-flex pe-flex-col pe-pb-16 xl:pe-pb-0 xl:pe-pt-[182px] aside-top">
            <h2
              class="pe-text-white xl:pe-hidden pe-font-serif pe-uppercase pe-text-2xl pe-text-center xl:pe-text-left pe-text-[32px] pe-mb-10"
            >
              {{ $t('informationOverview') }}
            </h2>
            <PECardResume
              v-for="(card, index) in topCards"
              :key="index"
              v-bind="card"
              :variant-details="true"
              class="pe-mb-10"
              @click-button="topCardClick"
            />
          </aside>
        </div>
        <div class="xl:pe-grid xl:pe-grid-cols-3 container-paddings">
          <div class="pe-pb-16 xl:pe-pb-28 xl:pe-col-span-2 xl:pe-pr-10">
            <h2
              class="pe-text-white pe-font-serif pe-uppercase pe-text-2xl pe-text-center xl:pe-text-left pe-text-[32px] pe-mb-10"
            >
              {{ $t('myRecentlyEarnedBenefits') }}
            </h2>
            <WeeksCommonPagination
              :use-pagination="false"
              :only-availables="true"
              class="pe-mb-[40px] md:pe-mb-[30px]"
            />
            <div class="pe-text-center md:pe-text-left">
              <PEButton
                :label="benefits.length > 0 ? $t('viewMoreBenefits') : $t('viewMyBenefits')"
                :to="localePath('/weeks/all')"
                tag="NuxtLink"
                flat
                uppercase
                outlined-secondary
                class="!pe-text-blue-light"
              />
            </div>
          </div>

          <aside class="pe-pb-32">
            <DashboardPreferentialWeeks
              v-if="preferentialsCard"
              class="pe-mb-10 xl:pe-pt-[72px]"
              v-bind="preferentialsCard"
            />
            <PECardResume
              v-for="(card, index) in bottomCards"
              :key="index"
              :variant-details="true"
              v-bind="card"
              @click-button="bottomCardClick"
            />
          </aside>
        </div>
      </div>
      <PEModal
        :value="showModal"
        class="pe-z-[100] pe-text-white"
        @input="closeModal"
      >
        <template #content>
          <div class="pe-flex pe-flex-col pe-gap-8 w-full pe-items-center">
            <h2 class="pe-text-2xl pe-uppercase pe-font-medium">{{
              strapiPrivacyNoticies?.attributes.title
            }}</h2>
            <div
              class="pe-px-1 xl:pe-px-10 w-full pe-overflow-y-scroll pe-max-h-40 md:pe-max-h-full custom-scroll"
              v-html="strapiPrivacyNoticies?.attributes.content"
            />
            <PEButton
              flat
              outlined-secondary
              uppercase
              class="!pe-text-blue-light pe-font-medium"
              tag="a"
              :href="localePath('/full-privacy-notice-members')"
              >{{ $t('readPrivactNotice') }}
            </PEButton>
          </div>
        </template>
      </PEModal>
      <BookingsCommonDrawer
        v-if="showDrawer"
        @reloadTable="onReloadTable"
      />
    </div>
    <div
      v-else
      class="pe-flex pe-flex-col pe-justify-center pe-items-center pe-bottom-0 pe-right-0 pe-w-full pe-h-[100vh] z-[100] pe-bg-black"
    >
      <PELoadingData />
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Mixins, Watch} from 'vue-property-decorator'

// Classes
import {ToastAction, ToastOptions} from 'vue-toasted/types/index'
import BookingWidgetMixin from '../mixins/Common/BookingWidgetMixin'
import {UseAuth} from '../store/auth'
import {WeekStore} from '../store/benefits/weekStore'
import {WalletStore} from '../store/benefits/walletStore'
import {BookingsStore} from '../store/bookingsStore'
import {BalanceStore} from '../store/balanceStore'
import {DashboardStore} from '../store/dashboardStore'
import {BenefitStore} from '../store/benefits/benefitStore'
import {OwnersStore} from '../store/ownersStore'
import OnCurrentLocaleChanged from '../mixins/OnCurrentLocaleChanged'
import {PreferentialWeeksAndNightsAssets} from '~/src/app/benefits/domain/dto/preferentialWeeksAndNightsDto'
import {CardResume} from '~/src/app/benefits/domain/entities/cardResume'
import {GetOwnersAdapter} from '~/src/app/owners/domain/adapters/getOwnersAdapter'
import {NotificationEntity} from '~/src/app/notifications/domain/entities/notificationEntity'
import {Owner} from '~/src/app/owners/domain/dto/getOwnersResponseDto'
import {showToast, ToastDuration} from '~/src/ui/utils/toastHelpers'
import langDashboard from '~/src/ui/i18n/dashboard/dashboard.lang'
import langNotifications from '~/src/ui/i18n/notifications/notifications.lang'
import { BasePageSlugs } from '~/src/app/Strapi/StrapiConfiguration'

const i18n = {
  messages: {
    es: {...langDashboard.messages.es, ...langNotifications.messages.es},
    en: {...langDashboard.messages.en, ...langNotifications.messages.en}
  }
}

@Component({
  i18n,
  layout: 'default',
  meta: {
    auth: true
  }
})
class Dashboard extends Mixins(BookingWidgetMixin, OnCurrentLocaleChanged) {
  // Data
  public authStore = new UseAuth()
  public bookingsStore = new BookingsStore()
  public weeksStore = new WeekStore()
  public walletStore = new WalletStore()
  public balanceStore = new BalanceStore()
  public benefitStore = new BenefitStore()
  public ownersStore = new OwnersStore()
  public getOwnersAdapter = new GetOwnersAdapter()
  public store = new DashboardStore()
  public showOffer: boolean = true
  public showModal: boolean = false

  public get topCards() {
    const items = []
    if (this.pendingBookingsCard) items.push(this.pendingBookingsCard)
    if (this.universalCreditCard) items.push(this.universalCreditCard)
    if (this.balanceCard) items.push(this.balanceCard)
    return items
  }

  public get strapiPrivacyNoticies() {
    //@ts-ignore
    return this.store.strapiPrivacyNoticies.data
  }

  public get bottomCards() {
    return [
      {
        itemId: 1,
        title: this.$t('resortCreditTitle'),
        subtitle: this.$t('resortCreditDescription'),
        secondary: false,
        secondaryOutlined: true,
        textButton: this.$t('calculateLabel')
      }
    ]
  }

  public get preferentialsCard() {
    if (this.weeksStore.weeksAndNightsPreferentials.assets.length < 1) return null
    return {
      title: this.$t(this.weeksStore.weeksAndNightsPreferentials.title),
      subtitle: this.$t('preferentialCardSubtitle'),
      assets: this.weeksStore.weeksAndNightsPreferentials.assets.map(
        (asset: PreferentialWeeksAndNightsAssets) => ({
          ...asset,
          labelStart: this.$t(asset.labelStart),
          labelEnd: this.$t(asset.labelEnd)
        })
      )
    }
  }

  public get universalCreditCard(): CardResume | null {
    if (!this.walletStore.summarysCards?.account) return null

    const amount = this.walletStore.summarysCards.amountAvailable

    return {
      itemId: 2,
      amount: `${amount} USD`,
      title: this.$t('universalCredit') as string,
      subtitle: this.$t('amountAvailable') as string,
      textButton: this.$t('useNow') as string
    }
  }

  get userIsAuthenticated() {
    return this.authStore.isAuthenticated
  }

  mounted() {
    if (this.userIsAuthenticated) this.$nuxt.setLayout('default')
    else this.$nuxt.setLayout('auth')
  }

  public get userInfo() {
    return {
      application: this.authStore.applicationUserMember || '',
      company: this.authStore.userCompany || 0,
      isNational: this.authStore.isNational || false
    }
  }

  public get benefits() {
    return this.weeksStore.readAvailableProvitions
  }

  public get strapiObject() {
    return this.store.readStrapiDashboard
  }

  public get bookings() {
    return this.bookingsStore.paginationReservations.items.slice(0, 3) || []
  }

  public get showDrawer() {
    return this.bookingsStore.showDrawerDetails
  }

  public get balanceCard() {
    if (!this.store.readMembershipPayments) return null
    const {subtitle, amount} = this.store.readMembershipPayments
    return {
      itemId: 3,
      title: this.$t('membershipPaymentTitle'),
      subtitle,
      amount,
      secondary: false,
      secondaryOutlined: true,
      textButton: this.$t('viewDetailsLabel')
    }
  }

  public get totalBookings() {
    return this.bookingsStore.totalReservations
  }

  public get pendingBookings() {
    return this.bookingsStore.pendingReservations
  }

  public get pendingBookingsCard() {
    if (this.pendingBookings === null) return null
    return {
      itemId: 1,
      title: this.$t('myPendingBookingsTitle'),
      subtitle: this.$t('pendingBookingsDescription'),
      amount: `${this.pendingBookings} Bookings`,
      secondary: false,
      secondaryOutlined: true,
      textButton: this.$t('viewDetailsLabel')
    }
  }

  public get totalBenefits() {
    return this.bookingsStore.paginationReservations.items.length || 0
  }

  public get owners(): Owner[] {
    return this.ownersStore.readOwners
  }

  public get loggedUser() {
    return this.authStore.getLoggedUser
  }

  public get currentOwner(): Owner | null {
    // @ts-ignore
    if (this.owners.length === 0) return null

    const filtered = this.owners.filter(owner => {
      return this.loggedUser?.MemberProfilesEmail[0]?.Email === owner?.MemberProfilesEmail[0]?.Email
    })

    return filtered[0] || null
  }

  public get notifications() {
    return this.store.notifications
  }

  public get toastOptions(): ToastOptions {
    return {
      theme: 'pe_toast',
      duration: ToastDuration.FIVE_SECONDS,
      // @ts-ignore
      keepOnHover: true,
      type: 'error'
    }
  }

  public get toastCloseOption(): ToastAction {
    return {
      icon: 'close',
      text: '',
      onClick: (_e, toastObject) => {
        toastObject.goAway(0)
      }
    }
  }

  public get notificationActions() {
    return {
      isSocioMoroso: [
        {
          text: this.$t('payLabel'),
          onClick: (_e, toastObject) => {
            toastObject.goAway(0)
            this.$nuxt.$router.push(this.localePath('/membership/SummaryAndPayments'))
          }
        },
        this.toastCloseOption
      ] as ToastAction[],
      isValidSSN: [
        {
          text: this.$t('updateLabel'),
          onClick: (_e, toastObject) => {
            toastObject.goAway(0)
            this.$nuxt.$router.push(this.localePath('/membership/Owners'))
          }
        },
        this.toastCloseOption
      ] as ToastAction[]
    }
  }

  public get isLoadingRecentBookings(): boolean {
    return this.bookingsStore.loadingTable
  }

  public get showNoRecentBookingsText(): boolean {
    return !this.isLoadingRecentBookings && this.bookings.length <= 0
  }

  async getReservations() {
    const {application, isNational, company} = this.userInfo

    await this.bookingsStore.getReservations({
      pageNumber: 1,
      size: 3,
      application,
      company,
      isNational,
      sort: 'desc'
    })
  }

  async onReloadTable() {
    this.bookingsStore.showDrawerDetails = false
    await this.getReservations()
  }

  // Hooks
  async beforeMount() {
    this.$nuxt.setLayout('default')
    this.showModal = !localStorage.getItem('DASHBOARD_CHECK')

    if (this.showModal) await this.store.getPrivacyNoticie()

    const {application, isNational, company} = this.userInfo

    this.fetchStrapiPageFixed(this.store.fetchStrapiDashboard, BasePageSlugs.Dashboard, this.currentLocale);

    this.getReservations()
    this.bookingsStore.getPendingReservations({
      pageNumber: 1,
      size: 1,
      application,
      company,
      isNational,
      sort: 'desc'
    })
    this.walletStore.getSummarys(application)
    this.weeksStore.fetchWeeksAndNightsPreferentials({
      application,
      company
    })
    this.weeksStore.fetchWeeksProvitions({
      application,
      company,
      isNational
    })
    this.store.fetchMembershipPayments({
      application,
      isNational,
      company
    })

    if (this.currentOwner === null) await this.getOwnersAdapter.getOwners()
    this.layoutStore.showModalPleca = false
  }

  // Methods
  public closeOffer() {
    this.showOffer = false
  }

  public closeModal() {
    localStorage.setItem('DASHBOARD_CHECK', 'true')
    this.showModal = false
  }

  public topCardClick(id: number): void {
    switch (id) {
      case 1:
        this.goToPendingBookings()
        break

      case 2:
        this.goWallet()
        break

      case 3:
        this.goMembership()
        break

      default:
        break
    }
  }

  public bottomCardClick(id: number): void {
    switch (id) {
      case 1:
        this.goResortCredit()
        break

      default:
        break
    }
  }

  public goResortCredit(): void {
    this.$nuxt.$router.push(this.localePath('/benefits/programs/resort-credit'))
  }

  public goToPendingBookings(): void {
    this.$nuxt.$router.push({path: this.localePath('/bookings'), query: {showPendingBookings: 'true'}})
  }

  public goMembership(): void {
    this.$nuxt.$router.push(this.localePath('/membership'))
  }

  public goWallet() {
    this.$nuxt.$router.push(this.localePath('/wallet'))
  }

  @Watch('currentOwner')
  handleCurrentOwnerActions(currentOwner: any) {
    if (this.currentOwner !== null && this.isValidSSN) {
      this.store.setCurrentOwner(currentOwner)
      this.store.setNotificatiosnPayload({
        ssn: this.currentOwner?.MemberProfilesRelateds.SocialSecurityNumber || '',
        affiliationId: this.authStore.userAffiliationId || '',
        idPerfilClub: this.currentOwner?.MemberProfilesRelateds.idrelacionclub || 0,
        relationship: this.currentOwner?.MemberProfilesRelateds.relationship || 0,
        desencriptar: !this.regexSSN.test(
          this.currentOwner?.MemberProfilesRelateds.SocialSecurityNumber
        ),
        company: this.authStore.userCompany || 0,
        isNational: this.authStore.isNational
      })
      this.store.getNotifications()
    }
  }

  get isValidSSN(): boolean {
    return this.currentOwner?.MemberProfilesRelateds.SocialSecurityNumber !== ''
  }

  get regexSSN(): RegExp {
    return this.ownersStore.regexSSN
  }

  @Watch('notifications')
  handleNotifications(notifications: NotificationEntity): void {
    if (notifications.isSocioMoroso === true) {
      showToast({message: this.$t('isSocioMoroso') as string, context: this})
    }
    if (notifications.isValidSSN === false) {
      showToast({message: this.$t('isValidSSN') as string, context: this})
    }
  }
}

export default Dashboard
</script>
<style lang="scss" scoped>
.container-paddings {
  padding: 0 20px;

  @media (min-width: 1024px) {
    padding: 0 16px;
  }
}

.aside-top {
  > div {
    &:nth-child(2) {
      order: 1;
      @media (min-width: 1024px) {
        order: 0;
      }
    }
  }
}
</style>
