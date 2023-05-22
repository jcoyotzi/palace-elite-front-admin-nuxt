<template>
  <div>
    <transition
      enter-class="pe-opacity-0"
      enter-active-class="pe-ease-out pe-transition-medium"
      enter-to-class="pe-opacity-100"
      leave-class="pe-opacity-100"
      leave-active-class="pe-ease-out pe-transition-medium"
      leave-to-class="pe-opacity-0"
    >
      <div
        v-show="isOpen"
        class="pe-fixed pe-inset-0 pe-z-50 pe-transition-opacity"
        @keydown.esc="closeDrawer"
      >
        <div class="pe-absolute pe-justify-between pe-inset-0 pe-bg-black pe-opacity-75">
          <div
            class="hidden md:flow-root pe-absolute pe-top-[10px] md:pe-right-[51%] lg:pe-right-[31%] pe-z-50"
          >
            <PEButton
              class="!pe-h-[40px] pe-w-auto pe-p-0"
              text
              @click.prevent="closeDrawer"
            >
              <svg
                width="38"
                height="38"
                viewBox="0 0 38 38"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_3402_71566)">
                  <path
                    d="M19 0.59375C8.83203 0.59375 0.59375 8.83203 0.59375 19C0.59375 29.168 8.83203 37.4062 19 37.4062C29.168 37.4062 37.4062 29.168 37.4062 19C37.4062 8.83203 29.168 0.59375 19 0.59375ZM19 35.0312C10.1902 35.0312 2.96875 27.8988 2.96875 19C2.96875 10.1902 10.1012 2.96875 19 2.96875C27.8098 2.96875 35.0312 10.1012 35.0312 19C35.0312 27.8098 27.8988 35.0312 19 35.0312ZM26.0359 13.8566L20.8926 19L26.0359 24.1434C26.3848 24.4922 26.3848 25.0562 26.0359 25.4051L25.4051 26.0359C25.0562 26.3848 24.4922 26.3848 24.1434 26.0359L19 20.8926L13.8566 26.0359C13.5078 26.3848 12.9437 26.3848 12.5949 26.0359L11.9641 25.4051C11.6152 25.0562 11.6152 24.4922 11.9641 24.1434L17.1074 19L11.9641 13.8566C11.6152 13.5078 11.6152 12.9437 11.9641 12.5949L12.5949 11.9641C12.9437 11.6152 13.5078 11.6152 13.8566 11.9641L19 17.1074L24.1434 11.9641C24.4922 11.6152 25.0562 11.6152 25.4051 11.9641L26.0359 12.5949C26.3773 12.9437 26.3773 13.5078 26.0359 13.8566Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_3402_71566">
                    <rect
                      width="38"
                      height="38"
                      fill="white"
                    />
                  </clipPath>
                </defs>
              </svg>
            </PEButton>
          </div>
        </div>
      </div>
    </transition>

    <aside
      class="pe-fixed pe-top-0 pe-right-0 pe-z-50 pe-h-full pe-w-[100%] md:pe-w-[50%] lg:pe-w-[30%] pe-transform pe-overflow-auto pe-bg-black pe-transition-all pe-duration-300 pe-ease-in-out"
      :class="isActivateDrawer"
    >
      <div class="pe-p-[30px] pe-bg-black-light pe-text-white">
        <div class="flex justify-between">
          <div class="justify-start pt-2">
            <PEButton
              secondary
              class="pe-h-[20px] !pe-rounded-[4px] pe-uppercase !pe-px-4 !pe-py-4 text-[12px] font-normal font-sans"
            >
              {{ $t(cardProvitionSelected?.status?.toLowerCase()) }}
            </PEButton>
          </div>
          <PEButton
            class="md:hidden !pe-h-[40px] pe-justify-end pe-w-auto pe-p-0"
            text
            @click.prevent="closeDrawer"
          >
            <svg
              width="38"
              height="38"
              viewBox="0 0 38 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_3402_71566)">
                <path
                  d="M19 0.59375C8.83203 0.59375 0.59375 8.83203 0.59375 19C0.59375 29.168 8.83203 37.4062 19 37.4062C29.168 37.4062 37.4062 29.168 37.4062 19C37.4062 8.83203 29.168 0.59375 19 0.59375ZM19 35.0312C10.1902 35.0312 2.96875 27.8988 2.96875 19C2.96875 10.1902 10.1012 2.96875 19 2.96875C27.8098 2.96875 35.0312 10.1012 35.0312 19C35.0312 27.8098 27.8988 35.0312 19 35.0312ZM26.0359 13.8566L20.8926 19L26.0359 24.1434C26.3848 24.4922 26.3848 25.0562 26.0359 25.4051L25.4051 26.0359C25.0562 26.3848 24.4922 26.3848 24.1434 26.0359L19 20.8926L13.8566 26.0359C13.5078 26.3848 12.9437 26.3848 12.5949 26.0359L11.9641 25.4051C11.6152 25.0562 11.6152 24.4922 11.9641 24.1434L17.1074 19L11.9641 13.8566C11.6152 13.5078 11.6152 12.9437 11.9641 12.5949L12.5949 11.9641C12.9437 11.6152 13.5078 11.6152 13.8566 11.9641L19 17.1074L24.1434 11.9641C24.4922 11.6152 25.0562 11.6152 25.4051 11.9641L26.0359 12.5949C26.3773 12.9437 26.3773 13.5078 26.0359 13.8566Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_3402_71566">
                  <rect
                    width="38"
                    height="38"
                    fill="white"
                  />
                </clipPath>
              </defs>
            </svg>
          </PEButton>
        </div>
        <div class="pe-mt-[30px] pe-font-serif pe-font-normal pe-text-[24px]">
          {{ cardProvitionSelected?.title }}
        </div>
        <div class="pe-flex pe-mt-[10px] pe-font-sans">
          <div class="pe-flex pe-text-[16px] pe-mr-10">
            <div class="pe-font-semibold pe-mr-2">
              {{ $t('invoice') }}:
              <span class="pe-font-normal">{{ cardProvitionSelected?.confirmation?.number }}</span>
            </div>
          </div>
          <div class="pe-flex pe-text-[16px]">
            <div class="pe-font-semibold pe-mr-2">
              {{ $t('expirationDate') }}:
              <span class="pe-font-normal">{{
                dateFormaterProvition(cardProvitionSelected?.expirationDate)
              }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="pe-divide-y !pe-divide-white !pe-divide-opacity-25">
        <div class="pe-p-[30px] pe-text-white">
          <div
            class="pe-flex pe-cursor-pointer"
            @click.prevent="expantionDetails"
          >
            <PEIcon
              size="26"
              :class="getClassIconExpand"
              class="pe-text-blue-light pe-mr-2"
              >chevron-up</PEIcon
            >
            <div
              class="pe-text-[16px] pe-font-semibold pe-font-sans pe-truncate pe-uppercase pe-mr-8"
            >
              {{ cardProvitionSelected.confirmation?.resort_name }}
            </div>
            <div
              class="pe-w-auto pe-rounded-[3px] pe-leading-none pe-truncate pe-h-[20px] pe-bg-blue-light pe-p-[5px] pe-text-black pe-text-[12px] pe-font-sans pe-font-normal"
            >
              {{ $t(cardProvitionSelected.category ?? '') }}
            </div>
          </div>
          <div v-if="cardProvitionSelected.expantion">
            <div class="pe-ml-9 pe-text-[16px] pe-font-normal pe-font-sans">{{
              cardProvitionSelected?.confirmation?.memberFullName
            }}</div>
            <div class="pe-ml-9 pe-text-[16px] pe-font-normal pe-font-sans">{{ fromDate }}</div>
            <PEButton
              text
              @click.prevent="goToReservation()"
            >
              {{ $t('view_reservation') }}
            </PEButton>
            <!-- <div
              class="pe-ml-9 mt-5 pe-cursor-pointer pe-text-[16px] pe-underline pe-text-blue-light pe-font-normal pe-font-sans"
            >
            </div> -->
          </div>
        </div>
      </div>
    </aside>
  </div>
</template>

<script lang="ts">
import {Component, Mixins} from 'vue-property-decorator'
import DateFormaterProvition from '~/src/ui/mixins/DateFormaterProvition'
import {BenefitStore} from '~/src/ui/store/benefits/benefitStore'
import {WeekStore} from '~/src/ui/store/benefits/weekStore'
import {LayoutStore} from '~/src/ui/store/layoutStore'
import i18n from '~/src/ui/i18n/common/drawer.lang'

@Component({
  i18n,
  name: 'BenefitsDrawer'
})
export default class Drawer extends Mixins(DateFormaterProvition) {
  get isOpen(): boolean {
    return this.weekStore.showDrawerCardProvitionDetails
  }

  set isOpen(value) {
    this.weekStore.showDrawerCardProvitionDetails = value
  }

  get getClassIconExpand() {
    return {
      'rotate-180': !this.cardProvitionSelected.expantion
    }
  }

  get cardProvitionSelectedConfirmation() {
    return this.cardProvitionSelected?.confirmation
  }

  get getExpansionIcon(): string {
    return this.cardProvitionSelected.expantion ? 'chevron-up' : 'chevron-down'
  }

  get fromDate(): string {
    return `${this.$t('from')} ${this.cardProvitionSelected?.confirmation?.from}`
  }

  get cardProvitionSelected() {
    return this.weekStore.cardProvitionSelected
  }

  get benefitStore(): BenefitStore {
    return new BenefitStore()
  }

  get weekStore(): WeekStore {
    return new WeekStore()
  }

  get layoutStore(): LayoutStore {
    return new LayoutStore()
  }

  get isActivateDrawer(): string {
    return this.isOpen ? 'pe-translate-x-0' : 'pe-hidden'
  }

  goToReservation() {
    this.$router.push({
      path: this.localePath('/bookings'),
      query: {reservation: String(this.cardProvitionSelected?.confirmation?.number)}
    })
  }

  expantionDetails(): void {
    this.cardProvitionSelected.expantion = !this.cardProvitionSelected.expantion
  }

  closeDrawer(): void {
    this.isOpen = false
  }
}
</script>
