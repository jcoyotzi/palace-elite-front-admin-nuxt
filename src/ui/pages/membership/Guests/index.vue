<template>
  <section class="pe-flex-grow">
    <div class="md:pe-flex justify-between pe-items-center pe-mb-10">
      <h1
        class="pe-text-white pe-text-center pe-font-serif pe-text-2xl pe-uppercase lg:!pe-text-[32px] pe-font-medium lg:!pe-font-normal pe-mb-10 md:pe-mb-0"
      >
        {{ $t('membership.guests') }}
      </h1>
      <PEButton
        v-if="addGuest"
        v-bind="addGuestButtonProps"
        @click="onAddGuestClick"
      />
    </div>
    <MembershipCommonTable
      :memberships="guests"
      :show-delete-button="false"
      :show-pin-buttons="false"
      :is-loading="isLoadingGuests"
      @edit-button-click="onEditButtonClick"
    />
  </section>
</template>
<script lang="ts">
import {Component, Emit, Mixins} from 'vue-property-decorator'

// Classes
import {GetGuestsAdapter} from '~/src/app/guests/domain/adapters/getGuestsAdapter'

// Interfaces
import {MembershipTable} from '~/src/app/common/domain/entities/membershipTable'
import BasePageStrapiMixin from '~/src/ui/mixins/BasePageStrapiMixin'
import { BasePageSlugs } from '~/src/app/Strapi/StrapiConfiguration'

@Component({
  meta: {
    auth: true
  }
})
class Guests extends Mixins (BasePageStrapiMixin) {
  // #region Data
  public guests: MembershipTable[] = []

  public addGuest: boolean = true

  public showDetails: boolean = false

  public getGuestsAdapter = new GetGuestsAdapter()

  public isLoadingGuests: boolean = false

  // #endregion Data

  async mounted() {
    this.isLoadingGuests = true
    this.getGuestsAdapter.getGuests()
      .then(guests => (this.guests = guests))
      .finally(() => {
        this.isLoadingGuests = false
      })
    this.cleanGuest()
    
    await this.loadStrapiPageData(BasePageSlugs.Guests);
  }

  public get addGuestButtonProps() {
    return {
      label: 'Add New Guest',
      outlinedSecondary: true,
      flat: true,
      uppercase: true,
      class:
        'pe-block pe-w-full pe-inline-flex md:pe-w-auto md:!pe-min-w-min pe-font-medium md:!pe-font-normal'
    }
  }
  // #endregion Computed

  // #region Methods
  public onAddGuestClick() {
    this.goDetails()
  }

  public onEditButtonClick(guest: MembershipTable) {
    this.getGuestsAdapter.store.$patch({
      guestSelected: guest
    })
    this.goDetails()
  }

  public goDetails() {
    this.onMenuItem()
    this.$nuxt.$router.push(this.localePath('/membership/Guests/GuestsDetails'))
  }

  @Emit()
  onMenuItem() {
    const items = [
      {
        page: this.localePath('/membership/SummaryandPayments'),
        title: 'Membership'
      },
      {
        page: this.localePath('/membership/Guests'),
        title: 'Guests'
      },
      {
        page: this.localePath('/membership/Owners/GuestsDetails'),
        title: 'Details'
      }
    ]
    return items
  }

  public cleanGuest() {
    this.getGuestsAdapter.store.$patch({
      guestDetails: null,
      guestSelected: null
    })
  }
  // #endregion Methods
}

export default Guests
</script>
