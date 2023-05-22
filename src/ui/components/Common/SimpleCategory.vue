<template>
  <div class="pe-bg-black-light pe-rounded-full">
    <div
      class="pe-bg-black pe-bg-opacity-50 pe-flex pe-justify-center pe-relative pe-overflow-hidden pe-rounded-full"
    >
      <ul
        ref="container"
        class="pe-px-[70px] pe-py-5 pe-flex pe-gap-[40px] pe-overflow-x-hidden pe-overflow-y-auto pe-scroll-smooth"
      >
        <li
          v-for="category in categories"
          :key="category"
          class="uppercase pe-cursor-pointer grow-0 shrink-0 basis-auto"
          @click="selectCategory(category)"
        >
          <p :class="currentSelectedClasses(category)">
            {{ category }}
          </p>
        </li>
      </ul>
      <div
        v-if="isOverflowing"
        class="pe-absolute pe-left-0 pe-top-0 pe-bottom-0 pe-bg-gradient-to-r pe-from-black-light pe-w-[60px] flex pe-justify-center pe-items-center pe-cursor-pointer"
        @click="scrollToLeft"
      >
        <PEIcon :class="disabledClasses">chevron-left</PEIcon>
      </div>
      <div
        v-if="isOverflowing"
        class="pe-absolute pe-right-0 pe-top-0 pe-bottom-0 pe-bg-gradient-to-l pe-from-black-light pe-w-[60px] flex pe-justify-center pe-items-center pe-cursor-pointer"
        @click="scrollToRight"
      >
        <PEIcon :class="disabledRightClasses">chevron-right</PEIcon>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Prop, Emit, Ref} from 'vue-property-decorator'

@Component({
  name: 'SimpleCategory'
})
export default class SimpleCategory extends Vue {
  @Prop({type: [], required: true}) categories!: string[]

  @Prop({type: Number, default: 100}) scrollPixels!: number

  @Ref('container') container!: InstanceType<typeof HTMLElement>

  currentSelected = ''

  offsetWidth: number = 0

  clientWidth: number = 0

  scrollWidth: number = 0

  scrollLeft: number = 0

  observer: any = null

  get isLeftControlDisabled(): boolean {
    return this.scrollLeft === 0
  }

  get isRightControlDisabled(): boolean {
    return this.scrollWidth - this.clientWidth === this.scrollLeft
  }

  get disabledClasses() {
    return this.isLeftControlDisabled ? 'pe-text-black-light' : 'pe-text-white'
  }

  get disabledRightClasses() {
    return this.isRightControlDisabled ? 'pe-text-black-light' : 'pe-text-white'
  }

  get isOverflowing(): boolean {
    return this.scrollWidth > this.offsetWidth
  }

  currentSelectedClasses(category: string): string {
    return category === this.currentSelected ? 'pe-text-white' : 'pe-text-blue-light'
  }

  scrollToRight() {
    this.container.scrollLeft = this.container.scrollLeft + this.scrollPixels
    this.handleValues(this.container)
  }

  scrollToLeft() {
    this.container.scrollLeft = this.container.scrollLeft - this.scrollPixels
    this.handleValues(this.container)
  }

  handleObserve() {
    this.observer = new ResizeObserver(entries => {
      this.handleValues(entries[0].target as InstanceType<typeof HTMLElement>)
    })
    this.observer.observe(this.container)
  }

  handleValues(htmlElement: InstanceType<typeof HTMLElement>) {
    this.offsetWidth = htmlElement.offsetWidth
    this.clientWidth = htmlElement.clientWidth
    this.scrollWidth = htmlElement.scrollWidth
    this.scrollLeft = htmlElement.scrollLeft
  }

  init() {
    this.currentSelected = this.categories[0]
    this.handleValues(this.container)
    this.handleObserve()
  }

  @Emit('selectedCategory')
  selectCategory(category: string): string {
    this.currentSelected = category
    return category
  }

  mounted() {
    this.init()
  }

  beforeDestroy() {
    this.observer.unobserve(this.container)
  }
}
</script>
<style lang="scss" scoped>
.control_left {
  background: linear-gradient(black, transparent);
}
</style>
