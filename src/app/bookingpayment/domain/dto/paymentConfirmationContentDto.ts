import { LinkDto } from "~/src/app/layout/domain/dto/navbarDto"


export interface MediaDto {
  id:  number,
  title: string,
  altText: string,
  media: {
    data:{
      id: number,
      attributes:{
        name: string,
        alternativeText: string,
        caption: string,
        width: string,
        height: string,
        formats: any,
      },
      hash: string,
      ext: string,
      mime: string,
      size: number,
      url: string,
      previewUrl: string,
      provider: string,
      provider_metadata: string,
      }
    }
  }

export interface PaymentConfirmationContentDto {
  title: string,
  description: string,
  labelStores: string,
  locale: string,
  media: MediaDto,
  appStoreLink: LinkDto,
  appStoreImage: MediaDto,
  playStoreLink: LinkDto,
  playStoreImage: MediaDto,
  returnLink: LinkDto,
  helpLink: LinkDto,
}

export interface PaymentConfirmationDto {
  id: number,
  attributes: PaymentConfirmationContentDto,
}

export interface PaymentConformationData {
  data: PaymentConfirmationDto,
}
