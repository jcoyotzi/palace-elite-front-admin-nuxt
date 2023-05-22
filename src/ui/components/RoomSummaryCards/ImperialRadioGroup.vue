<template>
  <div>
    <ul
      :class="radio"
      v-if="hasItems"
    >
      <li
        v-for="item in items"
        :key="item.id"
        class="mb-[20px] w-full md:mb-auto"
      >
        <label :class="divRadioClasses">
          <div class="flex items-center pl-2 pe-w-full">
            <PEIcon
              v-if="item.prependIcon"
              class="mr-2"
              >{{ item.prependIcon }}</PEIcon
            >
            <p
              :class="getClassText"
              class="pt-2 pe-text-[1rem] pe-leading-[1.362rem]"
            >
              {{ formatLabelText(item) }}
              <template v-if="item.price > 0">
                <span class="pe-text-[1.5rem] pe-leading-[2.043rem] pe-inline-block">
                  + {{ formatPrice(item.price) }}
                </span>
                <span>
                  {{ item.currency }}
                </span>
                <ImperialTooltip
                  class="!pe-inline-flex"
                  :title="toolTipTitle"
                  :text="toolTipText"
                />
              </template>
            </p>
          </div>
          <input
            :id="item.id"
            v-model="model"
            :disabled="item.disabled"
            :name="getName(item.name)"
            :value="item.id"
            type="radio"
          />
          <span
            :class="checkMarkClassess(!!item.disabled)"
            class="checkmark"
          ></span>
        </label>

        <slot
          v-if="hasChildrenSlot(item.id)"
          name="children"
        ></slot>
      </li>
    </ul>
    <p
      v-else
      class="text-white"
    >
      {{ $t('notAvailable') }}
    </p>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import {ImperialItemRadioGroup} from '~/src/app/benefits/domain/entities/ItemRadioGroup'
import {usdFormatter} from '~/src/app/common/mapper/moneyFormatters'
import i18n from './PERadioButtonRdn.lang'
import ImperialTooltip from './Tooltip/ImperialTooltip.vue'

enum Colors {
  DARK = 'dark',
  MEDIUM = 'medium',
  LIGHT = 'light'
}

@Component({
  i18n,
  name: 'imperial-radio-group',
  components: {
    ImperialTooltip
  }
})
export default class ImperialRadioGroup extends Vue {
  @Prop({
    default: null,
    required: false
  })
  items!: ImperialItemRadioGroup[]

  @Prop({
    default: 'name',
    type: String
  })
  name!: string

  @Prop({
    default: 'horizontal',
    required: false
  })
  position!: string

  @Prop({
    required: false,
    type: String,
    default: ''
  })
  value!: string

  @Prop({
    required: false,
    type: String,
    default: 'medium'
  })
  color!: string

  @Prop({
    type: Boolean,
    default: false
  })
  disabled!: boolean

  get radio() {
    return {
      'w-auto': true,
      flex: this.positionIsHorizontal
    }
  }

  get positionIsHorizontal(): boolean {
    return this.position === 'horizontal'
  }

  get model(): any {
    return this.value
  }

  set model(value: any) {
    this.$emit('input', value)
  }

  get getClassText() {
    return {
      '!opacity-50': this.disabled
    }
  }

  get hasItems() {
    return this.items && this.items.length > 0
  }

  get divRadioClasses() {
    return {
      'block relative pl-10 cursor-pointer select-none caret-transparent font-sans leading-4 text-white [&>input]:relative [&>input]:opacity-0 [&>input]:cursor-pointer [&>input]:w-0 [&>input]:h-0':
        true
    }
  }

  get toolTipTitle() {
    return this.$t('tooltipTitle')
  }

  get toolTipText() {
    return this.$t('tooltipText')
  }

  formatLabelText(item: any) {
    let capitalizedText = ''
    if (item?.labelText) {
      let words = item.labelText.split(' ')
      words.forEach((word: any) => {
        try {
          capitalizedText += word.charAt(0).toUpperCase() + word.toLowerCase().slice(1) + ' '
        } catch (e) {
          // console.log(e)
        }
      })
    }

    return capitalizedText
  }

  checkMarkClassess(disabled: boolean) {
    let classArray =
      'absolute top-0 left-0 h-[30px] w-[30px] bg-black rounded-full after:content-[""] after:hidden after:absolute'

    if (this.color) {
      const availableColors = new Map()
        .set(Colors.MEDIUM, 'bg-black-light')
        .set(Colors.LIGHT, 'bg-white')
        .set(Colors.DARK, 'bg-black')

      classArray = `${classArray} ${availableColors.get(this.color)}`
    }

    return {
      [classArray]: true,
      '!opacity-50': disabled
    }
  }

  mounted() {
    this.model = this.getNearestCheckBoxNotDisabled()
  }

  getNearestCheckBoxNotDisabled() {
    let index = this.items.findIndex((item: any) => !item.disabled)

    return this.items[index]?.id || ''
  }

  formatPrice(price: number) {
    return usdFormatter.format(price)
  }

  getName(name: string): string {
    return `${this.name}-${name}`
  }

  hasChildrenSlot(id: string) {
    return !!this.$slots.children && this.model === id
  }
}
</script>
<style lang="scss">
input[type='radio']:checked ~ .checkmark {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 0px auto;
}
</style>
