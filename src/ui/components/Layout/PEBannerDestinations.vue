<template>
  <div>
    <p class="pe-text-base pe-font-sans pe-text-white">{{$t('destinationsTitle')}}</p>
    <span class="pe-block pe-w-full pe-h-[2px] pe-bg-white pe-opacity-5 pe-my-5" />
    <ul class="pe-flex pe-gap-20 pe-mb-9">
      <li v-for="destination in destinations" :key="destination.id">
        <PEButton
          without-border
          :to="localePath({name: 'destinations-and-resorts'})"
          tag="NuxtLink"
          class="pe-text-white !pe-font-sans pe-text-base pe-cursor-pointer py-0"
        >
          {{ destination.name }}
        </PEButton>
      </li>
      <li>
        <PEButton
          without-border
          :to="localePath({name: 'destinations-and-resorts'})"
          tag="NuxtLink"
          class="pe-text-blue-light !pe-font-sans pe-text-base pe-cursor-pointer py-0"
        >
          {{$t('destinationsLink')}}
          <PEIcon class="!pe-text-blue-light">chevron-right</PEIcon>
        </PEButton>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import { Destination } from '~/src/app/layout/domain/dto/destinationsDto'
import i18n from '~/src/ui/i18n/booking/bookingWidget'

@Component({
  i18n,
  name: 'PEBannerDestinations'
})
export default class PEBannerDestinations extends Vue {
  @Prop({type: Array, required: true}) destinations!: Destination[]
}
</script>
