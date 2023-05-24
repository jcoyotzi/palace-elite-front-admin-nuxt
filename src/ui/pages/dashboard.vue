<template>
  <div>
    index.vue

    <button
      @click="logout"
    >Salir</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { AuthStore } from '../store/auth';

@Component({
  name: 'DashboardPage',
  layout: 'authenticated',
  meta: {
    auth: true,
  },
})
export default class DashboardPage extends Vue {
  public authStore = new AuthStore();
  
  logout() {
    this.authStore.logout();
    this.$router.push(this.localePath('/login'));
  }
}
</script>