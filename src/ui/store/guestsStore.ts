import {Store, Pinia} from 'pinia-class-component'
import {container, lazyInject} from '../../container'
import guestsTypes from '../../../src/app/common/types/guestsTypes'
import GetGuestsUseCase from '~/src/app/guests/application/getGuestsUseCase'
import {GetGuestsPayloadDto} from '~/src/app/guests/domain/dto/getGuestsPayloadDto'
import {GetGuestsResponseDto} from '~/src/app/guests/domain/dto/getGuestsResponseDto'
import {MembershipTable} from '~/src/app/common/domain/entities/membershipTable'
import {SaveGuestPayloadDto} from '~/src/app/guests/domain/dto/saveGuestPayloadDto'
import {MembershipDetailsInputs} from '~/src/app/common/domain/entities/membershipDetailsInputs'
import {SaveGuestResponseDto} from '~/src/app/guests/domain/dto/saveGuestResponseDto'
import SaveGuestUseCase from '~/src/app/guests/application/saveGuestUseCase'
import AddGuestUseCase from '~/src/app/guests/application/addGuestUseCase'
import {AddGuestPayloadDto} from '~/src/app/guests/domain/dto/addGuestPayloadDto'
import Exception from '~/src/app/common/jsonServer/infrastructure/di/Exception'
import {Payload} from '~/src/app/common/domain/entities/payload'

@Store({
  name: 'guestsStore'
})
export class GuestsStore extends Pinia {
  @lazyInject(guestsTypes.getGuestsUseCase)
  private readonly getGuestsUseCase!: GetGuestsUseCase

  // #region State
  guests: GetGuestsResponseDto = []

  guestsTables: MembershipTable[] | [] = []

  private guestSelected: MembershipTable | null = null

  private saveGuestResponse: SaveGuestResponseDto = false

  private addGuestResponse: boolean = false

  private guestDetails: MembershipDetailsInputs | null = null

  public saveGuestUseCase = container.get<SaveGuestUseCase>(guestsTypes.saveGuestUseCase)

  public addGuestUseCase = container.get<AddGuestUseCase>(guestsTypes.addGuestUseCase)
  // #endregion State

  // #region Getters
  get readGuests(): GetGuestsResponseDto {
    return this.guests
  }

  get readGuestSelected(): MembershipTable | null {
    return this.guestSelected
  }

  get readGuestDetails(): MembershipDetailsInputs | null {
    return this.guestDetails
  }

  get readGuestsTables(): MembershipTable[] | [] {
    return this.guestsTables
  }

  get readSaveGuestResponse(): SaveGuestResponseDto {
    return this.saveGuestResponse
  }

  get readAddGuestResponse(): boolean {
    if (this.addGuestResponse) return true
    return false
  }
  // #endregion Getters

  // #region Actions

  public async getGuests(payload: Payload<GetGuestsPayloadDto>): Promise<any> {
    try {
      const response: any = await this.getGuestsUseCase.run(payload)
      if (response) this.guests = response.data?.data

      return this.guests
    } catch (e: any) {
      const error = new Exception(0, [e.message], [])
      console.error(error)
    }
  }

  public async saveGuest(payload: Payload<SaveGuestPayloadDto>): Promise<void> {
    try {
      const response: any = await this.saveGuestUseCase.run(payload)
      if (response) this.saveGuestResponse = response.data?.data
    } catch (e: any) {
      const error = new Exception(0, [e.message], [])
      console.error(error)
    }
  }

  public async addGuest(payload: Payload<AddGuestPayloadDto>): Promise<void> {
    try {
      const response: any = await this.addGuestUseCase.run(payload)
      if (response) this.addGuestResponse = response.data?.data
    } catch (e: any) {
      const error = new Exception(0, [e.message], [])
      console.error(error)
    }
  }
  // #endregion Getters
}
