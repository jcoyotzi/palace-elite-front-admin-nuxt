import {Hero, Block, StrapiResortCreditDto} from '../dto/strapiResortCreditDto'

export class StrapiResortCreditMapper {
  static mapResortCreditPage(strapiObject: StrapiResortCreditDto) {
    return {
      hero: this.mapHero(strapiObject.data[0].attributes.hero),
      calculatorContent: this.mapContent(strapiObject.data[0].attributes.blocks.filter((item)=> item.__component === 'blocks.resort-credit-calculator')[0]),
      activitiesImage: this.mapImage(strapiObject.data[0].attributes.blocks.filter((item)=> item.__component === 'blocks.image')[0])
    }
  }

  static mapHero(hero: Hero) {
    const {title, size, media} = hero
    return {
      title,
      size,
      media: {
        title,
        alt: media.data.attributes.alternativeText,
        mime: media.data.attributes.mime,
        url: media.data.attributes.formats.large?.url
      }
    }
  }

  static mapContent(block: Block) {
    return {
      title: block.title,
      content: block.content,
      image: block.media.media?.data.attributes
    }
  }

  static mapImage(block: Block) {
    return block.media.media?.data.attributes
  }
}
