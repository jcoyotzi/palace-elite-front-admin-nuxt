<template>
  <section class="pe-w-full">
    <h1
      class="pe-text-white pe-text-center lg:pe-text-left pe-font-serif pe-text-2xl pe-uppercase lg:!pe-text-[32px] pe-font-medium lg:!pe-font-normal pe-mb-10"
    >
      Owners Details
    </h1>
    <div class="pe-flex pe-mb-10 pe-w-full pe-justify-between">
      <ButtonBack
        button-label="Back to list"
        @back="goBack"
      />
      <PEButton
        v-if="deleteButton"
        label="Delete Owner"
        text
        flat
        uppercase
        class="pe-py-0"
        :disabled="isLoading"
        :class="{'pe-pointer-events-none': isLoading}"
        @click="deleteOwner"
      />
    </div>
    <MembershipCommonDetails
      :membership="membership"
      :is-guest="false"
      :is-loading="isLoading"
      @on-go-back="goBack"
      @submit="onSubmit"
    >
    </MembershipCommonDetails>
  </section>
</template>
<script lang="ts">
import {Component, Vue, Emit} from 'vue-property-decorator'
import {MembershipTable} from '~/src/app/common/domain/entities/membershipTable'
import {OwnersStore} from '~/src/ui/store/ownersStore'

import {SaveOwnerAdapter} from '~/src/app/owners/domain/adapters/saveOwnerAdapter'
import {MembershipDetailsInputs} from '~/src/app/common/domain/entities/membershipDetailsInputs'

import ButtonBack from '~/src/ui/components/Membership/Common/ButtonBack.vue'

@Component({
  meta: {
    auth: true
  },
  components: {
    ButtonBack
  }
})
class OwnersDetails extends Vue {
  public membership: MembershipTable | null = null

  public store = new OwnersStore()

  public saveOwnerAdapter = new SaveOwnerAdapter()

  public deleteButton: boolean = false

  public isLoading: boolean = false

  // #region Hooks
  beforeMount() {
    this.membership = this.store.readOwnerSelected
  }
  // #endregion Hooks

  public cleanOwner() {
    this.store.$patch({
      ownerDetails: null,
      ownerSelected: null
    })
  }

  public goBack() {
    this.cleanOwner()
    this.onMenuItem()
    this.onMenuItem()
    this.$nuxt.$router.push(this.localePath('/membership/Owners'))
  }

  public async onSubmit(details: MembershipDetailsInputs) {
    this.store.$patch({
      ownerDetails: details
    })
    this.isLoading = true
    const saved = await this.saveOwnerAdapter.saveOwner()
    if (saved) this.goBack()
    this.isLoading = false
  }

  @Emit()
  deleteOwner() {
    // eslint-disable-next-line no-console
    // console.log('emit: deleteOwner')
  }

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
      }
    ]
    return items
  }
}

export default OwnersDetails
</script>
