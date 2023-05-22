import {injectable} from 'inversify'
import {PropertyEntity} from './propertyEntity'
import {Property} from './property'

@injectable()
export default class PropertyModel implements Property {
  constructor() {}

  public isAvailable(property: PropertyEntity): boolean {
    return property.comingSoon
  }
}
