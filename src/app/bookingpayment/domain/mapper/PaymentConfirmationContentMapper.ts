import { PaymentConfirmationContentEntity } from "../entities/paymentConfirmationContentEntity";
import { PaymentConfirmationContentDto } from "../dto/paymentConfirmationContentDto"
import {LinksMapper} from '../../../layout/domain/mapper/linksMapper'

export default class PaymentConfirmationContentMaopper {
  public static transform(strapiContent: PaymentConfirmationContentDto): PaymentConfirmationContentEntity {
    return {
      title: strapiContent.title,
      description: strapiContent.description,
      labelStores: strapiContent.labelStores,
      image: strapiContent.media.media.data.attributes,
      appStoreLink:  this.getLinkWithoutLabel(strapiContent.appStoreLink),
      appStoreImage: strapiContent.appStoreImage.media.data.attributes,
      playStoreImage: strapiContent.playStoreImage.media.data.attributes,
      playStoreLink:   this.getLinkWithoutLabel( strapiContent.playStoreLink ),
      returnLink: LinksMapper.getSingle( strapiContent.returnLink ),
      helpLink: LinksMapper.getSingle( strapiContent.helpLink ),
    }
  }

  private static getLinkWithoutLabel(link: any) {
    const mappedLink = LinksMapper.getSingle(link)
    mappedLink.label = '';
    return mappedLink
  }
}
