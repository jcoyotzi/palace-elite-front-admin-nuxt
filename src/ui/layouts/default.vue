<template>
  <div class="bg-black">
    <client-only>
      <PETopAlertBanner />
      <PENavbarStrapi />
    </client-only>
    <main>
      <PESnackbar />
      <client-only>
        <Nuxt />
      </client-only>
    </main>
    <client-only>
      <PEFooterStrapi />
    </client-only>
    <Modal />
    <CustomizableModal
      v-bind="customModalProps"
      @close-modal="setcustomModal"
    />
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import {UseAuth} from '../store/auth'
import {PropertiesStore} from '../store/propertiesStore'
import {CalendarStore} from '../store/calendarStore'
import PEFooterStrapi from '../components/Layout/PEFooterStrapi.vue'
import Modal from '../components/Layout/Modal.vue'
import PENavbarStrapi from '../components/Layout/PENavbarStrapi.vue'
import {BookingStore} from '~/src/ui/store/bookingStore'
import {OwnersStore} from '../store/ownersStore'
import {PropertyEntity} from '~/src/app/property/domain/entities/propertyEntity'
import {BookingEntity} from '~/src/app/booking/domain/entities/bookingEntity'
import CustomizableModal from '../components/Layout/CustomizableModal.vue'
import i18n from '~/src/ui/i18n/layout/default.lang'
import {delayUtil} from '~/src/ui/utils/delay'
import PETopAlertBanner from '../components/PETopAlertBanner.vue'
import dayjs from 'dayjs'

@Component({
  components: {PEFooterStrapi, Modal, PENavbarStrapi, PETopAlertBanner, CustomizableModal},
  i18n
})
export default class Default extends Vue {
  propertiesStore = new PropertiesStore()

  calendarStore = new CalendarStore()

  bookingStore = new BookingStore()

  ownersStore = new OwnersStore()

  showModal = true

  propertyCode = ''

  customModalProps: {
    title: string
    message: string
    show: boolean
  } | null = null

  async beforeMount() {
    await this.propertiesStore.initStore()
  }

  async mounted() {

    this.$nextTick(() => {
      this.openPreLoginModal()
    })

    await this.fetchProperties()

    let path = this.$route.path

    let position = path.search('/paylink')

    if (position < 0) {
      if (!this.auth.isAuthenticated) return
      await this.getLoggedOwner()
      this.bookingStore.initStore()
      this.bookingStore.getMinStay(this.auth.userAffiliationId ?? '')
      // this.bookingStore.getReferralProgram()
      this.bookingStore.fetchInfoRmAccessByCompanyApplication()

      this.bookingStore.$subscribe((mutations: any, state: any) => {
        const bookingProperty = state.booking.propertyCode || ''
        const memberDefaultAccess = this.propertiesStore.propertiesFilteredByMembership
          ? this.propertiesStore.propertiesFilteredByMembership[0].externalId
          : null

        const propertyCode =
          bookingProperty || memberDefaultAccess

        if (propertyCode !== this.propertyCode) {
          this.fetchCalendarData(propertyCode)
          this.propertyCode = propertyCode
        }
      })
      return
    }

    path = unescape(path)

    let construct = path.split('token')
    let token = ''
    let version = ''
    // console.log({construct})
    if (construct.length === 1) return

    token = construct[1]
    construct = token.split('version')

    if (construct.length === 1) return

    token = construct[0].slice(1, -1)
    version = construct[1].slice(1)

    const route = `/paylink?token=${token}&version=${version}`

    this.$router.push({path: route})
  }

  async openPreLoginModal() {
    if (this.auth.isAuthenticated) return
    await delayUtil(2000)
    this.setcustomModal(true)
  }

  setcustomModal(customModalState: boolean) {
    this.customModalProps = {
      show: customModalState,
      ...this.customModalCaptions
    }
  }

  get customModalCaptions(): {title: string; message: string; cta: string} {
    return {
      title: this.$i18n.t('preLoginModal.title') as string,
      message: this.$i18n.t('preLoginModal.message') as string,
      cta: this.$i18n.t('preLoginModal.cta') as string
    }
  }

  async fetchCalendarData(resort: string) {
    await this.calendarStore.getRatesLegacyApi(resort)
  }

  async fetchProperties() {
    try {
      await this.propertiesStore.fetchPropertiesStrapi()

      if (this.auth.isAuthenticated) {
        const fetchPropertiesAccessPayload = {
          affiliationId: this.auth.userAffiliationId!,
          isNational: this.auth.isNational!,
          company: this.auth.userCompany!,
          arvDate: dayjs().format('YYYY-MM-DD')
        }

        await this.propertiesStore.fetchPropertiesAccess(fetchPropertiesAccessPayload)
      }
    } catch (error) {
      console.error(error)
    }
  }

  get auth() {
    return new UseAuth()
  }

  get userFullname() {
    return {name: this.auth.userFullname}
  }

  async getLoggedOwner() {
    if (!this.auth.isAuthenticated) return

    const loggedUser = this.auth.getLoggedUser

    if (!loggedUser) {
      await this.ownersStore.getOwners({
        params: {
          application: this.auth.userAffiliationId,
          company: this.auth.userCompany,
          isNational: this.auth.isNational
        }
      })

      const idToken = JSON.parse(localStorage.getItem('ID_TOKEN') ?? '')

      const memberPropertyAccess = JSON.parse(localStorage.getItem('MemberPropertyAccess') ?? '')

      const loggedUser = this.ownersStore.readOwners.filter(owner => {
        return owner.MemberProfilesRelateds.email === idToken.email
      })

      // @ts-ignore
      loggedUser[0].MemberExtension = memberPropertyAccess.memberExtension

      this.auth.setLoggedUser(loggedUser[0])
    }
  }

  getBookingStorage(): null | BookingEntity {
    const store = JSON.parse(localStorage.getItem('bookingStore')!)

    if (store === null) {
      return null
    }

    return JSON.parse(store.booking)
  }

}
</script>
