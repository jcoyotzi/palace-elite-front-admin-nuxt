<template>
  <div class="ms-flex ms-flex-col ms-py-2 md:ms-py-4 lg:ms-py-0 lg:ms-flex-row lg:ms-justify-between lg:ms-min-h-[100px] ms-bg-[#274C69] ms-px-4 md:ms-px-6 lg:ms-px-8 xl:ms-px-[165px]">
    <div class="ms-flex ms-items-center ms-justify-center">
      <figure>
        <img src="../assets/img/logo.svg" alt="Intelligence Logo">
      </figure>
    </div>
    <div class="ms-flex ms-items-center ms-justify-center lg:ms-max-w-sm">
      <p v-if="fullname" class="ms-text-white">
        {{ `${$t('welcome')}, ${fullname}` }}
      </p>
      <!--figure class="ms-ml-1 ms-cursor-pointer">
        <img src="./icons/menu.svg" alt="Menu">
      </figure-->
      <p
        class="ms-ml-2 ms-underline ms-cursor-pointer ms-text-white ms-font-bold"
        @click="logout"
      >{{ $t('logout') }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { AuthStore } from '../store/authStore';

@Component({
  name: 'Navbar',
})
export default class Nabvar extends Vue {
  public authStore = new AuthStore();

  get profile() {
    return this.authStore.profile
  }

  get fullname(): string | undefined {
    if (this.profile && this.profile.attributes) {
      return `${this.profile.attributes.name} ${this.profile.attributes.lastName}`
    }
  }

  mounted() {
    //
  }

  async logout() {
    await this.authStore.logout()
    this.$router.push(this.localePath({ name: 'login' }))
  }
}
</script>