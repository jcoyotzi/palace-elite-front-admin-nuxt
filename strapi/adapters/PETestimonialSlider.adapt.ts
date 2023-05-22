import {PESliderTestimonialBlock} from '../types/PETestimonialSliderBlock'

export function blockToComponent({items}: PESliderTestimonialBlock) {
  return {
    testimonials: items.data.map(({id, attributes}) => {
      return {
        id,
        title: attributes.caption,
        description: attributes.testimonial,
        authorName: attributes.authorName,
        authorOrigin: attributes.authorOrigin
      }
    })
  }
}
