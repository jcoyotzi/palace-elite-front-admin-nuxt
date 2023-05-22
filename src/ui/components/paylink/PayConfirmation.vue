<template>
  <section class="pe-text-white">
    <div class="pe-flex-row-reverse pe-justify-center xl:pe-flex xl:pe-gap-12 pe-w-full">
      <div class="pe-place-items-center xl:pe-mr-10">
        <img
          class="pe-w-[90%] xl:pe-w-[100%] pe-mb-10 xl:pe-mb-0 pe-m-auto pe-rounded-[10px]"
          :src="confirmationContent?.image?.url"
        />
      </div>
      <div
        class="xl:pe-mx-0 xl:pe-ml-10 pe-m-auto pe-bg-black-light pe-rounded-[10px] xl:pe-py-[67px] xl:pe-px-[67px] pe-items-center pe-px-5 pe-py-10 pe-w-[90%] xl:pe-w-[35%]"
      >
        <div class="pe-w-full">
          <div class="pe-mb-10">
            <p class="pe-font-semibold uppercase">ROOM ONE</p>
            <h3 class="pe-text-2xl">{{ fullName }}</h3>
            <p>{{ reservation?.Rm_desc }}</p>

            <p>
              {{ $t('confirmationNumber') }}:
              <span>{{ reservation?.Hotel }} - {{ reservation?.Folio }}</span>
            </p>
          </div>
        </div>
        <div class="pe-mb-10">
          {{ $t('notificationLabel') }}
        </div>
        <div class="pe-flex pe-flex-col items-center lg:block">
          <PEButton
            v-bind="callToActionButton"
            uppercase
            solid
            flat
            class="pe-mb-14 pe-cursor-pointer"
          />

          <p class="pe-mb-7">{{ confirmationContent?.labelStores }}</p>

          <div class="pe-mb-10 pe-grid pe-max-w-[320px] pe-grid-cols-2 pe-gap-3">
            <PEButton v-bind="bindAppStoreLink">
              <PEImageStrapi
                :image="confirmationContent?.appStoreImage"
                class="pe-w-full"
                :fit="true"
              />
            </PEButton>
            <PEButton v-bind="bindPlayStoreLink">
              <PEImageStrapi
                :image="confirmationContent?.playStoreImage"
                class="pe-w-full"
                :fit="true"
              />
            </PEButton>
          </div>

          <div class="flex items-center">
            <PEButton v-bind="bindBackLink" />
            <span class="px-2.5 pe-text-blue-light">|</span>
            <PEButton v-bind="bindHelpLink" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import {Component, Vue, Prop, Emit} from 'vue-property-decorator'
import i18n from '~/src/ui/i18n/confirmations/payConfirmation.lang'
import {PayLinkStore} from '../../store/payLinkStore'

@Component({
  i18n,
  name: 'PEConfirmationCard'
})
export default class PEConfirmationCard extends Vue {
  get paylinkStore(): PayLinkStore {
    return new PayLinkStore()
  }

  get fullName() {
    return `${this.reservation?.First_name} ${this.reservation?.Last_name}`
  }

  get confirmationContent() {
    return this.paylinkStore.confirmationContent
  }

  get imageStrapi() {
    return this.confirmationContent
  }

  get bindBackLink() {
    return [this.linkProps, this.confirmationContent?.returnLink]
  }

  get bindHelpLink() {
    return [this.linkProps, this.confirmationContent?.helpLink]
  }

  get bindAppStoreLink() {
    return [this.linkProps, this.confirmationContent?.appStoreLink]
  }

  get bindPlayStoreLink() {
    return [this.linkProps, this.confirmationContent?.playStoreLink]
  }

  get reservation() {
    return this.paylinkStore.reservation
  }

  get callToActionButton() {
    return {
      label: 'See booking details',
      tag: 'NuxtLink',
      to: this.localePath('/bookings'),
    }
  }

  public get linkProps() {
    return {
      class: ['px-0', 'py-0', '!pe-no-underline', 'pe-cursor-pointer'],
      text: true
    }
  }
}
</script>

<style lang="scss" scoped></style>
