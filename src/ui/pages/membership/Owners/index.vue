<template>
  <section class="pe-flex-grow">
    <div class="md:pe-flex pe-justify-between pe-items-center pe-mb-10">
      <h1
        class="pe-text-white pe-text-center pe-font-serif pe-text-2xl pe-uppercase lg:!pe-text-[32px] pe-font-medium lg:!pe-font-normal pe-mb-10 md:pe-mb-0"
      >
        {{ $t('membership.owners') }}
      </h1>
      <PEButton
        v-if="addOwner"
        v-bind="addOwnerButtonProps"
        @click="onAddOwnerClick"
      />
    </div>
    <MembershipCommonTable
      :memberships="owners"
      :show-delete-button="false"
      :is-loading="isLoadingOwners"
      show-pin-buttons
      @show-pin-modal="showPinModal"
      @edit-button-click="onEditButtonClick"
    />
    <MembershipOwnersModal
      v-if="showModal"
      v-model="showModal"
      :action="pinModal?.action"
      :is-loading="isLoading"
      :is-reseted="pinReseted"
      @on-submit="onPinSubmit"
    />
  </section>
</template>
<script lang="ts">
import {Component, Emit, Mixins} from 'vue-property-decorator'

// Classes
import {GetOwnersAdapter} from '~/src/app/owners/domain/adapters/getOwnersAdapter'
import {SavePinAdapter} from '~/src/app/owners/domain/adapters/savePinAdapter'

// Interfaces
import {PinModal} from '~/src/app/owners/domain/entities/pinModal'
import {PinInputs} from '~/src/app/owners/domain/entities/pinInputs'
import {MembershipTable} from '~/src/app/common/domain/entities/membershipTable'
import BasePageStrapiMixin from '~/src/ui/mixins/BasePageStrapiMixin'
import { BasePageSlugs } from '~/src/app/Strapi/StrapiConfiguration'

@Component({
  meta: {
    auth: true
  }
})
class Owners extends Mixins (BasePageStrapiMixin) {
  // #region Data
  public owners: MembershipTable[] = []

  public showModal: boolean = false

  public isLoading: boolean = false

  public isLoadingOwners: boolean = false

  public pinModal!: PinModal

  public pinReseted: boolean = false

  public addOwner: boolean = false

  public showDetails: boolean = false

  public getOwnersAdapter = new GetOwnersAdapter()

  public savePinAdapter = new SavePinAdapter()

  // #endregion Data
  async beforeMount() {
    await this.loadStrapiPageData(BasePageSlugs.Owners)
  }

  mounted() {
    this.loadOwners()
    this.cleanOwner()
  }

  public get addOwnerButtonProps() {
    return {
      label: 'Add Owner',
      outlinedSecondary: true,
      flat: true,
      block: true,
      uppercase: true,
      class: 'md:pe-inline-flex md:pe-w-auto md:!pe-min-w-min pe-font-medium md:!pe-font-normal'
    }
  }
  // #endregion Computed

  // #region Methods
  public showPinModal(modal: PinModal) {
    this.showModal = true
    this.pinReseted = false
    this.pinModal = modal
  }

  public async onPinSubmit(data: PinInputs) {
    this.isLoading = true
    const saved = await this.savePinAdapter.savePin(this.pinModal, data)
    if (saved) {
      if (this.pinModal.action === 1) this.pinReseted = true
      else {
        this.showModal = false
        this.loadOwners()
      }
    }

    this.isLoading = false
  }

  public onAddOwnerClick() {
    // console.log('addOwnerClick')
  }

  public onEditButtonClick(owner: MembershipTable) {
    this.getOwnersAdapter.store.$patch({
      ownerSelected: owner
    })
    this.onMenuItem()
    this.$nuxt.$router.push(this.localePath('/membership/Owners/OwnersDetails'))
  }

  public cleanOwner() {
    this.getOwnersAdapter.store.$patch({
      ownerDetails: null,
      ownerSelected: null
    })
  }

  public async loadOwners() {
    this.isLoadingOwners = true
    this.owners = await this.getOwnersAdapter.getOwners()
    this.isLoadingOwners = false
  }

  // #endregion Methods

  @Emit()
  onMenuItem() {
    const items = [
      {
        page: this.localePath('/membership/SummaryandPayments'),
        title: 'Membership'
      },
      {
        page: this.localePath('/membership/Owners'),
        title: 'Owners'
      },
      {
        page: this.localePath('/membership/Owners/OwnersDetails'),
        title: 'Details'
      }
    ]
    return items
  }
}

export default Owners
</script>
