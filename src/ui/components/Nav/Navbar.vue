<!-- eslint-disable prettier/prettier -->
<template>
  <div>
    <transition
      enter-class="!pe-opacity-0"
      leave-to-class="!pe-opacity-0"
      leave-active-class="pe-transition-opacity duration-200 z-20"
      enter-active-class="pe-transition-opacity duration-200 z-20"
    >
      <PEOverlay
        z-index="20"
        :value="isOverlayActive"
      />
    </transition>
    <div
      v-click-outside="clickOutsideConfig"
      class="pe-absolute !pe-z-[30] w-full border-b-0 border-white/10 xl:border-b-2"
      :class="navbarClasses"
    >
      <nav
        class="pe-container pe-mx-auto pe-grid pe-grid-cols-12 pe-place-items-stretch pe-gap-x-1 pe-gap-y-4 pe-bg-transparent pe-py-[20px] pe-font-light pe-text-white"
      >
        <!-- Logo -->
        <PEButton
          v-bind="home.link"
          :label="''"
          without-border
          class="col-start-1 col-end-3 place-self-center xl:col-span-2 !pe-p-0 w-full pe-cursor-pointer"
          @click="toogleSubMenu('')"
        >
          <PE-Image-Strapi
            v-if="logoImg"
            :image="logoImg"
            class="hidden xl:inline-block pe-w-full !pe-p-0 w-full"
          />
          <PE-Image-Strapi
            v-if="logoIcon"
            :image="logoIcon"
            :class="'xl:hidden !pe-w-[40px]'"
          />
        </PEButton>
        <ul
          class="col-start-3 col-end-13 flex place-items-center items-center justify-end xl:col-start-4 xl:col-end-13"
        >
          <!-- ContactUs -->
          <li
            class="hidden xl:inline-block"
            @click="toogleSubMenu('')"
          >
            <PEButton
              v-if="contactUs"
              v-bind="contactUs.link"
              :class="actionClasses"
              without-border
            >
            </PEButton>
          </li>
          <!-- Locale select -->
          <li class="hidden xl:inline-block">
            <PEMenu
              v-model="showLocale"
              :close-on-content-click="true"
              :fit="false"
              offset-y
              class="hidden place-self-end font-sans xl:col-start-11 xl:col-end-12 xl:row-start-2 xl:row-end-3 xl:inline-block"
              content-class="z-30"
              placement="bottom"
              @close="$emit('hide-locale')"
              @input="showLocale = $event"
              @open="$emit('show-locale')"
            >
              <template #activator="{on}">
                <PEButton
                  type="button"
                  class="border-transparent py-1 px-2"
                  v-on="on"
                >
                  <div class="flex items-center py-2 pr-5">
                    <PEIcon class="stroke-white">chevron-down</PEIcon>
                    <span class="uppercase pl-2 font-sans"> {{ $i18n.locale }} </span>
                  </div>
                </PEButton>
              </template>
              <div>
                <div
                  class="rounded-md bg-transparent border border-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                  tabindex="-1"
                >
                  <LangSwitcher
                    link-class="block px-4 py-2 text-sm uppercase"
                  />
                </div>
              </div>
            </PEMenu>
          </li>
          <!-- Phone number -->
          <li
            v-if="phone"
            class="hidden xl:inline-block"
          >
            <a
              :href="`tel:${phone.phoneNumber}`"
              :class="actionClasses"
            >
              <PEIcon class="mr-3 stroke-white">phone</PEIcon>
              {{ phone.phoneNumber | VMask('#-###-###-####') }}
            </a>
          </li>
          <!-- Notifications -->
          <!--
          <li v-if="isAuthenticated">
            <a
              href="#"
              :class="actionClasses"
            >
              <PE-Badge :content="99">
                <PEIcon class="stroke-white">bullhorne</PEIcon>
              </PE-Badge>
            </a>
          </li>-->
          <!-- Cart -->
          <!--
          <li v-if="isAuthenticated">
            <a
              href="#"
              :class="actionClasses"
            >
              <PE-Badge :content="1">
                <PEIcon class="stroke-white">cart</PEIcon>
              </PE-Badge>
            </a>
          </li> -->
          <!-- Informarion -->
          <!--
          <li v-if="isAuthenticated">
            <a
              href="#"
              :class="actionClasses"
            >
              <PEIcon class="stroke-white">information</PEIcon>
            </a>
          </li>
          -->
          <!-- Login  -->
          <li v-if="!isAuthenticated">
            <PEDialog
              v-if="!desktop"
              v-model="showLogin"
              @show="$emit('show-login')"
              @hide="$emit('hide-login')"
              @input="showLogin = $event"
            >
              <template #activator="{on}">
                <PE-Button
                  :class="{
                    'border-transparent bg-blue-light text-black': showLogin
                  }"
                  :flat="!showLogin"
                  :outlined="!showLogin"
                  :solid="showLogin"
                  class="py-2 px-4"
                  type="button"
                  v-on="on"
                >
                  <PEIcon
                    :class="{
                      'stroke-white': !showLogin,
                      'stroke-black': showLogin
                    }"
                    >account</PEIcon
                  >
                </PE-Button>
              </template>

              <slot
                name="login-form"
                :show="true"
              />
            </PEDialog>
          </li>
          <!-- Menu -->
          <li>
            <a
              class="ml-4 flex cursor-pointer items-center py-2 px-2"
              @click="handleOpenMenu"
            >
              <PEIcon class="stroke-white">menu</PEIcon>
            </a>
          </li>
        </ul>
        <!-- Seconnd row -->
        <ul
          class="hidden place-items-center xl:col-start-1 xl:col-end-10 xl:row-start-2 xl:row-end-3 xl:flex xl:flex-wrap"
        >
          <!-- Home -->
          <li @click="toogleSubMenu('')">
            <PEButton
              v-if="home"
              without-border
              :to="home.link?.to || '#'"
              :tag="home.link?.tag || '#'"
              :class="homeLinkClasses"
              class="!pr-0"
              type=""
            >
              {{ home.link?.label }}
            </PEButton>
          </li>
          <!-- Destinations % Resorts -->
          <li>
            <a
              href="#"
              class="mr-3 flex items-center py-2 pr-5"
              @click="toogleSubMenu('destinations')"
            >
              <PEIcon
                variant=""
                class="mr-1 stroke-white"
                >chevron-down</PEIcon
              >
              {{ destinations?.destinationTitle }}
            </a>
          </li>
          <!-- Dashboard -->
          <li
            v-if="isAuthenticated"
            @click="toogleSubMenu('')"
          >
            <PEButton
              v-if="dashboard"
              without-border
              :to="dashboard.link?.to"
              :tag="dashboard.link?.tag"
              :class="nuxtLinkClasses"
              type=""
            >
              {{ dashboard.link?.label }}
            </PEButton>
          </li>
          <!-- Benefits -->
          <li v-if="isAuthenticated">
            <a
              href="#"
              class="mr-3 flex items-center py-2 pr-5"
              @click="toogleSubMenu('benefits')"
            >
              <PEIcon class="mr-1 stroke-white">chevron-down</PEIcon>
              {{ benefits.label }}
            </a>
          </li>
          <!-- Membership -->
          <li v-if="isAuthenticated">
            <a
              href="#"
              class="mr-3 flex items-center py-2 pr-5"
              @click="toogleSubMenu('membership')"
            >
              <PEIcon class="mr-1 stroke-white">chevron-down</PEIcon>
              {{ membership.label }}
            </a>
          </li>
          <!-- Bookings -->
          <li
            v-if="isAuthenticated"
            @click="toogleSubMenu('')"
          >
            <PEButton
              v-if="bookings"
              without-border
              :tag="bookings.link?.tag"
              :to="bookings.link?.to"
              :class="nuxtLinkClasses"
              type=""
            >
              {{ bookings.link?.label }}
            </PEButton>
          </li>
          <!-- Offers -->
          <li @click="toogleSubMenu('')">
            <PEButton
              v-if="offers"
              without-border
              :tag="offers.link?.tag"
              :to="offers.link?.to"
              :class="nuxtLinkClasses"
              type=""
            >
              {{ offers.link?.label }}
            </PEButton>
          </li>
        </ul>

        <transition
          enter-class="!opacity-0"
          leave-to-class="!opacity-0"
          leave-active-class="transition-opacity duration-200 z-20"
          enter-active-class="transition-opacity duration-200 z-20"
        >
          <PEOverlay :value="showLogin" />
        </transition>

        <PEMenu
          v-if="desktop && !isAuthenticated"
          v-model="showLogin"
          :close-on-content-click="false"
          :close-on-click="false"
          :fit="false"
          :nudge-bottom="8"
          class="hidden place-self-end font-sans xl:col-start-10 xl:col-end-13 xl:row-start-2 xl:row-end-3 xl:inline-block"
          content-class="z-30"
          offset-y
          placement="bottom-end"
          @close="$emit('hide-login')"
          @input="showLogin = $event"
          @open="$emit('show-login')"
        >
          <template #activator="{on}">
            <PEButton
              :secondary="showLogin"
              type="button"
              class="!py-4 pe-z-30"
              :class="{
                'border-transparent bg-blue-light text-white ': showLogin
              }"
              @click="onLoginButtonClick"
              v-on="on"
            >
              <div class="flex">
                <PEIcon
                  class="mr-2 stroke-white"
                  :class="{
                    'stroke-white': !showLogin,
                    'stroke-black': showLogin
                  }"
                  >account</PEIcon
                >
                <span>
                  {{ loginLabel.label }}
                </span>
              </div>
            </PEButton>
          </template>
          <slot
            name="login-form"
            :show="showLogin"
          />
        </PEMenu>

        <PE-Button
          v-if="desktop && isAuthenticated"
          class="hidden place-self-end font-sans xl:col-start-10 xl:col-end-13 xl:row-start-2 xl:row-end-3 xl:inline-block"
          outlined
          flat
          type="button"
          @click="onLogout"
        >
          <div class="flex">
            <span>
              {{ userData.name }}
            </span>
            <PEIcon class="ml-3 stroke-white">exit</PEIcon>
          </div>
        </PE-Button>
      </nav>
      <div
        v-for="(item, index) in submenus"
        :key="index"
        class="relative"
      >
        <div class="pe-container">
          <div
            v-show="item.active"
            class="z-30 pe-max-h-[75vh] pe-overflow-y-auto custom-scroll pe-overscroll-contain"
            @clickedItem="toogleSubMenu('')"
          >
            <slot :name="item.name" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {Component, Vue, Emit, Prop, Watch} from 'vue-property-decorator'
