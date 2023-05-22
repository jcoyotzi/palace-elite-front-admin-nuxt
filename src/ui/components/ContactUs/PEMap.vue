<template>
  <div>
    <PEOfferText
      title="palace resorts"
      class="pe-max-w-[550px] pe-mx-auto pe-mb-6 pe-max-h-[100px]"
    />
    <section
      class="pe-w-full md:pe-w-11/12 pe-max-w-[1547px] pe-h-full md:pe-h-[783px] pe-mx-auto pe-relative"
    >
      <GmapMap
        :center="center"
        :zoom="20"
        style="width: 100%; height: 100%"
        :options="{
           zoomControl: false,
           mapTypeControl: false,
           scaleControl: false,
           streetViewControl: false,
           rotateControl: false,
           fullscreenControl: false,
           disableDefaultUi: false,
           gestureHandling: 'greedy',
           zoomControl: false,
           keyboardShortcuts: false,
           scrollWheelZoom:'center'
         }"
      >
        <GmapMarker
          v-for="(mark, index) in markers"
          :key="index"
          :position="mark.position"
          :title="mark.title"
          :clickable="true"
          :draggable="false"
          :icon="{ url: require('../../assets/img/map-pin-small.png'), size: markerOptions.size, scaledSize: markerOptions.scaledSize }"
        ></GmapMarker>
      </GmapMap>
      <div
        class="pe-hidden pe-absolute pe-w-9/12 pe-max-w-md pe-h-3/4 pe-bg-blue-dark pe-p-10 md:pe-flex pe-flex-col pe-justify-center pe-text-white address"
      >
        <p class="pe-text-2xl">{{ name }}</p>
        <address>{{ address }}</address>
        <p v-if="phone">{{ phone }}</p>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCNHi3NmW1-U5v9qhOZq-IgaXc6qNBJAE8'
  }
})

interface Cords {
  lat: number
  lng: number
}

@Component({
  name: 'PEMap',
  components: {}
})
export default class PEMap extends Vue {
  @Prop({
    type: String,
    default: ''
  })
    name!: string

  @Prop({
    type: String,
    default: ''
  })
    address!: string

  @Prop({
    default: {lat: 21.123375089078404, lng: -86.75428670212122}
  })
    cords!: Cords

  @Prop({
    type: Number,
    default: 0
  })
    phone!: number

  get center() {
    return {...this.cords}
  }

  markerOptions = {
    size: {width: 41, height: 68, f: 'px', b: 'px'}
  }

  get markers() {
    return [
      {
        position: {...this.cords},
        title: this.name
      },
    ]
  }
}
</script>

<style lang="scss" scoped>
.address {
  top: 50%;
  left: 7%;
  transform: translateY(-50%);
}
</style>
