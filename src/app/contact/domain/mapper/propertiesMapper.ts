import {PropertiesDto, IProperty} from '../dto/propertiesDto'
import {PropertyData} from '~/src/app/property/domain/dto/propertyDto'

export class PropertiesMapper {
  static mapProperties(PropertiesObject: PropertiesDto) {
    const array = PropertiesObject.data
    if (!array) return

    return {
      properties: this.mapPropertiesArray(array)
    }
  }

  static mapPropertiesArray(props: PropertyData[]): IProperty[] {
    const propertiesMapped: IProperty[] = props.map(prop => {
      return {
        id: prop.id,
        title: prop.attributes.title,
        image: {
          mime: prop.attributes.media.media.data.attributes.mime,
          url: prop.attributes.media.media.data.attributes.url,
          alt: prop.attributes.media.media.data.attributes.alternativeText,
          title: prop.attributes.title
        }
      }
    })

    return propertiesMapped
  }
}
