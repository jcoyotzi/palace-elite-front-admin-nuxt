<template>
  <section class="w-full">
    <h1
      class="text-white text-center lg:text-left font-serif text-2xl uppercase lg:!text-[32px] font-medium lg:!font-normal mb-10"
    >
      {{ $t('membership.accountDetails') }}
    </h1>

    <MembershipCommonDetailsAccount
      :user="user"
      :is-guest="false"
      :is-loading="isLoading"
      :error="formError"
      :success="formSuccess"
      @submit="onSubmit"
    >
    </MembershipCommonDetailsAccount>
  </section>
</template>
<script lang="ts">
import {Component, Emit, Mixins} from 'vue-property-decorator'
import {UseAuth} from '../../store/auth'

import {LayoutStore} from '../../store/layoutStore'
import BasePageStrapiMixin from '../../mixins/BasePageStrapiMixin'
import {SaveOwnerAdapter} from '~/src/app/owners/domain/adapters/saveOwnerAdapter'

import {LegacyUser} from '~/src/app/user/domain/entities/user'
import { BasePageSlugs } from '~/src/app/Strapi/StrapiConfiguration'

@Component({
  meta: {
    auth: true
  }
})
export default class AccountDetails extends Mixins (BasePageStrapiMixin) {
  public user: LegacyUser | null = null

  public store = new UseAuth()

  public layoutStore = new LayoutStore()

  public saveOwnerAdapter = new SaveOwnerAdapter()

  public deleteButton: boolean = false

  public isLoading: boolean = false

  public formError: string = ''

  public formSuccess: string = ''

  // #region Hooks
  async beforeMount() {
    this.user = this.store.currentUser
    await this.loadStrapiPageData(BasePageSlugs.AccountDetails)
  }

  public cleanOwner() {
    this.store.$patch({
      ownerDetails: null,
      ownerSelected: null
    })
  }

  public async onSubmit(data: any) {
    /*
    this.store.$patch({
      ownerDetails: details,
    })
    */
    this.isLoading = true
    this.formError = ''
    this.formSuccess = ''
    const response = await this.store.changePassword(data)
    // console.log('response', response)
    if (!response.success) {
      this.formError = response.error
    } else {
      // Show modal
      this.formSuccess = 'The password has been changed successfully'
      this.openModal()
    }

    // const saved = await this.saveOwnerAdapter.saveOwner()
    // if (saved) this.goBack()
    this.isLoading = false
  }

  openModal() {
    this.layoutStore.openModal('CHANGE PASSWORD', 'Your password was successfully updated.')
  }

  @Emit()
  deleteOwner() {
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
</script>
