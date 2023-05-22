<template>
  <div
    v-click-outside="hideDropdown"
    class="pe-relative"
  >
    <PETextInput
      ref="input"
      v-model="inputVal"
      :label="inputLabel"
      :append-icon="icon"
      @click.native="toggleIcon"
      @focus="onInputFocus"
    ></PETextInput>
    <div
      v-if="isActive"
      ref="dropdown"
      class="dropdown-menu pe-rounded-[5px] pe-border-2 pe-border-black pe-bg-black-mid p-5 text-white !pe-absolute pe-w-full pe-z-50 pe-min-w-max"
      @click="hideDropdown"
    >
      <div class="actions">
        <slot name="prepend-item"></slot>
      </div>
      <div v-show="notItemsFound">
        <PEAOptionItem2
          :item="internalItems[0]"
          id="notFoundOption"
          :text="notItemsFoundMessage"
          :is-disabled="true"
          :is-selected="false"
          :is-hovered="false"
        />
      </div>
      <div class="items scrollbar pe-max-h-[200px] pe-overflow-y-scroll">
        <!--        <PEADivider text="adults"/>-->
        <template v-for="(item, index) in internalItems">
          <PEAOptionItem2
            :id="index.toString()"
            :key="index"
            :text="listOptionText(item)"
            :is-selected="isSelectedItem(index)"
            :is-hovered="isHoveredItem(index)"
            :is-disabled="isDisabledItem(item)"
            :chip-text="chipText(item)"
            :chip-colors="chipColors"
            :item="item"
            @click.native="onSelectChange(item, index)"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ClickOutside from 'vue-click-outside'
import {Component, Emit, Prop, Vue, Watch} from 'vue-property-decorator'
import {PEChip, PETextInput} from '@pr-elite-components-library/lib'

import PEAOptionItem2 from './components/PEAOptionItem.vue'
import PEADivider2 from './components/PEADivider.vue'
import {
  vueLikeGetVariables2,
  vueLikeTemplateReplacer2
} from '~/src/ui/components/PEAutocomplete/vueLikeTextTemplates'

export function isCustomElement(vm: any) {
  return 'shadowRoot' in vm.$root.$options
}

@Component({
  name: 'PEAutocomplete2',
  components: {
    PETextInput,
    PEChip,
    PEAOptionItem2,
    PEADivider2
  },
  directives: {
    ClickOutside
  }
})
export default class PEAutocomplete2 extends Vue {
  // region Props
  @Prop({type: Array, default: () => []})
  readonly items!: any[]

  @Prop()
  readonly value!: any | null

  @Prop({
    type: String,
    default: 'auto'
  })
  readonly dropdownPosition!: string

  @Prop({type: Boolean, default: true})
  readonly appendToBody!: boolean

  @Prop({type: Object, default: () => ({})})
  readonly chipColors!: any

  @Prop({type: String, default: 'Label'})
  readonly inputLabel!: string

  @Prop({type: String, required: true})
  readonly displayInputTemplate!: string

  @Prop({type: String, default: '{{ksheio59djns}}'})
  readonly ChipTemplate!: string

  @Prop({type: String, required: true})
  readonly listOptionTemplate!: string

  @Prop({type: String, default: 'Not items found'})
  readonly notItemsFoundMessage!: string

  @Prop({type: Function, default: (item: any) => false})
  readonly customValidation!: Function

  // endregion

  // region Data
  internalItems: any[] = []

  private isActive = false

  inputVal = ''

  private icon = 'chevron-down'

  private selectedIndex = -1

  private hoveredIndex = 2

  //private notItemsFound = false;

  // endregion

  // region Life Cycle Hooks
  mounted() {
    this.internalItems = structuredClone(this.items)
    this.updatePreSelected()
  }

  // endregion

  // region Computed

  get notItemsFound() {
    if (this.internalItems.length === 0) {
      return true
    }
    return false
  }

  // endregion

  // region Watchers

  @Watch('value', {deep: true, immediate: true})
  onValueChage(newVal: any) {
    const template = this.displayInputTemplate
    
    if(newVal) {
      this.inputVal = vueLikeTemplateReplacer2(template, newVal)
    }
    this.updatePreSelected()
  }

  @Watch('items', {deep: true})
  onItemsChage(newVal: any) {
    this.internalItems = structuredClone(newVal)
    this.updatePreSelected()
  }