// @ts-ignore
import vClickOutside from 'v-click-outside'
import LangSwitcher from '../i18n/LangSwitcher.vue'
import PEDialog from './PEDialog.vue'
import PEOverlay from './PEOverlay.vue'
import {VueMaskFilter} from 'v-mask'

// import PEMenu from './PEMenu.vue';
// import PEButton from '@/components/PEButton/PEButton.vue';
// import PEImageStrapi from '@/components/PEImageStrapi/PEImageStrapi.vue';
// import PEIcon from '@/components/PEIcon/PEIcon.vue';
// import PEBadge from '@/components/PEBadge/PEBadge.vue';
// import { Link } from '@/types/Navbar/Links';
import {
  ImageStrapi,
  LoginLabel,
  Home,
  Destinations,
  Offers,
  ContactUs,
  Phone,
  Dashboard,
  Benefits,
  Membership
} from '~/src/app/layout/domain/entities/navbarEntity'
// Types

@Component({
  name: 'PENavbar',
  components: {
    PEOverlay,
    PEDialog,
    LangSwitcher,
  },
  directives: {
    clickOutside: vClickOutside.directive
  },
  filters: {
    VMask: VueMaskFilter
  }
})
//  filters?: { [key: string]: Function }
export default class PENavbar extends Vue {
  @Prop({type: Object, default: null})
  logoImg!: ImageStrapi

