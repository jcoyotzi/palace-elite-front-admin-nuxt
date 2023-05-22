<template>
  <div class="w-full">
    <WeeksCommonTable
      :properties-table="bindTablePagination"
      :items="propertiesCardsProvitionsList"
      :use-pagination="usePagination"
      @update-items="onChangeItems"
    >
      <div :class="{'pe-mt-[50px] pe-mb-[35px]': usePagination}">
        <div
          v-for="(card, index) in itemsTableComputed"
          :key="index"
        >
          <CardProvition
            v-bind="card"
            class="pe-mb-[40px]"
          >
            <PEButton
              v-if="card.buttonUse"
              flat
              secondary
              class="pe-uppercase pe-font-serif pe-font-medium pe-w-full xl:pe-w-auto"
              tag="a"
              href="/build-your-search"
            >
              {{ $t('useNow') }}
            </PEButton>
            <div
              v-if="existConfirmation(card)"
              class="pe-text-white pe-text-center md:!pe-text-right pe-font-sans pe-font-normal"
            >
              <div class="pe-mb-2 pe-text-[16px]">{{ numberProperty(card) }}</div>
              <div class="pe-mb-2 pe-text-[24px]">{{ resortProperty(card) }}</div>
              <div class="pe-mb-2 pe-text-[16px]">{{ fromDateProperty(card) }}</div>
              <div
                class="pe-text-blue-light pe-text-[16px] pe-cursor-pointer"
                @click.prevent="onMoreDetails(card)"
              >
                {{ $t('moreDetails') }}
              </div>
            </div>
          </CardProvition>
        </div>
      </div>
    </WeeksCommonTable>
  </div>
</template>
<script lang="ts">
import {Component, Mixins, Prop} from 'vue-property-decorator'
import {BenefitStore} from '~/src/ui/store/benefits/benefitStore'
import CardProvitionDto from '~/src/app/benefits/domain/dto/cardProvitionDto'
import DateFormaterProvition from '~/src/ui/mixins/DateFormaterProvition'
import i18n from '~/src/ui/i18n/weeks/pagination.lang'
import {WeekStore} from '~/src/ui/store/benefits/weekStore'
import {CategoryFilters} from '~/src/app/benefits/domain/enum/categoryFilters'

enum Months {
  Jan,
  Feb,
  March,
  April,
  May,
  June,
  July,
  Aug,
  Sep,
  Oct,
  Nov,
  Dec
}

@Component({
  i18n,
  name: 'BenefitsWeeksPagination'
})
export default class BenefitsWeeksPagination extends Mixins(DateFormaterProvition) {
  @Prop({type: Boolean, default: true})
  usePagination!: boolean

  @Prop({type: Boolean, default: false})
    onlyAvailables!: boolean

  perPage: number = 5
  page: number = 1

  itemsTable: any[] = [] // terminado

  get itemsTableComputed() {
    // terminado
    return this.itemsTable.map(card => {
      const showFolio = card.category !== CategoryFilters.BONUSWEEK

      const object = {
        ...card,
        chipText: card.status,
        expantion: false,
        buttonUse: card.status === CategoryFilters.AVAILABLE,
        titleTooltip: 'LOREM IPSUM',
        textTooltip:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
        helperText: showFolio ? `${this.$t('bookingsLang.folio')}: ${card.invoice}` : '',
        bottomText: showFolio ? `${this.$t(`bookingsLang.expirationLabel.${card.status}`)}: ${this.getDate(card.expirationDate)}` : ''
      
      }

      if (object.confirmation) {
        object.confirmation.from = this.dateFormaterProvitionBetween(
          card.confirmation,
          this.separator
        )
      }
      return object
    })
  }

  getDate(date: string) {
    const dateDate = new Date(date);
    const months = Object.values(Months)
    return `${months[dateDate.getMonth()]} ${dateDate.getDate()}, ${dateDate.getFullYear()}`
  }

  getTypeExpirationText(card: CardProvitionDto): string {
    if (
      card.status === CategoryFilters.AVAILABLE ||
      card.status === CategoryFilters.TORELEASE ||
      card.status === CategoryFilters.RESERVED
    )
      return this.$t('expirationDate') as string
    if (card.status === CategoryFilters.EXPIRED) return this.$t('expiredOn') as string
    return this.$t('expired') as string
  }

  onChangeItems({items}: any) {
    // terminado
    this.itemsTable = items
  }

  get bindTablePagination() {
    // terminado
    return {
      searchProps: {
        label: this.$t('search') as string,
        color: 'medium'
      },
      perPageProps: {
        label: this.$t('rowsPerPage') as string,
        color: 'medium',
        items: ['5', '10', '15', '20', '25']
      },
      sortProps: {
        label: this.$t('sortBy') as string,
        color: 'medium',
        items: [
          {
            value: '0',
            text: this.$t('ascending') as string
          },
          {
            value: '1',
            text: this.$t('descending') as string
          }
        ]
      }
    }
  }

  numberProperty(card: CardProvitionDto): string {
    return `${this.$t('confirmationNumber')}: ${card.confirmation?.number!}`
  }

  resortProperty(card: CardProvitionDto): string {
    return card.confirmation?.resort_name.replace('–', '')!
  }

  get propertiesCardsProvitionsList(): CardProvitionDto[] {
    return !this.onlyAvailables
      ? this.weekStore.propertiesCardsProvitionsList
      : this.weekStore.readAvailableProvitions
  }

  get benefitStore(): BenefitStore {
    return new BenefitStore()
  }

  get weekStore(): WeekStore {
    return new WeekStore()
  }

  get provitions() {
    return this.weekStore.provitions
  }

  get separator(): string {
    return this.$t('to') as string
  }

  public fromDateProperty(card: CardProvitionDto): string {
    return `${this.$t('from')} ${card?.confirmation?.from}`
  }

  public onMoreDetails(card: CardProvitionDto): void {
    this.weekStore.showDrawerCardProvitionDetails = true
    this.weekStore.setItemCardProvition(card)
  }

  public existConfirmation(card: CardProvitionDto): boolean {
    return card.confirmation !== undefined
  }

  public onChangePerPage(value: string): void {
    this.perPage = parseInt(value)
  }
}
</script>
<style scoped>
::v-deep div.pe-content-pagination > div.gap-y-3 > div.self-end {
  margin-top: 0px !important;
}
</style>
