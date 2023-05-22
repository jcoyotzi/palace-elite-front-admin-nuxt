import {LinksMapper} from '~/src/app/layout/domain/mapper/linksMapper'

const PEFooterAdapter: any = {
  blockToComponent: ({data, meta}: any) => ({
    data: {
      attributes: {
        ...data?.attributes,
        allRightsReserved: data?.attributes?.allRightsReserved,
        createdAt: data?.attributes?.createdAt,
        updatedAt: data?.attributes?.updatedAt,
        publishedAt: data?.attributes?.publishedAt,
        locale: data?.attributes?.locale,
        resorts: {
          ...data?.attributes?.resorts,
          links: LinksMapper.getStrapiToLinksMap(data?.attributes?.resorts?.links)
        },
        ourWebsites: {
          ...data?.attributes?.ourWebsites,
          links: LinksMapper.getStrapiToLinksMap(data?.attributes?.ourWebsites?.links)
        },
        resources: {
          ...data?.attributes?.resources,
          links: LinksMapper.getStrapiToLinksMap(data?.attributes?.resources.links)
        },
        newsletter: {
          ...data?.attributes?.newsletter,
          linkOne: LinksMapper.getStrapiToLink(data?.attributes?.newsletter?.linkOne),
          linkTwo: LinksMapper.getStrapiToLink(data?.attributes?.newsletter?.linkTwo)
        },
        legalInformation: LinksMapper.getStrapiToLinksMap(data?.attributes?.legalInformation)
      },
      id: data?.id
    },
    meta
  })
}

export {PEFooterAdapter}
