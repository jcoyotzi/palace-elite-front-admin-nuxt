import dayjs from "dayjs";
import { LinksMapper } from "~/src/app/layout/domain/mapper/linksMapper";

const PEOfferTextAdapter: any = {
  blockToComponent: (attributes: any) => {
    const data: any = {
      id: `${attributes.__component}-${attributes.id}`,
      caption: attributes.caption,
      title: attributes.title,
      content: attributes.content,
      buttonPrimary: LinksMapper.getStrapiToLinkOffer(attributes.buttonPrimary),
      buttonSecondary: LinksMapper.getStrapiToLinkOffer(attributes.buttonSecondary),
      title2: attributes.title2,
      content2: attributes.content2,
      termsAndConditionsLabel: attributes.termsAndConditionsLabel,
      termsAndConditionsContent: attributes.termsAndConditionsContent,
    }

    if (attributes.countdown) {
      data.countDown = {
        title: attributes.countdown.hurryLabel,
        endTime: dayjs(attributes.countdown.endDate),
        dayLabel: attributes.countdown.daysLabel,
        hourLabel: attributes.countdown.hoursLabel,
        minuteLabel: attributes.countdown.minutesLabel,
        secondLabel: attributes.countdown.secondsLabel,
      }
    }

    return data;
  }
}

export { PEOfferTextAdapter };
