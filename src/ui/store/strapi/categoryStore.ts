import {Pinia, Store} from 'pinia-class-component'
import categoryTypes from '../../../app/common/types/categoryTypes'
import {lazyInject} from '../../../container'
import {CategoryEntity} from '../../../app/category/domain/entities/category'
import GetCategoryUseCase from '../../../app/category/application/getCategoryUseCase'
import {RoomAccess} from '../../../app/roomAccess/domain/entities/roomAccess'
import {BookingStore} from '../bookingStore'
import {
  AccessibleCategories,
  mapmemberCategories
} from '~/src/app/category/domain/mapper/AccesibleCategories'

@Store({
  name: 'categoryStore'
})
export class CategoryStore extends Pinia {
  @lazyInject(categoryTypes.getCategoryUseCase)
  private readonly getCategoryUseCase!: GetCategoryUseCase

  categories: CategoryEntity[] | null = null

  mappedCategories: AccessibleCategories[] = []

  mappedPresidentialCategories: AccessibleCategories[] = []

  async fetchCategories(hotelCode: string) {
    const FetchedCategories = await this.getCategoryUseCase.run({hotelCode})
    this.categories = FetchedCategories
  }

  async setMappedCategories() {
    const bookingInstance = new BookingStore()
    const memberCategories = bookingInstance.accessRoom
    const categories = this.categories
    this.mappedCategories = mapmemberCategories(categories, memberCategories)
  }

  async setMappedPresidentialCategories() {
    const bookingInstance = new BookingStore()
    const memberCategories = bookingInstance.allRooms
    const categories = this.categories
    this.mappedPresidentialCategories = mapmemberCategories(categories, memberCategories)
  }

  get getMappedCategories(): AccessibleCategories[] {
    return this.mappedCategories
  }

  get getMappedPresidentialCategories(): AccessibleCategories[] {
    return this.mappedPresidentialCategories
  }
}
