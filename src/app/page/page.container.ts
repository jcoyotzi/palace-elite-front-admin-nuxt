import {ContainerModule, interfaces} from 'inversify'
import pageTypes from '../common/types/pageTypes'
import PageRepository from './domain/repositories/pageRepository'
import PageServiceRepository from './domain/repositories/pageServiceRepository'

export default new ContainerModule((bind: interfaces.Bind) => {
  bind<PageRepository>(pageTypes.pageRepository).to(PageServiceRepository)
})
