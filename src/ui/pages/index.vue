<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'IndexPage',
  meta: {
    auth: true,
    breadcrumb: ['home'],
  }
})
export default class IndexPage extends Vue {
  async beforeMount() {
    await this.$router.push(this.localePath('/affiliate-search'))
  }
}
</script>