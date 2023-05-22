import {LinkEntity, LinkGroupSection} from './linkEntity'

export interface MenuEntity {
  loginLabel: string
  logoutLabel: string
  primaryLinks: LinkEntity[]
  secondaryLinks: LinkEntity[]
  telephone: string
}

export interface MenuGroupEntity {
  loginLabel: string
  logoutLabel: string
  primaryLinks: (LinkEntity | LinkGroupSection)[]
  secondaryLinks: LinkEntity[]
  telephone: string
}

export interface MenuTypeOfDeviceEntity {
  desktop: MenuEntity
  mobile: MenuGroupEntity
}
