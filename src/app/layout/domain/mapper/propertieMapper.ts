import {DestinationsAndResortsDto} from '../dto/navbarDto'
import {Propertie} from '../entities/navbarEntity'
import {ImageMapper} from './imageMapper'
import {LinksMapper} from './linksMapper'

export class PropertieMapper {
  public static transform({properties}: DestinationsAndResortsDto): Propertie[] {

    if (!properties) return [];

    return properties.data.map(propertie => {
      return {
        externalId: propertie?.attributes?.externalId || '',
        label: propertie?.attributes?.title || '',
        url: propertie?.attributes?.link?.page?.data?.attributes?.slug || '',
        link: LinksMapper.getStrapiToLinkResort(propertie?.attributes?.link),
        img: ImageMapper.transform(propertie.attributes.media),
        comingSoon: propertie?.attributes?.comingSoon || false,
        comingSoonLabel: propertie?.attributes?.comingSoonLabel || '',
        resortCity: propertie.attributes.resortCity.data ? {
          name: propertie.attributes.resortCity.data?.attributes.name,
          properties: propertie.attributes.resortCity.data?.attributes.properties
        } : null
      }
    })
  }
}
