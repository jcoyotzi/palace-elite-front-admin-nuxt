import {Store, Pinia} from 'pinia-class-component'
import {lazyInject} from '~/src/container'
import modalAndCollapsibleTypes from '~/src/app/common/types/modalAndContentTypes'
import GetModalAndContentUseCase from '~/src/app/modals/application/getModalAndContentUseCase'
import {ModalContent} from '~/src/app/modals/domain/dto/modalAndContentDto'

@Store({
  name: 'modalAdnContentStore'
})
export class ModalAndContentStore extends Pinia {
  @lazyInject(modalAndCollapsibleTypes.getModalAndContentUseCase)
  private readonly getModalUseCase!: GetModalAndContentUseCase

  async fetchModalContent(code: string) {
    const data = await this.getModalUseCase.run(code).catch((error) => {
      console.log(`error fetching ModalContent`, error)
    })
    return data
  }
}