  @Watch('inputVal')
  // eslint-disable-next-line consistent-return
  onInputChange(newVal: string) {
    if (newVal === '' || newVal === undefined || newVal === null) {
      this.internalItems = structuredClone(this.items)
      this.$emit('input', null)
      return 0
    }

    this.selectedIndex = -1
    const items = structuredClone(this.items)
    const newValSplit = newVal.split(' ')
    const firstWordInVal = newValSplit[0].toLowerCase()
    const template = this.listOptionTemplate
    const template2 = this.displayInputTemplate
    this.internalItems = items.filter((item: any) => {
      const itemContent =
        vueLikeTemplateReplacer2(template, item) + ' ' + vueLikeTemplateReplacer2(template2, item)
      return itemContent.toLowerCase().includes(firstWordInVal.toLowerCase())
    })
  }

  // endregion

  // region Methods

  isDisabledItem(item: any) {
    const value = this.customValidation(structuredClone(item))
    return value
  }

  chipText(item: any): string {
    return vueLikeTemplateReplacer2(this.ChipTemplate, item)
  }

  listOptionText(item: any): string {
    return vueLikeTemplateReplacer2(this.listOptionTemplate, item)
  }

  updatePreSelected() {
    const template = this.displayInputTemplate
    const value = structuredClone(this.value)
    const keys = vueLikeGetVariables2(template)
    const firstKey = keys[0]
    const secondKey = keys[1]

    if (value !== null && value !== undefined) {
      // eslint-disable-next-line no-eval
      const needle = eval(`value.${firstKey}`)
      const needleLast = eval(`value.${secondKey}`)
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < this.internalItems.length; i++) {
        const item = this.internalItems[i]
        // eslint-disable-next-line no-eval
        const firstVal = eval(`item.${firstKey}`)
        const secondVal = eval(`item.${secondKey}`)

        const nameVal = `${firstVal} ${secondVal}`
        const needlename = `${needle} ${needleLast}`

        if (nameVal.trim().toLowerCase() === needlename.trim().toLowerCase()) {
          this.selectedIndex = i
          this.inputVal = vueLikeTemplateReplacer2(template, item)
          break
        }
      }
    }
  }

  isSelectedItem(index: number): boolean {
    return this.selectedIndex === index
  }

  isHoveredItem(index: number): boolean {
    return this.hoveredIndex === index
  }

  toggleIcon() {
    if (this.icon === 'chevron-down') {
      this.icon = 'chevron-up'
    } else {
      this.icon = 'chevron-down'
    }
  }

  onKeyDown(evt: any) {
    const keyName = evt.key
    if (!evt.ctrlKey) {
      let newIndex = 0
      switch (keyName) {
        case 'Tab':
          this.isActive = false
          break
        case 'ArrowUp':
          newIndex = this.hoveredIndex - 1
          this.hoveredIndex = newIndex > -1 ? newIndex : this.internalItems.length - 1
          break

        case 'ArrowDown':
          newIndex = this.hoveredIndex + 1
          this.hoveredIndex = newIndex < this.internalItems.length ? newIndex : 0
          break

        case 'Enter':
          this.selectedIndex = this.hoveredIndex
          this.hoveredIndex = -1
          this.$emit('input', this.internalItems[this.selectedIndex])
          this.isActive = false
          break

        default:
          break
      }
    }
  }

  onInputFocus() {
    this.internalItems = structuredClone(this.items)
    this.updatePreSelected()
    this.$emit('focus', true)
    this.isActive = true
    document.addEventListener('keydown', this.onKeyDown, false)
  }

  hideDropdown(event: any) {
    document.removeEventListener('keydown', this.onKeyDown, false)
    this.isActive = false
  }

  // endregion

  // region Emits
  @Emit('input')
  onSelectChange(val: any, index: number) {
    this.selectedIndex = index
    const data = JSON.parse(JSON.stringify(val))
    this.inputVal = vueLikeTemplateReplacer2(this.displayInputTemplate, data)
    this.$emit('change', data)
    this.hideDropdown(null)
    this.updatePreSelected()
    return data
  }

  // endregion
}
</script>

<!--<style scoped>-->
<!--.select&#45;&#45;scroll {-->
<!--  scrollbar-width: thin;-->
<!--  scrollbar-color: rgba(144, 175, 197, 0.4);-->
<!--}-->
<!--</style>-->
