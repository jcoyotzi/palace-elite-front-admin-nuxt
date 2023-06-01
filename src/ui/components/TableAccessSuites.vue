<template>
  <div class="text-white w-full mt-2 mb-6">
    <table class="w-full">
      <thead>
        <tr class="pe-font-bold pe-font-sans pe-text-[16px] pe-text-blue-light">
          <td
            :class="getClassHeader(header, index)"
            v-for="(header, index) in headersDefualt"
            class="td-header"
          >
            {{ header.title }}
          </td>
          <td
            :class="getClassHeader(header, index)"
            class="td-header"
            v-for="(header, index) in headersColumn"
          >
            {{ header.title }}
          </td>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(access, indexAccess) in accessGroupMapper"
          class="py-4"
        >
          <td
            class="text-center"
            style="padding-right: 50px !important"
          >
            <span v-html="access?.accessNumber" />
          </td>
          <td
            style="padding-left: 15px !important"
            class="ml-6 py-4"
            :class="getClassAccessRow(indexAccess)"
          >
            {{ access?.roomTypeDescription }}
          </td>
          <td
            :class="getClassBody(header, index, indexAccess)"
            v-for="(header, index) in headersColumn"
          >
            <div
              class="pe-grid my-2 pe-place-items-center"
              v-if="showFlag(header, access)"
            >
              <PEIcon size="28">check</PEIcon>
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
// import ValidityAccessDTO from '~/src/app/bpg/domain/dto/validateAccess'
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

        if (tempKeys.length !== keyIndex + 1)
          quantityToPrint -= tempKeys[keyIndex + 1] as any

        tempGroups = new Map([...QuantityGroup, ...tempGroups])

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
            accessNumber: index > 0 ? '' : access.accessNumber
          }))
      ]
    })

    return accGroup
  }

  getClassHeader(header: IHeader, index: number) {
    return {
      'text-center': header.align === 'center',
      'px-6': header.align === 'center',
      'pr-24': index < 1
    }
  }

  getClassBody(header: IHeader, index: number, indexAccess: number) {
    return {
      'text-center': header.align === 'center',
      'px-6': header.align === 'center',
      'pr-24': index < 1,
      'tr-bg': (indexAccess + 1) % 2,
      'td-right': index === this.headersColumn.length - 1
    }
  }

  get headersColumn(): IHeader[] {
    return this.headers.filter((header, index) => index > 1)
  }

  get headersDefualt(): IHeader[] {
    return this.headers.filter((header, index) => index < 2)
  }

  showValue(value: GroupAccess): GroupAccess | string {
    if (typeof value !== 'boolean') return value
    return ''
  }

  showFlag(header: IHeader, access: any): boolean {
    return access.hotel.includes(header.name)
  }

  getClassAccessRow(indexAccess: number) {
    return {
      'tr-bg': (indexAccess + 1) % 2,
      'td-left': (indexAccess + 1) % 2
    }
  }
}
</script>
<style lang="scss">
.td-header {
  white-space: normal;
}

.tr-bg {
  background-color: #272527 !important;
}

.td-left {
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
}

.td-right {
  border-top-right-radius: 5px !important;
  border-bottom-right-radius: 5px !important;
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
