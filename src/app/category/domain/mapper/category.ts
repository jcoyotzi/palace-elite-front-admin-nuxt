import {CategoryEntity, ItemContent} from '../entities/category'
import {CategoryData, Gallery} from '../dto/categoryDto'

export class CategoryMapper {
  static map(categories: CategoryData[]): CategoryEntity[] {
    return categories.map(category => {
      return this.transform(category)
    })
  }

  static transform(category: CategoryData): CategoryEntity {
    return {
      area: category.attributes.sizeRoom,
      code: category.attributes.code,
      images: this.transformGallery(category.attributes.gallery),
      items: [
        this.transformFoldableContent(
          'Amenities',
          category.attributes?.amenitiesContentLeft,
          category.attributes?.amenitiesContentRight,
          category.attributes?.amenitiesIcons?.map(item => item.name)
        ),
        this.transformFoldableContent(
          'Booking Terms',
          category.attributes.bookingTermsContentLeft,
          category.attributes.bookingTermsContentRight
        )
      ],
      max: this.parsetoInt(category.attributes.maxNumberOfGuests),
      title: category.attributes.title,
      tour: category.attributes.urlVirtualTour?.url,
      sizeRoom: category.attributes.sizeRoom,
      isLockoff: category.attributes?.isLockoff ?? false
    }
  }

  static transformGallery(gallery: Gallery[]): any {
    return gallery.map((item: Gallery) => {
      return {
        mime: item.media.data.attributes.mime,
        url: item.media.data.attributes.url,
        alt: item.altText,
        title: item.title
      }
    })
  }

  static transformFoldableContent(
    header: string,
    contentLeft: string,
    contentRight: string,
    appendIcons: string[] = []
  ): ItemContent {
    return {
      appendIcons,
      content: {
        contentLeft,
        contentRight
      },
      header
    }
  }

  static parsetoInt(value: string): number {
    try {
      return parseInt(value)
    } catch (e) {
      // console.log(e)
      return 0
    }
  }
}
