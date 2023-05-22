import {ResortCreditBenefitDTO, ResortCreditCategoryDTO} from '../dto/resortCreditDto'
import ActivityEntity from '../entities/activityEntity'

export default class ResortCreditActivitiesMapper {
  public static transform(categories: ResortCreditCategoryDTO[]): any {
    return categories
      .map(category => {
        return this.getActivities(
          category.attributes.resortCreditBenefits.data,
          category.attributes.title
        )
      })
      .flat()
  }

  public static getActivities(
    benefits: ResortCreditBenefitDTO[],
    category: string
  ): ActivityEntity[] {
    return benefits.map(benefit => {
      return this.getActivity(benefit, category)
    })
  }

  public static getActivity(activity: ResortCreditBenefitDTO, category: string): ActivityEntity {
    return {
      id: activity.id + activity.attributes.title,
      image: activity.attributes.media.media.data.attributes,
      title: activity.attributes.title,
      details: activity.attributes.details,
      seeDetailsLabel: activity.attributes.seeDetailsLabel,
      price: this.stringToNumber(activity.attributes.price),
      quantity: 0,
      unit: activity.attributes.paxLabel,
      category,
      minPax: activity.attributes.minPax,
      maxPax: activity.attributes.maxPax,
      paxLabel: activity.attributes.paxLabel,
      priceLabel: activity.attributes.priceLabel
    }
  }

  public static stringToNumber(string: string): number {
    return parseInt(string.replace('$', ''))
  }
}
