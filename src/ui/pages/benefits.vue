<template>
  <div>
    <NuxtChild class="pe-w-full" />
  </div>
</template>

<script>
import {Component, Vue} from 'vue-property-decorator'
import {UseAuth} from '../store/auth'

@Component({
  meta: {
    auth: true
  },
  layout: 'default',
  name: 'BenefitsPage'
})
export default class BenefitsPage extends Vue {
  authStore = new UseAuth()

  get userIsAuthenticated() {
    return this.authStore.isAuthenticated
  }

  mounted() {
    if (this.userIsAuthenticated) this.$nuxt.setLayout('default')
    else this.$nuxt.setLayout('auth')
  }

  beforeMount() {
    this.$nuxt.setLayout('default')
  }
}
</script>
