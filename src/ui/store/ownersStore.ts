import {Pinia, Store} from 'pinia-class-component'
import {container, lazyInject} from '../../container'
import ownersTypes from '../../../src/app/common/types/ownersTypes'
import GetOwnersUseCase from '~/src/app/owners/application/getOwnersUseCase'
import {GetOwnersPayloadDto} from '~/src/app/owners/domain/dto/getOwnersPayloadDto'
import {Payload} from '~/src/app/common/domain/entities/payload'
import {GetOwnersResponseDto} from '~/src/app/owners/domain/dto/getOwnersResponseDto'
import {PinPayload} from '~/src/app/owners/domain/entities/pinPayload'
import PinUseCase from '~/src/app/owners/application/pinUseCase'
import {PinResponseDto} from '~/src/app/owners/domain/dto/pinResponseDto'
import {MembershipTable} from '~/src/app/common/domain/entities/membershipTable'
import {SaveOwnerPayloadDto} from '~/src/app/owners/domain/dto/saveOwnerPayloadDto'
import {SaveOwnerResponseDto} from '~/src/app/owners/domain/dto/saveOwnerResponseDto'
import {MembershipDetailsInputs} from '~/src/app/common/domain/entities/membershipDetailsInputs'
import Exception from '~/src/app/common/jsonServer/infrastructure/di/Exception'
import {ValidatePinPayloadDto} from '~/src/app/owners/domain/dto/validatePinPayloadDto'
import {ValidatePinResponseDto} from '~/src/app/owners/domain/dto/validatePinResponseDto'
import ValidatePinUseCase from '~/src/app/owners/application/validatePinUseCase'
import userTypes from 'app/common/types/userTypes'
import GetIsTransferableBonusUseCase from 'app/user/application/getIsTransferableBonusUseCase'

import {OwnersRepository} from '~/src/app/owners/domain/repositories/ownersRepository'
import {LayoutStore} from './layoutStore'
import UseCase from '~/src/app/common/application/UseCase'

@Store({
  name: 'ownersStore'
})
export class OwnersStore extends Pinia {
  @lazyInject(ownersTypes.getOwnersUseCase)
  private readonly getOwnersUseCase!: GetOwnersUseCase

  @lazyInject(userTypes.getIsTransferableBonusUseCase)
  private readonly getIsTransferableBonus!: GetIsTransferableBonusUseCase

  @lazyInject(ownersTypes.ownersRepository)
  private readonly ownersRepository!: OwnersRepository

  // STATE
  private owners: GetOwnersResponseDto = []

  private ownersTables: MembershipTable[] | [] = []

  private ownerSelected: MembershipTable | null = null

  private pinResponse: PinResponseDto | null = null

  private validOldPin: ValidatePinResponseDto | null = null

  private saveOwnerResponse: SaveOwnerResponseDto = false

  private ownerDetails: MembershipDetailsInputs | null = null

  @lazyInject(ownersTypes.pinUseCase)
  private readonly pinUseCase!: UseCase<any, any>

  public validatePinUseCase = container.get<ValidatePinUseCase>(ownersTypes.validatePinUseCase)

  // GETTERS

  get readOwners(): GetOwnersResponseDto {
    return this.owners
  }

  get regexSSN(): RegExp {
    return /^[a-zA-Z0-9]*$/
  }

  get readOwnerSelected(): MembershipTable | null {
    return this.ownerSelected
  }

  get readOwnerDetails(): MembershipDetailsInputs | null {
    return this.ownerDetails
  }

  get readPinResponse(): PinResponseDto | null {
    return this.pinResponse
  }

  get readOwnersTables(): MembershipTable[] | [] {
    return this.ownersTables
  }

  get readSaveOwnerResponse(): SaveOwnerResponseDto {
    return this.saveOwnerResponse
  }

  get readValidOldPin(): ValidatePinResponseDto | null {
    return this.validOldPin
  }

  get layoutStore(): LayoutStore {
    return new LayoutStore()
  }

  // ACTIONS

  public async isBonusTransfer(arrivalDate: string, departDate: string, hotel: string) {
    try {
      return await this.getIsTransferableBonus.run({
        arrivalDate,
        departDate,
        hotel
      })
    } catch (error) {
      if (error instanceof Error)
        return {
          isTransferable: false,
          folio: 0,
          hotel: ''
        }
    }
  }

  public async getOwners(payload: Payload<GetOwnersPayloadDto>): Promise<void> {
    try {
      const response: any = await this.getOwnersUseCase.run(payload)
      if (response) this.owners = response.data?.data
    } catch (e: any) {
      const error = new Exception(0, [e.message], [])
      console.error(error)
    }
  }

  public async savePin(payload: PinPayload): Promise<void> {
    try {
      const response: any = await this.pinUseCase.run(payload)

      if (response) {
        this.pinResponse = response.data?.data
      }
    } catch (e: any) {
      this.layoutStore.showSnackbar(
        '',
        'Oh no! An error occurred while trying to perform an operation with the PIN'
      )
    }
  }

  public async saveOwner(payload: Payload<SaveOwnerPayloadDto>): Promise<void> {
    try {
      const response: any = await this.ownersRepository.saveOwner(payload)
      if (response) this.saveOwnerResponse = response.data?.data
    } catch (error: any) {
      if (error instanceof Error) {}// console.log({error: error.message})
    }
  }

  public async validatePin(payload: Payload<ValidatePinPayloadDto>): Promise<void> {
    try {
      const response: any = await this.validatePinUseCase.run(payload)

      if (response) this.validOldPin = response.data?.data
    } catch (error) {
      if (error instanceof Error) {}// console.log({error: error.message})
    }
  }
}
