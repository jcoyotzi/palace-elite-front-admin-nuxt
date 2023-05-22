<template>
  <section class="flex justify-center">
    <div class="w-full">
      <div
        v-for="(asset, index) in assets"
        :key="index"
        class="mt-6 w-full"
      >
        <DashboardProgressBar :value="asset.value" />
        <div class="mt-2 flex w-full justify-between">
          <div>
            <p class="text-2xl font-normal text-white">
              {{ asset.used }}
            </p>
            <p class="text-xs font-semibold uppercase text-white">
              {{ asset.labelStart }}
            </p>
          </div>
          <div class="text-right">
            <p class="text-2xl font-normal text-white">
              {{ asset.total }}
            </p>
            <p class="text-xs font-semibold uppercase text-white">
              {{ asset.labelEnd }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'

import {Component, Prop} from 'vue-property-decorator'

@Component
export default class ProgressAsset extends Vue {
  @Prop({type: Array, default: () => []})
  assets!: any[]
}
</script>
