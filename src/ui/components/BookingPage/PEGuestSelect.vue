<template>
  <div class="relative">
    <PEAutocomplete2
      v-model="internalValue"
      :display-input-template="guestTemplate"
      :chip-template="ChipTemplate"
      :list-option-template="guestTemplate"
      :input-label="label"
      :items="allitems"
      :chip-colors="chipColors"
      :custom-validation="customValidation"
      @focus="onSelectOpened"
      @input="onChangeRoomGuest"
    >
      <template #prepend-item>
        <div class="pe-border-b pe-border-black pe-mb-5">
          <PEButton
            class="pe-w-full pe-h-auto !pe-py-1 !pe-pb-3 pe-items-start !pe-no-underline !pe-place-content-start"
            text
            @click.native="onNewCompanion"
          >
            <div
              class="pe-w-6 pe-h-6 pe-px-0 pe-mr-4 pe-border pe-border-blue pe-flex pe-items-center !pe-justify-center pe-rounded-full"
            >
              <PEIcon class="pe-text-blue">plus</PEIcon>
            </div>
            <span class="pe-text-white">{{ $t('addNewCompanion') }}</span>
          </PEButton>
        </div>
      </template>
    </PEAutocomplete2>

    <button
      v-if="closable"
      class="pe-absolute pe-top-0 pe-right-0 pe-h-4 pe-w-4 pe-translate-x-1/2 -pe-translate-y-1/2 pe-rounded-full pe-bg-white"
      @click="$emit('close')"
    >
      <PEIcon class="pe-h-full pe-w-full pe-text-black">close</PEIcon>
    </button>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Prop, Watch, Emit} from 'vue-property-decorator'
import {MembershipTable} from 'app/common/domain/entities/membershipTable'
import PEAutocomplete2 from '~/src/ui/components/PEAutocomplete/PEAutocomplete.vue'
import {GuestEntity} from '~/src/app/guests/domain/entities/guestEntity'
import {PayLinkStore} from '../../store/payLinkStore'
import i18n from '~/src/ui/i18n/booking/guestSelect.lang'

@Component({
  i18n,
  name: 'PEGuestSelect',
  components: {
    PEAutocomplete2
  }
})
export default class PEGuestSelect extends Vue {
  @Prop({type: Object}) value!: MembershipTable | null

  @Prop({type: Array, required: true}) items!: MembershipTable[]

  @Prop({type: String}) id!: string

  @Prop({type: String, default: 'dark'}) color!: string

  @Prop({type: String}) label?: string

  @Prop({type: Boolean, default: false}) closable!: boolean

  @Prop()
  readonly customValidation!: Function

  internalValue: any | null = null

  chipColors = {
    owner: 'bg-green-500 text-white',
    beneficiary: 'bg-blue text-white',
    guest: 'bg-gray-medium text-white'
  }

  guestTemplate = '{{memberUtils.firstname}} {{memberUtils.lastname}}'

  ChipTemplate = '{{memberUtils.role}}'

  get allitems() {
    return this.items
  }

  get paylinkStore(): PayLinkStore {
    return new PayLinkStore()
  }

  get indexGuest(): number {
    return Number(this.id.replace('selectedGuest', ''))
  }

  onChangeRoomGuest(value: GuestEntity) {
    let data = value.tableData.map((item: any) => {
      return item.data.filter((itemData: any) => itemData.title === 'email')
    })

    data = data.filter((item: any) => item !== undefined && item.length !== 0)

    if (data.length > 0)
      this.paylinkStore.guestPaylink[this.indexGuest] = {
        name: value.name,
        email: data[0][0].value
      }
  }

  @Watch('value')
  changeInternalValue() {
    this.internalValue = this.value
  }

  @Watch('internalValue')
  sendInternalValue() {
    this.$emit('input', this.internalValue)
  }

  onNewCompanion() {
    this.$emit('newCompanion')
  }

  @Emit('selectOpened')
  onSelectOpened(val: any) {
    return val
  }
}
</script>

<style scoped></style>
