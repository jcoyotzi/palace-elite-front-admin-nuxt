<template>
  <main>
    <client-only>
      <Navbar></Navbar>
      <div class="ms-bg-white ms-grow ms-pb-10 ms-px-4 md:ms-px-6 lg:ms-px-8 xl:ms-px-[165px]">
        <Breadcrum></Breadcrum>
        <Nuxt></Nuxt>
      </div>
      <Footer></Footer>
    </client-only>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Navbar from '~/src/ui/components/Navbar.vue'
import Footer from '~/src/ui/components/Footer.vue'

@Component({
  name: 'AuthenticatedLayout',
  components: {
    Navbar,
    Footer,
  },
})
export default class AuthenticatedLayout extends Vue {
  mounted() {
    //
  }
}
</script>