// import {LinksMapper} from '~/src/app/layout/domain/mapper/linksMapper'
import {Block} from '../entities/strapiBpg'

import {baglioniCodes} from '~/src/app/property/domain/data/baglioniCodes'

export class ContentDataPageMapper {
  public static privacy(page: any) {
    const attributes = page?.data[0]?.attributes
    const blocks: Block[] = attributes?.blocks
    const content = blocks.find(
      (block: any) => block.__component === 'blocks.title-content-collapsible'
    )

    return {
      title: content?.title,
      content: content?.content
    }
  }

  public static policys(page: any) {
    const attributes = page?.data[0]?.attributes
    const blocks = attributes?.blocks
    const policies = blocks.find((block: any) => block.__component === 'blocks.bpg-policies')
    const description = blocks.find((block: any) => block.__component === 'blocks.description')

    return {
      title: attributes?.title,
      tabs: [
        {code: 0, title: policies?.collection?.title, content: policies?.collection?.content},
        {code: 1, title: policies?.titleReservations, content: policies?.reservations}
      ],
      description: description?.description
    }
  }

  // public static universalCredit(page: any) {
  //   const attributes = page?.data[0]?.attributes
  //   const blocks = attributes?.blocks
  //   const content = blocks.find((block: any) => block.__component === 'blocks.booking-offer')

  //   const data = {
  //     title: attributes?.title,
  //     contentTitle: content?.title,
  //     content: content?.content,
  //     buttons: []
  //   }

  //   if (content?.firstButton) {
  //     //@ts-ignore
  //     data.buttons.push(LinksMapper.getStrapiToLink(content?.firstButton))
  //   }

  //   if (content?.secondButton) {
  //     //@ts-ignore
  //     data.buttons.push(LinksMapper.getStrapiToLink(content?.secondButton))
  //   }

  //   return data
  // }

  public static getTableGroupAccess(roomHotelAccess: any) {
    const accessGroup = new Map()

    const EXCLUDED_ROOM_GROUPS = ['V', 'R', 'BR', 'BV']

    const roomCategoriesOrder: any = {
      S: 0,
      ST: 1,
      G: 2,
      F: 3,
      P: 4,
      PS: 5,
      PD: 6,
      PL: 7,
      R: 8,
      V: 9
    }

    const filterAccess = roomHotelAccess.filter(
      (access: any) =>
        !['ZCVPC', ...baglioniCodes].includes(access.hotel) &&
        access.quantity >= 1 &&
        !EXCLUDED_ROOM_GROUPS.includes(access.groupId)
    )

    filterAccess.sort(function (a: any, b: any) {
      return b.quantity - a.quantity
    })

    filterAccess.sort(function (a: any, b: any) {
      return roomCategoriesOrder[a.groupId] - roomCategoriesOrder[b.groupId]
    })

    filterAccess.map((access: any) => {
      const {
        quantity,
        roomTypeDescription,
        hotel,
        validity,
        roomTypeGroupId,
        accessYear,
        periodType,
        dateFrom,
        dateTo,
        groupId,
        roomTypeCategory,
        roomTypeId,
        roomTypeGroupDescription,
        group
      } = access

      const roomTypeDescriptionFormated =
        roomTypeDescription !== null ? roomTypeDescription.trim() : roomTypeDescription

      if (accessGroup.has(groupId)) {
        const tempAccessGroup = accessGroup.get(groupId)

        if (tempAccessGroup.has(quantity)) {
          let tempQuantityAccessGroup = tempAccessGroup.get(quantity)

          if (tempQuantityAccessGroup.has(roomTypeDescriptionFormated)) {
            const tempRoomAccessGroup = tempQuantityAccessGroup.get(roomTypeDescriptionFormated)

            tempRoomAccessGroup.hotel.push(hotel)
            tempRoomAccessGroup.roomTypeGroupId.push(roomTypeGroupId)
            tempRoomAccessGroup.validity.push(validity)
            tempRoomAccessGroup.periodType.push(periodType)
            tempRoomAccessGroup.accessYear.push(accessYear)
            tempRoomAccessGroup.dateFrom.push(dateFrom)
            tempRoomAccessGroup.dateTo.push(dateTo)
            tempRoomAccessGroup.roomTypeCategory.push(roomTypeCategory)
          } else {
            tempQuantityAccessGroup.set(roomTypeDescriptionFormated, {
              roomTypeId: roomTypeId,
              roomTypeDescription: roomTypeDescription,
              hotel: [hotel],
              roomTypeGroupId: [roomTypeGroupId],
              roomTypeGroupDescription: roomTypeGroupDescription,
              roomTypeCategory: [roomTypeCategory],
              group: group,
              validity: [validity],
              periodType: [periodType],
              accessYear: [accessYear],
              dateFrom: [dateFrom],
              dateTo: [dateTo]
            })
          }
        } else {
          const tempRoomAccessGroup = new Map()

          tempRoomAccessGroup.set(roomTypeDescriptionFormated, {
            roomTypeId: roomTypeId,
            roomTypeDescription: roomTypeDescription,
            hotel: [hotel],
            roomTypeGroupId: [roomTypeGroupId],
            roomTypeGroupDescription: roomTypeGroupDescription,
            roomTypeCategory: [roomTypeCategory],
            group: group,
            validity: [validity],
            periodType: [periodType],
            accessYear: [accessYear],
            dateFrom: [dateFrom],
            dateTo: [dateTo]
          })
          tempAccessGroup.set(quantity, tempRoomAccessGroup)
        }
      } else {
        const tempAccessGroup = new Map()
        const tempRoomAccessGroup = new Map()

        tempRoomAccessGroup.set(roomTypeDescriptionFormated, {
          roomTypeId: roomTypeId,
          roomTypeDescription: roomTypeDescription,
          hotel: [hotel],
          roomTypeGroupId: [roomTypeGroupId],
          roomTypeGroupDescription: roomTypeGroupDescription,
          roomTypeCategory: [roomTypeCategory],
          group: group,
          validity: [validity],
          periodType: [periodType],
          accessYear: [accessYear],
          dateFrom: [dateFrom],
          dateTo: [dateTo]
        })

        tempAccessGroup.set(quantity, tempRoomAccessGroup)
        accessGroup.set(groupId, tempAccessGroup)
      }
    })

    return accessGroup
  }
}
