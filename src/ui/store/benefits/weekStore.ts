import {Pinia, Store} from 'pinia-class-component'
import CardProvitionDto from '~/src/app/benefits/domain/dto/cardProvitionDto'
import benefitsTypes from '~/src/app/common/types/benefitsTypes'
import PayloadGetWeeksProvitions from '~/src/app/benefits/domain/entities/payloadGetWeeksProvitions'
import PreferentialWeeksAndNightsDto from '~/src/app/benefits/domain/dto/preferentialWeeksAndNightsDto'
import {lazyInject} from '~/src/container'
import UseCase from '~/src/app/common/application/UseCase'
import PayloadGetWeeksAndNightsPreferentials from '~/src/app/benefits/domain/entities/payloadGetWeeksAndNightsPreferentials'
import {StrapiPreferentialMapper} from '~/src/app/benefits/domain/mapper/strapiPreferentialMapper'
import { StrapiPreferentialDto } from '~/src/app/benefits/domain/dto/strapiPreferentialDto'

@Store({
  name: 'weekStore'
})
export class WeekStore extends Pinia {
  @lazyInject(benefitsTypes.getWeeksProvitionsUseCase)
  private readonly getWeeksProvitionsUseCase!: UseCase<PayloadGetWeeksProvitions, any>

  @lazyInject(benefitsTypes.getWeeksAndNightsPreferentialsUseCase)
  private readonly getWeeksAndNightsPreferentialsUseCase!: UseCase<
    PayloadGetWeeksAndNightsPreferentials,
    any
  >

  @lazyInject(benefitsTypes.getStrapiPreferentialUseCase)
  private readonly getStrapiPreferential!: UseCase<any, any>

  private itemCardProvitionSelected: CardProvitionDto = {
    status: '',
    title: '',
    invoice: '',
    bottomText: '',
    expirationDate: '',
    buttonUse: false
  }

  public filters: any = {
    search: '',
    sort: {},
    filters: {}
  }

  public provitions: any[] = []

  propertiesCardsProvitionsList: CardProvitionDto[] = []

  private strapiPreferential: any = null

  propertiesCardsProvitionsFiltered: CardProvitionDto[] = []

  perPagePaginationProvitions: number = 5

  loadingPaginationProvitions: boolean = false

  public showDrawerCardProvitionDetails: boolean = false

  public weeksAndNightsPreferentials: PreferentialWeeksAndNightsDto = {
    title: '',
    assets: []
  }

  get cardProvitionSelected(): CardProvitionDto {
    return this.itemCardProvitionSelected
  }

  public setStrapiPreferential(response: StrapiPreferentialDto) {
    this.strapiPreferential = StrapiPreferentialMapper.mapPreferentialPage(response)
  }

  public get readStrapiProps() {
    return this.strapiPreferential
  }

  public get readPreferentialWeeksAndNights() {
    return this.weeksAndNightsPreferentials
  }

  public get readAvailableProvitions() {
    return this.propertiesCardsProvitionsList.filter(p => p.status === 'AVAILABLE')
  }

  public setItemCardProvition(card: CardProvitionDto): void {
    this.itemCardProvitionSelected = card
  }

  public setFilterSearch(search: string) {
    this.filters.search = search
  }

  public setFilterSortBy(sort: any) {
    this.filters.sort = sort
  }

  public setProvitions(provitions: any[]) {
    this.provitions = provitions
  }

  public setFilterSelecteds(filters: any[]) {
    this.filters.filters = filters
  }

  public async fetchWeeksProvitions(params: PayloadGetWeeksProvitions) {
    try {
      const {data} = await this.getWeeksProvitionsUseCase.run(params)
      this.propertiesCardsProvitionsList = data.data || []
    } catch (error) {
      console.error(error)
    }
  }

  public async fetchWeeksAndNightsPreferentials(params: PayloadGetWeeksAndNightsPreferentials) {
    const data = await this.getWeeksAndNightsPreferentialsUseCase.run(params)
    this.weeksAndNightsPreferentials = data || []
  }
}
