<template>
  <div class="animation-pulse flex space-x-4">
    <div class="flex-1 space-y-6 py-1">
      <div
        class="mb-2 h-4 rounded"
        :class="backgroundClasses"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator'
@Component({
  name: 'SkeletonLine'
})
export default class SkeletonLine extends Vue {
  @Prop({default: true, type: Boolean}) dark!: boolean
  get backgroundClasses() {
    return {
      'ms-bg-[#272527]': this.dark,
      'ms-bg-gray-300': !this.dark
    }
  }
}
</script>