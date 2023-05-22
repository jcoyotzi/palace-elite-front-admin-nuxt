<template>
  <div class="pe-relative pe-w-full">
    <PEHero v-bind="heroAttrs" class="!pe-hidden md:!pe-block" />
    <PEHero v-bind="heroMobile" class="md:!pe-hidden" />
    <ClientOnly>
      <div
        class="pe-max-w-[1200px] pe-bg-black-medium xl:pe-bg-transparent xl:pe-w-auto pe-w-full pe-mx-auto pe-p-5 xl:pe-p-0 pe-z-50 xl:pe-relative xl:pe-bottom-[33px]"
      >
        <BuildSearchBooking
          :items="calendarData"
          class="pe-container px-4 sm:px-0 mx-auto"
          v-bind="bookingAttrs"
          @dates="sendDates"
        />
      </div>
    </ClientOnly>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop } from 'vue-property-decorator';
import HeroWidget from '../Common/HeroWidget.vue';
import BuildSearchBooking from './BuildSearchBookin.vue';

@Component({
  name: 'build-search-hero',
  components: {
    BuildSearchBooking
  }
})
export default class BuildSearchHero extends HeroWidget {
  @Prop({type: Object, default: {}})
    heroMobile!: any

  @Emit('dates')
  sendDates(dates: any) {
    return dates
  }
}

</script>
