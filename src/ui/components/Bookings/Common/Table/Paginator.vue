<template>
  <nav :class="WrapperClasses">
    <PEButton
      v-show="showFirstButton"
      :class="iconNextWrapperClasses"
      :disabled="previousDisabled"
      without-border
      @click="previous"
    >
      <PEIcon class="pe-fill-transparent pe-leading-[20px] pe-text-blue-light">{{
        prevIcon
      }}</PEIcon>
      <p class="pe-font-sans pe-text-base pe-leading-[20px]">{{ prevText }}</p>
    </PEButton>
    <div
      v-for="(item, index) in items"
      :key="index"
      class="pe-mx-2 pe-cursor-pointer pe-font-sans pe-text-base pe-leading-[20px]"
      :class="pageClasses(item)"
      @click="changePage(item)"
    >
      {{ item }}
    </div>
    <PEButton
      v-show="showLastButton"
      :disabled="nextDisabled"
      :class="iconNextWrapperClasses"
      without-border
      @click="next"
    >
      <p class="pe-font-sans pe-text-base pe-leading-[20px]">{{ nextText }}</p>
      <PEIcon class="pe-fill-transparent pe-leading-[20px] pe-text-blue-light">{{
        nextIcon
      }}</PEIcon>
    </PEButton>
  </nav>
</template>
<script lang="ts">
import {Component, Prop, Vue, Watch, Emit} from 'vue-property-decorator'

interface IPaginator {
  length: number
  nextIcon?: string
  prevIcon?: string
  totalVisible?: number
  value?: number
  showFirst?: boolean
  showLast?: boolean
  prevText?: string
  nextText?: string
}

const initValue = 0

@Component
export default class Paginator extends Vue implements IPaginator {
  selected: number = initValue

  @Prop({type: Number, default: 15}) length!: number
  @Prop({type: String, default: 'chevron-right'}) nextIcon!: string
  @Prop({type: String, default: 'chevron-left'}) prevIcon!: string
  @Prop({type: Number, default: 4}) totalVisible!: number
  @Prop({type: Number, default: 1}) value!: number
  @Prop({type: Boolean, default: true}) showFirst!: boolean
  @Prop({type: Boolean, default: false}) pageDefault!: boolean
  @Prop({type: Boolean, default: true}) showLast!: boolean
  @Prop({type: String, default: 'Prev'}) prevText!: string
  @Prop({type: String, default: 'Next'}) nextText!: string

  @Watch('value')
  onValueChange() {
    this.init()
  }

  @Emit('changedPage')
  changedPage(page: number) {
    return page
  }

  @Watch('pageDefault')
  onChangePageDefault(newVal: boolean) {
    if (newVal) this.changePage(1)
  }

  mounted() {
    this.init()
  }

  range(from: number, to: number) {
    const range = []
    for (let i = from; i <= to; i++) {
      range.push(i)
    }
    return range
  }

  next() {
    if (this.selected + 1 > this.length) {
      return
    }
    this.selected++
    this.changedPage(this.selected)
  }

  previous() {
    if (this.selected - 1 < 1) {
      return
    }
    this.selected--
    this.changedPage(this.selected)
  }

  init() {
    this.selected = initValue
    this.selected = this.value
  }

  isAnActivePage(index: number, selected: number) {
    return index === selected || (selected === null && index === 1)
  }

  pageClasses(index: number) {
    const isActive = this.isAnActivePage(index, this.selected)

    return {
      'pe-decoration-blue-light pe-text-blue-light': isActive,
      'pe-decoration-white': !isActive
    }
  }

  changePage(index: number) {
    this.selected = index
    this.changedPage(this.selected)
  }

  validateVisibleItems(totalVisible: number, length: number) {
    return totalVisible === 0 || isNaN(length) || !Number.isSafeInteger(length) || length === 0
  }

  generateRangeonFirstNumber(maxLength: number) {
    return this.range(1, maxLength)
  }

  generateBetweenRange(selected: number, left: number, even: number) {
    return this.range(selected - left, this.selected + left - even)
  }

  generateRangeonLastNumber(length: number, maxLength: number) {
    return this.range(length - maxLength + 1, length)
  }

  /**
   * Generate the range of the pagination
   */
  generateRangedPagination(even: number, left: number, right: number, maxLength: number) {
    if (this.selected <= left) {
      return this.generateRangeonFirstNumber(maxLength)
    }
    if (this.selected > left && this.selected < right) {
      return this.generateBetweenRange(this.selected, left, even)
    }
    if (this.selected >= right) {
      return this.generateRangeonLastNumber(this.length, maxLength)
    }
  }

  get showLastButton() {
    return this.showLast || this.selected < this.length
  }

  get previousDisabled() {
    return this.selected <= 1
  }

  get nextDisabled() {
    return this.selected >= this.length
  }

  get showFirstButton() {
    return this.showFirst || this.selected > 1
  }

  get items() {
    const totalVisible = this.totalVisible
    if (this.validateVisibleItems(this.totalVisible, this.length)) return []

    const maxLength = Math.min(Math.max(0, totalVisible) || this.length, this.length)

    if (this.length <= maxLength) return this.range(1, this.length)

    const even = maxLength % 2 === 0 ? 1 : 0
    const left = Math.floor(maxLength / 2)
    const right = this.length - left + 1 + even

    return this.generateRangedPagination(even, left, right, maxLength)
  }

  get WrapperClasses() {
    return {
      flex: true,
      'pe-justify-between': true,
      'pe-items-center': true,
      'pe-rounded-lg': true,
      'pe-p-2': true,
      'pe-text-white': true,
      relative: true
    }
  }

  get iconClasses() {
    return {
      'pe-underline-offset-4': true,
      'pe-underline pe-decoration-blue-light pe-text-blue-light': true,
      'pe-underline pe-decoration-white': true
    }
  }

  get iconNextWrapperClasses() {
    return {
      'pe-flex pe-cursor-pointer  pe-items-center pe-text-white disabled:pe-opacity-75 !pe-p-0':
        true
    }
  }
}
</script>
