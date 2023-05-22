export interface PESliderTestimonialBlock {
  id: number
  __component: 'blocks.testimonial-slider'
  items: {
    data: [
      {
        id: number
        attributes: {
          caption: string
          testimonial: string
          locale: string
          authorName: string
          authorOrigin: string
          localizations: {
            data: Record<string, string>[]
          }
        }
      }
    ]
  }
}
