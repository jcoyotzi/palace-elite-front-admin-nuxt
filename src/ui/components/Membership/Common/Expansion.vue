<template>
  <section class="">
    <MembershipCommonPanel
      class="pe-bg-black-light"
      justify-header-class="pe-justify-between pe-text pe-text-[1.5rem]"
      icon-classes="pe-text-blue-light pe-mt-2 pe-mx-3 lg:pe-my-auto pe-fill-transparent pe-mb-auto pe-align-start pe-min-w-[30px] pe-min-h-[30px] lg:pe-mx-3"
      reverse
      rounded
    >
      <template #headerText>
        <div
          class="pe-min-h-[100px] pe-flex pe-grow pe-flex-wrap pe-items-center pe-justify-between pe-py-2 lg:pe-px-3"
        >
          <!-- #region leftContent -->
          <div>
            <p class="pe-text-[1.5rem] pe-font-normal pe-leading-[2.063rem]">
              {{ name | capitalize }}
            </p>
          </div>
          <!-- #endregion leftContent -->
          <!-- #region rightContent -->
          <div
            class="pe-mb-2 pe-flex pe-basis-full pe-items-center pe-justify-end lg:pe-basis-auto lg:pe-justify-around"
          >
            <div
              v-if="showPinButtons"
              :class="buttonWrapClasses"
            >
              <PEButton
                v-if="!hasPin"
                :label="$t('addPIN')"
                :class="buttonClasses"
                text
                type="button"
                uppercase
                @click="addPinClick"
              />
              <PEButton
                v-if="hasPin"
                :label="$t('changePIN')"
                :class="buttonClasses"
                class="lg:pe-mr-10"
                text
                type="button"
                uppercase
                @click="changePinClick"
              />
              <PEButton
                v-if="hasPin"
                :label="$t('resetPIN')"
                :class="buttonClasses"
                class="lg:pe-mr-10"
                text
                type="button"
                uppercase
                @click="resetPinClick"
              />
            </div>
            <span
              v-if="showEditButton"
              @click="editButtonClick"
            >
              <PEIcon
                class="pe-mx-4"
                :class="iconClasses"
                >pencil</PEIcon
              >
            </span>
            <span
              v-if="showDeleteButton"
              @click="deleteButtonClick"
            >
              <PEIcon
                class="pe-mx-5"
                :class="iconClasses"
                >trash-can</PEIcon
              >
            </span>
          </div>
          <!-- #endregion rightContent -->
        </div>
      </template>
      <template #content>
        <div class="pe-bg-black/50 pe-px-5 pe-pt-6 pe-pb-12 lg:pe-gap-6">
          <div
            v-for="(data, index) in tableData"
            :key="index"
            class="pe-grid lg:pe-grid-cols-4 pe-gap-1"
          >
            <div
              v-for="(dataInfo, index2) in data.data"
              :key="index2"
              class="pe-py-4"
            >
              <p
                class="pe-break-words pe-text-[0.75rem] pe-font-normal pe-capitalize pe-leading-4 pe-text-white"
              >
                {{ dataInfo.title }}
              </p>
              <p
                class="pe-break-words pe-text-base pe-font-normal pe-leading-[1.375rem] pe-text-white"
              >
                {{ dataInfo.value }}
              </p>
            </div>
          </div>
        </div>
      </template>
    </MembershipCommonPanel>
  </section>
</template>
<script lang="ts">
import {Component, Prop, Emit, Vue, Mixins} from 'vue-property-decorator'

// #region Interfaces
import {MembershipTable, colData} from '~/src/app/common/domain/entities/membershipTable'
import {PinActions} from '~/src/app/owners/domain/enum/pinActions'
// #endregion Interfaces
import i18n from '~/src/ui/i18n/membership/owners.lang'

@Component({
  i18n,
  filters: {
    capitalize(text: string) {
      const words = text.split(' ')
      const wordsCapitalized: string[] = []

      for (const word of words) {
        const lowerWord = word.toLowerCase()
        const upperChar = lowerWord.charAt(0).toUpperCase()
        const complement = lowerWord.slice(1)
        wordsCapitalized.push(`${upperChar}${complement}`)
      }

      return wordsCapitalized.join(' ')
    }
  }
})
class Expansion extends Vue {
  // #region Props
  @Prop({
    type: String,
    required: true
  })
  readonly name!: string

  @Prop({
    type: Array,
    required: true
  })
  readonly tableData!: MembershipTable['tableData']

  @Prop({
    type: Boolean,
    default: false
  })
  readonly hasPin!: boolean

  @Prop({
    type: Boolean,
    default: false
  })
  readonly showPinButtons!: boolean

  @Prop({
    type: Boolean,
    default: true
  })
  readonly showEditButton!: boolean

  @Prop({
    type: Boolean,
    default: true
  })
  readonly showDeleteButton!: boolean
  // #endregion Props

  // #region Computed
  public get buttonWrapClasses() {
    return {
      'pe-flex pe-w-full pe-justify-end lg:pe-w-auto': this.hasPin
    }
  }

  public get buttonClasses() {
    return ['pe-mr-5 !pe-font-serif !pe-text-[1rem] !pe-font-medium !pe-leading-[15.31px]']
  }

  public get iconClasses() {
    return [
      '!pe-min-h-[20px] !pe-min-w-[20px] pe-cursor-pointer pe-fill-transparent pe-text-blue-light'
    ]
  }
  // #endregion Computed

  // #region Methods

  public addPinClick() {
    this.pinClick(PinActions.add)
  }

  public changePinClick() {
    this.pinClick(PinActions.change)
  }

  public resetPinClick() {
    this.pinClick(PinActions.reset)
  }
  // #endregion Methods

  // #region Emits
  @Emit()
  pinClick(action: PinActions) {
    return action
  }

  @Emit()
  editButtonClick() {}

  @Emit()
  deleteButtonClick() {
    // console.log('deleteButtonClick')
  }
  // #endregion Emits
}

export default Expansion
</script>
