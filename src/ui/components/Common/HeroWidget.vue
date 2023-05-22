<template>
  <div class="pe-relative pe-w-full">
    <PEHero v-bind="heroAttrs" />
    <ClientOnly>
      <div
        class="pe-max-w-[1200px] pe-bg-black-medium pe-z-[31] xl:pe-bg-transparent xl:pe-w-auto pe-w-full pe-mx-auto pe-fixed pe-p-5 xl:pe-p-0 pe-bottom-0 xl:pe-relative xl:pe-bottom-[33px] xl:pe-z-auto"
      >
        <PEBookingWidget
          v-if="isAuthenticated"
          :items="calendarData"
          class="pe-container px-4 sm:px-0 mx-auto"
          v-bind="bookingAttrs"
        />
      </div>
    </ClientOnly>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator'
import PEBookingWidget from '../BookingWidget/PEBookingWidget.vue'

@Component({
  name: 'HeroWidget',
  components: {
    PEBookingWidget
  }
})
export default class HeroWidget extends Vue {
  @Prop({type: Array, default: []})
    calendarData!: any[]

  @Prop({type: Object, default: {}}) bookingAttrs!: any

  @Prop({type: Object, default: {}}) heroAttrs!: any

  @Prop({type: Boolean, default: true}) isAuthenticated!: boolean
}
</script>
