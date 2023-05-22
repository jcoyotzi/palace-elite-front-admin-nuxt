<template>
  <div class="pe-mb-10">
    <div class="pe-col-span-12">
      <p class="pe-text-base pe-text-white">{{ labelTitle }}</p>
    </div>
    <div
      class="pe-grid pe-grid-cols-3 xl:pe-grid-cols-5 pe-gap-3 lg:pe-gap-5 xl:pe-gap-5 pe-place-items-center w-full pe-pt-4"
    >
      <div
        v-for="(property, index) in properties"
        :key="index"
        class="rounded-lg pe-h-[140px] w-full aspect-video"
      >
        <CommonLink
          class="pe-rounded-lg pe-h-[140px] w-full aspect-video"
          :link="property.link"
        >
          <PEImageText
            class="pe-w-full"
            v-bind="{
              image: property.img,
              text: '',
              disable: false
            }"
            :disabled="property.comingSoon"
          >
            <template #text>
              <span class="font-sans"> {{ property.label }} </span>

              <br v-if="property.comingSoon" />

              <span
                v-if="property.comingSoon"
                class="font-sans text-bold text-sm font-semibold"
              >
                {{ property.comingSoonLabel }}
              </span>
            </template>
          </PEImageText>
        </CommonLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator'
import {Destinations} from '../../../../app/layout/domain/entities/navbarEntity'

@Component({
  name: 'DestinationsSubmenu'
})
export default class DestinationsSubmenu extends Vue {
  @Prop({type: Object, required: true}) destinations!: Destinations
  @Prop({type: String, required: false}) destinationTitle!: string

  get labelTitle() {
    return this.destinationTitle
  }

  get properties() {
    return this.destinations.properties
  }
}
</script>