  @Prop({type: Object, default: null})
  logoIcon!: ImageStrapi

  @Prop({type: Object, default: () => ({label: 'login'})})
  loginLabel!: LoginLabel

  @Prop({
    type: Object,
    required: true
  })
  home!: Home

  @Prop({
    type: Object,
    required: true
  })
  dashboard!: Dashboard

  @Prop({
    type: Object,
    required: true
  })
  bookings!: Benefits

  @Prop({type: Object, required: false})
  destinations!: Destinations

  @Prop({
    type: Object,
    required: false
  })
  offers!: Offers

  @Prop({
    type: Object,
    required: false
  })
  membership!: Membership

  @Prop({
    type: Object,
    required: false
  })
  benefits!: Benefits

  @Prop({
    type: Object,
    required: false
  })
  contactUs!: ContactUs

  @Prop({
    type: Object,
    required: false,
    default: () => ({phoneNumber: '9999999999'})
  })
  phone!: Phone

  @Prop({type: Boolean, required: false})
  isDestinationsVisible!: boolean

  // Post Login props

  @Prop({type: Boolean, required: true, default: false})
  isAuthenticated!: boolean

  @Prop({type: Object, required: false})
  userData!: {
    name: string
  }

  submenus = [
    {
      name: 'membership',
      active: false
    },
    {
      name: 'benefits',
      active: false
    },
    {
      name: 'destinations',
      active: false
    }
  ]

