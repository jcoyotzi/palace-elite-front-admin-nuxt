import { IRewardNight, PropertySearch, RewardNightDTO } from "../dto/rewardNightDTO"

export class RewardNightsMapper {
  static mapRewardNights(nightsArray: RewardNightDTO) {
    if(!nightsArray) return
    const array = nightsArray.data
    if (!array) return

    return this.mapNightsArray(array)
  }

  static mapNightsArray(array: PropertySearch[]): IRewardNight[] {
    const mappedArray = array.map((block) => {
      if(!block.attributes.buildSearch) return null

      return {
        externalId: block.attributes.externalId,
        title: block.attributes.buildSearch.title,
        summary: block.attributes.buildSearch.description,
        services: block.attributes.buildSearch.content,
        amenities: block.attributes.buildSearch.viewAmenitiesContent,
        amenitiesLabel: block.attributes.buildSearch.viewAmenitiesLabel,
        offerExpiration: block.attributes.buildSearch.offerEndsDate ? {
          text: block.attributes.buildSearch.offerEndsLabel,
          endTime: new Date( block.attributes.buildSearch.offerEndsDate ),
          uppercase: true
        } : null,
        specialOffer:  block.attributes.buildSearch.isSpecialOffer,
        images: block.attributes.buildSearch.slider.data.map(slide => slide.attributes),
        category: block.attributes.buildSearch.type
      }
    })

    return mappedArray.filter((item) => item) as [];
  }
}
