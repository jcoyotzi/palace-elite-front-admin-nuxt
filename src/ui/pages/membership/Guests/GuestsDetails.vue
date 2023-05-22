<template>
  <section class="pe-w-full">
    <h1
      class="pe-text-white pe-text-center lg:pe-text-left pe-font-serif pe-text-2xl pe-uppercase lg:!pe-text-[32px] pe-font-medium lg:!pe-font-normal pe-mb-10"
    >
      Guests Details
    </h1>
    <div class="pe-flex pe-mb-10 pe-w-full pe-justify-between">
      <ButtonBack
        button-label="Back to list"
        @back="goBack"
      />
      <PEButton
        v-if="membership && deleteButton"
        label="Delete Guest"
        text
        flat
        uppercase
        class="pe-py-0"
        :disabled="isLoading"
        :class="{'pe-pointer-events-none': isLoading}"
        @click="deleteGuest"
      />
    </div>
    <MembershipCommonDetails
      :membership="membership"
      :is-guest="true"
      :is-loading="isLoading"
      @on-go-back="goBack"
      @on-add-guest="onSubmit($event, 'add')"
      @submit="onSubmit($event, 'save')"
    >
    </MembershipCommonDetails>
    <PEModal
      v-model="showAlert"
      class="pe-z-50"
    >
      <template #content>
        <h2 class="pe-text-white pe-uppercase pe-font-serif pe-font-medium pe-mb-10 pe-text-2xl">
          Add New Guest
        </h2>
        <div class="pe-w-full pe-max-w-[580px] pe-text-center">
          <p class="pe-text-center pe-text-white pe-mb-10">
            The guest {{ guestName }} already exists
          </p>
          <PEButton
            v-bind="buttonCloseProps"
            @click="toggleAlert"
          />
        </div>
      </template>
    </PEModal>
  </section>
</template>
<script lang="ts">
import {Component, Vue, Emit} from 'vue-property-decorator'
import {MembershipTable} from '~/src/app/common/domain/entities/membershipTable'
import {GuestsStore} from '~/src/ui/store/guestsStore'

import {SaveGuestAdapter} from '~/src/app/guests/domain/adapters/saveGuestAdapter'
import {MembershipDetailsInputs} from '~/src/app/common/domain/entities/membershipDetailsInputs'
import {AddGuestAdapter} from '~/src/app/guests/domain/adapters/addGuestAdapter'

import ButtonBack from '~/src/ui/components/Membership/Common/ButtonBack.vue'

@Component({
  meta: {
    auth: true
  },
  components: {
    ButtonBack
  }
})
class GuestsDetails extends Vue {
  public membership: MembershipTable | null = null

  public store = new GuestsStore()

  public saveGuestAdapter = new SaveGuestAdapter()

  public addGuestAdapter = new AddGuestAdapter()

  public isLoading: boolean = false

  public deleteButton: boolean = false

  public showAlert: boolean = false

  public guestName: string = ''

  // #region Hooks
  beforeMount() {
    this.membership = this.store.readGuestSelected
  }
  // #endregion Hooks

  public get buttonCloseProps() {
    return {
      label: 'Close',
      type: 'button',
      uppercase: true,
      flat: true,
      outlinedSecondary: true
    }
  }

  public normalizeString(value: string): string {
    return value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036F]/g, '')
  }

  public isDuplicated(details: MembershipDetailsInputs) {
    return (
      this.store.readGuestsTables.filter(item => {
        if (!details.firstName || !details.lastName) return false
        return (
          this.normalizeString(item.memberUtils.firstname) ===
            this.normalizeString(details.firstName) &&
          this.normalizeString(item.memberUtils.lastname) === this.normalizeString(details.lastName)
        )
      }).length > 0
    )
  }

  public cleanGuest() {
    this.store.$patch({
      guestDetails: null,
      guestSelected: null
    })
  }

  public goBack() {
    this.onMenuItem()
    this.cleanGuest()
    this.$nuxt.$router.push(this.localePath('/membership/Guests'))
  }

  public async onSubmit(details: MembershipDetailsInputs, action: string) {
    this.store.$patch({
      guestDetails: details
    })
    this.isLoading = true
    let saved: boolean = false
    let added: boolean = false
    if (action === 'save') saved = await this.saveGuestAdapter.saveGuest()
    if (action === 'add' && !this.isDuplicated(details))
      added = await this.addGuestAdapter.addGuest()
    else if (action === 'add') this.toggleAlert(`${details.firstName} ${details.lastName}`)
    if (saved || added) this.goBack()
    this.isLoading = false
  }

  public toggleAlert(guestName: string) {
    this.guestName = guestName
    this.showAlert = !this.showAlert
  }

  @Emit()
  deleteGuest() {
    // eslint-disable-next-line no-console
    // console.log('emit: deleteGuest')
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
      }
    ]
    return items
  }
}

export default GuestsDetails
</script>
