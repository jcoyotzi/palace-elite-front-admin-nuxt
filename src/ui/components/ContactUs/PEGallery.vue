<template>
  <section class="pe-w-full pe-flex pe-justify-center pe-flex-wrap">
    <PEOfferText
      title="OUR RESORTS"
      class="pe-w-full pe-mx-auto pe-mb-14 pe-max-h-[50px] md:!pe-hidden"
    />
    <div class="pe-w-screen md:pe-w-11/12 pe-max-w-[1547px] pe-grid pe-grid-cols-12 pe-gap-5 md:pe-gap-12">
      <div
        v-for="item in items.filter(item => !item.comingSoon)"
        :key="item.id"
        class="relative !flex h-full !items-end !justify-center text-white cursor-pointer pe-w-full pe-min-h-[280px] sm:pe-min-h-[420px] md:pe-min-h-[532px] gallry-item"
      >
        <PE-image-strapi
          class="absolute h-full w-full [&>img]:mix-blend-normal md:[&>img]:!object-cover md:[&>img]:!pe-rounded-[10px]"
          :image="item.image"
          fit
        />
        <div
          class="relative left-0 right-0 mt-auto pe-mb-6 w-full px-5 text-center text-sm md:mb-3 lg:mb-5 2xl:pb-2"
        >
          <div class="pe-flex pe-flex-col pe-justify-start pe-items-start md:pe-mb-5 pe-mr-9">
            <span class="pe-text-base"> {{ locations[item.externalId] }} </span>
            <span class="pe-text-2xl pe-text-start"> {{ item.text }} </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import {PropertyEntity} from '~/src/app/property/domain/entities/propertyEntity'

enum Locations {
  BP = 'Cancun',
  SP = 'Cancun',
  CZ = 'Cozumel',
  PL = 'Playa del carmen',
  MPS = 'Cancun',
  ZCJG = 'Jamainca- Ocho rios',
  MPG = 'Cancun',
  MPC = 'Cancun',
  LBC = 'Cancun',
  ZPLB = 'Los Cabos'
}

@Component({
  name: 'PEGalery',
  components: {}
})
export default class PEGalery extends Vue {
  @Prop({
    default: []
  })
    items!: PropertyEntity[]

  locations!: any

  get mobile() {
    return screen.width < 768
  }

  beforeMount() {
    this.locations = Locations
  }
}
</script>

<style lang="scss" scoped>
.pe-grid {
  $big: 7;
  $medium: 5;
  $small: 4;
  .gallry-item {
    font-family: 'Gotham';
    grid-column: span $small;
  }
  & :nth-child(10n - 9),
  & :nth-child(10n - 3) {
    grid-column: span $big;
  }
  & :nth-child(10n - 8),
  & :nth-child(10n - 4) {
    grid-column: span $medium;
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(7, minmax(0, 1fr));
    .gallry-item {
      grid-column: span 7;
    }
    & :nth-child(10n - 9),
    & :nth-child(10n - 3) {
      grid-column: span 7;
    }
    & :nth-child(10n - 8),
    & :nth-child(10n - 4) {
      grid-column: span 7;
    }
  }
  @media (max-width: 1024px) and (min-width: 769px) {
    .gallry-item {
      grid-column: span 6;
    }
    & :nth-child(10n - 9),
    & :nth-child(10n - 3) {
      grid-column: span 6;
    }
    & :nth-child(10n - 8),
    & :nth-child(10n - 4) {
      grid-column: span 6;
    }
  }
}
</style>
