import { PEAmenitiesBanner } from "../types/PEAmenitiesBanner";

export function blockToComponent(response: PEAmenitiesBanner) {
  return {
    image: {
      mime: response.image.media.data.attributes.mime,
      url: response.image.media.data.attributes.url,
      alt: response.image.media.data.attributes.alternativeText,
      title: response.image.title,
      // formats: response.image.media.data.attributes.formats,
      alternativeText: response.image.media.data.attributes.alternativeText,
      caption: response.image.media.data.attributes.caption,
    },
    title: response.title,
    amenities: response.amenities.map((amenity) => ({
      title: amenity.description,
      icon: amenity.icon.name
    }))
  }
}
  