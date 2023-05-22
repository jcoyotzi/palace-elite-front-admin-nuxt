<template>
  <section
    :class="classes"
    class="splide sliderTestimonial pe-py-24 pe-px-10"
    aria-label="Splide Basic HTML Example"
  >
    <div class="splide__track">
      <ul class="splide__list">
        <li
          v-for="testimonial in testimonials"
          :key="testimonial.id"
          class="splide__slide click:pe-cursor-grabbing pe-select-none hover:pe-cursor-grab"
          :class="{'!pe-cursor-grabbing': pressed}"
          @pointerdown="dragPointerStart"
          @pointerup="dragPointerEnd"
        >
          <PETestimonial v-bind="testimonial" />
        </li>
      </ul>
    </div>
  </section>
</template>

<script lang="ts">
import {Component, Vue, Prop, Watch} from 'vue-property-decorator'
import Splide, {Options} from '@splidejs/splide'

interface Testimonial {
  id: number
  title: string
  description: string
  authorName: string
  authorOrigin: string
}

@Component
export default class SliderTestimonial extends Vue {
  @Prop({
    type: Array,
    required: true
  })
  testimonials!: Testimonial[]

  @Prop({type: Boolean, default: false}) backgroundLighten!: boolean

  get classes() {
    return this.backgroundLighten ? 'pe-bg-black-light' : 'pe-bg-black'
  }

  pressed = false

  dragPointerStart(event: PointerEvent) {
    const target = event.target as HTMLDivElement
    target.setPointerCapture(event.pointerId)
    this.pressed = true
  }

  dragPointerEnd() {
    this.pressed = false
  }

  splideId = 'slider-testimonial'

  splide: Splide | null = null

  options: Options = {
    pagination: true,
    arrows: false,
    classes: {
      pagination: 'splide__pagination your-class-pagination [&_li]:pe-mx-2', // container
      page: `
          pe-splide__pagination__page
          pe-relative
          pe-h-6
          pe-w-6
          cursor-pointer
          after:absolute
          after:top-1/2
          after:left-1/2
          after:h-1
          after:w-1
          after:translate-x-[-50%]
          after:translate-y-[-50%]
          after:rounded-full
          after:bg-blue-light
          after:duration-300
          [&.is-active]:after:h-3
          [&.is-active]:after:w-3
        ` // each button
    }
  }

  @Watch('testimonials')
  onUpdate(value: any) {
    if (value.length > 0 && !this.splide) {
      this.splide = new Splide('.sliderTestimonial', this.options).mount()
    }
  }
}
</script>
