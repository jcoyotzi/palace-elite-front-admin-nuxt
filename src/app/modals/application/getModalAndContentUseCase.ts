import {injectable, inject} from 'inversify'
import UseCase from '../../common/application/UseCase'
import modalAndContentTypes from '../../common/types/modalAndContentTypes'
import { GetModalAndContentDto, ModalContent } from '../domain/dto/modalAndContentDto'
import { ModalAndContentMapper } from '../domain/mapper/modalContentMapper'
import { ModalAndContentRepository } from '../domain/repositories/modalAndContentRepository'

@injectable()
export default class GetModalAndContentUseCase implements UseCase<String, ModalContent | null> {
  constructor(
    @inject(modalAndContentTypes.modalAndContentRepository)
    private readonly modalAndCollapsibleRepository: ModalAndContentRepository
  ) {}

  async run(code: string): Promise<ModalContent | null> {
    const response = await this.modalAndCollapsibleRepository.getModal(code)
    return ModalAndContentMapper.mapModal(response?.data!)
  }
}
