<template>
  <div class="text-white w-full mt-2 mb-6">
    <table class="w-full">
      <thead>
        <tr class="ms-font-bold ms-font-sans ms-text-[16px] ms-text-blue-light">
          <td
            :class="getClassHeader(header, index)"
            v-for="(header, index) in headersTable"
            class="td-header"
          >
            {{ header.title }}
          </td>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(access, indexAccess) in accessGroupMapper"
          :style="getStyleAccessRow(indexAccess, access)"
          :class="getClassAccessRow(indexAccess, access)"
        >
          <td
            class="ms-text-center !ms-p-[10px] writing-mode ms-font-bold ms-text-gray-500"
            v-if="access?.accessNumber"
            :rowspan="getRowspan(access)"
          >
            <div
              class="!ms-border-r-[1px] !ms-border-gray-800 !ms-py-[0px] !ms-px-[40px]"
              style="height: 100% !important"
            >
              <span v-html="access?.accessNumber" />
            </div>
          </td>
          <td
            class="!ms-ml-6 !ms-my-4 writing-mode ms-text-gray-500"
            v-if="access?.accessNumber"
            :rowspan="getRowspan(access)"
          >
            <div class="!ms-border-r-[1px] !ms-border-gray-800">
              <div
                :class="getClassSuitesChoose(access, indexRoom)"
                style="margin-right: 25px !important"
                v-for="(room, indexRoom) in getRowsByGroupId(access)"
              >
                {{ room?.roomTypeDescription }}
              </div>
            </div>
          </td>
          <td
            :class="getClassBody(header, index, indexAccess, access)"
            v-for="(header, index) in headersColumn"
            v-if="access?.accessNumber"
            :rowspan="getRowspan(access)"
          >
            <div
              class="ms-text-gray-500"
              :style="getStyleBorderRight(index)"
            >
              <div
                v-for="(room, indexRoom) in getRowsByGroupId(access)"
                :class="getClassSuitesChoose(access, indexRoom)"
              >
                <div
                  class="ms-grid ms-place-items-center"
                  style="padding: 0px 20px"
                  v-if="showFlag(header, room)"
                >
                  <PEIcon size="28">check</PEIcon>
                </div>
                <div
                  :class="getClassSuitesChoose(access, indexRoom)"
                  v-else
                  >&nbsp;</div
                >
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Mixins} from 'vue-property-decorator'
import {IHeader} from '~/src/app/bpg/domain/dto/tableAccess'
import {GroupAccess} from '~/src/app/bpg/domain/entities/strapiBpg'
import i18nDayjsMixin from '../mixins/i18nDayjsMixin'
import i18n from '~/src/ui/i18n/messages/bpg.lang'

@Component({
  i18n
})
export default class TableAccessSuites extends Mixins(i18nDayjsMixin) {
  @Prop({default: () => [], type: Map}) accessGroup!: any

  @Prop({default: () => [], type: Array}) headers!: IHeader[]

  @Prop({default: () => [], type: Array}) groups!: any

  public groupItem: any = ''

  public get accessGroupMapper() {
    let accessGroup: any = []
    let accessPerYear: any[] = []

    for (const [keyGroup, group] of this.accessGroup) {
      let tempGroups = new Map()

      for (const [keyQuantityGroup, QuantityGroup] of group) {
        const groupIdRandom = Math.floor(Math.random() * 1000 + 1)
        const keyQuantityGroupAccess: number = keyQuantityGroup

        accessPerYear.push({
          keyQuantityGroup: keyQuantityGroupAccess,
          groupIdRandom
        })

        const tempKeys = Array.from(group.keys())

        const keyIndex = tempKeys.indexOf(keyQuantityGroup)

        let quantityToPrint = keyQuantityGroup

        if (tempKeys.length !== keyIndex + 1) quantityToPrint -= tempKeys[keyIndex + 1] as any

        tempGroups = this.mergeAccessMaps(QuantityGroup, tempGroups)

        for (const [keyRoomGroup, RoomsGroup] of tempGroups) {
          let accessNumber = ''

          if (RoomsGroup.periodType.includes('Y'))
            accessNumber = this.$t('accessPerYear', {access: quantityToPrint}) as string

          if (RoomsGroup.periodType.includes('T'))
            accessNumber = this.$t('accessValidTo', {
              quantityToPrint: quantityToPrint,
              date: this.i18nDayjs('MMMM DD, YYYY', RoomsGroup.dateTo[0].substr(0, 10)),
              access: RoomsGroup.accessYear[0]
            }) as string

          accessGroup.push({
            ...RoomsGroup,
            groupId: keyGroup,
            accessNumber,
            groupIdRandom,
            keyQuantityGroup: keyQuantityGroupAccess
          })
        }
      }
    }

    accessPerYear = accessPerYear.map((access, index) => ({
      ...access,
      color: Boolean((index + 1) % 2)
    }))

    let accGroup: any = []
    accessPerYear = accessPerYear.map((accessNumber: any) => {
      // busca las categorias "Standar" excepto la "Standar Suite"
      let accessStandar = accessGroup.filter(
        (access: any) =>
          access.groupIdRandom === accessNumber.groupIdRandom &&
          access.group === 'Standard' &&
          access.roomTypeId !== 'J'
      )

      // busca solo la categoria "Standar Suite"
      let accessStandarSuite = accessGroup.find(
        (access: any) =>
          access.roomTypeId === 'J' &&
          access.groupIdRandom === accessNumber.groupIdRandom &&
          access.group === 'Standard'
      )

      if (accessStandar.length > 0 && accessStandarSuite) {
        accessStandar.map((access: any) => {
          accessStandarSuite = {
            ...accessStandarSuite,
            hotel: [...accessStandarSuite.hotel, ...access.hotel]
          }
        })

        accessGroup = [
          accessStandarSuite,
          ...accessGroup.filter(
            (accessG: any) =>
              accessG.groupIdRandom !== accessNumber.groupIdRandom && accessG.group !== 'Standard'
          )
        ]
      }

      accGroup = [
        ...accGroup,
        ...accessGroup
          .filter((access: any) => access.groupIdRandom === accessNumber.groupIdRandom)
          .map((access: any, index: number) => ({
            ...access,
            accessNumber: index > 0 ? '' : access.accessNumber,
            color: accessNumber.color,
            roomTypeDescription:
              access.roomTypeId === 'DP' || access.roomTypeDescription.indexOf("iamond") >= 0 || access.roomTypeDescription.indexOf("iamante") > 0
                ? `${access.roomTypeDescription} *`
                : access.roomTypeDescription
          }))
      ]
    })
    return accGroup
  }

