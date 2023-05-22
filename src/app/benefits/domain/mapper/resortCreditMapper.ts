import rcPropertieEntity from '../entities/rcPropertyEntity'
import {PropertyEntity} from '~/src/app/property/domain/entities/propertyEntity'

export class ResortCreditPropertiesMapper {
  public static transform(properties: PropertyEntity[]): rcPropertieEntity[] {
    const available = this.getAvailableProperties(properties)
    return available.map(property => {
      return {
        text: property.text,
        value: property.externalId
      }
    })
  }

  public static getAvailableProperties(properties: PropertyEntity[]): PropertyEntity[] {
    return properties.filter(property => {
      return property.comingSoon === false
    })
  }
}