  get hasActiveMenu(): boolean {
    return (
      this.submenus.filter(item => {
        return item.active === true
      }).length > 0
    )
  }

  get navbarClasses() {
    return {
      'transition-all': true,
      'pe-bg-transparent': !this.hasActiveMenu,
      'pe-bg-black': this.hasActiveMenu
    }
  }

  onLoginButtonClick() {
    if (this.showLogin) {
      this.showLogin = false
    }
  }

  toogleSubMenu(submenu: string): void {
    const updatedSubmenu = this.submenus.map(item => {
      if (item.name === submenu) {
        item.active = !item.active
      } else {
        item.active = false
      }
      return item
    })
    this.submenus = updatedSubmenu
  }

  onClickOutside(_event: any) {
    this.toogleSubMenu('')
  }

  @Emit('click-menu')
  onClickMenu(event: Event) {
    return event
  }

  @Emit('logout')
  onLogout(event: Event) {
    return event
  }

  showLogin = false

  showLocale = false

  desktopMatcher: MediaQueryList | null = null

  desktop = false

  bodyTag: HTMLCollectionOf<HTMLBodyElement> | null = null

  get isOverlayActive(): boolean {
    return this.hasActiveMenu
  }

  get homeLinkClasses() {
    return ['pe-mr-4 !pe-py-2 pr-2 pl-0 !pe-font-sans pe-cursor-pointer']
  }

  get nuxtLinkClasses() {
    return ['pe-mr-4 !pe-py-2 px-2 !pe-font-sans pe-cursor-pointer']
  }

  get anchorClasses() {
    return ['mr-4 flex items-center !pe-py-2 px-2 pe-cursor-pointer']
  }

  get actionClasses() {
    return ['ml-4 flex items-center !pe-py-2 px-2 !pe-font-sans pe-cursor-pointer']
  }

  get clickOutsideConfig() {
    return {
      isActive: true,
      handler: this.onClickOutside
    }
  }

  @Watch('desktop')
  handleNav(newDesktopValue: boolean) {
    if (!newDesktopValue) {
      this.toogleSubMenu('')
    }
  }

  @Watch('hasActiveMenu')
  handleScroll(hasActiveMenu: boolean) {
    if (this.bodyTag) {
      if (hasActiveMenu) {
        this.bodyTag[0].classList.add('overflow-hidden')
      } else {
        this.bodyTag[0].classList.remove('overflow-hidden')
      }
    }
  }

  onModileQueryChange({matches}: MediaQueryListEvent) {
    this.desktop = matches
  }

  mounted() {
    this.desktopMatcher = window.matchMedia('(min-width: 1366px)')
    this.desktop = this.desktopMatcher.matches
    this.desktopMatcher.addEventListener('change', this.onModileQueryChange)
    this.bodyTag = document.getElementsByTagName('body')
  }

  destroyed() {
    this.desktopMatcher?.removeEventListener('change', this.onModileQueryChange)
  }

  @Watch('$route')
  handleRoute() {
    this.toogleSubMenu('')
  }

  handleOpenMenu() {
    this.$emit('openMenu', true)
  }
}
</script>
<style>
.overflow-hidden {
  overflow-y: hidden !important;
}
</style>
