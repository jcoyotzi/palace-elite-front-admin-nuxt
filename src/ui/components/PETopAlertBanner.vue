<template>
  <div
    v-if="bindingValue"
    class="pe-relative pe-w-full pe-flex pe-items-center pe-justify-center pe-bg-white pe-px-6"
  >
    <PE-button
      class="h-[50px] pe-text-blue-dark pe-bg-black pe-underline"
      v-bind="bindProps"
      @click.prevent="onClickText"
    >
      <span v-html="$t('text')" />
    </PE-button>
    <div
      @click.prevent="onClose"
      class="pe-absolute pe-right-3 pe-cursor-pointer pe-text-blue-light"
    >
      <PEIcon
        class="pe-text-blue-light"
        size="30"
        >close</PEIcon
      >
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import {LayoutStore} from '../store/layoutStore'
import {UseAuth as AuthStore} from '../store/auth'
import i18n from '../i18n/alertBanner.lang'

@Component({
  i18n
})
export default class PETopAlertBanner extends Vue {
  get layoutStore(): LayoutStore {
    return new LayoutStore()
  }

  get authStore(): AuthStore {
    return new AuthStore()
  }

  get bindingValue() {
    return this.layoutStore.showModalPleca && this.authStore.user !== null
  }

  get bindProps() {
    return {
      tag: 'a',
      text: true,
      href: '#'
    }
  }

  onClickText() {
    window.open('https://fixed.palaceelite.com/members/Login.aspx', '_self')
  }

  onClose() {
    this.layoutStore.showModalPleca = false
  }
}
</script>
<style scoped>
.pe-fixed {
  z-index: 999999;
}
</style>
