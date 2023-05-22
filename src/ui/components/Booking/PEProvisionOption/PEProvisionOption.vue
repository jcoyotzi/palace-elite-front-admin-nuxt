<!--
  - Copyright (c) 2022.
  - Author: Enrique Nieto Martínez
  - Company: Palace Resorts
  - Created:  2022 / 11 / 14 11:6:51
  -
  -->

<template>
  <div class="pe-bg-black-light">
    <h4
      data-v-7ee933a0=""
      class="pe-my-8 pe-px-4 pe-font-semibold pe-uppercase pe-text-white pe-text-center md:pe-text-left"
      >{{ title }}</h4
    >
    <div v-for="(item,index) in items " :key="index">
      <PERadioGroup 
        :id="id"
        v-model="selectedId"
        :items="[items[index]]"
        :disabled="false"
        color="black"
        position="vertical"
        class="pe-pl-0 xl:pe-pl-4 pe-pt-2 pe-mb-3"
      >
        <template slot="appendLabel">
          <small v-if="firstOptionExp(item)" class="pl-1 pt-1 my-auto text-blue-light capitalize"> {{ firstOptionExp(item) }} </small>
        </template>
      </PERadioGroup>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator'
import {
  ProvitionOption,
  ProvitionOptionDescription,
  ProvitionOptionItem,
  ProvitionOptionType,
  provitionType
} from '~/src/ui/components/Booking/PEProvisionOption/PEProvisionOptionTypes'

@Component({
  name: 'PEProvisionOption'
})
export default class PEProvisionOption extends Vue {
  @Prop({type: String})
  id!: string

  @Prop({type: String})
  title!: string

  @Prop({type: Array})
  provitions!: ProvitionOption[]

  items: ProvitionOption[] = []
  selectedId: any = '0'

  get selectedOption() {
    if (process.client) {
      if (this.items !== null && this.items !== undefined) {
        const result = this.items.find(item => item.id === this.selectedId)
        const res =
          result === undefined
            ? {
                id: '-',
                name: '-',
                hasGolf: false,
                provition: {
                  id: '-',
                  category: '-',
                  name: '-',
                  type: '-',
                  nights: null,
                  validTo: null
                }
              }
            : result
        return res
      }
    }
    return {}
  }

  firstOptionExp(selectedOption : ProvitionOption) {
    if (!this.items?.length || !this.items) return ''

    const firstExpirationDate = this.getProvitionSummary(selectedOption)[0]?.expirationDate

    return `Exp.  ${firstExpirationDate}`
  }

  mounted() {
    this.items = this.provitions
    this.selectedId = this.getSelectedId()
  }

  getSelectedId() {
    if (!this.items?.length || !this.items) {
      return
    }
    const selectedItem = this.items.find(item => item.name.toUpperCase().includes('NIGHT'))
    if (selectedItem === undefined) {
      return this.items[0]?.id !== undefined && this.items[0]?.id !== null ? this.items[0]?.id : '0'
    }
    return selectedItem.id
  }

  @Watch('provitions', {deep: true})
  onProvisionsChange(newVal: any) {
    this.items = newVal
    this.selectedId = this.getSelectedId()
    const item = this.items?.find(provision => provision?.id === this.selectedId)
    this.$emit('input', item)
  }

  @Watch('selectedId')
  onSelectedIdChange(newVal: string) {
    const item = this.items?.find(provision => provision.id === this.selectedId)
    this.$emit('input', item)
  }

  getProvitionSummary(provition: ProvitionOption): ProvitionOptionDescription[] {
    if (process.client) {
      const type = provitionType(provition)
      let result: ProvitionOptionDescription[] = []
      switch (type) {
        case ProvitionOptionType.Week:
          result = [
            {
              name: provition.provision.name!,
              expirationDate: provition.provision.validTo?.human!
            }
          ]
          break

        case ProvitionOptionType.Night:
          if (provition.provision?.nights !== undefined && provition.provision?.nights !== null) {
            for (const night of provition.provision.nights) {
              result.push({
                name: night?.name,
                expirationDate: night?.validTo?.human
              })
            }
          }
          break

        default:
          break
      }

      return result
    }
    return []
  }
}
</script>

<style scoped></style>
