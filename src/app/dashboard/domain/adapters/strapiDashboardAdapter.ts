import {Block, Hero, StrapiDashboardDto} from '../dto/strapiDashboardDto'
import { LinksMapper } from '~/src/app/layout/domain/mapper/linksMapper'

export class StrapiDashboardAdapter {
  static mapDashboardPage(strapiObject: StrapiDashboardDto) {
    const object = strapiObject.data[0].attributes
    if (!object) return null
    return {
      hero: this.mapHero(object.hero),
      offer: this.mapOffer(object.blocks[0], object.locale)
    }
  }

  static mapHero(hero: Hero) {
    const {title, size, enableNotMemberBanner, media} = hero
    return {
      title,
      size,
      enableNotMemberBanner,
      media: {
        title: media.data.attributes.caption,
        alt: media.data.attributes.alternativeText,
        mime: media.data.attributes.mime,
        url: media.data.attributes.url
      }
    }
  }

  static mapOffer(block: Block, locale: string) {
    if (!block) return null
    const {firstButton, secondButton, title, content, countdown, media} = block
    return {
      title,
      firstButton: LinksMapper.getStrapiToLinkOffer(firstButton, locale),
      secondButton:  LinksMapper.getStrapiToLinkOffer(secondButton, locale),
      content,
      image: {
        title: media.media.data.attributes.caption,
        alt: media.media.data.attributes.alternativeText,
        mime: media.media.data.attributes.mime,
        url: media.media.data.attributes.url
      },
      days: countdown.daysLabel,
      hours: countdown.hoursLabel,
      minutes: countdown.minutesLabel,
      seconds: countdown.secondsLabel,
      hurryLabel: countdown.hurryLabel,
      endDate: new Date(countdown.endDate)
    }
  }
}