  public get accessColorMapper() {
    return this.accessGroupMapper.map((access: any) => access.groupIdRandom)
  }

  getClassSuitesChoose(access: any, indexRoom: number) {
    return {
      '!ms-mb-4':
        this.getRowsByGroupId(access)?.length !== indexRoom + 1 ||
        this.getRowsByGroupId(access)?.length !== 1
    }
  }

  getRowsByGroupId(access: any) {
    return (
      this.accessGroupMapper.filter((acc: any) => acc.groupIdRandom === access.groupIdRandom) || []
    )
  }

  getRowspan(access: any): number {
    return this.accessGroupMapper.filter((acc: any) => acc.groupIdRandom === access.groupIdRandom)
      ?.length
  }

  getClassHeader(header: IHeader, index: number) {
    return {
      'text-center': header.align === 'center',
      'pb-4': true,
      'px-6': header.align === 'center',
      'pr-24': index < 1
    }
  }

  getStyleBorderRight(index: number) {
    const style = {
      borderRight: ''
    }
    if (index + 1 !== this.headersColumn.length) style.borderRight = '1px solid #1F2937'
    return style
  }

  getClassBody(header: IHeader, index: number, indexAccess: number, access: any) {
    return {
      'text-center': header.align === 'center',
      '!ms-mb-4': this.getRowsByGroupId(access)?.length !== indexAccess + 1,
      'tr-bg': access.color,
      'td-right': index === this.headersColumn.length - 1
    }
  }

  get headersColumn(): IHeader[] {
    return this.headers.filter((header, index) => index > 1)
  }

  get headersTable() {
    return [...this.headersDefualt, ...this.headersColumn]
  }

  get headersDefualt(): IHeader[] {
    return this.headers.filter((header, index) => index < 2)
  }

  showFlag(header: IHeader, access: any): boolean {
    return this.accessGroupMapper
      .find(
        (acc: any) =>
          acc.groupIdRandom === access.groupIdRandom && acc.roomTypeId === access.roomTypeId
      )
      ?.hotel.includes(header.name)
  }

  public accessColorPoint: number = 0

  getClassAccessRow(indexAccess: number, access: any) {
    return {
      'tr-bg td-left': access.color
    }
  }

  getStyleAccessRow(indexAccess: number, access: any) {
    const style = {
      borderTop: '',
      borderBottom: ''
    }
    const rows = this.accessGroupMapper.filter(
      (acc: any) => access.groupIdRandom === acc.groupIdRandom
    )
    const index = rows.findIndex((acc: any) => acc.roomTypeId === access.roomTypeId)
    if (index === 0) style.borderTop = '1px solid #1F2937'
    if (index + 1 === rows.length) style.borderBottom = '1px solid #1F2937'
    return style
  }

  mergeAccessMaps(map1: any, map2: any) {
    const mergedMap = new Map();
  
    for (const [key, value] of map1.entries()) {
      mergedMap.set(key, value);
    }
  
    for (const [key, value] of map2.entries()) {
      if (mergedMap.has(key)) {

        const existingValue = mergedMap.get(key);

        mergedMap.set(key, {
            roomTypeId: existingValue.roomTypeId,
            roomTypeDescription: existingValue.roomTypeDescription,
            hotel: [...existingValue.hotel, ...value.hotel],
            roomTypeGroupId: [...existingValue.roomTypeGroupId, ...value.roomTypeGroupId],
            roomTypeGroupDescription: existingValue.roomTypeGroupDescription,
            roomTypeCategory: [...existingValue.roomTypeCategory, ...value.roomTypeCategory],
            group: existingValue.group,
            validity: [...existingValue.validity, ...value.validity],
            periodType: [...existingValue.periodType, ...value.periodType],
            accessYear: [...existingValue.accessYear, ...value.accessYear],
            dateFrom: [...existingValue.dateFrom, ...value.dateFrom],
            dateTo: [...existingValue.dateTo, ...value.dateTo]
        });
      } else {
        mergedMap.set(key, value);
      }
    }
  
    return mergedMap;
  }

}
</script>
<style lang="scss">
.td-header {
  white-space: normal;
}

.tr-bg {
  background-color: #F0F0F0 !important;
}

// .td-left {
//   border-bottom-left-radius: 5px;
//   border-top-left-radius: 5px;
// }

// .td-right {
//   border-top-right-radius: 5px !important;
//   border-bottom-right-radius: 5px !important;
// }

.writing-mode {
  writing-mode: horizontal-tb;
}
table,
td {
  height: 100%;
}

::-webkit-scrollbar {
  height: 14px;
  background: gray;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:horizontal {
  background: #90afc5;
  border-radius: 10px;
}
</style>
