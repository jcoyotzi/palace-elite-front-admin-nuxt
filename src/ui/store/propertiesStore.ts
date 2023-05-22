import {Store, Pinia} from 'pinia-class-component'
import propertyTypes from '../../app/common/types/propertyTypes'
import {lazyInject} from '../../container'
import { currentLocale } from '../utils/currentLocaleByCookie'
import {PropertyEntity} from '@/src/app/property/domain/entities/propertyEntity'
import GetPropertyUseCase from '@/src/app/property/application/getPropertyUseCase'
import GetPropertyAccessUseCase from '~/src/app/property/application/getPropertyAccessUseCase'
import {PropertyAccessRequestDto} from '~/src/app/property/domain/dto/PropertyAccessDto/PropertyAccessRequestDto'
import {propertyAccessEntity} from '~/src/app/property/domain/entities/propertyAccessEntity'
import {PropertyFeatures} from '~/src/app/property/domain/dto/propertyFeatures'
import PersistentStoreLocalStorageRepository from '~/src/app/common/infrastructure/store/PersistentStoreLocalStorageRepository'
import {baglioniCodes} from '~/src/app/property/domain/data/baglioniCodes'
import rulesTypes from '~/src/app/common/types/rulesTypes'
import UseCase from '~/src/app/common/application/UseCase'
import {RuleEngineRequest, RuleEngineResponse} from '~/src/app/rules/application/runEngineUseCase'
import {PipelinesEnum} from '~/src/app/rules/domain/entities/enum/pipelinesEnum'

const persistence = new PersistentStoreLocalStorageRepository([
  'propertiesAccess',
  'properties',
  'accessBaglioni'
])

@Store({
  name: 'propertiesStore'
})
export class PropertiesStore extends Pinia {
  @lazyInject(propertyTypes.getPropertyUseCase)
  private readonly getPropertiesUseCase2!: GetPropertyUseCase

  @lazyInject(propertyTypes.getPropertyAccessUseCase)
  private readonly getPropertyAccessUseCase!: GetPropertyAccessUseCase

  @lazyInject(rulesTypes.runEngineUseCase)
  private readonly runEngine!: UseCase<RuleEngineRequest, RuleEngineResponse>

  properties: PropertyEntity[] | null = null
  accessBaglioni = true

  // baglioniCodes = ['BALO', 'LUVE', 'RERO', 'BAMA', 'BAPU', 'BASA', 'CABA', 'SAFI']

  propertiesAccess: propertyAccessEntity[] | null = null

  propertiesFeatures: PropertyFeatures[] = [
    {
      id: '123e4567-e89b-12d3-a456-426614174000',
      name: 'Beach palace',
      code: 'BP',
      maxGuests: 6,
      onlyAdults: false
    },
    {
      id: '123e4567-e89b-12d3-a456-426614174001',
      name: 'Cozumel Palace',
      code: 'CZ',
      maxGuests: 6,
      onlyAdults: false
    },
    {
      id: '123e4567-e89b-12d3-a456-426614174002',
      name: 'Le blanc spa resort Cancun',
      code: 'LBC',
      maxGuests: 6,
      onlyAdults: true
    },
    {
      id: '123e4567-e89b-12d3-a456-426614174009',
      name: 'Moon Palace Nizuc',
      code: 'MPC',
      maxGuests: 6,
      onlyAdults: false
    },
    {
      id: '123e4567-e89b-12d3-a456-426614174006',
      name: 'Moon Palace The Grand Cancun',
      code: 'MPG',
      maxGuests: 6,
      onlyAdults: false
    },
    {
      id: '123e4567-e89b-12d3-a456-4266141740010',
      name: 'Moon Palace Sunrise',
      code: 'MPS',
      maxGuests: 6,
      onlyAdults: false
    },
    {
      id: '123e4567-e89b-12d3-a456-426614174007',
      name: 'Playacar Palace',
      code: 'PL',
      maxGuests: 6,
      onlyAdults: false
    },
    {
      id: '123e4567-e89b-12d3-a456-426614174008',
      name: 'Sun Palace',
      code: 'SP',
      maxGuests: 6,
      onlyAdults: true
    },
    {
      id: '123e4567-e89b-12d3-a456-426614174005',
      name: 'Moon Palace Jamaica',
      code: 'ZCJG',
      maxGuests: 6,
      onlyAdults: false
    },
    {
      id: '123e4567-e89b-12d3-a456-426614174004',
      name: "Owner's Estate Punta Cana",
      code: 'PLZCVPC',
      maxGuests: 6,
      onlyAdults: false
    },
    {
      id: '123e4567-e89b-12d3-a456-426614174003',
      name: 'Le blanc spa resort Los Cabos',
      code: 'ZPLB',
      maxGuests: 6,
      onlyAdults: true
    }
  ]

  featuresByProperty(code: string) {
    return this.propertiesFeatures.filter(property => property.code === code)
  }

  getPropertyById(id: string) {
    return this.properties?.find(property => property.externalId === id)
  }

  getOperaid(hotelCode: string): string {
    return this.propertiesAccess?.find(property => property.hotel === hotelCode)?.operaId || ''
  }

  get propertiesFilteredByMembership() {
    const propertiesWithAccess = this.propertiesAccess?.map(property => property.hotel)

    let properties_ = this.properties
    if (true) {
      properties_ =
        this.properties?.filter(property => propertiesWithAccess?.includes(property.externalId)) ||
        []
    }

    const propertiesSoted = properties_!.sort(function (propertyA, propertyB) {
      return Number(propertyA.id) - Number(propertyB.id)
    })

    return propertiesSoted
  }

  get allProperties() {
    return this.properties
  }

  async fetchPropertiesStrapi() {
    const response = await this.getPropertiesUseCase2.run(currentLocale())
    this.properties = response
    persistence.save(this)
  }

  async fetchPropertiesAccess(payload: PropertyAccessRequestDto) {
    // console.log('Running Property Access')
    const response = await this.getPropertyAccessUseCase.run(payload)
    this.propertiesAccess = response.properties
    this.accessBaglioni = response.accessBaglioni
    // this.accessBaglioni = response.accessBaglioni
    persistence.save(this)
  }

  async fetchGroupingData(hotel: string) {
    const fact = {
      hotel
    }
    const pipeline = PipelinesEnum.BAGLIONI_PAXES
    return await this.runEngine.run({fact, pipeline})
  }

  get givemePropertiesAccess() {
    return this.propertiesAccess
  }

  public initStore(): void {
    if (process.client) {
      // console.log('voy a hidratar!! desde propertiesStore')

      // @ts-ignore
      persistence.hydrate(this)
    }
  }
}
