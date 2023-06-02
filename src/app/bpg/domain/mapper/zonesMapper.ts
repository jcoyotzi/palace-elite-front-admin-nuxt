import {ZoneDto} from '../entities/strapiBpg'

export class ZonesMapper {
  public static map(zones: any[]): ZoneDto[] {
    return (
      zones
        .map((zone: any) => {
          const properties = zone?.attributes?.properties?.data || []
          return {
            title: zone?.attributes?.name,
            order: zone?.attributes.bpgOrder,
            properties:
              properties
                .map((propertie: any) => ({
                  ...propertie.attributes,
                  order: propertie?.attributes.bpgOrder || '99',
                  code: propertie.attributes.externalId,
                  url: propertie?.attributes?.media?.media?.data?.attributes?.url,
                  bpgSuiteAccessYears: propertie?.attributes?.bpgSuiteAccessYears || ''
                }))
                .sort((a: any, b: any) => {
                  return a.order - b.order
                }) || []
          }
        })
        .sort((a: any, b: any) => {
          return a.order - b.order
        }) || []
    )
  }
}
