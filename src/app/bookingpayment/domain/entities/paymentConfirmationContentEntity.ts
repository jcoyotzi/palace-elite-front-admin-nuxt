import { LinkEntity } from "~/src/app/layout/domain/entities/linkEntity";

export interface PaymentConfirmationContentEntity {
  title: string,
  description: string,
  labelStores: string,
  image: any,
  appStoreLink: LinkEntity,
  appStoreImage: any,
  playStoreLink: LinkEntity,
  playStoreImage: any,
  returnLink: LinkEntity,
  helpLink: LinkEntity,
}
