<template>
  <div
    v-if="snackbar"
    class="pe-fixed pe-z-[999999] pe-mb-10 pe-min-w-[350px] pe-w-auto pe-mr-6 pe-font-sans pe-right-0 pe-top-5 pe-bg-black-light pe-rounded-[5px] pe-border-l-8 pe-px-4 pe-py-3"
    :class="getClasses"
    role="alert"
  >
    <p class="pe-font-semibold pe-text-white">{{ snackbarDetail.title }}</p>
    <p class="pe-text-sm pe-text-white">{{ snackbarDetail.message }}</p>
  </div>
</template>
<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import {LayoutStore} from '../store/layoutStore'

@Component({})
export default class Snackbar extends Vue {
  get layoutStore(): LayoutStore {
    return new LayoutStore()
  }

  get snackbar(): boolean {
    return this.layoutStore.snackbar
  }

  get getClasses() {
    return {
      'pe-border-red-700': this.snackbarDetail.type === 'error',
      'pe-border-blue-light': this.snackbarDetail.type === 'success'
    }
  }

  get snackbarDetail() {
    return this.layoutStore.snackbarDetail
  }
}
</script>
<style scoped>
.snackbar {
  z-index: 9999;
}
</style>
