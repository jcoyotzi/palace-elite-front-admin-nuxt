<template>
  <main v-if="isAuthenticated">
    <client-only>
      <Navbar></Navbar>
      <div class="ms-bg-white ms-grow ms-pb-10 ms-px-4 md:ms-px-6 lg:ms-px-8 xl:ms-px-[165px]">
        <Breadcrum></Breadcrum>
        <Nuxt></Nuxt>
      </div>
      <Footer></Footer>
      <div @keydown.esc="onESCKeyPressed"></div>
    </client-only>
  </main>
  <main v-else>
    <client-only>
      <Nuxt></Nuxt>
    </client-only>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { AuthStore } from '../store/authStore'
import Navbar from '~/src/ui/components/Navbar.vue'
import Footer from '~/src/ui/components/Footer.vue'

const ESC_KEY_CODE = 27

@Component({
  name: 'DefaultLayout',
  components: {
    Navbar,
    Footer,
  },
})
export default class DefaultLayout extends Vue {

  public authStore = new AuthStore();

  get isAuthenticated() {
    return this.authStore.isAuthenticated
  }

  mounted() {
    this.onESCKeyPressed()
  }

  onESCKeyPressed() {
    document.addEventListener('keyup',(evt) => {
      if (evt.keyCode === ESC_KEY_CODE) {
        this.$router.push(this.localePath({ path: '/affiliate-search' }));
      }
    });
  }
}
</script>