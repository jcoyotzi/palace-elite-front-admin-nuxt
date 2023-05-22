<template>
  <PEFooter
    v-if="footerDataStrapi"
    :footerdata="footerDataStrapi"
  />
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import { LayoutStore } from '../../store/layoutStore'
import OnCurrentLocaleChanged from '../../mixins/OnCurrentLocaleChanged'
import PEFooter from './PEFooter.vue'

@Component({
  name: 'PEFooterStrapi',
  components: {
    PEFooter
  }
})
export default class PEFooterStrapi extends Mixins (OnCurrentLocaleChanged) {
  layoutStore = new LayoutStore()

  get footerDataStrapi() {
    return this.layoutStore.footerData || null
  }

  onCurrentLocaleChanged(): void {
    this.layoutStore.fetchFooterStrapi()
  }
}
</script>
