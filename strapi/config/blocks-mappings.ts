import {Component} from 'vue'
import * as testimonialSliderAdapter from '../adapters/PETestimonialSlider.adapt'
import * as PEDescriptionAdapter from '../adapters/PEDescriptionAdapter'
import * as PEOfferAdapter from '../adapters/PEOfferAdapter'
import * as PEAwardAdapter from '../adapters/PEAwardAdapter'
import * as PEAmenitiesBannerAdapter from '../adapters/PEAmenitiesBannerAdapter'
import * as PEOffersBannerAdapter from '../adapters/PEOffersBannerAdapter'
import * as PESliderPreviewAdapter from '../adapters/PESliderPreviewAdapter'

// Fixed
import { PEBannerAdapter } from '../adapters/blocks/PEBanner.adapter'
import { PEBannerSliderAdapter } from '../adapters/blocks/PEBannerSlider.adapter'
import { PEBannerSectionAdapter } from '../adapters/blocks/PEBannerSection.adapter'
import { PEBookingOfferAdapter } from '../adapters/blocks/PEBookingOffer.adapter'
import { PECarouselAdapter } from '../adapters/blocks/PECarousel.adapter'
import { PEOfferCardGridAdapter } from '../adapters/blocks/PEOfferCardGrid.adapter'
import { PEOfferTextAdapter } from '../adapters/blocks/PEOfferText.adapter'
import { PEGalleryGridAdapter } from '../adapters/blocks/PEGalleryGrid.adapter'
import { PETitleContentCollapsibleAdapter } from '../adapters/blocks/PETitleContentCollapsible.adapter'
import { PETitleDescriptionAdapter } from '../adapters/blocks/PETitleDescription.adapter'
import { PETitleDescriptionResortAdapter } from '../adapters/blocks/PETitleDescriptionResort.adapter'
import { PETitleDescriptionOfferAdapter } from '../adapters/blocks/PETitleDescriptionOffer.adapter'
import { PEInformationImageAdapter } from '../adapters/blocks/PEInformationImage.adapter'
import { PEImageBlockAdapter } from '../adapters/blocks/PEImageBlock.adapter'
import { PETitleContentTripleAdapter } from '../adapters/blocks/PETitleContentTriple.adapter'

type BlockMappingAdapter = (
  block: any
) => Record<string, unknown> | Promise<Record<string, unknown>>

interface BlockMapppingOptions {
  adapter: BlockMappingAdapter
  component: string | (() => Component)
  clientOnly?: boolean
  extra?: string
}

export const blocksMappings = new Map<string, BlockMapppingOptions>()

blocksMappings.set('blocks.testimonial-slider', {
  adapter: testimonialSliderAdapter.blockToComponent,
  component: 'PESliderTestimonial'
})

blocksMappings.set('blocks.description', {
  adapter: PEDescriptionAdapter.blockToComponent,
  component: 'PEOfferText',
  clientOnly: false
})

blocksMappings.set('blocks.title-content-collapsible', {
  adapter: PETitleContentCollapsibleAdapter.blockToComponent,
  component: 'PEExpandableRichText',
  clientOnly: false
})

blocksMappings.set('blocks.title-content-triple', {
  adapter: PETitleContentTripleAdapter.blockToComponent,
  component: 'PERichText2',
  clientOnly: false
})

blocksMappings.set('blocks.booking-banner', {
  adapter: PEOfferAdapter.blockToComponent,
  component: 'PEOffer',
  clientOnly: false
})

blocksMappings.set('blocks.awards', {
  adapter: PEAwardAdapter.blockToComponent,
  component: 'PEAwards',
  clientOnly: true
})

blocksMappings.set('blocks.offer-text', {
  adapter: PEOfferTextAdapter.blockToComponent,
  component: 'PEOfferTextTerms',
  clientOnly: true
})

blocksMappings.set('blocks.service-gallery', {
  adapter: PEGalleryGridAdapter.blockToComponent,
  component: 'PEGalleryGrid',
  clientOnly: true
})

blocksMappings.set('blocks.amenity-banner', {
  adapter: PEAmenitiesBannerAdapter.blockToComponent,
  component: 'PERoomAmenitiesBanner',
  clientOnly: true
})

blocksMappings.set('blocks.triple-card-column', {
  adapter: PEOffersBannerAdapter.blockToComponent,
  component: 'PEOffersBanner',
  clientOnly: true
})

blocksMappings.set('blocks.image-slider', {
  adapter: PESliderPreviewAdapter.blockToComponent,
  component: 'PESliderPreview',
  clientOnly: true
})

blocksMappings.set('blocks.banner-slider', {
  adapter: PEBannerSliderAdapter.blockToComponent,
  component: 'PESliderBanner',
  clientOnly: false
})

// Fixed

blocksMappings.set('blocks.banner', {
  adapter: PEBannerAdapter.blockToComponent,
  component: 'PEBanner',
  clientOnly: false
})

blocksMappings.set('blocks.banner-section', {
  adapter: PEBannerSectionAdapter.blockToComponent,
  component: 'PEBannerSection',
  clientOnly: false
})

blocksMappings.set('blocks.booking-offer', {
  adapter: PEBookingOfferAdapter.blockToComponent,
  component: 'PEBookingOffer',
  clientOnly: true
})

blocksMappings.set('blocks.carousel', {
  adapter: PECarouselAdapter.blockToComponent,
  component: 'PECarousel',
  clientOnly: true
})

blocksMappings.set('blocks.image', {
  adapter: PEImageBlockAdapter.blockToComponent,
  component: 'PEImageBlock',
  clientOnly: false
})

blocksMappings.set('blocks.information-image', {
  adapter: PEInformationImageAdapter.blockToComponent,
  component: 'PEInformationImage',
  clientOnly: false
})

blocksMappings.set('blocks.offer-card-grid', {
  adapter: PEOfferCardGridAdapter.blockToComponent,
  component: 'PEOfferCardGrid',
  clientOnly: true
})

blocksMappings.set('blocks.title-description', {
  adapter: PETitleDescriptionAdapter.blockToComponent,
  component: 'PETitleDescription',
  clientOnly: false
})

blocksMappings.set('blocks.title-description-resort', {
  adapter: PETitleDescriptionResortAdapter.blockToComponent,
  component: 'PETitleDescription',
  clientOnly: false
})

blocksMappings.set('blocks.title-description-offer', {
  adapter: PETitleDescriptionOfferAdapter.blockToComponent,
  component: 'PETitleDescription',
  clientOnly: false
})

export default blocksMappings
