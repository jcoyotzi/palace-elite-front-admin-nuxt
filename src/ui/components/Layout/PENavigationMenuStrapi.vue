<template>
  <transition
    enter-active-class="pe-transition-transform pe-duration-500"
    leave-active-class="pe-transition-transform pe-duration-500"
    enter-class="pe--translate-y-full"
    leave-to-class="pe--translate-y-full"
  >
    <nav
      v-if="dialog"
      class="fixed inset-0 z-40 bg-black-light"
    >
      <transition v-bind="menuTransition">
        <!-- overflow-auto  -->

        <div
          v-if="!showSubMenu"
          key="menu"
          class="mx-auto h-full overflow-auto md:px-12 lg:px-24"
        >
          <!-- header  -->

          <div class="mx-6 mt-12 flex justify-end">
            <PEIcon
              class="h-14 w-14 cursor-pointer text-white md:h-20 md:w-20"
              @click.native="dialog = false"
              >close</PEIcon
            >
          </div>

          <div class="mx-10 my-2 sm:mx-14 md:my-16 md:grid md:grid-cols-2 md:gap-4">
            <!-- Primary links  -->
            <ul>
              <li
                v-for="(link, index) in primaryLinks"
                :key="index"
              >
                <section v-show="showPrimaryLinkPostLogin(link?.slug ?? '')">
                  <div v-if="!isLinkGroup(link)">
                    <PEButton
                      v-bind="link"
                      text
                      class="mb-7 block px-0 py-1.5 text-left text-[1.5rem] !text-white md:mb-10 md:text-[2rem] !no-underline cursor-pointer"
                      @click.native="dialog = false"
                      >{{ link.label }}</PEButton
                    >
                  </div>

                  <div
                    v-else-if="!desktop"
                    class="mb-7 flex cursor-pointer flex-wrap items-center justify-between text-[1.5rem] text-white md:mb-10 md:text-[2rem]"
                    @click="openSubMenu(link)"
                  >
                    {{ link.label }}

                    <div class="flex grow justify-end">
                      <PEIcon class="ml-4 h-10 w-10 stroke-white">chevron-right</PEIcon>
                    </div>
                  </div>
                </section>
              </li>
              <li v-if="isAuthenticated">
                <PEButton
                  class="mt-7 block px-0 py-1.5 text-left text-[1.5rem] !text-white md:mt-10 md:text-[2rem] !no-underline cursor-pointer"
                  text
                  @click="logout"
                  >{{ logoutLabel }}</PEButton
                >
              </li>
              <li v-else>
                <PEButton
                  class="mt-7 block px-0 py-1.5 text-left text-[1.5rem] !text-white md:mt-10 md:text-[2rem] !no-underline cursor-pointer"
                  text
                  >{{ loginLabel }}</PEButton
                >
              </li>
            </ul>

            <!-- Button desktop -->
            <PEButton
              outlined
              class="my-16 max-w-full flex-wrap !py-5 !px-9 md:hidden"
              type="button"
            >
              <PEIcon class="my-1 mr-4 h-6 w-6 stroke-white">phone</PEIcon>
              <div class="overflow-hidden text-ellipsis leading-7">
                <a :href="`tel:${phone}`"> {{ phone | VMask('#-###-###-####') }} </a>
              </div>
            </PEButton>
            <div>
              <!-- Secondary links  -->

              <ul>
                <li
                  v-for="(link, index) in secondaryLinks"
                  :key="index"
                >
                  <PEButton
                    v-show="showSecondaryLinkPostLogin(link?.slug ?? '')"
                    v-bind="link"
                    text
                    class="my-2.5 block px-0 py-1.5 text-left text-[1rem] !text-white !no-underline cursor-pointer"
                    @click.native="dialog = false"
                    >{{ link.label }}</PEButton
                  >
                </li>
              </ul>

              <!-- Button desktop -->
              <PEButton
                outlined
                class="my-5 hidden max-w-full flex-wrap !py-5 !px-9 md:flex"
                type="button"
              >
                <PEIcon class="my-1 mr-4 h-6 w-6 stroke-white">phone</PEIcon>
                <div class="overflow-hidden text-ellipsis leading-7">
                  <a :href="`tel:${phone}`">{{ phone | VMask('#-###-###-####') }}</a>
                </div>
              </PEButton>
              <!-- Languages links  -->
              <LangSwitcher
                div-class="my-6 text-[1rem] uppercase text-white"
                link-class="inline after:content-['_|_'] after:last:content-[''] px-0 py-1.5 !text-white !no-underline cursor-pointer"
                @click.native="dialog = false"
              />
            </div>
          </div>
        </div>

        <div
          v-else
          key="submenu"
          class="mx-auto h-full overflow-auto md:px-12 lg:px-24"
        >
          <!-- header  -->

          <div class="mx-6 mt-12 flex items-baseline justify-between">
            <button
              class="flex items-center text-white"
              @click="subMenu = null"
            >
              <PEIcon class="h-10 w-10 cursor-pointer stroke-blue-light">chevron-left</PEIcon>

              <div class="text-[1rem] leading-[1.375rem]">Back to main menu</div>
            </button>

            <PEIcon
              class="h-14 w-14 cursor-pointer text-white md:h-20 md:w-20"
              @click.native="dialog = false"
              >close</PEIcon
            >
          </div>

          <div
            v-if="subMenu"
            class="mx-10 mt-10 sm:mx-14 md:my-16"
          >
            <div class="text-[2rem] leading-[2.75rem] text-white">
              {{ subMenu.label }}
            </div>

            <div
              v-for="group in subMenu.groups"
              :key="group.id"
              class="my-10"
            >
              <div class="mb-4 text-[1.5rem] leading-[2.0625rem] text-white">
                {{ group.label }}
              </div>

              <!-- Submenu Primary links  -->

              <ul class="mb-16">
                <li
                  v-for="(link, index) in group.links"
                  :key="index"
                >
                  <PEButton
                    v-bind="link"
                    class="mb-4 block cursor-pointer px-0 py-1.5 text-[1rem] leading-[1.375rem] !text-white !no-underline cursor-pointer"
                    text
                    @click.native="dialog = false"
                    >{{ link.label }}</PEButton
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </transition>
    </nav>
  </transition>
