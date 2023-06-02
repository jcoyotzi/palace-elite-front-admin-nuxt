<script lang="ts">
import { Component } from 'vue-property-decorator'
import AffiliateSearchPage from './affiliate-search.vue';

@Component({
  name: 'HomePage',
  meta: {
    auth: true,
    breadcrumb: ['home'],
  }
})
export default class HomePage extends AffiliateSearchPage { }
</script>