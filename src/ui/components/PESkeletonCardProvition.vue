<template>
  <div class="m-auto mt-4 md:grid md:grid-cols-3 justify-center gap-6">
    <div
      v-for="card in repeats"
      :key="card"
      class="animation-pulse w-full !max-w-[520px] rounded-[12px]"
      :class="backgroundClasses"
    >
      <div
        class="h-[180px] w-full rounded-t-[12px] object-cover"
        :class="background2Classes"
      />
      <div class="p-[24px]">
        <div
          class="line-header mb-[32px] h-4 rounded"
          :class="background2Classes"
        />
        <div
          v-for="div in 6"
          :key="div"
          class="col-span-1 mb-2 h-4 rounded"
          :class="background2Classes"
        />
        <div class="mt-12 flex justify-between">
          <div
            class="line-footer h-4 rounded"
            :class="background2Classes"
          />
          <div
            class="line-footer h-4 rounded"
            :class="background2Classes"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator'

@Component({
  name: 'PESkeletonCardProvition'
})
export default class PESkeletonCardProvition extends Vue {
  @Prop({default: true, type: Boolean}) dark!: boolean

  @Prop({default: 6, type: Number}) repeats!: number

  get backgroundClasses() {
    return {
      'bg-black-light': this.dark,
      'bg-gray-300': !this.dark
    }
  }

  get background2Classes() {
    return {
      'bg-[#272527]': this.dark,
      'bg-gray-400': !this.dark
    }
  }
}
</script>

<style>
.line-header {
  margin: 20px 0px 32px 0px !important;
  width: 80% !important;
}

.line-footer {
  width: 25% !important;
}

.animation-pulse {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>