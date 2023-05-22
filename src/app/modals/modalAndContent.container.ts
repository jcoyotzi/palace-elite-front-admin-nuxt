import {ContainerModule, interfaces} from 'inversify'
import modalAndContentTypes from '../common/types/modalAndContentTypes'
import GetModalAndContentUseCase from './application/getModalAndContentUseCase'
import { ModalAndContentRepository } from './domain/repositories/modalAndContentRepository'
import ModalAndContentServiceRepository from './domain/repositories/modalAndContentServiceRepository'

export default new ContainerModule((bind: interfaces.Bind) => {
  bind<ModalAndContentRepository>(modalAndContentTypes.modalAndContentRepository).to(ModalAndContentServiceRepository)
  bind<GetModalAndContentUseCase>(modalAndContentTypes.getModalAndContentUseCase).to(GetModalAndContentUseCase)
})
