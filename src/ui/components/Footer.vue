<template>
  <div class="ms-h-[200px]">
    <PEFooterMicroSite
      v-bind="footerMicroSiteProps"
      class="footer-micro-site"
      :dark="false"
    ></PEFooterMicroSite>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'Footer',
})
export default class Footer extends Vue {
  get footerMicroSiteProps() {
    return {
      phone: '+52 ( 929 ) 3870-3456',
      email: 'contact@palaceresorts.com',
      locale: this.$i18n.locale,
      logo: 'https://d2azgexewbdl23.cloudfront.net/content/Group_bff246b37f.svg',
    }
  }
  
  mounted() {
    //
  }
}
</script>

<style scoped>
.footer-micro-site::v-deep span.text-blue-light {
  color: #43B4B4 !important;
}
</style>