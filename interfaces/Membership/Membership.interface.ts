interface BreadcrumbItem {
  title: any
  page: string
  key?: string
}

interface MembershipItem {
  title: any
  page: string
  icon: string
  hidden?: boolean
}

export {MembershipItem, BreadcrumbItem}
