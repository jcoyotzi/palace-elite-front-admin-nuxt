import {PropertyEntity} from '../entities/propertyEntity'
import {PropertyData} from './../dto/propertyDto'

export class PropertyMapper {
  // function to map an array of properties
  public static map(properties: PropertyData[]): PropertyEntity[] {
    return properties.map(property => this.transform(property))
  }

  // function to map a single property
  public static transform(property: PropertyData): PropertyEntity {
    return {
      id: String(property.id),
      externalId: property.attributes.externalId,
      comingSoon: property.attributes.comingSoon,
      comingSoonLabel: property.attributes.comingSoonLabel,
      text: property.attributes.title,
      logo: {
        altText: property.attributes.logo?.altText,
        ext: property.attributes.logo?.media.data.attributes.ext,
        url: property.attributes.logo?.media.data.attributes.url
      },
      image: {
        name: property.attributes.media.media.data.attributes.name,
        alternativeText: property.attributes.media.media.data.attributes.alternativeText,
        caption: property.attributes.media.media.data.attributes.caption,
        width: property.attributes.media.media.data.attributes.width,
        height: property.attributes.media.media.data.attributes.height,
        hash: property.attributes.media.media.data.attributes.hash,
        ext: property.attributes.media.media.data.attributes.ext,
        mime: property.attributes.media.media.data.attributes.mime,
        size: property.attributes.media.media.data.attributes.size,
        url: property.attributes.media.media.data.attributes.url,
        previewUrl: property.attributes.media.media.data.attributes.previewUrl,
        provider: property.attributes.media.media.data.attributes.provider,
        provider_metadata: property.attributes.media.media.data.attributes.provider_metadata
      }
    }
  }
}