</template>

<script lang="ts">
import {Component, Vue, Prop, ModelSync, Watch} from 'vue-property-decorator'

import {UseAuth} from '../../store/auth'
import LangSwitcher from '../i18n/LangSwitcher.vue'
import {LinkEntity, LinkGroup, LinkGroupSection} from '~/src/app/layout/domain/entities/linkEntity'

@Component({
  name: 'PENavigationMenuStrapi',
  components: {
    LangSwitcher,
  }
})
export default class PENavigationMenuStrapi extends Vue {
  @ModelSync('value', 'input', {type: Boolean, required: true}) dialog!: boolean

  @Prop({type: Array, required: true}) primaryLinks!: (LinkEntity | LinkGroupSection)[]

  @Prop({type: Array, required: true}) secondaryLinks!: LinkEntity[]

  @Prop({type: String, required: true}) phone!: string

  @Prop({type: String, required: true}) loginLabel!: string

  @Prop({type: String, required: true}) logoutLabel!: string

  @Prop({type: Boolean, required: true}) isAuthenticated!: boolean

  desktopMatcher: MediaQueryList | null = null

  desktop = false

  primarySlugs = ['dashboard', 'imperial-weeks', 'membership', 'summary-and-payments', 'bookings']

  secondarySlugs = ['destination-activities', 'resort-credit']

  subMenu: LinkGroupSection | null = null

  onModileQueryChange({matches}: MediaQueryListEvent) {
    this.desktop = matches

    this.subMenu = null
  }

  beforeMount() {
    this.desktopMatcher = window.matchMedia('(min-width: 1024px)')

    this.desktop = this.desktopMatcher.matches

    this.desktopMatcher.addEventListener('change', this.onModileQueryChange)
  }

  destroyed() {
    this.desktopMatcher?.removeEventListener(
      'change',

      this.onModileQueryChange
    )
  }

  isLinkGroup(link: LinkEntity | LinkGroup): link is LinkGroupSection {
    return Object.hasOwn(link, 'groups')
  }

  openSubMenu(link: LinkGroupSection) {
    this.subMenu = link
  }

  logout() {
    this.authStore.signOut()
    this.dialog = false
  }

  showPrimaryLinkPostLogin(slug: string) {
    if (this.isAuthenticated) return true
    return !this.primarySlugs.find(slugAvailable => slugAvailable === slug)
  }

  showSecondaryLinkPostLogin(slug: string) {
    if (this.isAuthenticated) return true
    return !this.secondarySlugs.find(slugAvailable => slugAvailable === slug)
  }

  @Watch('dialog')
  onDialogChange() {
    this.subMenu = null
  }

  get showSubMenu() {
    return this.subMenu && !this.desktop
  }

  get authStore() {
    return new UseAuth()
  }

  get menuTransition() {
    if (this.subMenu) {
      return {
        enterActiveClass:
          'transition-transform duration-300 absolute inset-0 bg-black-light drop-shadow-2xl z-20',

        leaveActiveClass: 'transition-transform duration-300 absolute inset-0 bg-black-light z-10',

        enterClass: 'translate-x-full',

        leaveToClass: 'translate-x-[-20%]'
      }
    }

    return {
      enterActiveClass: 'transition-transform duration-300 absolute inset-0 bg-black-light z-10',

      leaveActiveClass:
        'transition-transform duration-300 absolute inset-0 bg-black-light drop-shadow-2xl z-20',

      enterClass: 'translate-x-[-20%]',

      leaveToClass: 'translate-x-full'
    }
  }
}
</script>
