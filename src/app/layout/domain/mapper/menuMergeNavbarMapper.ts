import {LinkEntity, LinkGroupSection} from '../entities/linkEntity'
import {MenuEntity, MenuTypeOfDeviceEntity} from '../entities/menuEntity'
import {NavbarEntity} from '../entities/navbarEntity'

export class MenuMergeNavbarMapper {
  public static transform(menu: MenuEntity, navbar: NavbarEntity): MenuTypeOfDeviceEntity {
    const primaryLinksDesktop: (LinkEntity | LinkGroupSection)[] = []
    const primaryLinksMobile: (LinkEntity | LinkGroupSection)[] = []

    menu.primaryLinks.forEach(primaryLink => {
      if (!primaryLink) return;

      primaryLinksDesktop.push(primaryLink)

      switch (primaryLink.slug) {
      case 'summary-and-payments':
        primaryLinksMobile.push({
          id: 1,
          slug: primaryLink.slug,
          label: primaryLink.label,
          groups: [
            {
              id: 1,
              label: navbar.membership?.information?.label,
              links: navbar.membership?.information?.links
            }
          ]
        })
        break
      case 'imperial-weeks':
        primaryLinksMobile.push({
          id: 2,
          slug: primaryLink.slug,
          label: primaryLink.label,
          groups: [
            {
              id: 1,
              label: navbar.benefits?.weeks?.label,
              links: navbar.benefits?.weeks.links,
            },
            {
              id: 2,
              label: navbar.benefits?.programs?.label,
              links: navbar.benefits?.programs?.links,
            },
            {
              id: 3,
              label: navbar.benefits?.wallet?.label,
              links: navbar.benefits?.wallet?.links,
            }
          ]
        })
        break
      default:
        primaryLinksMobile.push(primaryLink)
        break
      }
    })

    return {
      desktop: {
        logoutLabel: menu.logoutLabel,
        loginLabel: menu.loginLabel,
        primaryLinks: primaryLinksDesktop,
        secondaryLinks: menu.secondaryLinks,
        telephone: menu.telephone
      },
      mobile: {
        logoutLabel: menu.logoutLabel,
        loginLabel: menu.loginLabel,
        primaryLinks: primaryLinksMobile,
        secondaryLinks: menu.secondaryLinks,
        telephone: menu.telephone
      }
    }
  }
}
