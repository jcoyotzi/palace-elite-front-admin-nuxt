import {ContainerModule, interfaces} from 'inversify'
import propertyTypes from '../common/types/propertyTypes'
import GetPropertyAccessUseCase from './application/getPropertyAccessUseCase'
import GetPropertyUseCase from './application/getPropertyUseCase'
import {PropertiesAccessRepository} from './domain/repositories/propertiesAccessRepository'
import {PropertyRepository} from './domain/repositories/propertyRepository'
import PropertyServiceRepository from './domain/repositories/propertyServiceRepository'
import PropertiesAccessServiceRepository from './domain/repositories/propiertiesAcessServiceRepository'

/*  Contenedor de inversify (Injección de depencias Property)  */

export default new ContainerModule((bind: interfaces.Bind) => {
  bind<PropertyRepository>(propertyTypes.propertyRepository).to(PropertyServiceRepository)
  bind<GetPropertyUseCase>(propertyTypes.getPropertyUseCase).to(GetPropertyUseCase)
  bind<PropertiesAccessRepository>(propertyTypes.propertiesAccessRepository).to(
    PropertiesAccessServiceRepository
  )
  bind<GetPropertyAccessUseCase>(propertyTypes.getPropertyAccessUseCase).to(
    GetPropertyAccessUseCase
  )
})
