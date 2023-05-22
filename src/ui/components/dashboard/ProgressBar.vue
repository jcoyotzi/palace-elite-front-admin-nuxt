<template>
  <section class="flex justify-center">
    <div class="w-full">
      <div class="h-2.5 w-full rounded-[5px] bg-black">
        <div
          class="h-2.5 rounded-[5px] bg-blue-light"
          :style="`width: ${value}%`"
        ></div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'

import {Component, Prop} from 'vue-property-decorator'

@Component({
  name: 'PEProgressBar'
})
export default class PEProgressBar extends Vue {
  @Prop({type: Number, default: 0})
  value!: number
}
</script>
