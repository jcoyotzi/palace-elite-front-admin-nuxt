import {Store, Pinia} from 'pinia-class-component'
import {container, lazyInject} from '../../container'
import beneficiaryType from '~/src/app/common/types/beneficiaryType'
import {BeneficiariesRepository} from '~/src/app/beneficiaries/domain/repositories/beneficiariesRepository'
import Beneficiarie from '~/src/app/beneficiaries/domain/entity/beneficiarie'
import BeneficiarieParamsDTO from '~/src/app/beneficiaries/domain/dto/beneficiarieParamsDTO'
import {MembershipDetailsInputs} from '~/src/app/common/domain/entities/membershipDetailsInputs'
import {SaveBeneficiaryPayloadDto} from '~/src/app/beneficiaries/domain/dto/saveBeneficiaryPayloadDto'
import {Payload} from '~/src/app/common/domain/entities/payload'
import SaveBeneficiaryUseCase from '~/src/app/beneficiaries/application/saveBeneficiaryUseCase'
import Exception from '~/src/app/network/common/domain/entity/Exception'
import {SaveBeneficiaryResponseDto} from '~/src/app/beneficiaries/domain/dto/saveBeneficiaryResponseDto'
import {BeneficiariesMapper} from '~/src/app/beneficiaries/domain/mapper/beneficiariesMapper'
import {BeneficiarieDTO} from '~/src/app/beneficiaries/domain/dto/beneficiarieDTO'
import {MembershipTable} from '~/src/app/common/domain/entities/membershipTable'
import { LayoutStore } from './layoutStore'

@Store({
  name: 'BeneficiaryStore'
})
export class BeneficiaryStore extends Pinia {
  @lazyInject(beneficiaryType.beneficiariesRepository)
  private readonly beneficiariesRepository!: BeneficiariesRepository

  private beneficiaries: MembershipTable[] = []
  private beneficiariesComplete: BeneficiarieDTO[] = []
  private beneficiarySelected: Beneficiarie | null = null
  private beneficiaryDetails: MembershipDetailsInputs | null = null
  private saveBeneficiaryResponse: SaveBeneficiaryResponseDto | null = null

  public saveBeneficiaryUseCase = container.get<SaveBeneficiaryUseCase>(
    beneficiaryType.saveBeneficiaryUseCase
  )

  isLoading = false
  hasError = false

  get readBeneficiaries(): MembershipTable[] {
    return this.beneficiaries
  }

  get readBeneficiariesComplete(): BeneficiarieDTO[] {
    return this.beneficiariesComplete
  }

  get readSelectedBeneficiary(): Beneficiarie | null {
    return this.beneficiarySelected
  }

  get readBeneficiaryDetails(): MembershipDetailsInputs | null {
    return this.beneficiaryDetails
  }

  get readSaveBeneficiaryResponse(): SaveBeneficiaryResponseDto | null {
    return this.saveBeneficiaryResponse
  }

  get readIsLoading(): boolean {
    return this.isLoading
  }

  get layoutStore(): LayoutStore {
    return new LayoutStore()
  }

  async getBeneficiaries(params: BeneficiarieParamsDTO) {
    try {
      this.isLoading = true
      const beneficies: any = await this.beneficiariesRepository.getBeneficiaries(params)
      if (beneficies.data.data) {
        this.beneficiaries = BeneficiariesMapper.map(beneficies.data.data)
        this.beneficiariesComplete = beneficies.data.data
      }
      this.isLoading = false
      this.hasError = false
    } catch (error) {
      this.isLoading = false
      // console.log('ERROR BeneficiaryStore : ', error)
      this.hasError = true
    }
  }

  public async saveBeneficiary(payload: Payload<SaveBeneficiaryPayloadDto>): Promise<void> {
    try {
      const response: any = await this.saveBeneficiaryUseCase.run(payload)
      if (response) this.saveBeneficiaryResponse = response.data?.data
    } catch (e: any) {
      this.layoutStore.showSnackbar('', 'An error occurred while trying to save the beneficierie.')
    }
  }
}
