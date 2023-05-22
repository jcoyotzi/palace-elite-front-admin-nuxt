import {NavbarEntity} from '../entities/navbarEntity'
import {Navbar} from '../dto/navbarDto'
import {LinksMapper} from './linksMapper'
import {ImageMapper} from './imageMapper'
import {PropertieMapper} from './propertieMapper'

export class NavbarMapper {
  public static transform(navbar: Navbar): NavbarEntity {
    const {attributes} = navbar

    attributes?.destinationsAndResorts?.properties?.data?.sort(function (propertyA, propertyB) {
      return Number(propertyA.id) - Number(propertyB.id);
    })

    return {
      logoIcon: ImageMapper.transform(attributes?.logoMobile),
      logoImg: ImageMapper.transform(attributes?.logo),
      home: {
        link: LinksMapper.getStrapiToLink(attributes?.home),
        onlyShowToAuthenticate: false
      },
      phone: {
        phoneNumber: attributes?.telephone.telephone?.data?.attributes.telephone,
        onlyShowToAuthenticate: false
      },
      contactUs: {
        link: LinksMapper.getStrapiToLink(attributes.contactUs),
        onlyShowToAuthenticate: false
      },
      destinations: {
        onlyShowToAuthenticate: false,
        properties: PropertieMapper.transform(attributes.destinationsAndResorts),
        destinations: [],
        destinationTitle: attributes?.destinationsAndResorts.label
      },
      dashboard: {
        onlyShowToAuthenticate: true,
        link: LinksMapper.getStrapiToLink(attributes?.dashboard)
      },
      benefits: {
        onlyShowToAuthenticate: true,
        label: attributes?.benefitsLabel,
        weeks: {
          label: attributes?.benefitsWeeks.title || '',
          links: LinksMapper.getStrapiToLinksMap(attributes?.benefitsWeeks.links)
        },
        programs: {
          label: attributes?.benefitsPrograms.title,
          links: LinksMapper.getStrapiToLinksMap(attributes?.benefitsPrograms.links)
        },
        wallet: {
          label: attributes?.benefitsWallet.title,
          links: LinksMapper.getStrapiToLinksMap(attributes?.benefitsWallet.links)
        }
      },
      membership: {
        onlyShowToAuthenticate: true,
        label: attributes?.membershipLabel || '',
        information: {
          label: attributes?.membershipMyInformation.title,
          links: LinksMapper.getStrapiToLinksMap(attributes?.membershipMyInformation.links)
        }
      },
      bookings: {
        onlyShowToAuthenticate: false,
        link: LinksMapper.getStrapiToLink(attributes.bookings)
      },
      offers: {
        onlyShowToAuthenticate: false,
        link: LinksMapper.getStrapiToLink(attributes.offers)
      },
      loginLabel: {
        onlyShowToAuthenticate: false,
        label: attributes?.loginLabel || ''
      }
    }
  }
}
