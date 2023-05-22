export interface LinkEntity {
  label?: string
  tag?: string
  to?: Record<string, any> | string
  href?: string
  target?: string
  slug?: string
}
export interface LinkGroup {
  id: number
  label: string
  links: LinkEntity[]
}

export interface LinkGroupSection {
  id: number
  slug: string
  label: string
  groups: LinkGroup[]
}
