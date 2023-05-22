import { Destination, DestinationDto } from '../dto/destinationsDto'

export class DestinationMapper {
  public static transform(destinations: DestinationDto[] | undefined): Destination[] {
    
    if (!destinations) return [];

    return destinations.map(destination => {
      return {
        id: destination.id,
        locale: destination.attributes.locale,
        name: destination.attributes.name
      }
    })
  }
}
