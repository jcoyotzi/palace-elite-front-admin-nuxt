<template>
  <div
    class="pe-flex pe-flex-1 pe-gap-[20px] pe-bg-black-light rounded pe-text-white pe-my-10 pe-justify-between lg:pe-m-0 lg:pe-pr-5 pe-min-h-[150px] pe-h-full"
  >
    <div class="pe-w-[30%]">
      <PEImageStrapi
        :image="service.image"
        fit
        class="pe-w-full lg:pe-w-[135px] pe-h-[135px] pe-rounded-tl lg:pe-rounded-bl pe-overflow-hidden lg:flex lg:pe-flex-1 lg:pe-w-full lg:pe-h-full"
      />
    </div>
    <div class="pe-w-[65%] pe-py-4 pe-pr-4 pe-flex pe-flex-col pe-justify-between">
      <h3 class="pe-block">{{ service.title }}</h3>
      <a
        v-if="service.details"
        class="pe-text-blue-light pe-text-xs pe-underline pe-block pe-mb-5 pe-cursor-pointer"
        @click="toogleModal()"
        >{{ service.seeDetailsLabel }}</a
      >
      <div class="lg:pe-flex lg:pe-flex-row lg:pe-justify-between pe-items-center pe-gap-2">
        <p class="pe-block text-2xl lg:pe-inline-block pe-mb-3 lg:pe-mb-0">
          ${{ service.price }}
          <span class="text-base pe-uppercase"> {{ service.priceLabel }}</span>
        </p>
        <div class="pe-flex pe-flex-row pe-gap-5 pe-items-center">
          <slot
            name="control"
            :min-pax="service.minPax"
            :max-pax="service.maxPax"
            :pax-label="service.paxLabel"
          />
        </div>
      </div>
    </div>
    <PEModal
      :value="modalData.show"
      class="pe-z-50"
    >
      <template #content>
        <div class="text-center">
          <h2 :class="''">{{ modalData.title }}</h2>
        </div>
        <!-- Message -->
        <div
          class="pe-my-4"
          v-html="service.details"
        ></div>
        <!-- Buttons -->
        <PEButton
          v-bind="buttonCloseProps"
          @click="toogleModal"
        />
      </template>
    </PEModal>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator'
import ActivityEntity from '~/src/app/benefits/domain/entities/activityEntity'

@Component({
  name: 'ServiceItem'
})
export default class PESummaryPanel extends Vue {
  @Prop() readonly service!: ActivityEntity

  showModal: boolean = false

  modalTitle: string = this.service.title

  modalMessage: string = ''

  public get buttonCloseProps() {
    return {
      label: 'Close',
      type: 'button',
      uppercase: true,
      flat: true,
      outlinedSecondary: true
    }
  }

  get modalData() {
    return {
      show: this.showModal,
      title: this.modalTitle,
      message: this.modalMessage
    }
  }

  toogleModal() {
    this.showModal = !this.showModal
  }
}
</script>
<style lang="scss" scoped></style>
