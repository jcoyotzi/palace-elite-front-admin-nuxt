<template>
  <div>
    <!-- MemberMenu Mobile -->
    <div class="lg:pe-hidden xl:pe-hidden">
      <PEButton
        class="pe-text-[16px] pe-text-blue-light pe-w-full pe-font-serif"
        uppercase
        outlined-secondary
        flat
        @click="drawer"
      >
        {{ textActivatorMobile }}
        <PEIcon class="pe-text-blue-light">chevron-right</PEIcon>
      </PEButton>
      <transition
        enter-class="pe-opacity-0"
        enter-active-class="pe-ease-out pe-transition-medium"
        enter-to-class="pe-opacity-100"
        leave-class="pe-opacity-100"
        leave-active-class="pe-ease-out transition-medium"
        leave-to-class="pe-opacity-0"
      >
        <div
          v-show="isOpen"
          class="pe-z-10 pe-fixed pe-inset-0 pe-transition-opacity"
          @keydown.esc="closeDrawer"
        >
          <div
            class="pe-absolute pe-inset-0 pe-bg-black pe-opacity-75"
            tabindex="0"
            @click="closeDrawer"
          ></div>
        </div>
      </transition>
      <aside
        class="pe-transform pe-top-0 pe-left-0 pe-w-[70%] pe-bg-black-light pe-fixed pe-h-full pe-overflow-auto pe-ease-in-out pe-transition-all pe-duration-300 pe-z-50"
        :class="isActivateDrawer"
      >
        <div class="pe-mt-[60px] pe-mb-[18px]">
          <span class="pe-text-white pe-text-[32px] pe-font-sans pe-ml-[24px]">Membership</span>
        </div>
        <div class="pe-divide-y pe-divide-black">
          <div
            v-for="(menu, index) in itemsMenu"
            v-if="showMenu(menu)"
            :key="index"
            :class="getClasses(menu, index)"
            class="pe-cursor-pointer pe-bg-black-light pe-flex pe-items-center pe-w-full pe-h-[82px] pe-p-[30px] pe-text-white"
            @click.prevent="onClick(index, menu.page, menu.title)"
          >
            <PEIcon>{{ menu.icon }}</PEIcon>
            <span class="pe-font-sans pe-text-[16px] pe-ml-3">{{ menu.title }}</span>
          </div>
        </div>
      </aside>
    </div>
    <!-- MemberMenu Desktop -->
    <div class="pe-hidden lg:pe-flow-root pe-divide-y pe-divide-black">
      <div
        v-for="(menu, index) in itemsMenu"
        v-if="showMenu(menu)"
        :key="index"
        :class="getClasses(menu, index, false)"
        class="pe-cursor-pointer pe-bg-black-light pe-flex pe-items-center pe-w-[375px] pe-h-[82px] pe-p-[30px] pe-text-white"
        @click.prevent="onClick(index, menu.page, menu.title)"
      >
        <PEIcon>{{ menu.icon }}</PEIcon>
        <span class="pe-font-sans pe-text-[16px] pe-ml-3">{{ menu.title }}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {Component, Emit, Vue, Watch} from 'vue-property-decorator'

// Interfaces
import {MembershipItem} from '~/interfaces/Membership/Membership.interface'
import {LayoutStore} from '~/src/ui/store/layoutStore'

@Component
export default class Menu extends Vue {
  // Data
  public items: MembershipItem[] = [
    {
      title: this.$t('membership.summaryAndPayments'),
      icon: 'palace-logo',
      page: this.localePath('/membership/SummaryAndPayments')
    },
    {
      title: this.$t('myContract.myContract'),
      icon: 'pdf-file',
      page: this.localePath('/membership/MyContract')
    },
    {
      title: this.$t('creditCards.creditCards'),
      icon: 'card-credit',
      page: this.localePath('/membership/CreditCards')
    },
    {
      title: 'CreditCardsDetails',
      icon: 'card-credit',
      hidden: true,
      page: this.localePath('/membership/CreditCardsDetails')
    },
    {
      title: this.$t('membership.owners'),
      icon: 'account-with-star',
      page: this.localePath('/membership/Owners')
    },
    {
      title: this.$t('membership.beneficiaries'),
      icon: 'account',
      page: this.localePath('/membership/Beneficiaries')
    },
    {
      title: this.$t('membership.guests'),
      icon: 'add-account',
      page: this.localePath('/membership/Guests')
    },
    {
      title: this.$t('membership.accountDetails'),
      icon: 'account',
      page: this.localePath('/membership/account-details')
    }
  ]

  public textActivatorMobile: string = 'Membership Options'

  public isOpen: boolean = false

  // Hooks

  beforeMount() {
    const item = this.items[this.position]
    this.onClick(this.position, item.page, item.title)
  }

  // Computed

  get position(): number {
    return this.layoutStore.itemIndexMembership
  }

  @Watch('position')
  onChangePosition(index: number) {
    const {page, title} = this.items.find((item, indexItem) => indexItem === index)!
    this.onMenuItem(page, title)
  }

  get layoutStore(): LayoutStore {
    return new LayoutStore()
  }

  public get isActivateDrawer() {
    return this.isOpen ? 'pe-translate-x-0' : '-pe-translate-x-full'
  }

  public get itemsMenu(): MembershipItem[] {
    return this.items.map((menu: any, index: number) => ({
      ...menu,
      active: this.getStatus(index)
    }))
  }

  public showMenu(menu: MembershipItem): boolean {
    return !menu.hidden!
  }

  // Methods

  public closeDrawer() {
    this.isOpen = false
  }

  public getStatus(index: number) {
    return index === this.position
  }

  public getClasses(menu: any, index: number, isMovil: boolean = true): string[] {
    const classes = []
    const positionAfterActive = this.position + 1

    if (menu.active)
      classes.push(
        '!pe-px-[26px] !pe-text-blue-light !pe-bg-[#2e2d2e] !pe-border-y-0 pe-border-l-4 !pe-border-l-blue-light'
      )

    if (index === positionAfterActive) classes.push('!pe-border-t-0')

    if (!isMovil) {
      if (index === 0) classes.push('pe-rounded-t-[10px]')

      if (index === 0 && menu.active) classes.push('!pe-rounded-tl-[0px]')

      if (index === this.itemsMenu.length - 1) classes.push('pe-rounded-b-[10px]')

      if (index === this.itemsMenu.length - 1 && menu.active) classes.push('!pe-rounded-bl-[0px]')
    }

    return classes
  }

  public onClick(index: number, page: string, title: string) {
    this.onMenuIndex(index)
    this.onMenuItem(page, title)
    this.$nuxt.$router.push(page)
    this.drawer()
  }

  public drawer() {
    this.isOpen = !this.isOpen
  }

  @Emit()
  onMenuItem(page: string, title: string) {
    const items = [
      {
        page: this.localePath('/membership/SummaryandPayments'),
        title: this.$t('membership.membership'),
      },
      {
        page,
        title
      }
    ]
    return items
  }

  @Emit()
  onMenuIndex(index: number) {
    return index
  }
}
</script>
