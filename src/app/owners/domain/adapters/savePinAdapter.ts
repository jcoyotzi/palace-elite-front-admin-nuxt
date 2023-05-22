import {ValidatePinPayloadDto} from '../dto/validatePinPayloadDto'
import {Owner} from '../dto/getOwnersResponseDto'
import {OwnersStore} from '~/src/ui/store/ownersStore'
import {UseAuth} from '~/src/ui/store/auth'
import {PinPayload} from '~/src/app/owners/domain/entities/pinPayload'

// #region Interfaces
import {PinActions} from '~/src/app/owners/domain/enum/pinActions'
import {PinModal} from '~/src/app/owners/domain/entities/pinModal'
import {PinInputs} from '~/src/app/owners/domain/entities/pinInputs'
import {MembershipTable} from '~/src/app/common/domain/entities/membershipTable'
import {Payload} from '~/src/app/common/domain/entities/payload'
// #endregion Interfaces

export class SavePinAdapter {
  public store = new OwnersStore()
  public authStore = new UseAuth()

  public owner: MembershipTable['memberUtils'] | null = null

  public action: PinActions | null = null

  public inputs: PinInputs | null = null

  public get ownerComplete(): Owner {
    return this.store.readOwners.filter(
      item => item.MemberProfilesRelateds.idprofileopera === this.owner?.idprofileopera
    )[0]
  }

  public get savePinPayload(): PinPayload | null {
    if (!this.owner) return null

    if (!this.ownerComplete) return null
    const ownerInfo = this.ownerComplete.MemberProfilesRelateds
    if (!ownerInfo) return null
    ownerInfo.password = this.action === 1 ? ownerInfo.password : this.inputs?.nip?.toString() || ''
    if (!ownerInfo.name) ownerInfo.name = ownerInfo.firstname + ' ' + ownerInfo.lastname
    return {
      application: this.authStore.userAffiliationId || '',
      company: ownerInfo.company,
      action: this.action || PinActions.add,
      isNational: this.authStore.isNational,
      payload: {
        data: ownerInfo
      }
    }
  }

  public validatePinPayload(): Payload<ValidatePinPayloadDto> {
    return {
      data: {
        application: this.owner?.application || '',
        company: this.owner?.company || 0,
        password: this.inputs?.oldNip?.toString() || '',
        isNational: this.owner?.IsNational || false
      }
    }
  }

  public async validatePin(): Promise<void> {
    return await this.store.validatePin(this.validatePinPayload())
  }

  public async postPin(payload: PinPayload): Promise<void> {
    return await this.store.savePin(payload)
  }

  public async savePin(modal: PinModal, data: PinInputs): Promise<Boolean> {
    this.owner = modal.owner.memberUtils
    this.action = modal.action
    this.inputs = data

    if (this.action === PinActions.change) {
      await this.validatePin()
      if (!this.store.readValidOldPin) return Promise.resolve(false)
    }

    if (this.savePinPayload) await this.postPin(this.savePinPayload)
    if (!this.store.readPinResponse) Promise.resolve(false)
    return Promise.resolve(true)
  }
}
