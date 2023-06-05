<template>
  <main>
    <client-only>
      <Nuxt></Nuxt>
    </client-only>
  </main>  
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'GuestLayout',
})
export default class GuestLayout extends Vue {
  mounted() {
    //
  }
}
</script>