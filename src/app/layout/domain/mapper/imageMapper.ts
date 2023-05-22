import {MediaDTO} from '../dto/navbarDto'
import {ImageStrapi} from '../entities/navbarEntity'

export class ImageMapper {
  public static transform(image: MediaDTO): ImageStrapi | null{
    if (!image) return null
    return {
      mime: '',
      url: image.media.data.attributes.url,
      alt: image.media.data.attributes.alternativeText,
      title: image.title,
      formats: {
        small: {
          url: image.media.data.attributes.url
        },
        medium: {
          url: image.media.data.attributes.url
        },
        large: {
          url: image.media.data.attributes.url
        }
      },
      caption: image.media.data.attributes.caption,
      alternativeText: image.media.data.attributes.alternativeText
    }
  }
}
